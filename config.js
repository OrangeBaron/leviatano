const files = [
  "prompt_start.txt",
  "prompt_normal.txt",
  "prompt_end.txt",
  "startingOptions.txt",
  "mappings.txt",
  "maxTurns.txt",
  "optionsNumber.txt",
  "userInterface.html"
];

async function createEditor(name) {
  const container = document.getElementById("configContainer");
  const section = document.createElement("div");
  section.className = "config-section";

  // Creazione della label con id dedicato
  const label = document.createElement("label");
  label.textContent = name;
  label.id = "lbl-" + name;

  const textarea = document.createElement("textarea");
  textarea.id = `txt-${name}`;

  // Carica il contenuto originale dal file
  const url = chrome.runtime.getURL(name);
  const originalContent = await fetch(url).then(r => r.text());
  
  // Recupera il contenuto salvato (se presente), altrimenti usa quello originale
  let savedContent = await new Promise(resolve => {
    chrome.storage.local.get(name, result => {
      resolve(result[name] || originalContent);
    });
  });

  textarea.value = savedContent;
  
  // Imposta dei data attributes per memorizzare il contenuto originale e quello salvato
  textarea.dataset.original = originalContent;
  textarea.dataset.saved = savedContent;
  
  // Funzione per aggiornare il colore della label in base al contenuto corrente
  function updateLabelColor() {
    const current = textarea.value;
    const original = textarea.dataset.original;
    const saved = textarea.dataset.saved;
    if (current === original) {
      label.style.color = "black";
    } else if (current === saved) {
      label.style.color = "darkgreen";
    } else {
      label.style.color = "darkred";
    }
  }
  
  // Associa l'aggiornamento del colore alla modifica della textarea
  textarea.addEventListener("input", updateLabelColor);
  updateLabelColor();
  
  // Bottone "Salva": salva il contenuto attuale, aggiorna il data attribute e il colore della label
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Salva";
  saveBtn.onclick = () => {
    const current = textarea.value;
    const toSave = {};
    toSave[name] = current;
    chrome.storage.local.set(toSave, () => {
      alert(`${name} salvato.`);
      savedContent = current;
      textarea.dataset.saved = current; // Aggiorna il contenuto salvato
      updateLabelColor();
    });
  };
  
  // Bottone "Ripristina": ripristina il contenuto originale, rimuove la chiave nel local storage ed aggiorna la label
  const restoreBtn = document.createElement("button");
  restoreBtn.textContent = "Ripristina";
  restoreBtn.style.marginLeft = "0.5rem";
  restoreBtn.classList.add("red-button");
  restoreBtn.onclick = () => {
    textarea.value = originalContent;
    chrome.storage.local.remove(name, () => {
      alert(`${name} ripristinato al contenuto originale.`);
      savedContent = originalContent;
      textarea.dataset.saved = originalContent; // Aggiorna il contenuto salvato
      updateLabelColor();
    });
  };
  
  section.appendChild(label);
  section.appendChild(textarea);
  section.appendChild(saveBtn);
  section.appendChild(restoreBtn);
  container.appendChild(section);
}

files.forEach(createEditor);

// Bottone "Ripristina Configurazione Predefinita"
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  chrome.storage.local.clear(() => {
    alert("Configurazione ripristinata ai valori predefiniti. Ricarica la pagina per applicare i cambiamenti.");
    location.reload();
  });
});

// Funzione per esportare la configurazione in formato Markdown
function exportConfig() {
  let markdown = "# Il Leviatano - Configurazione Personalizzata\n";
  files.forEach(filename => {
    const textarea = document.getElementById("txt-" + filename);
    const content = textarea ? textarea.value : "";
    markdown += `\n## ${filename}\n\`\`\`\n${content}\n\`\`\`\n`;
  });
  
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "configurazione_personalizzata.md";
  a.click();
  URL.revokeObjectURL(url);
}

// Funzione per importare la configurazione da un file Markdown
function importConfig(fileContent) {
  const regex = /##\s*(.+?)\n```([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    const filename = match[1].trim();
    const content = match[2].trim();
    if (files.includes(filename)) {
      const toSave = {};
      toSave[filename] = content;
      chrome.storage.local.set(toSave, () => {
        const textarea = document.getElementById("txt-" + filename);
        if (textarea) {
          textarea.value = content;
          // Aggiorna il data attribute per il contenuto salvato
          textarea.dataset.saved = content;
          // Triggera l'aggiornamento della label
          textarea.dispatchEvent(new Event('input'));
        }
      });
    }
  }
  alert("Configurazione importata correttamente.");
}

// Listener per i bottoni di esportazione e importazione
const exportBtn = document.getElementById("exportConfigBtn");
exportBtn.addEventListener("click", exportConfig);

const importBtn = document.getElementById("importConfigBtn");
const importFileInput = document.getElementById("importFile");

importBtn.addEventListener("click", () => {
  importFileInput.click();
});

importFileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const fileContent = e.target.result;
      importConfig(fileContent);
    };
    reader.readAsText(file);
  }
});
