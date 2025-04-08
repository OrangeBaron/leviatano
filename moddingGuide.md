# 🛠️ Guida al Modding – *Il Leviatano*

**Il Leviatano** è pensato per essere facilmente modificabile: puoi cambiare prompt, logica, interfaccia utente e creare un gioco tutto tuo, direttamente dalla pagina di configurazione.

## 📁 Struttura dei File Personalizzabili

Tutti i file modificabili si trovano nella pagina di configurazione e sono salvati in locale:

- `prompt_start.txt` – prompt iniziale (scelta della nazione)
- `prompt_normal.txt` – prompt per i turni intermedi
- `prompt_end.txt` – prompt per la fine della partita
- `startingOptions.txt` – opzioni iniziali (es. paesi)
- `mappings.txt` – corrispondenza tra ID HTML e variabili del prompt
- `maxTurns.txt` – numero massimo di turni
- `optionsNumber.txt` – numero di scelte per turno
- `userInterface.html` – l’interfaccia visiva del gioco

---

## ✏️ Come Scrivere i Prompt

Nei file `prompt_*.txt`, puoi usare **variabili speciali** per rendere dinamico il testo:

- `%NUMERO%` – numero della scelta fatta
- `%TESTO%` – testo della scelta fatta
- `%TURNO%` – numero del turno corrente
- `%TURNI%` – numero massimo di turni

### 📌 Esempio `prompt_normal.txt`

```txt
Turno %TURNO% di %TURNI%: il giocatore ha fatto la scelta numero %NUMERO%, prosegui la storia e presenta la prossima sfida.
```

### 📌 Esempio `prompt_start.txt`

```txt
Il giocatore ha scelto di iniziare la partita in %TESTO%, presenta la situazione del paese e la prima sfida.
```

---

## ⚙️ Parametri Personalizzabili

Modifica i seguenti file per adattare il gioco:

- **`optionsNumber.txt`** → quante scelte per turno (es. 4)
- **`maxTurns.txt`** → durata della partita (es. 10)
- **`startingOptions.txt`** → elenco delle opzioni iniziali (es. paesi, personaggi, mondi…)

---

## 🎨 Personalizza l’Interfaccia

Puoi creare una nuova interfaccia modificando `userInterface.html`. Assicurati di rispettare **alcune regole**:

### ✅ Obbligatorio:

- Le **scelte** devono essere inserite all'interno di un container con l'ID:
  ```html
  <section id="scelte">...</section>
  ```
- I bottoni delle scelte devono avere ID nel formato:
  ```html
  <button id="scelta1" class="scelta">Opzione 1</button>
  <button id="scelta2" class="scelta">Opzione 2</button>
  ...
  ```
- Gli elementi da aggiornare (indicatori, titoli, testo) devono avere gli ID corrispondenti a quelli definiti in `mappings.txt`.

### 📋 Esempio `mappings.txt`

```txt
indicatore1=DebitoPubblico
indicatore2=ApprovazionePopolare
titolo1=Giornale1
testo-storia=Storia
scelta1=Scelta1
```

Modifica questi ID nell’HTML per far combaciare i dati generati da ChatGPT con gli elementi visivi del tuo gioco.

---

## 🔁 Esempio di Ciclo di Gioco

1. Il giocatore sceglie un’opzione iniziale (definita in `startingOptions.txt`).
2. Viene inviato il prompt da `prompt_start.txt`.
3. ChatGPT risponde con:
   ```
   GameOver=false
   DebitoPubblico=120
   ApprovazionePopolare=68
   ...
   Storia=Nuova sfida...
   Scelta1=Privatizza...
   Scelta2=Regolamenta...
   Scelta3=Ignora...
   Scelta4=Commissiona uno studio...
   ```
4. L’interfaccia viene aggiornata automaticamente leggendo `mappings.txt`.
5. Al turno successivo, viene inviato `prompt_normal.txt` (oppure `prompt_end.txt` al termine della partita).
