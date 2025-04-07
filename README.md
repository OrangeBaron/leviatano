# Il Leviatano - Estensione Gioco per ChatGPT

**Il Leviatano** è un gioco politico interattivo che trasforma l'interfaccia di ChatGPT in un'avventura testuale immersiva. Il giocatore assume il ruolo di Primo Ministro e deve affrontare sfide politiche, economiche e sociali turno dopo turno. Il gioco è ispirato al concetto di libertà economica contrapposta all'interventismo statale.

## Caratteristiche

- Interfaccia utente elegante integrata in ChatGPT.
- Sistema di gioco a turni con scelte multiple.
- Generazione dinamica degli eventi e delle sfide.
- Indicatori aggiornabili: Debito Pubblico, Approvazione Popolare, Appoggio Istituzionale, Relazioni Internazionali.
- Script automatizzato che gestisce la partita e aggiorna la UI.
- Pagina di configurazione interattiva per personalizzare il gioco.
- 100% client-side, senza server esterni.

## Installazione

1. Clona o [scarica](https://github.com/OrangeBaron/leviatano/archive/refs/heads/main.zip) questo repository:
   ```bash
   git clone https://github.com/OrangeBaron/leviatano.git
   ```

2. Apri Chrome e accedi a `chrome://extensions/`.

3. Attiva la modalità **Sviluppatore** in alto a destra.

4. Clicca su **"Carica estensione non pacchettizzata"** e seleziona la cartella del progetto.

5. Vai su [chatgpt.com](https://chatgpt.com) per iniziare a giocare!

6. Per personalizzare il gioco, clicca su **"Estensioni" → "Dettagli" → "Opzioni"** accanto a **Il Leviatano** per accedere alla pagina di configurazione.

## 🔧 Crea il tuo gioco!

Il vero gioco è **fare il tuo gioco**. Il Leviatano è pensato come una piattaforma flessibile: puoi trasformarlo in qualsiasi esperienza narrativa modificando pochi file, direttamente dalla **pagina di configurazione**.

Nella pagina potrai:
- Visualizzare e modificare i contenuti di `prompt_start.txt`, `prompt_normal.txt`, `prompt_end.txt`, `startingOptions.txt`, `mappings.txt`, `maxTurns.txt`, `optionsNumber.txt` e `userInterface.html`.
- Salvare le modifiche localmente (verranno usate al posto dei file originali).
- Ripristinare la configurazione predefinita in un clic.

Puoi raccontare storie fantasy, horror, sci-fi, romantiche, distopiche, o simulare situazioni aziendali, esami universitari, esplorazioni spaziali o drammi interpersonali. Le possibilità sono infinite. Basta un prompt ben scritto e una buona immaginazione.

## 🧪 Personalizzazione avanzata

Tutte le modifiche effettuate nella pagina di configurazione vengono salvate localmente. Se vuoi tornare ai file originali, premi il pulsante **“Ripristina Configurazione Predefinita”** nella stessa pagina.

Questo ti permette di sperimentare liberamente con le modifiche senza rischiare di rovinare il gioco originale.

## File Principali

- `manifest.json`: Descrive l'estensione e i permessi necessari.
- `script.js`: Contiene la logica del gioco.
- `userInterface.html`: Layout e stile dell'interfaccia di gioco.
- `config.html`: Interfaccia di configurazione per personalizzare il gioco.
- `config.js`: Script associato alla pagina di configurazione.
- `prompt_start.txt`, `prompt_normal.txt`, `prompt_end.txt`: Prompt dinamici per interazione con ChatGPT.
- `mappings.txt`, `maxTurns.txt`, `optionsNumber.txt`, `startingOptions.txt`: File di configurazione.

## Licenza

Questo progetto è distribuito sotto la **GNU General Public License v3.0 (GPLv3)**.  
Puoi usarlo, modificarlo e ridistribuirlo a patto che mantenga la stessa licenza.

Consulta il file [LICENSE](https://www.gnu.org/licenses/gpl-3.0.html) per maggiori dettagli.

---

## Crediti

Gioco ideato da **Francesco Focher**  
Estensione e codice realizzati con amore e spirito libertario.
