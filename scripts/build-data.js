// Regenerates data/*.json. Deterministic: same code, same files.
// Run: node scripts/build-data.js
import { writeFileSync, mkdirSync } from 'node:fs'
import { generateNoGuess, LEVELS, PLAY_ONLINE } from '../src/index.js'

const PER_LEVEL = 100
const CREDIT = 'No-guess Minesweeper puzzles by Minesweeper Battle (https://minesweeperbattle.com), CC BY 4.0'
const out = new URL('../data/', import.meta.url)
mkdirSync(out, { recursive: true })

const rating = (subsetMoves) => (subsetMoves === 0 ? 'easy' : subsetMoves <= 3 ? 'medium' : 'hard')

const index = {
  name: 'no-guess-minesweeper puzzle set',
  description: 'Minesweeper boards that can be cleared from the given start cell by logic alone, no guessing.',
  license: 'CC-BY-4.0',
  credit: CREDIT,
  minesweeperbattle: 'https://minesweeperbattle.com',
  files: [],
}

for (const [level, size] of Object.entries(LEVELS)) {
  const puzzles = []
  for (let i = 1; puzzles.length < PER_LEVEL; i++) {
    const b = generateNoGuess({ level, seed: i * 7919 })
    puzzles.push({
      id: `${level}-${String(puzzles.length + 1).padStart(3, '0')}`,
      seed: b.seed,
      start: b.start,
      mines: b.mines,
      steps: b.steps,
      subsetMoves: b.subsetMoves,
      difficulty: rating(b.subsetMoves),
    })
  }
  const file = {
    level,
    ...size,
    count: puzzles.length,
    format: 'Cells are row-major indices: index = y * width + x. "start" is [x, y] of the first click.',
    minesweeperbattle: PLAY_ONLINE[level],
    license: 'CC-BY-4.0',
    credit: CREDIT,
    puzzles,
  }
  writeFileSync(new URL(`${level}.json`, out), JSON.stringify(file) + '\n')
  const tally = puzzles.reduce((t, p) => ({ ...t, [p.difficulty]: (t[p.difficulty] ?? 0) + 1 }), {})
  index.files.push({ level, path: `data/${level}.json`, ...size, count: puzzles.length, difficulty: tally, minesweeperbattle: PLAY_ONLINE[level] })
  console.log(level, puzzles.length, tally)
}
writeFileSync(new URL('index.json', out), JSON.stringify(index, null, 2) + '\n')
