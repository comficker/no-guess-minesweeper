# How no-guess-minesweeper decides a board needs no guess

## Generating

1. Lay the mines with a seeded PRNG (Mulberry32), never on the start cell or the 8 cells around it, so the first click always opens an area.
2. Run the solver from the start cell.
3. If it clears the board, return it. If not, derive the next seed (`attemptSeed(seed, attempt)`) and try again. The search is deterministic, so `generateNoGuess({ seed })` always returns the same board.

Typical cost on a laptop: beginner ~1 try, intermediate ~2 tries, expert ~15 tries (about 10 ms).

## Solving

The solver keeps a set of open cells and flags, and repeats three rules until none of them makes progress:

1. **Single cell.** For each open number, `need = number − flags around it`. If `need` is 0, every other hidden neighbour is safe. If `need` equals the number of hidden neighbours, they are all mines.
2. **Subset.** If every hidden neighbour of number A is also a hidden neighbour of number B, then the cells only B can see contain exactly `need(B) − need(A)` mines. When that is 0 they are safe; when it equals their count they are mines. This is how players read the classic 1-2 and 1-1 patterns.
3. **Mine count.** When the mines left are 0, or equal to the hidden cells left, the rest of the board is decided.

If the board is fully opened, no guess was ever needed.

## Limits

- The rules are sound: every move the solver makes is forced, so a "solved" board is truly guess-free.
- They are not complete: a few boards need longer chains of reasoning (or full enumeration of the frontier) that this solver does not try. Those boards are reported as unsolved and simply skipped by the generator, so generated puzzles are, if anything, a little easier than the full set of guess-free boards.
- `subsetMoves` is a rough difficulty signal, not a human solve-time estimate.

## Further reading

- Rules and first moves: [how to play minesweeper](https://minesweeperbattle.com/how-to-play)
- Patterns in practice: [minesweeper strategy guide](https://minesweeperbattle.com/blog/minesweeper-strategy-guide)
- Try the levels the puzzle set uses: [beginner](https://minesweeperbattle.com/minesweeper/beginner), [intermediate](https://minesweeperbattle.com/minesweeper/intermediate), [expert](https://minesweeperbattle.com/minesweeper/expert)
