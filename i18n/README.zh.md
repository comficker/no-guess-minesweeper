# no-guess-minesweeper（中文）

生成**无需猜测、纯靠逻辑即可解开**的扫雷盘面，用逻辑求解器检查任意盘面，并提供 **300 道无运气成分的扫雷题**（JSON）。

零依赖 · 结果确定（同一种子得到同一盘面）· 代码 MIT，数据 CC BY 4.0 · [英文 README](../README.md)

> 只想玩？[在扫雷大战 Minesweeper Battle 在线免费玩扫雷](https://minesweeperbattle.com/zh)，还有人人同一盘的[每日扫雷](https://minesweeperbattle.com/zh/daily)和[一对一扫雷对战](https://minesweeperbattle.com/zh/multiplayer)。

| 难度 | 尺寸 | 雷数 | 题数 | 文件 | 在线玩 |
|---|---|---|---|---|---|
| 初级 | 9×9 | 10 | 100 | `data/beginner.json` | [初级扫雷](https://minesweeperbattle.com/zh/minesweeper/beginner) |
| 中级 | 16×16 | 40 | 100 | `data/intermediate.json` | [中级扫雷](https://minesweeperbattle.com/zh/minesweeper/intermediate) |
| 高级 | 30×16 | 99 | 100 | `data/expert.json` | [高级扫雷](https://minesweeperbattle.com/zh/minesweeper/expert) |

```sh
npm install no-guess-minesweeper
npx no-guess-minesweeper --level expert --seed 2026
```

```js
import { generateNoGuess, solve } from 'no-guess-minesweeper'
const board = generateNoGuess({ level: 'intermediate', seed: 7 })
solve(board).solved // true：只用推理就能解完
```

刚入门？先看[扫雷怎么玩](https://minesweeperbattle.com/zh/how-to-play)。

使用题目时请注明出处：*No-guess Minesweeper puzzles by [Minesweeper Battle](https://minesweeperbattle.com), CC BY 4.0*
