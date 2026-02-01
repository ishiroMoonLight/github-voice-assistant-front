"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { speak } from "../../utils/speak";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export function VoiceInteraction() {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const [prompt, setPrompt] = useState("");

    const handleVoice = async () => {
        const res = await fetch(`${backendUrl}/github/ask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt,
            }),
        });

        const data = await res.json();
        speak(data.answer);
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("SpeechRecognition non supporté");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "fr-FR";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
            let transcript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }

            console.log("🎤 transcript:", transcript);
            // setPrompt(transcript);

            if (event.results[event.results.length - 1].isFinal) {
                console.log("🎤 final:", transcript);
                handleVoice();
            }
        };

        recognition.onerror = (err: any) => {
            console.error("🎤 Speech error:", err);
        };

        recognition.onend = () => {
            console.log("🎤 stopped");
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, []);

    const start = () => {
        if (!recognitionRef.current) return;
        recognitionRef.current.start();
        setIsListening(true);
    };

    const stop = () => {
        if (!recognitionRef.current) return;
        recognitionRef.current.stop();
        setIsListening(false);
    };

    return (
        <section className="relative flex min-h-[400px] flex-col items-center justify-center rounded-[3rem] border bg-card/20 glass p-12 text-center overflow-hidden transition-all duration-1000 animate-glow">
            {/* Ambient Background Glow */}
            <motion.div
                animate={{
                    scale: isListening ? [1, 1.3, 1] : 1,
                    opacity: isListening ? [0.25, 0.4, 0.25] : 0.1,
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-secondary/30 to-accent/40 blur-[120px] pointer-events-none"
            />

            <div className="z-10 flex flex-col items-center gap-10 w-full max-w-lg animate-float">
                <div className="relative group">
                    <motion.div
                        animate={isListening ? {
                            scale: [1, 1.15, 1],
                            boxShadow: ["0 0 20px rgba(168, 85, 247, 0.4)", "0 0 60px rgba(168, 85, 247, 0.8)", "0 0 20px rgba(168, 85, 247, 0.4)"]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={cn(
                            "relative flex size-32 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden",
                            isListening ? "brightness-110" : "hover:scale-110 active:scale-95 hover:shadow-primary/50"
                        )}
                        onClick={() => {
                            if (isListening) {
                                stop();
                            } else {
                                start();
                            }
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isListening ? "stop" : "mic"}
                                initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {isListening ? (
                                    <Square className="size-12 text-primary-foreground fill-current" />
                                ) : (
                                    <Mic className="size-14 text-primary-foreground" />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Enhanced Ripple Effect when listening */}
                        {isListening && (
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(3)].map((_, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ scale: 1, opacity: 0.6 }}
                                        animate={{ scale: 2.5, opacity: 0 }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeOut",
                                            delay: i * 0.8
                                        }}
                                        className="absolute inset-0 rounded-full bg-primary-foreground/20"
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.h3
                            key={isListening ? "listening" : "idle"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-4xl font-black tracking-tight text-gradient"
                        >
                            {isListening ? "Listening..." : "How can I help?"}
                        </motion.h3>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={isListening ? "desc-listening" : "desc-idle"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/70 text-xl max-w-[350px] mx-auto leading-relaxed font-medium"
                        >
                            {isListening
                                ? "Give me a command like \"Show my last commits\""
                                : "Tap the mic and start talking to manage your repositories."
                            }
                        </motion.p>
                    </AnimatePresence>
                </div>

                <Button
                    variant={isListening ? "destructive" : "default"}
                    size="lg"
                    className={cn(
                        "rounded-full px-12 h-16 text-xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95",
                        !isListening && "bg-gradient-to-r from-primary to-secondary hover:brightness-110 border-none"
                    )}
                    onClick={() => {
                        if (isListening) {
                            stop();
                        } else {
                            start();
                        }
                    }}
                >
                    {isListening ? "Done" : "Start Conversation"}
                </Button>
            </div>
        </section>
    );
}
