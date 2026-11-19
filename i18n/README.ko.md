# no-guess-minesweeper (한국어)

**찍기 없이 논리만으로 풀 수 있는** 지뢰찾기 판을 만들고, 어떤 판이든 논리 솔버로 검사하며, **운 요소 없는 퍼즐 300개**를 JSON으로 제공합니다.

의존성 없음 · 결정적(같은 시드 → 같은 판) · 코드 MIT, 데이터 CC BY 4.0 · [영어 README](../README.md)

> 그냥 플레이하고 싶다면 [Minesweeper Battle에서 지뢰찾기 온라인 무료 플레이](https://minesweeperbattle.com/ko). 모두가 같은 판을 푸는 [데일리 지뢰찾기](https://minesweeperbattle.com/ko/daily)와 [1대1 대결](https://minesweeperbattle.com/ko/multiplayer)도 있습니다.

| 난이도 | 크기 | 지뢰 | 퍼즐 | 파일 | 온라인 플레이 |
|---|---|---|---|---|---|
| 초급 | 9×9 | 10 | 100 | `data/beginner.json` | [초급 지뢰찾기](https://minesweeperbattle.com/ko/minesweeper/beginner) |
| 중급 | 16×16 | 40 | 100 | `data/intermediate.json` | [중급 지뢰찾기](https://minesweeperbattle.com/ko/minesweeper/intermediate) |
| 고급 | 30×16 | 99 | 100 | `data/expert.json` | [고급 지뢰찾기](https://minesweeperbattle.com/ko/minesweeper/expert) |

```sh
npm install no-guess-minesweeper
npx no-guess-minesweeper --level expert --seed 2026
```

```js
import { generateNoGuess, solve } from 'no-guess-minesweeper'
const board = generateNoGuess({ level: 'intermediate', seed: 7 })
solve(board).solved // true: 논리만으로 끝까지 풀림
```

처음이라면 [지뢰찾기 하는 법](https://minesweeperbattle.com/ko/how-to-play)을 먼저 읽어 보세요.

퍼즐을 사용할 때는 출처를 남겨 주세요: *No-guess Minesweeper puzzles by [Minesweeper Battle](https://minesweeperbattle.com), CC BY 4.0*
