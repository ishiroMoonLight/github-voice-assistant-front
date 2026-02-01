export function speak(text: string) {
    if (typeof window === "undefined") return;

    // Stop toute voix en cours
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 1;     // vitesse (0.8 = plus lent)
    utterance.pitch = 1;   // tonalité
    utterance.volume = 1;  // volume

    // Choix d'une voix française si dispo
    const voices = speechSynthesis.getVoices();
    const frVoice = voices.find(v => v.lang.includes("fr"));
    if (frVoice) utterance.voice = frVoice;

    window.speechSynthesis.speak(utterance);
}

