// 🔊 Wyoming Sound Effects System
export class WyomingSoundEffects {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeAudio();
    }
  }

  private async initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await this.loadSounds();
    } catch (error) {
      console.warn('🔇 Audio not available:', error);
      this.enabled = false;
    }
  }

  private async loadSounds() {
    const soundFiles = {
      'trade_success': this.generateTone(800, 0.2, 'sine'),
      'trade_fail': this.generateTone(200, 0.3, 'sawtooth'),
      'button_click': this.generateTone(600, 0.1, 'square'),
      'notification': this.generateTone(1000, 0.15, 'triangle'),
      'cowboy_whistle': this.generateWhistle(),
      'cash_register': this.generateCashRegister(),
      'horse_gallop': this.generateGallop(),
      'wind_howl': this.generateWind()
    };

    for (const [name, audioBuffer] of Object.entries(soundFiles)) {
      this.sounds.set(name, audioBuffer);
    }
  }

  private generateTone(frequency: number, duration: number, type: OscillatorType): AudioBuffer {
    if (!this.audioContext) throw new Error('No audio context');
    
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      let value = 0;

      switch (type) {
        case 'sine':
          value = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'square':
          value = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1;
          break;
        case 'sawtooth':
          value = 2 * (t * frequency - Math.floor(t * frequency + 0.5));
          break;
        case 'triangle':
          value = 2 * Math.abs(2 * (t * frequency - Math.floor(t * frequency + 0.5))) - 1;
          break;
      }

      // Apply envelope
      const envelope = Math.exp(-t * 3);
      data[i] = value * envelope * 0.1;
    }

    return buffer;
  }

  private generateWhistle(): AudioBuffer {
    if (!this.audioContext) throw new Error('No audio context');
    
    const duration = 0.8;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const frequency = 800 + 400 * Math.sin(t * 4); // Sliding whistle
      const value = Math.sin(2 * Math.PI * frequency * t);
      const envelope = Math.exp(-t * 2);
      data[i] = value * envelope * 0.15;
    }

    return buffer;
  }

  private generateCashRegister(): AudioBuffer {
    if (!this.audioContext) throw new Error('No audio context');
    
    const duration = 0.5;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      let value = 0;
      
      // Multiple tones for cash register effect
      value += Math.sin(2 * Math.PI * 1200 * t) * 0.3;
      value += Math.sin(2 * Math.PI * 800 * t) * 0.2;
      value += Math.random() * 0.1; // Mechanical noise
      
      const envelope = t < 0.1 ? t * 10 : Math.exp(-(t - 0.1) * 8);
      data[i] = value * envelope * 0.2;
    }

    return buffer;
  }

  private generateGallop(): AudioBuffer {
    if (!this.audioContext) throw new Error('No audio context');
    
    const duration = 1.0;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const beatFreq = 4; // 4 beats per second
      const beat = Math.floor(t * beatFreq) % 2;
      
      let value = 0;
      if (beat === 0) {
        value = Math.sin(2 * Math.PI * 100 * t) * Math.exp(-((t % 0.25) * 20));
      }
      
      data[i] = value * 0.3;
    }

    return buffer;
  }

  private generateWind(): AudioBuffer {
    if (!this.audioContext) throw new Error('No audio context');
    
    const duration = 2.0;
    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      let value = (Math.random() - 0.5) * 2; // White noise
      
      // Low-pass filter for wind effect
      const cutoff = 200 + 100 * Math.sin(t * 0.5);
      value = value * Math.exp(-t * 0.1);
      
      data[i] = value * 0.1;
    }

    return buffer;
  }

  public play(soundName: string, volume: number = 1.0) {
    if (!this.enabled || !this.audioContext || !this.sounds.has(soundName)) {
      return;
    }

    try {
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = this.sounds.get(soundName)!;
      gainNode.gain.value = Math.min(volume, 1.0);
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start();
    } catch (error) {
      console.warn('🔇 Failed to play sound:', error);
    }
  }

  public playTradeSuccess() {
    this.play('trade_success');
    setTimeout(() => this.play('cash_register'), 200);
  }

  public playTradeFail() {
    this.play('trade_fail');
  }

  public playButtonClick() {
    this.play('button_click', 0.5);
  }

  public playNotification() {
    this.play('notification');
  }

  public playCowboyWhistle() {
    this.play('cowboy_whistle');
  }

  public playHorseGallop() {
    this.play('horse_gallop');
  }

  public playWindHowl() {
    this.play('wind_howl', 0.3);
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }
}

// Global instance
export const wyomingSounds = new WyomingSoundEffects();

// React hook for easy integration
export function useWyomingSounds() {
  return {
    playTradeSuccess: () => wyomingSounds.playTradeSuccess(),
    playTradeFail: () => wyomingSounds.playTradeFail(),
    playButtonClick: () => wyomingSounds.playButtonClick(),
    playNotification: () => wyomingSounds.playNotification(),
    playCowboyWhistle: () => wyomingSounds.playCowboyWhistle(),
    playHorseGallop: () => wyomingSounds.playHorseGallop(),
    playWindHowl: () => wyomingSounds.playWindHowl(),
    setEnabled: (enabled: boolean) => wyomingSounds.setEnabled(enabled),
    isEnabled: () => wyomingSounds.isEnabled()
  };
}