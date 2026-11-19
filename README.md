# no-guess-minesweeper

Generate Minesweeper boards you can clear **without a single guess**, check any board with a small logic solver, and use **300 ready-made no-guess puzzles** in plain JSON.

Zero dependencies · deterministic (same seed, same board) · Node 18+ and browsers · MIT code, CC BY 4.0 data

[English](README.md) · [Español](i18n/README.es.md) · [Deutsch](i18n/README.de.md) · [日本語](i18n/README.ja.md) · [한국어](i18n/README.ko.md) · [中文](i18n/README.zh.md)

> Just want to play? [Play minesweeper online free at Minesweeper Battle](https://minesweeperbattle.com): classic levels, a [daily minesweeper board](https://minesweeperbattle.com/daily) that is the same for everyone, and [1v1 minesweeper races](https://minesweeperbattle.com/multiplayer).

## Why

Classic random Minesweeper sometimes ends in a 50/50 that no number can settle. That is fine for casual play and frustrating for puzzles, speedruns, tutorials and AI benchmarks. This package only hands out boards that a careful player can finish from the first click by deduction alone.

## Puzzle set

| Level | Size | Mines | Puzzles | easy / medium / hard | File | Play this level online |
|---|---|---|---|---|---|---|
| Beginner | 9×9 | 10 | 100 | 73 / 25 / 2 | [`data/beginner.json`](data/beginner.json) | [Beginner minesweeper online](https://minesweeperbattle.com/minesweeper/beginner) |
| Intermediate | 16×16 | 40 | 100 | 47 / 44 / 9 | [`data/intermediate.json`](data/intermediate.json) | [Intermediate minesweeper online](https://minesweeperbattle.com/minesweeper/intermediate) |
| Expert | 30×16 | 99 | 100 | 3 / 28 / 69 | [`data/expert.json`](data/expert.json) | [Expert minesweeper online](https://minesweeperbattle.com/minesweeper/expert) |
| Custom | any | any | generate | — | `generateNoGuess()` | [Custom minesweeper board](https://minesweeperbattle.com/minesweeper/custom) |

Difficulty is the number of times the solver needed the subset rule (0 = easy, 1–3 = medium, 4+ = hard). Every puzzle starts at the centre cell and is checked by the test suite.

Each puzzle looks like this:

```json
{ "id": "beginner-001", "seed": 906844735, "start": [4, 4], "mines": [2, 7, 17, 20, 21, 27, 38, 51, 56, 70],
  "steps": 8, "subsetMoves": 0, "difficulty": "easy" }
```

Cells are row-major indices: `index = y * width + x`.

## Install

```sh
npm install no-guess-minesweeper
```

## Use

```js
import { generateNoGuess, solve, toAscii } from 'no-guess-minesweeper'

const board = generateNoGuess({ level: 'expert', seed: 2026 })
console.log(toAscii(board))        // '*' mine, '.' blank, digits = counts
console.log(board.start)           // [x, y] of the safe first click

// check any board, e.g. one from your own game
const result = solve({ width: 9, height: 9, mines: [0, 10, 20], start: [8, 8] })
result.solved   // true when no guess is ever needed
result.hidden   // safe cells logic could not reach (the 50/50s)
```

Load the bundled puzzles:

```js
import expert from 'no-guess-minesweeper/data/expert.json' with { type: 'json' }
```

Or straight from a CDN: `https://cdn.jsdelivr.net/npm/no-guess-minesweeper/data/expert.json`

### CLI

```sh
npx no-guess-minesweeper --level intermediate --seed 5
npx no-guess-minesweeper --width 20 --height 12 --mines 40 --json
```

## API

| Function | What it does |
|---|---|
| `generateNoGuess({ level \| width, height, mines, seed?, start? })` | A board solvable from `start` (default: centre) by logic alone |
| `solve(board)` | Plays the board with the three rules below; reports `solved`, `steps`, `subsetMoves`, `hidden` |
| `createBoard({ width, height, mines, seed?, start?, safeZone? })` | Plain random board with a safe 3×3 opening |
| `counts(board)` / `toAscii(board)` | Number grid / text picture |
| `LEVELS`, `PLAY_ONLINE` | Classic sizes and where to play each one online |
| `mulberry32(seed)` | The seeded PRNG used everywhere |

## How the solver works

Three rules, applied until nothing changes: single-cell counting, the subset rule, and the global mine count. Details and limits in [ALGORITHM.md](ALGORITHM.md). New to the game? Read [how to play minesweeper](https://minesweeperbattle.com/how-to-play) and the [minesweeper strategy guide](https://minesweeperbattle.com/blog/minesweeper-strategy-guide).

## Credit and license

- Code: MIT ([LICENSE](LICENSE)).
- Puzzle data in `data/`: [CC BY 4.0](LICENSE-DATA). If you use the puzzles, please credit:
  > No-guess Minesweeper puzzles by [Minesweeper Battle](https://minesweeperbattle.com), CC BY 4.0

Found a wrong board or want another size? [Open an issue](https://github.com/comficker/no-guess-minesweeper/issues).

Made by the team behind [Minesweeper Battle](https://minesweeperbattle.com), a free online minesweeper with daily boards and live 1v1 races.
