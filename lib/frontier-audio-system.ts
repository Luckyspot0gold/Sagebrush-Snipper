"use client"

interface SoundEffect {
  name: string
  url: string
  volume: number
  loop?: boolean
}

class FrontierAudioSystem {
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private isEnabled = true
  private masterVolume = 0.3

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeSounds()
    }
  }

  private initializeSounds() {
    const soundEffects: SoundEffect[] = [
      { name: "saloon-piano", url: "/sounds/saloon-piano.mp3", volume: 0.2, loop: true },
      { name: "whiskey-pour", url: "/sounds/whiskey-pour.mp3", volume: 0.4 },
      { name: "wooden-thunk", url: "/sounds/wooden-thunk.mp3", volume: 0.3 },
      { name: "spittoon-ping", url: "/sounds/spittoon-ping.mp3", volume: 0.5 },
      { name: "coin-drop", url: "/sounds/coin-drop.mp3", volume: 0.4 },
      { name: "paper-rustle", url: "/sounds/paper-rustle.mp3", volume: 0.3 },
      { name: "boot-steps", url: "/sounds/boot-steps.mp3", volume: 0.3 },
      { name: "door-creak", url: "/sounds/door-creak.mp3", volume: 0.4 },
      { name: "harmonica", url: "/sounds/harmonica.mp3", volume: 0.3 },
      { name: "wind-howl", url: "/sounds/wind-howl.mp3", volume: 0.2 },
    ]

    soundEffects.forEach(({ name, url, volume, loop }) => {
      const audio = new Audio(url)
      audio.volume = volume * this.masterVolume
      audio.loop = loop || false
      audio.preload = "auto"
      this.sounds.set(name, audio)
    })
  }

  play(soundName: string, options?: { volume?: number; delay?: number }) {
    if (!this.isEnabled) return

    const sound = this.sounds.get(soundName)
    if (!sound) return

    const playSound = () => {
      try {
        sound.currentTime = 0
        if (options?.volume) {
          sound.volume = options.volume * this.masterVolume
        }
        sound.play().catch(console.warn)
        this.showSoundIndicator(soundName)
      } catch (error) {
        console.warn("Sound play failed:", error)
      }
    }

    if (options?.delay) {
      setTimeout(playSound, options.delay)
    } else {
      playSound()
    }
  }

  private showSoundIndicator(soundName: string) {
    const indicator = document.createElement("div")
    indicator.className = "frontier-sound-indicator show"
    indicator.innerHTML = `🎵 ${this.getSoundEmoji(soundName)} ${soundName.replace("-", " ")}`
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
    const emojis: Record<string, string> = {
      "saloon-piano": "🎹",
      "whiskey-pour": "🥃",
      "wooden-thunk": "🪵",
      "spittoon-ping": "🎯",
      "coin-drop": "🪙",
      "paper-rustle": "📜",
      "boot-steps": "👢",
      "door-creak": "🚪",
      harmonica: "🎵",
      "wind-howl": "💨",
    }
    return emojis[soundName] || "🔊"
  }

  startAmbientSaloon() {
    if (this.isEnabled) {
      this.play("saloon-piano")
      // Add occasional ambient sounds
      setInterval(() => {
        if (Math.random() < 0.3) {
          const ambientSounds = ["spittoon-ping", "boot-steps", "paper-rustle"]
          const randomSound = ambientSounds[Math.floor(Math.random() * ambientSounds.length)]
          this.play(randomSound, { delay: Math.random() * 5000 })
        }
      }, 15000)
    }
  }

  stopAmbient() {
    const piano = this.sounds.get("saloon-piano")
    if (piano) {
      piano.pause()
      piano.currentTime = 0
    }
  }

  toggle() {
    this.isEnabled = !this.isEnabled
    if (!this.isEnabled) {
      this.stopAmbient()
    }
    return this.isEnabled
  }

  setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    this.sounds.forEach((sound, name) => {
      const baseVolume = name === "saloon-piano" ? 0.2 : 0.4
      sound.volume = baseVolume * this.masterVolume
    })
  }
}

export const frontierAudio = new FrontierAudioSystem()

// Hook for components
export function useFrontierAudio() {
  return {
    playWelcome: () => frontierAudio.play("wooden-thunk"),
    playSuccess: () => frontierAudio.play("whiskey-pour"),
    playWarning: () => frontierAudio.play("harmonica"),
    playError: () => frontierAudio.play("wind-howl"),
    playCoinDrop: () => frontierAudio.play("coin-drop"),
    playPaperRustle: () => frontierAudio.play("paper-rustle"),
    startAmbient: () => frontierAudio.startAmbientSaloon(),
    stopAmbient: () => frontierAudio.stopAmbient(),
    toggle: () => frontierAudio.toggle(),
    setVolume: (vol: number) => frontierAudio.setVolume(vol),
  }
}
