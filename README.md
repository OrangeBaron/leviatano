# Il Leviatano - Estensione Gioco per ChatGPT

**Il Leviatano** è un gioco politico interattivo che trasforma l'interfaccia di ChatGPT in un'avventura testuale immersiva. Il giocatore assume il ruolo di Primo Ministro e deve affrontare sfide politiche, economiche e sociali turno dopo turno. Il gioco è ispirato al concetto di libertà economica contrapposta all'interventismo statale.

## Caratteristiche

- Interfaccia utente elegante integrata in ChatGPT.
- Sistema di gioco a turni con scelte multiple.
- Generazione dinamica degli eventi e delle sfide.
- Indicatori aggiornabili: Debito Pubblico, Approvazione Popolare, Appoggio Istituzionale, Relazioni Internazionali.
- Script automatizzato che gestisce la partita e aggiorna la UI.
- 100% client-side, senza server esterni.

## Installazione

1. Clona o scarica questo repository:
   ```bash
   git clone https://github.com/OrangeBaron/leviatano.git
   ```

2. Apri Chrome e accedi a `chrome://extensions/`.

3. Attiva la modalità **Sviluppatore** in alto a destra.

4. Clicca su **"Carica estensione non pacchettizzata"** e seleziona la cartella del progetto.

5. Vai su [https://chatgpt.com](https://chatgpt.com) per iniziare a giocare!

## 🔧 Crea il tuo gioco!

Il vero gioco è **fare il tuo gioco**. Il Leviatano è pensato come una piattaforma flessibile: puoi trasformarlo in qualsiasi esperienza narrativa modificando pochi file.

Ecco come:

- **userInterface.html**: modifica la grafica e il testo dell’interfaccia utente.
- **prompt_start.txt**, **prompt_normal.txt**, **prompt_end.txt**: cambia la logica narrativa dei prompt.
- **startingOptions.txt**: scegli le opzioni iniziali.
- **mappings.txt**: definisci come i dati del prompt aggiornano l’interfaccia.
- **maxTurns.txt** e **optionsNumber.txt**: personalizza durata e numero di scelte.

Puoi raccontare storie fantasy, horror, sci-fi, romantiche, distopiche, o simulare situazioni aziendali, esami universitari, esplorazioni spaziali o drammi interpersonali. Le possibilità sono infinite. Basta un prompt ben scritto e una buona immaginazione.

## File Principali

- `manifest.json`: Descrive l'estensione e i permessi necessari.
- `script.js`: Contiene la logica del gioco.
- `userInterface.html`: Layout e stile dell'interfaccia di gioco.
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
