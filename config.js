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
  
  async function loadFile(name) {
    return new Promise(resolve => {
      chrome.storage.local.get(name, async result => {
        if (result[name]) {
          resolve(result[name]);
        } else {
          const url = chrome.runtime.getURL(name);
          const res = await fetch(url);
          const text = await res.text();
          resolve(text);
        }
      });
    });
  }
  
  async function saveFile(name, content) {
    const toSave = {};
    toSave[name] = content;
    chrome.storage.local.set(toSave, () => {
      alert(`${name} salvato.`);
    });
  }
  
  async function createEditor(name) {
    const container = document.getElementById("configContainer");
    const section = document.createElement("div");
    section.className = "config-section";
  
    const label = document.createElement("label");
    label.textContent = name;
  
    const textarea = document.createElement("textarea");
    textarea.id = `txt-${name}`;
    textarea.value = await loadFile(name);
  
    const button = document.createElement("button");
    button.textContent = "Salva";
    button.onclick = () => saveFile(name, textarea.value);
  
    section.appendChild(label);
    section.appendChild(textarea);
    section.appendChild(button);
    container.appendChild(section);
  }
  
  files.forEach(createEditor);
  
  // Reset local storage
  const resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", () => {
    chrome.storage.local.clear(() => {
      alert("Configurazione ripristinata ai valori predefiniti. Ricarica la pagina per applicare i cambiamenti.");
      location.reload();
    });
  });
  