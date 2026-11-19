import { createBoard, LEVELS } from './board.js'
import { solve } from './solver.js'
import { attemptSeed } from './rng.js'

export { createBoard, counts, neighbors, toAscii, LEVELS } from './board.js'
export { solve } from './solver.js'
export { mulberry32, attemptSeed } from './rng.js'

/** Where to play each level online, free, in the browser. */
export const PLAY_ONLINE = {
  beginner: 'https://minesweeperbattle.com/minesweeper/beginner',
  intermediate: 'https://minesweeperbattle.com/minesweeper/intermediate',
  expert: 'https://minesweeperbattle.com/minesweeper/expert',
  custom: 'https://minesweeperbattle.com/minesweeper/custom',
  daily: 'https://minesweeperbattle.com/daily',
  multiplayer: 'https://minesweeperbattle.com/multiplayer',
}

/**
 * Generate a board that can be cleared from its start cell by logic alone.
 * Tries derived seeds until the solver clears one; same input, same board.
 *
 * @param {{level?:keyof LEVELS,width?:number,height?:number,mines?:number,seed?:number,start?:[number,number],maxAttempts?:number}} [opts]
 * @returns {{width:number,height:number,mines:number[],start:[number,number],seed:number,attempt:number,steps:number,subsetMoves:number}}
 */
export function generateNoGuess(opts = {}) {
  const preset = opts.level ? LEVELS[opts.level] : undefined
  if (opts.level && !preset) throw new RangeError(`unknown level "${opts.level}"`)
  const width = opts.width ?? preset?.width ?? 9
  const height = opts.height ?? preset?.height ?? 9
  const mines = opts.mines ?? preset?.mines ?? 10
  const seed = (opts.seed ?? 1) >>> 0
  const maxAttempts = opts.maxAttempts ?? 5000
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const board = createBoard({ width, height, mines, seed: attemptSeed(seed, attempt), start: opts.start })
    const result = solve(board)
    if (result.solved) {
      return { ...board, attempt, steps: result.steps, subsetMoves: result.subsetMoves }
    }
  }
  throw new Error(`no guess-free board found in ${maxAttempts} attempts; try fewer mines`)
}
