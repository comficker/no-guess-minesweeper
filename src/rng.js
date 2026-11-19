/**
 * Mulberry32: a small, fast, deterministic PRNG.
 * The same seed always yields the same sequence, on every platform.
 *
 * @param {number} seed 32-bit integer seed
 * @returns {() => number} function returning floats in [0, 1)
 */
export function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Derive the seed for retry number `attempt` from a base seed, so a
 * generator that has to try several layouts stays reproducible.
 */
export function attemptSeed(seed, attempt) {
  return (Math.imul((seed >>> 0) ^ attempt, 0x9e3779b1) + attempt) >>> 0
}
