let audio: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!audio) audio = new Ctor();
  return audio;
}

function arm(ctx: AudioContext) {
  if (ctx.state === "suspended") void ctx.resume();
  const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.connect(ctx.destination);
  src.start();
}

export function resumeQuizAudio() {
  try {
    const ctx = context();
    if (ctx) arm(ctx);
  } catch {
    /* a failed sound should not stop the quiz */
  }
}

export function playCheer(delay = 0) {
  try {
    const ctx = context();
    if (!ctx) return;
    arm(ctx);
    const now = ctx.currentTime + delay;
    const burst = 0.22;
    const frames = Math.max(1, Math.floor(ctx.sampleRate * burst));
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i += 1) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const highpass = ctx.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 1200;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + burst);
    noise.connect(highpass);
    highpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + burst);

    for (const [index, freq] of [523.25, 659.25, 783.99, 1046.5].entries()) {
      const start = now + index * 0.09;
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, start);
      gain.gain.setValueAtTime(0.28, start + 0.26);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.32);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.32);
    }
  } catch {
    /* a failed sound should not stop the quiz */
  }
}

export function playFart(delay = 0) {
  try {
    const ctx = context();
    if (!ctx) return;
    arm(ctx);
    const now = ctx.currentTime + delay;
    const dur = 0.7;
    const frames = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let brown = 0;
    let phase = 0;
    for (let i = 0; i < frames; i += 1) {
      const white = Math.random() * 2 - 1;
      brown = brown * 0.8 + white * 0.2;
      const slide = i / (frames - 1 || 1);
      const lip = 46 + (22 - 46) * slide;
      phase += (2 * Math.PI * lip) / ctx.sampleRate;
      const gate = Math.max(0, Math.sin(phase));
      data[i] = (brown + white * 0.15) * gate;
    }
    let peak = 0;
    for (let i = 0; i < frames; i += 1) peak = Math.max(peak, Math.abs(data[i] ?? 0));
    if (peak > 0) {
      for (let i = 0; i < frames; i += 1) data[i] = (data[i] ?? 0) / peak;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.Q.value = 0.7;
    band.frequency.setValueAtTime(720, now);
    band.frequency.exponentialRampToValueAtTime(180, now + dur);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.9, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    noise.connect(band);
    band.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + dur);

    for (const [from, to] of [
      [150, 62],
      [300, 124],
    ] as const) {
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(from, now);
      osc.frequency.exponentialRampToValueAtTime(to, now + dur);
      const tone = ctx.createGain();
      tone.gain.setValueAtTime(0.06, now);
      tone.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.connect(tone);
      tone.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + dur);
    }
  } catch {
    /* a failed sound should not stop the quiz */
  }
}
