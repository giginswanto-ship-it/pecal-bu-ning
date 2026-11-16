/**
 * Sound & Voice Announcement Module
 * Synthesizes McDonald's style order chime using Web Audio API
 * and speaks order number in Indonesian using Web Speech API
 */

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.audioUnlocked = false;
    this.synth = window.speechSynthesis || null;
    this.initAudioContext();
  }

  initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass && !this.audioCtx) {
      this.audioCtx = new AudioContextClass();
    }
  }

  unlockAudio() {
    this.initAudioContext();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      return this.audioCtx.resume().then(() => {
        this.audioUnlocked = true;
        console.log('AudioContext successfully unlocked');
        return true;
      });
    }
    this.audioUnlocked = true;
    return Promise.resolve(true);
  }

  /**
   * Synthesize iconic McDonald's / QSR Chime
   * 3-note ascending triad bell (e.g. E5, G#5, B5 or C5, E5, G5)
   */
  playChime() {
    if (this.isMuted) return Promise.resolve();
    this.initAudioContext();

    if (!this.audioCtx) return Promise.resolve();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    // Classic 3-note chime frequencies: E5 (659.25Hz), G#5 (830.61Hz), B5 (987.77Hz)
    const notes = [
      { freq: 659.25, time: 0.00, dur: 0.75 },
      { freq: 830.61, time: 0.22, dur: 0.85 },
      { freq: 987.77, time: 0.44, dur: 1.20 }
    ];

    notes.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now + note.time);

      // Bell envelope: fast attack, natural acoustic decay
      gain.gain.setValueAtTime(0.001, now + note.time);
      gain.gain.exponentialRampToValueAtTime(0.35, now + note.time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.time + note.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.time);
      osc.stop(now + note.time + note.dur);

      // Add harmonic overtone for warm bell resonance
      const overtone = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(note.freq * 2, now + note.time);

      overtoneGain.gain.setValueAtTime(0.001, now + note.time);
      overtoneGain.gain.exponentialRampToValueAtTime(0.1, now + note.time + 0.02);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + note.time + note.dur * 0.7);

      overtone.connect(overtoneGain);
      overtoneGain.connect(ctx.destination);

      overtone.start(now + note.time);
      overtone.stop(now + note.time + note.dur);
    });

    return new Promise(resolve => setTimeout(resolve, 1500));
  }

  /**
   * Speak announcement in natural Indonesian
   * @param {string} text e.g. "Nomor antrean 102, silakan ambil di kasir"
   */
  speakText(text) {
    if (this.isMuted || !this.synth) return Promise.resolve();

    return new Promise((resolve) => {
      // Cancel previous utterances to avoid speech backlog
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95; // slightly slower for clear broadcast
      utterance.pitch = 1.05;

      // Find best Indonesian voice if available
      const voices = this.synth.getVoices();
      const idVoice = voices.find(v => v.lang.startsWith('id') || v.name.includes('Indonesia'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        resolve();
      };

      this.synth.speak(utterance);
    });
  }

  /**
   * Full McDonald's Order Call sequence:
   * 1. Play Chime
   * 2. Speak announcement
   */
  async announceOrder(orderNumber, customerName = '') {
    try {
      await this.unlockAudio();
      await this.playChime();

      // Format order number for clearer speech (e.g. "1 0 2" or "seratus dua")
      let cleanNum = String(orderNumber).replace(/^0+/, '') || orderNumber;
      let text = `Nomor antrean ${cleanNum}. Silakan ambil pesanan di kasir.`;
      if (customerName && !customerName.startsWith('Pelanggan')) {
        text = `Nomor antrean ${cleanNum}, atas nama ${customerName}. Silakan ambil pesanan di kasir.`;
      }

      await this.speakText(text);
    } catch (err) {
      console.warn('Announcement error:', err);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

// Global instance
window.soundManager = new SoundManager();
