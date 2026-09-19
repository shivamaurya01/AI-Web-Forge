
import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    Sparkles,
    WandSparkles,
    Globe,
    Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const PHASES = [
    "Analyzing your idea...",
    "Designing layout & structure...",
    "Writing HTML & CSS...",
    "Adding animations & interactions...",
    "Final quality checks...",
];

function Generate() {
    const navigate = useNavigate();

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [error, setError] = useState("");

    const handleGenerateWebsite = async () => {
        // Prevent empty prompt
        if (!prompt.trim()) {
            setError("Please describe the website you want to create.");
            return;
        }

        // Prevent multiple requests
        if (loading) return;

        try {
            setError("");
            setLoading(true);
            setProgress(0);
            setPhaseIndex(0);

            const result = await axios.post(
                `${serverUrl}/api/website/generate`,
                {
                    prompt: prompt.trim(),
                },
                {
                    withCredentials: true,
                }
            );

            console.log("Generate response:", result.data);

            // Check if websiteId exists
            if (!result.data?.websiteId) {
                throw new Error("Website ID was not returned by the server.");
            }

            setProgress(100);
            setPhaseIndex(PHASES.length - 1);

            // Small delay so user can see 100%
            setTimeout(() => {
                navigate(`/editor/${result.data.websiteId}`);
            }, 500);
        } catch (error) {
            console.error("Generation Error:", error);
            console.error("Backend response:", error.response?.data);

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "Something went wrong while generating the website.";

            setError(message);
            setLoading(false);
        }
    };

    // Fake progress while backend is generating
    useEffect(() => {
        if (!loading) {
            return;
        }

        let value = 0;

        const interval = setInterval(() => {
            const increment =
                value < 20
                    ? Math.random() * 1.5
                    : value < 60
                    ? Math.random() * 1.2
                    : Math.random() * 0.6;

            value += increment;

            // Never go above 93 until API actually finishes
            if (value >= 93) {
                value = 93;
            }

            const phase = Math.min(
                Math.floor((value / 100) * PHASES.length),
                PHASES.length - 1
            );

            setProgress(Math.floor(value));
            setPhaseIndex(phase);
        }, 1200);

        return () => clearInterval(interval);
    }, [loading]);

    return (
        <div className="min-h-screen bg-[#030303] text-white overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/10 blur-[140px] rounded-full" />

                <div className="absolute bottom-[-250px] left-[-150px] w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />

                <div className="absolute top-1/2 right-[-200px] w-[450px] h-[450px] bg-cyan-500/5 blur-[120px] rounded-full" />
            </div>

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "45px 45px",
                }}
            />

            {/* Navbar */}
            <div className="sticky top-0 z-40 backdrop-blur-2xl bg-black/40 border-b border-white/[0.08]">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition"
                            onClick={() => navigate("/")}
                            disabled={loading}
                        >
                            <ArrowLeft size={17} />
                        </motion.button>

                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                                <Sparkles size={15} className="text-black" />
                            </div>

                            <h1 className="text-lg font-semibold tracking-tight">
                                Genweb.
                                <span className="text-zinc-500">ai</span>
                            </h1>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        AI Engine Online
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-400 mb-6">
                        <Sparkles size={13} />
                        AI Website Generator
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
                        Turn your idea into
                        <span className="block mt-2 bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                            a real website.
                        </span>
                    </h1>

                    <p className="mt-6 text-zinc-500 max-w-xl mx-auto leading-relaxed">
                        Describe what you want to build. Genweb.ai will
                        transform your idea into a beautiful, functional
                        website.
                    </p>
                </motion.div>

                {/* Generator Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative"
                >
                    {/* Glow */}
                    <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-white/20 via-purple-500/20 to-cyan-500/20 blur-sm opacity-60" />

                    <div className="relative rounded-3xl border border-white/10 bg-[#080808]/90 backdrop-blur-xl overflow-hidden">
                        {/* Card Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                </div>
                            </div>

                            <div className="text-[11px] text-zinc-600 uppercase tracking-[0.2em]">
                                Create
                            </div>
                        </div>

                        {/* Prompt Area */}
                        <div className="p-6 md:p-8">
                            <div className="flex gap-4">
                                <div className="hidden sm:flex w-10 h-10 shrink-0 rounded-xl bg-white/[0.05] border border-white/10 items-center justify-center">
                                    <WandSparkles
                                        size={18}
                                        className="text-zinc-300"
                                    />
                                </div>

                                <div className="flex-1">
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => {
                                            setPrompt(e.target.value);

                                            // Clear previous error
                                            if (error) {
                                                setError("");
                                            }
                                        }}
                                        disabled={loading}
                                        placeholder="Describe the website you want to create..."
                                        className="w-full h-40 bg-transparent resize-none outline-none text-lg text-white placeholder:text-zinc-700 leading-relaxed disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="mt-4 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5">
                                    <p className="text-sm text-red-400">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Suggestions */}
                            <div className="flex flex-wrap gap-2 mt-5">
                                {[
                                    "Modern SaaS landing page",
                                    "Portfolio website",
                                    "AI startup",
                                    "E-commerce store",
                                ].map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        disabled={loading}
                                        onClick={() => {
                                            setPrompt(item);
                                            setError("");
                                        }}
                                        className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs text-zinc-500 hover:text-white hover:bg-white/[0.06] transition disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            {/* Bottom Controls */}
                            <div className="mt-7 pt-5 border-t border-white/[0.07] flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <div className="flex items-center gap-5 text-xs text-zinc-600">
                                    <div className="flex items-center gap-2">
                                        <Globe size={14} />
                                        Responsive
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Zap size={14} />
                                        AI Powered
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={
                                        prompt.trim() && !loading
                                            ? { scale: 1.03 }
                                            : {}
                                    }
                                    whileTap={
                                        prompt.trim() && !loading
                                            ? { scale: 0.97 }
                                            : {}
                                    }
                                    disabled={!prompt.trim() || loading}
                                    onClick={handleGenerateWebsite}
                                    className={`px-14 py-4 rounded-2xl font-semibold text-lg flex items-center gap-2 transition ${
                                        prompt.trim() && !loading
                                            ? "bg-white text-black hover:bg-zinc-200"
                                            : "bg-white/20 text-zinc-400 cursor-not-allowed"
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={16} />
                                            Generate Website
                                            <span>→</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>

                            {/* Progress */}
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="max-w-xl mx-auto mt-12"
                                >
                                    <div className="flex justify-between mb-2 text-xs text-zinc-400">
                                        <span>{PHASES[phaseIndex]}</span>
                                        <span>{progress}%</span>
                                    </div>

                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-white to-zinc-300"
                                            animate={{
                                                width: `${progress}%`,
                                            }}
                                            transition={{
                                                ease: "easeOut",
                                                duration: 0.8,
                                            }}
                                        />
                                    </div>

                                    <div className="text-center text-xs text-zinc-400 mt-4">
                                        Estimated time remaining:{" "}
                                        <span className="text-white font-medium">
                                            ~8–12 minutes
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 text-center"
                >
                    <p className="text-xs text-zinc-700">
                        Generation may take a few minutes. Quality takes time.
                    </p>
                </motion.div>
            </main>
        </div>
    );
}

export default Generate;
