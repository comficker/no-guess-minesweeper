import { mulberry32 } from './rng.js'

/** Classic difficulty presets (Windows Minesweeper sizes). */
export const LEVELS = {
  beginner: { width: 9, height: 9, mines: 10 },
  intermediate: { width: 16, height: 16, mines: 40 },
  expert: { width: 30, height: 16, mines: 99 },
}

/** Indices of the up-to-8 cells around `i` on a width×height grid. */
export function neighbors(i, width, height) {
  const x = i % width
  const y = (i - x) / width
  const out = []
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue
      const nx = x + dx
      const ny = y + dy
      if (nx >= 0 && ny >= 0 && nx < width && ny < height) out.push(ny * width + nx)
    }
  }
  return out
}

/**
 * Lay mines at random, keeping the start cell (and, when possible, its whole
 * 3×3 neighbourhood) clear so the first click opens an area.
 *
 * @param {{width:number,height:number,mines:number,seed?:number,start?:[number,number],safeZone?:boolean}} opts
 * @returns {{width:number,height:number,mines:number[],start:[number,number],seed:number}}
 */
export function createBoard({ width, height, mines, seed = 1, start, safeZone = true }) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 2 || height < 2) {
    throw new RangeError('width and height must be integers >= 2')
  }
  const total = width * height
  const [sx, sy] = start ?? [Math.floor(width / 2), Math.floor(height / 2)]
  const startIndex = sy * width + sx
  const clear = new Set([startIndex])
  if (safeZone) {
    const zone = neighbors(startIndex, width, height)
    if (total - zone.length - 1 >= mines) zone.forEach(i => clear.add(i))
  }
  if (mines < 0 || mines > total - clear.size) {
    throw new RangeError(`cannot place ${mines} mines on ${width}x${height} with a safe start`)
  }
  // Partial Fisher–Yates over the cells that may hold a mine.
  const pool = []
  for (let i = 0; i < total; i++) if (!clear.has(i)) pool.push(i)
  const rng = mulberry32(seed)
  for (let k = 0; k < mines; k++) {
    const j = k + Math.floor(rng() * (pool.length - k))
    const tmp = pool[k]
    pool[k] = pool[j]
    pool[j] = tmp
  }
  return { width, height, mines: pool.slice(0, mines).sort((a, b) => a - b), start: [sx, sy], seed: seed >>> 0 }
}

/**
 * Number grid for a board: -1 for a mine, otherwise the count of adjacent mines.
 * @returns {number[]} row-major array of length width*height
 */
export function counts(board) {
  const { width, height } = board
  const grid = new Array(width * height).fill(0)
  for (const m of board.mines) grid[m] = -1
  for (const m of board.mines) {
    for (const n of neighbors(m, width, height)) if (grid[n] !== -1) grid[n]++
  }
  return grid
}

/** Plain-text picture of a board: `*` mine, `.` blank, digits otherwise. */
export function toAscii(board) {
  const grid = counts(board)
  const rows = []
  for (let y = 0; y < board.height; y++) {
    let row = ''
    for (let x = 0; x < board.width; x++) {
      const v = grid[y * board.width + x]
      row += v === -1 ? '*' : v === 0 ? '.' : String(v)
    }
    rows.push(row)
  }
  return rows.join('\n')
}
