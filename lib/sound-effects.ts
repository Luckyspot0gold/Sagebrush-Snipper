"use client"

class SoundEffects {
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private isEnabled = true

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeSounds()
    }
  }

  private initializeSounds() {
    // Create audio elements for different sound effects
    this.sounds = {
      pageFlip: new Audio("/sounds/page-flip.mp3"),
      inkDrop: new Audio("/sounds/ink-drop.mp3"),
      typewriter: new Audio("/sounds/typewriter.mp3"),
      waxSeal: new Audio("/sounds/wax-seal.mp3"),
      coinDrop: new Audio("/sounds/coin-drop.mp3"),
      paperRustle: new Audio("/sounds/paper-rustle.mp3"),
      steamHiss: new Audio("/sounds/steam-hiss.mp3"),
      gearTurn: new Audio("/sounds/gear-turn.mp3"),
    }

    // Set volume levels
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = 0.3
      sound.preload = "auto"
    })
  }

  play(soundName: string) {
    if (!this.isEnabled || !this.sounds[soundName]) return

    try {
      this.sounds[soundName].currentTime = 0
      this.sounds[soundName].play().catch((e) => {
        console.log("Sound play failed:", e)
      })

      // Show sound indicator
      this.showSoundIndicator(soundName)
    } catch (error) {
      console.log("Sound error:", error)
    }
  }

  private showSoundIndicator(soundName: string) {
    const indicator = document.createElement("div")
    indicator.className = "sound-indicator show"
    indicator.textContent = `♪ ${soundName}`
    document.body.appendChild(indicator)

    setTimeout(() => {
      indicator.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(indicator)
      }, 300)
    }, 1000)
  }

  toggle() {
    this.isEnabled = !this.isEnabled
    return this.isEnabled
  }

  setVolume(volume: number) {
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = Math.max(0, Math.min(1, volume))
    })
  }
}

export const soundEffects = new SoundEffects()

// Hook for using sound effects in components
export function useSoundEffects() {
  return {
    playPageFlip: () => soundEffects.play("pageFlip"),
    playInkDrop: () => soundEffects.play("inkDrop"),
    playTypewriter: () => soundEffects.play("typewriter"),
    playWaxSeal: () => soundEffects.play("waxSeal"),
    playCoinDrop: () => soundEffects.play("coinDrop"),
    playPaperRustle: () => soundEffects.play("paperRustle"),
    playSteamHiss: () => soundEffects.play("steamHiss"),
    playGearTurn: () => soundEffects.play("gearTurn"),
    toggleSounds: () => soundEffects.toggle(),
    setVolume: (volume: number) => soundEffects.setVolume(volume),
  }
}
