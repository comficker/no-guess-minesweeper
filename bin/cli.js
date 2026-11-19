#!/usr/bin/env node
import { generateNoGuess, toAscii, LEVELS, PLAY_ONLINE } from '../src/index.js'

const args = process.argv.slice(2)
const get = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : fallback
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`no-guess-minesweeper — print a Minesweeper board you can solve without guessing

Usage:
  npx no-guess-minesweeper [--level beginner|intermediate|expert] [--seed N]
  npx no-guess-minesweeper --width 20 --height 12 --mines 40 [--seed N] [--json]

Play online, free: https://minesweeperbattle.com`)
  process.exit(0)
}

const level = get('level', args.includes('--width') ? undefined : 'beginner')
if (level && !LEVELS[level]) {
  console.error(`Unknown level "${level}". Use beginner, intermediate or expert.`)
  process.exit(1)
}
const board = generateNoGuess({
  level,
  width: args.includes('--width') ? Number(get('width')) : undefined,
  height: args.includes('--height') ? Number(get('height')) : undefined,
  mines: args.includes('--mines') ? Number(get('mines')) : undefined,
  seed: Number(get('seed', Date.now() % 2 ** 32)),
})

if (args.includes('--json')) {
  console.log(JSON.stringify(board))
}
else {
  console.log(toAscii(board))
  console.log(`\n${board.width}x${board.height}, ${board.mines.length} mines, start at x=${board.start[0]} y=${board.start[1]}, seed ${board.seed}`)
  console.log(`Play ${level ?? 'custom'} minesweeper online: ${PLAY_ONLINE[level ?? 'custom']}`)
}
