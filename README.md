# ⚠️ QUESTO PROGETTO È OBSOLETO
✅ Esiste una versione migliorata, visita [ChatGPT-GameMaker](https://github.com/OrangeBaron/ChatGPT-GameMaker)!

---

# Il Leviatano - Estensione Gioco per ChatGPT

**Il Leviatano** è un gioco politico interattivo che trasforma l'interfaccia di ChatGPT in un'avventura testuale immersiva. Il giocatore assume il ruolo di Primo Ministro e deve affrontare sfide politiche, economiche e sociali turno dopo turno. Il gioco è ispirato al concetto di libertà economica contrapposta all'interventismo statale.

## Caratteristiche

- Interfaccia utente elegante integrata in ChatGPT.
- Sistema di gioco a turni con scelte multiple.
- Generazione dinamica degli eventi e delle sfide.
- Indicatori aggiornabili: Debito Pubblico, Approvazione Popolare, Appoggio Istituzionale, Relazioni Internazionali.
- Script automatizzato che gestisce la partita e aggiorna la UI.
- Pagina di configurazione interattiva per personalizzare il gioco.
- Funzionalità di Import/Export della configurazione completa.
- 100% client-side, senza server esterni.

## Installazione

1. Clona o [scarica](https://github.com/OrangeBaron/leviatano/archive/refs/heads/main.zip) questo repository:
   ```bash
   git clone https://github.com/OrangeBaron/leviatano.git
   ```

2. Apri Chrome e accedi a `chrome://extensions/`.

3. Attiva la **"Modalità sviluppatore"** in alto a destra.

4. Clicca su **"Carica estensione non pacchettizzata"** e seleziona la cartella del progetto.

5. Vai su [chatgpt.com](https://chatgpt.com) per iniziare a giocare!

## 🔧 Crea il tuo gioco!

Il vero gioco è **fare il tuo gioco**. Il Leviatano è pensato come una piattaforma flessibile: puoi trasformarlo in qualsiasi esperienza narrativa modificando pochi file, direttamente dalla **pagina di configurazione**.

Per personalizzare il gioco, clicca su **"Gestisci estensioni" → "Dettagli" → "Opzioni estensione"** per accedere alla pagina di configurazione.

Nella pagina potrai:
- Visualizzare e modificare il contenuto di tutti i file di gioco.
- Salvare le modifiche localmente (verranno usate al posto dei file originali).
- Esportare l'intera configurazione corrente, per **condividere** la tua personalizzazione.
- Importare una configurazione di gioco esistente.
- Ripristinare la configurazione predefinita con un clic.

## 🧪 Personalizzazione avanzata

Puoi raccontare storie fantasy, horror, sci‑fi, romantiche, distopiche, o simulare situazioni aziendali, esami universitari, esplorazioni spaziali o drammi interpersonali. Le possibilità sono infinite. Basta un prompt ben scritto e una buona immaginazione.

Ogni modifica apportata nella pagina di configurazione viene salvata localmente, offrendo una base dinamica per dare forma alle tue idee creative. Inoltre, grazie alle opzioni di importazione ed esportazione, puoi salvare un gioco completo oppure importare configurazioni realizzate da altri, ampliando le possibilità narrative e stimolando la tua sperimentazione.

## 📚 Guida completa al Modding
Per una guida dettagliata su come modificare i prompt, le opzioni, l'interfaccia utente e creare la tua esperienza personalizzata, consulta la [Guida al Modding](https://github.com/OrangeBaron/leviatano/blob/main/moddingGuide.md).

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

## Crediti

Gioco ideato da **Francesco Focher**  
Estensione e codice realizzati con amore e spirito libertario.
