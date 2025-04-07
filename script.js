(function() {
  // Funzione per ritardare l'esecuzione di ms millisecondi
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Funzione per caricare un file in modo asincrono con gestione degli errori
  async function loadFile(fileName) {
    return new Promise((resolve) => {
      chrome.storage.local.get(fileName, async result => {
        if (result[fileName]) {
          resolve(result[fileName]);
        } else {
          const fileUrl = chrome.runtime.getURL(fileName);
          const response = await fetch(fileUrl);
          const text = await response.text();
          resolve(text);
        }
      });
    });
  }
  
  // Funzione per sanitizzare il testo in HTML
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Mostra un overlay in attesa della risposta di ChatGPT
  function showOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "waitingOverlay";
    overlay.textContent = "In attesa di ChatGPT...";
    document.body.appendChild(overlay);
  }

  // Rimuove l'overlay di attesa
  function removeOverlay() {
    const overlay = document.getElementById("waitingOverlay");
    if (overlay) overlay.remove();
  }

  // Attende che il bottone per il riconoscimento vocale o per l'invio sia disponibile
  function waitForSpeechButton() {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        const speechButton = document.querySelector(
          'button[data-testid="composer-speech-button"]'
        );
        const submitButton = document.querySelector(
          'button[data-testid="composer-submit-button"]'
        );
        if (speechButton || submitButton) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  // Analizza la risposta dell'assistente e restituisce un oggetto chiave-valore
  function parseAssistantResponse(text) {
    const lines = text.split("\n");
    const data = {};
    lines.forEach(line => {
      const parts = line.split("=");
      if (parts.length >= 2) {
        data[parts[0].trim()] = parts.slice(1).join("=").trim();
      }
    });
    return data;
  }

  // Carica i mapping da un file di testo in formato "id=chiave"
  async function loadMappings() {
    const text = await loadFile("mappings.txt");
    const mappings = {};
    text.split(/\r?\n/).forEach(line => {
      if (line.trim() && line.includes("=")) {
        const [id, key] = line.split("=");
        mappings[id.trim()] = key.trim();
      }
    });
    return mappings;
  }

  // Carica il numero massimo di turni da un file di testo
  async function loadMaxTurns() {
    const text = await loadFile("maxTurns.txt");
    return parseInt(text.trim());
  }  

  // Carica il numero di scelte da un file di testo
  async function loadNumChoices() {
    const text = await loadFile("optionsNumber.txt");
    return parseInt(text.trim());
  }

  // Aggiorna l'interfaccia del gioco basandosi sulla risposta dell'assistente
  async function updateUIFromAssistant(container) {
    const assistantDivs = document.querySelectorAll(
      'div[data-message-author-role="assistant"]'
    );
    if (assistantDivs.length === 0) return;
    const lastAssistantDiv = assistantDivs[assistantDivs.length - 1];
    const data = parseAssistantResponse(lastAssistantDiv.innerText);

    const mappings = await loadMappings();
    Object.keys(mappings).forEach(id => {
      const key = mappings[id];
      const el = container.querySelector("#" + id);
      if (el && data[key]) el.textContent = data[key];
    });

    // Se il gioco è finito, sostituisce le opzioni con il bottone "Nuova partita"
    if (data["GameOver"] === "true") {
      const scelteSection = container.querySelector("#scelte");
      if (scelteSection) {
        scelteSection.innerHTML = "";
        const nuovoBtn = document.createElement("button");
        nuovoBtn.textContent = "Nuova partita";
        nuovoBtn.className = "scelta";
        nuovoBtn.style.gridColumn = "1 / -1";
        nuovoBtn.addEventListener("click", () => {
          window.location.href = "https://chatgpt.com";
        });
        scelteSection.appendChild(nuovoBtn);
      }
    }
  }

  // Crea e posiziona il contenitore del gioco, nascondendo gli elementi originali della pagina
  function setupGameContainer(html) {
    // Rimuove stili e link originali
    const dismissLink = document.querySelector('a[data-testid="dismiss-welcome"]');
    if (dismissLink) { dismissLink.click(); }
    document.querySelectorAll('link[rel="stylesheet"]').forEach(el => el.remove());
    document.querySelectorAll("style").forEach(el => el.remove());
    document.querySelectorAll('link[rel="icon"]').forEach(el => el.remove());
    Array.from(document.body.children).forEach(child => (child.style.display = "none"));

    const container = document.createElement("div");
    container.id = "gameContainer";
    container.innerHTML = html;
    Object.assign(container.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: "999",
      overflow: "auto"
    });
    document.body.appendChild(container);

    // Aggiunge l'icona
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = chrome.runtime.getURL("icon.png");
    document.head.appendChild(link);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    document.title = doc.querySelector("title").textContent;
    return container;
  }

  // Assegna opzioni casuali ai bottoni delle scelte all'inizio della partita
  async function assignRandomOptions(container, numChoices) {
    const optionsText = await loadFile("startingOptions.txt");
    const startingOptions = optionsText.split(/\r?\n/).filter(line => line.trim() !== "");
    const scelteSection = container.querySelector("#scelte");
    scelteSection.innerHTML = "";
    const selectedOptions = startingOptions.sort(() => 0.5 - Math.random()).slice(0, numChoices);
    selectedOptions.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "scelta";
      button.id = "scelta" + (index + 1);
      button.textContent = option;
      scelteSection.appendChild(button);
    });
  }

  // Imposta i listener per i bottoni delle scelte e gestisce l'invio del comando a ChatGPT
  // currentTurnObj è un oggetto mutabile che contiene il turno corrente
  function setupButtonListeners(container, totalTurns, currentTurnObj, numChoices) {
    const buttons = [];
    for (let i = 1; i <= numChoices; i++) {
      const button = container.querySelector("#scelta" + i);
      if (button) {
        buttons.push(button);
      }
    }

    buttons.forEach((button, index) => {
      button.addEventListener("click", async () => {
        showOverlay();
        let finalCommand = "";
        if (currentTurnObj.current === 0) {
          finalCommand = await loadFile("prompt_start.txt");
        } else if (currentTurnObj.current >= totalTurns) {
          finalCommand = await loadFile("prompt_end.txt");
        } else {
          finalCommand = await loadFile("prompt_normal.txt");
        }
        finalCommand = finalCommand
          .replace("%TEXT%", button.textContent)
          .replace("%NUMBER%", (index + 1).toString())
          .replace("%TURN%", currentTurnObj.current.toString())
          .replace("%TURNS%", totalTurns.toString());

        const chatInput = document.querySelector("#prompt-textarea");
        if (chatInput) {
          const lines = finalCommand.split("\n");
          chatInput.innerHTML = lines.map(line => `<p>${escapeHtml(line)}</p>`).join("");
          await delay(100);
          const sendButton = document.getElementById("composer-submit-button");
          if (sendButton) {
            sendButton.click();
            await waitForSpeechButton();
            updateUIFromAssistant(container);
            currentTurnObj.current++;
          }
        }
        removeOverlay();
      });
    });
  }

  // Evento principale al caricamento della finestra
  window.addEventListener("load", async () => {
    // Attendi 3 secondi prima di procedere
    await delay(3000);

    // Determina il turno corrente in base al numero di messaggi dell'assistente presenti
    const initialTurnCount = document.querySelectorAll(
      'div[data-message-author-role="assistant"]'
    ).length;
    let currentTurnObj = { current: initialTurnCount };
    const totalTurns = await loadMaxTurns();
    const numChoices = await loadNumChoices();

    // Carica il contenuto di userInterface.html e configura il contenitore del gioco
    const gameHtml = await loadFile("userInterface.html");
    const gameContainer = setupGameContainer(gameHtml);

    if (currentTurnObj.current === 0) {
      await assignRandomOptions(gameContainer, numChoices);
    } else {
      updateUIFromAssistant(gameContainer);
    }

    setupButtonListeners(gameContainer, totalTurns, currentTurnObj, numChoices);
  });
})();
