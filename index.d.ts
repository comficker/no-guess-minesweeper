export type Level = 'beginner' | 'intermediate' | 'expert'

export interface Board {
  width: number
  height: number
  /** Row-major cell indices (index = y * width + x), sorted ascending. */
  mines: number[]
  /** First click, [x, y]. Always safe. */
  start: [number, number]
  seed: number
}

export interface NoGuessBoard extends Board {
  /** How many derived seeds were tried before this one solved. */
  attempt: number
  /** Solver rounds needed to clear the board. */
  steps: number
  /** Deductions that needed the subset rule — a rough difficulty signal. */
  subsetMoves: number
}

export interface SolveResult {
  solved: boolean
  steps: number
  subsetMoves: number
  opened: number
  /** Safe cells the solver could not prove safe. Empty when solved. */
  hidden: number[]
}

export const LEVELS: Record<Level, { width: number; height: number; mines: number }>
export const PLAY_ONLINE: Record<Level | 'custom' | 'daily' | 'multiplayer', string>

export function mulberry32(seed: number): () => number
export function attemptSeed(seed: number, attempt: number): number
export function neighbors(index: number, width: number, height: number): number[]
export function createBoard(opts: {
  width: number
  height: number
  mines: number
  seed?: number
  start?: [number, number]
  safeZone?: boolean
}): Board
export function counts(board: Pick<Board, 'width' | 'height' | 'mines'>): number[]
export function toAscii(board: Pick<Board, 'width' | 'height' | 'mines'>): string
export function solve(board: Pick<Board, 'width' | 'height' | 'mines' | 'start'>): SolveResult
export function generateNoGuess(opts?: {
  level?: Level
  width?: number
  height?: number
  mines?: number
  seed?: number
  start?: [number, number]
  maxAttempts?: number
}): NoGuessBoard
