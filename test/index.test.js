import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createBoard, counts, generateNoGuess, solve, LEVELS, neighbors } from '../src/index.js'

test('createBoard is deterministic and keeps the start area clear', () => {
  const a = createBoard({ width: 9, height: 9, mines: 10, seed: 42, start: [0, 0] })
  const b = createBoard({ width: 9, height: 9, mines: 10, seed: 42, start: [0, 0] })
  assert.deepEqual(a, b)
  assert.equal(new Set(a.mines).size, 10)
  for (const c of [0, ...neighbors(0, 9, 9)]) assert.ok(!a.mines.includes(c))
})

test('counts match a brute-force count', () => {
  const b = createBoard({ width: 16, height: 16, mines: 40, seed: 3 })
  const g = counts(b)
  for (let i = 0; i < g.length; i++) {
    if (b.mines.includes(i)) assert.equal(g[i], -1)
    else assert.equal(g[i], neighbors(i, 16, 16).filter(n => b.mines.includes(n)).length)
  }
})

test('solver clears an obviously safe board and never opens a mine', () => {
  // one mine in a corner, start far away: plain flood + rule 3
  const r = solve({ width: 5, height: 5, mines: [0], start: [4, 4] })
  assert.equal(r.solved, true)
  for (let s = 1; s <= 300; s++) {
    // throws if it ever reveals a mine
    solve(createBoard({ width: 9, height: 9, mines: 10, seed: s }))
  }
})

test('solver reports a forced 50/50 as unsolved', () => {
  //   ? 1 .
  //   ? 1 .     one mine in the left column, both numbers see both cells
  const r = solve({ width: 3, height: 2, mines: [3], start: [2, 0] })
  assert.equal(r.solved, false)
  assert.deepEqual(r.hidden, [0])
})

test('generateNoGuess returns solvable boards for every level', () => {
  for (const level of Object.keys(LEVELS)) {
    const b = generateNoGuess({ level, seed: 11 })
    assert.equal(b.mines.length, LEVELS[level].mines)
    assert.equal(solve(b).solved, true)
  }
})

test('bundled puzzle files are valid and solvable', () => {
  const index = JSON.parse(readFileSync(new URL('../data/index.json', import.meta.url)))
  for (const f of index.files) {
    const data = JSON.parse(readFileSync(new URL(`../${f.path}`, import.meta.url)))
    assert.equal(data.puzzles.length, f.count)
    assert.match(data.minesweeperbattle, /^https:\/\/minesweeperbattle\.com\//)
    for (const p of data.puzzles.slice(0, 20)) {
      const r = solve({ width: data.width, height: data.height, mines: p.mines, start: p.start })
      assert.equal(r.solved, true, p.id)
    }
  }
})
