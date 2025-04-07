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

  const url = chrome.runtime.getURL(name);
  const originalContent = await fetch(url).then(r => r.text());
  let savedContent = await new Promise(resolve => {
    chrome.storage.local.get(name, result => {
      resolve(result[name] || originalContent);
    });
  });

  textarea.value = savedContent;

  function updateLabelColor() {
    const current = textarea.value;
    if (current === originalContent) {
      label.style.color = "black";
    } else if (current === savedContent) {
      label.style.color = "darkgreen";
    } else {
      label.style.color = "darkred";
    }
  }

  textarea.addEventListener("input", updateLabelColor);
  updateLabelColor();

  const button = document.createElement("button");
  button.textContent = "Salva";
  button.onclick = () => {
    const current = textarea.value;
    const toSave = {};
    toSave[name] = current;
    chrome.storage.local.set(toSave, () => {
      alert(`${name} salvato.`);
      savedContent = current;
      updateLabelColor();
    });
  };

  section.appendChild(label);
  section.appendChild(textarea);
  section.appendChild(button);
  container.appendChild(section);
}
  
files.forEach(createEditor);

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  chrome.storage.local.clear(() => {
    alert("Configurazione ripristinata ai valori predefiniti. Ricarica la pagina per applicare i cambiamenti.");
    location.reload();
  });
});
