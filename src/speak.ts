export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function scoreVoice(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  let score = 0;
  if (lang.startsWith("en")) score += 20;
  if (lang.startsWith("en-gb") || lang.startsWith("en-us")) score += 6;
  if (/male|daniel|david|alex|arthur|fred|tom|rishi|aaron|gordon|mark|guy|james|george|thomas/.test(name)) {
    score += 30;
  }
  if (/female|zira|samantha|karen|moira|tessa|siri|victoria|fiona|susan|linda|heather|jenny/.test(name)) {
    score -= 40;
  }
  if (/neural|premium|enhanced|natural|wavenet|studio/.test(name)) score += 12;
  if (/compact|espeak|robot|novelty/.test(name)) score -= 20;
  return score;
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;
  return [...voices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
}

export function speakEnglish(text: string, onEnd?: () => void): void {
  if (!canSpeak() || !text.trim()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text.trim());
  utter.lang = "en-GB";
  utter.rate = 0.92;
  utter.pitch = 1;
  const voice = pickVoice();
  if (voice) {
    utter.voice = voice;
    if (voice.lang) utter.lang = voice.lang;
  }
  utter.onend = () => onEnd?.();
  utter.onerror = () => onEnd?.();
  synth.speak(utter);
}

export function stopSpeak(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}

export function isSpeaking(): boolean {
  return canSpeak() && window.speechSynthesis.speaking;
}

export function toggleSpeak(text: string, onEnd?: () => void): boolean {
  if (isSpeaking()) {
    stopSpeak();
    return false;
  }
  speakEnglish(text, onEnd);
  return true;
}

if (canSpeak()) {
  window.speechSynthesis.getVoices();
}
