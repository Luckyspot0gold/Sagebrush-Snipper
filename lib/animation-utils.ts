/**
 * Generates a random number between min and max
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Generates a random integer between min and max (inclusive)
 */
export function randomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Eases a value between 0 and 1 using a cubic ease-in-out function
 */
export function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Generates a random movement pattern for the bull
 */
export function generateBullMovementPattern(
  difficulty: number,
  volatility: number,
): Array<{ x: number; y: number; rotation: number }> {
  const numPoints = 20
  const pattern = []

  // Base amplitude based on difficulty and volatility
  const baseAmplitude = (difficulty / 100) * (volatility / 100) * 20

  for (let i = 0; i < numPoints; i++) {
    // Create more erratic movements as time progresses
    const timeProgression = i / numPoints
    const amplitudeMultiplier = 1 + timeProgression * 2

    pattern.push({
      x: randomBetween(-baseAmplitude, baseAmplitude) * amplitudeMultiplier,
      y: randomBetween(-baseAmplitude, baseAmplitude) * amplitudeMultiplier,
      rotation: randomBetween(-baseAmplitude / 2, baseAmplitude / 2) * amplitudeMultiplier,
    })
  }

  return pattern
}

/**
 * Calculates rider response based on skill and balance
 */
export function calculateRiderResponse(
  bullMovement: { x: number; y: number; rotation: number },
  riderSkill: number,
  riderBalance: number,
): { x: number; y: number; rotation: number } {
  // Higher skill means better compensation for bull movements
  const skillFactor = riderSkill / 100

  // Higher balance means less overcompensation
  const balanceFactor = riderBalance / 100

  // Add some randomness to the response
  const randomFactor = randomBetween(0.8, 1.2)

  return {
    x: -bullMovement.x * skillFactor * randomFactor,
    y: -bullMovement.y * skillFactor * randomFactor,
    rotation: -bullMovement.rotation * balanceFactor * randomFactor,
  }
}
