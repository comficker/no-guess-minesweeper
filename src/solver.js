import { counts, neighbors } from './board.js'

/**
 * Logic-only solver. It plays the board the way a careful human does and
 * never guesses, using three rules:
 *
 *  1. single cell: a number whose mines are all flagged opens its other
 *     neighbours; a number with exactly as many hidden neighbours as missing
 *     mines flags them all;
 *  2. subset: if the hidden neighbours of number A are all hidden neighbours
 *     of number B, the cells only B sees hold exactly need(B) - need(A) mines;
 *  3. mine count: when the remaining mines are 0, or equal to the hidden
 *     cells left, the rest of the board is decided.
 *
 * A board this solver clears from its start cell needs no guess at all.
 * (The converse is not guaranteed: rare boards that need longer chains of
 * reasoning are reported as unsolved, which only makes generated puzzles
 * stricter.)
 *
 * @param {{width:number,height:number,mines:number[],start:[number,number]}} board
 * @returns {{solved:boolean, steps:number, subsetMoves:number, opened:number, hidden:number[]}}
 */
export function solve(board) {
  const { width, height } = board
  const total = width * height
  const grid = counts(board)
  const isMine = new Uint8Array(total)
  for (const m of board.mines) isMine[m] = 1
  const open = new Uint8Array(total)
  const flag = new Uint8Array(total)
  let opened = 0
  let flagged = 0
  const safeCells = total - board.mines.length

  const reveal = (start) => {
    if (open[start] || flag[start]) return
    if (isMine[start]) throw new Error('solver opened a mine: board data is inconsistent')
    const stack = [start]
    open[start] = 1
    opened++
    while (stack.length) {
      const c = stack.pop()
      if (grid[c] !== 0) continue
      for (const n of neighbors(c, width, height)) {
        if (!open[n] && !flag[n]) {
          open[n] = 1
          opened++
          stack.push(n)
        }
      }
    }
  }
  const mark = (c) => {
    if (!flag[c] && !open[c]) {
      flag[c] = 1
      flagged++
    }
  }

  const [sx, sy] = board.start
  reveal(sy * width + sx)

  let steps = 0
  let subsetMoves = 0
  for (;;) {
    if (opened === safeCells) break
    let progress = false
    // Frontier constraints: each open number that still touches hidden cells.
    const constraints = []
    for (let c = 0; c < total; c++) {
      if (!open[c] || grid[c] <= 0) continue
      const hidden = []
      let flags = 0
      for (const n of neighbors(c, width, height)) {
        if (flag[n]) flags++
        else if (!open[n]) hidden.push(n)
      }
      if (hidden.length) constraints.push({ cell: c, hidden, need: grid[c] - flags })
    }

    // Rule 1
    for (const { hidden, need } of constraints) {
      if (need === 0) {
        hidden.forEach(reveal)
        progress = true
      }
      else if (need === hidden.length) {
        hidden.forEach(mark)
        progress = true
      }
    }

    // Rule 2 (only when rule 1 is stuck, so the move count means something)
    if (!progress) {
      outer: for (const a of constraints) {
        const aSet = new Set(a.hidden)
        for (const b of constraints) {
          if (a === b || b.hidden.length <= a.hidden.length) continue
          if (!a.hidden.every(h => b.hidden.includes(h))) continue
          const rest = b.hidden.filter(h => !aSet.has(h))
          const restMines = b.need - a.need
          if (restMines === 0) rest.forEach(reveal)
          else if (restMines === rest.length) rest.forEach(mark)
          else continue
          subsetMoves++
          progress = true
          break outer
        }
      }
    }

    // Rule 3
    if (!progress) {
      const left = board.mines.length - flagged
      const hiddenCells = []
      for (let c = 0; c < total; c++) if (!open[c] && !flag[c]) hiddenCells.push(c)
      if (left === 0) {
        hiddenCells.forEach(reveal)
        progress = true
      }
      else if (left === hiddenCells.length) {
        hiddenCells.forEach(mark)
        progress = true
      }
    }

    if (!progress) break
    steps++
  }

  const hidden = []
  for (let c = 0; c < total; c++) if (!open[c] && !isMine[c]) hidden.push(c)
  return { solved: opened === safeCells, steps, subsetMoves, opened, hidden }
}
