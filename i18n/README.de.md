# no-guess-minesweeper (Deutsch)

Erzeugt Minesweeper-Felder, die sich **ganz ohne Raten** lösen lassen, prüft beliebige Felder mit einem Logik-Solver und liefert **300 fertige Rätsel ohne Glücksfall** als JSON.

Keine Abhängigkeiten · deterministisch (gleicher Seed, gleiches Feld) · Code MIT, Daten CC BY 4.0 · [englisches README](../README.md)

> Einfach spielen? [Minesweeper online kostenlos spielen bei Minesweeper Battle](https://minesweeperbattle.com/de), mit einem [täglichen Minesweeper](https://minesweeperbattle.com/de/daily), das für alle gleich ist, und [1-gegen-1-Rennen](https://minesweeperbattle.com/de/multiplayer).

| Stufe | Größe | Minen | Rätsel | Datei | Online spielen |
|---|---|---|---|---|---|
| Anfänger | 9×9 | 10 | 100 | `data/beginner.json` | [Minesweeper Anfänger](https://minesweeperbattle.com/de/minesweeper/beginner) |
| Fortgeschritten | 16×16 | 40 | 100 | `data/intermediate.json` | [Minesweeper Fortgeschritten](https://minesweeperbattle.com/de/minesweeper/intermediate) |
| Experte | 30×16 | 99 | 100 | `data/expert.json` | [Minesweeper Experte](https://minesweeperbattle.com/de/minesweeper/expert) |

```sh
npm install no-guess-minesweeper
npx no-guess-minesweeper --level expert --seed 2026
```

```js
import { generateNoGuess, solve } from 'no-guess-minesweeper'
const feld = generateNoGuess({ level: 'intermediate', seed: 7 })
solve(feld).solved // true: allein mit Logik lösbar
```

Neu dabei? Hier steht, [wie man Minesweeper spielt](https://minesweeperbattle.com/de/how-to-play).

Wer die Rätsel nutzt, nennt bitte: *No-guess Minesweeper puzzles by [Minesweeper Battle](https://minesweeperbattle.com), CC BY 4.0*.
