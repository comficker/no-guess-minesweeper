# no-guess-minesweeper (Español)

Genera tableros de Buscaminas que se resuelven **sin adivinar nunca**, comprueba cualquier tablero con un solucionador lógico y usa **300 puzzles sin azar** listos en JSON.

Sin dependencias · determinista (misma semilla, mismo tablero) · código MIT, datos CC BY 4.0 · [README en inglés](../README.md)

> ¿Solo quieres jugar? [Juega al buscaminas online gratis en Minesweeper Battle](https://minesweeperbattle.com/es), con un [buscaminas diario](https://minesweeperbattle.com/es/daily) igual para todos y [partidas 1 contra 1](https://minesweeperbattle.com/es/multiplayer).

| Nivel | Tamaño | Minas | Puzzles | Archivo | Jugar online |
|---|---|---|---|---|---|
| Principiante | 9×9 | 10 | 100 | `data/beginner.json` | [Buscaminas principiante](https://minesweeperbattle.com/es/minesweeper/beginner) |
| Intermedio | 16×16 | 40 | 100 | `data/intermediate.json` | [Buscaminas intermedio](https://minesweeperbattle.com/es/minesweeper/intermediate) |
| Experto | 30×16 | 99 | 100 | `data/expert.json` | [Buscaminas experto](https://minesweeperbattle.com/es/minesweeper/expert) |

```sh
npm install no-guess-minesweeper
npx no-guess-minesweeper --level expert --seed 2026
```

```js
import { generateNoGuess, solve } from 'no-guess-minesweeper'
const tablero = generateNoGuess({ level: 'intermediate', seed: 7 })
solve(tablero).solved // true: se termina solo con lógica
```

¿Eres nuevo? Lee [cómo jugar al buscaminas](https://minesweeperbattle.com/es/how-to-play).

Si usas los puzzles, cita: *No-guess Minesweeper puzzles by [Minesweeper Battle](https://minesweeperbattle.com), CC BY 4.0*.
