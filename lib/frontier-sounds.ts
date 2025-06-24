"use client"

class FrontierSounds {
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private isEnabled = true
  private volume = 0.3

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeSounds()
    }
  }

  private initializeSounds() {
    // Create audio elements for frontier sound effects
    this.sounds = {
      "saloon-piano": new Audio("/sounds/saloon-piano.mp3"),
      "whiskey-pour": new Audio("/sounds/whiskey-pour.mp3"),
      "wooden-thunk": new Audio("/sounds/wooden-thunk.mp3"),
      "spittoon-ping": new Audio("/sounds/spittoon-ping.mp3"),
      "coin-drop": new Audio("/sounds/coin-drop.mp3"),
      "paper-rustle": new Audio("/sounds/paper-rustle.mp3"),
      "boot-steps": new Audio("/sounds/boot-steps.mp3"),
      "door-creak": new Audio("/sounds/door-creak.mp3"),
    }

    // Set volume levels
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = this.volume
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

      // Show frontier sound indicator
      this.showSoundIndicator(soundName)
    } catch (error) {
      console.log("Sound error:", error)
    }
  }

  private showSoundIndicator(soundName: string) {
    const indicator = document.createElement("div")
    indicator.className = "frontier-sound-indicator show"
    indicator.innerHTML = `🎵 ${this.getSoundEmoji(soundName)} ${soundName}`
    document.body.appendChild(indicator)

    setTimeout(() => {
      indicator.classList.remove("show")
      setTimeout(() => {
        if (document.body.contains(indicator)) {
          document.body.removeChild(indicator)
        }
      }, 300)
    }, 2000)
  }

  private getSoundEmoji(soundName: string): string {
    const emojis: { [key: string]: string } = {
      "saloon-piano": "🎹",
      "whiskey-pour": "🥃",
      "wooden-thunk": "🪵",
      "spittoon-ping": "🎯",
      "coin-drop": "🪙",
      "paper-rustle": "📜",
      "boot-steps": "👢",
      "door-creak": "🚪",
    }
    return emojis[soundName] || "🔊"
  }

  toggle() {
    this.isEnabled = !this.isEnabled
    return this.isEnabled
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = this.volume
    })
  }

  // Play ambient saloon sounds
  startAmbientSounds() {
    if (this.isEnabled && this.sounds["saloon-piano"]) {
      this.sounds["saloon-piano"].loop = true
      this.sounds["saloon-piano"].volume = 0.1
      this.sounds["saloon-piano"].play().catch(() => {})
    }
  }

  stopAmbientSounds() {
    if (this.sounds["saloon-piano"]) {
      this.sounds["saloon-piano"].pause()
      this.sounds["saloon-piano"].currentTime = 0
    }
  }
}

export const frontierSounds = new FrontierSounds()

// Hook for using frontier sounds in components
export function useFrontierSounds() {
  return {
    playSaloonPiano: () => frontierSounds.play("saloon-piano"),
    playWhiskeyPour: () => frontierSounds.play("whiskey-pour"),
    playWoodenThunk: () => frontierSounds.play("wooden-thunk"),
    playSpittoonPing: () => frontierSounds.play("spittoon-ping"),
    playCoinDrop: () => frontierSounds.play("coin-drop"),
    playPaperRustle: () => frontierSounds.play("paper-rustle"),
    playBootSteps: () => frontierSounds.play("boot-steps"),
    playDoorCreak: () => frontierSounds.play("door-creak"),
    toggleSounds: () => frontierSounds.toggle(),
    setVolume: (volume: number) => frontierSounds.setVolume(volume),
    startAmbient: () => frontierSounds.startAmbientSounds(),
    stopAmbient: () => frontierSounds.stopAmbientSounds(),
  }
}
