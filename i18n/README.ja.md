# no-guess-minesweeper（日本語）

**運に頼らず論理だけで解ける**マインスイーパーの盤面を生成し、任意の盤面を論理ソルバーで判定し、**運要素なしのパズル300問**を JSON で提供します。

依存なし・決定的（同じシードなら同じ盤面）・コードは MIT、データは CC BY 4.0 ・ [英語の README](../README.md)

> 遊ぶだけなら [Minesweeper Battle でマインスイーパーをオンライン無料プレイ](https://minesweeperbattle.com/ja)。全員が同じ盤面に挑む[デイリーマインスイーパー](https://minesweeperbattle.com/ja/daily)や[1対1の対戦](https://minesweeperbattle.com/ja/multiplayer)もあります。

| レベル | サイズ | 地雷 | 問題数 | ファイル | オンラインで遊ぶ |
|---|---|---|---|---|---|
| 初級 | 9×9 | 10 | 100 | `data/beginner.json` | [初級マインスイーパー](https://minesweeperbattle.com/ja/minesweeper/beginner) |
| 中級 | 16×16 | 40 | 100 | `data/intermediate.json` | [中級マインスイーパー](https://minesweeperbattle.com/ja/minesweeper/intermediate) |
| 上級 | 30×16 | 99 | 100 | `data/expert.json` | [上級マインスイーパー](https://minesweeperbattle.com/ja/minesweeper/expert) |

```sh
npm install no-guess-minesweeper
npx no-guess-minesweeper --level expert --seed 2026
```

```js
import { generateNoGuess, solve } from 'no-guess-minesweeper'
const board = generateNoGuess({ level: 'intermediate', seed: 7 })
solve(board).solved // true：推理だけで最後まで解ける
```

初めての方は[マインスイーパーの遊び方](https://minesweeperbattle.com/ja/how-to-play)をどうぞ。

パズルを使う場合はクレジットをお願いします：*No-guess Minesweeper puzzles by [Minesweeper Battle](https://minesweeperbattle.com), CC BY 4.0*
