
import React, { useState } from "react";
import axios from "axios";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ChevronDown,
    Coins,
    Code2,
    Crown,
    Globe,
    Layers3,
    LockKeyhole,
    Rocket,
    Sparkles,
    Zap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { serverUrl } from "../App";

const plans = [
    {
        key: "free",
        name: "Free",
        label: "For getting started",
        price: "₹0",
        credits: 100,
        description:
            "Explore AI-powered website creation and bring your first idea to life.",
        features: [
            "AI website generation",
            "Responsive HTML output",
            "Basic animations",
        ],
        button: "Start for Free",
        icon: Sparkles,
        popular: false,
    },
    {
        key: "pro",
        name: "Pro",
        label: "For creators",
        price: "₹499",
        credits: 500,
        description:
            "Build more, iterate faster, and bring your creative projects to life.",
        features: [
            "Everything in Free",
            "Faster generation",
            "Edit and regenerate",
        ],
        button: "Get Pro",
        icon: Zap,
        popular: true,
    },
    {
        key: "enterprise",
        name: "Enterprise",
        label: "For power users",
        price: "₹1499",
        credits: 2000,
        description:
            "More credits for ambitious projects and frequent website creation.",
        features: [
            "Higher credit allowance",
            "Multiple website projects",
            "Advanced AI workflows",
            "More room to create",
        ],
        button: "Get Enterprise",
        icon: Crown,
        popular: false,
    },
];

const faqs = [
    {
        question: "How do GenWeb.ai credits work?",
        answer:
            "Credits are used when you generate or update websites. Your available balance is displayed in your account.",
    },
    {
        question: "Is this a subscription?",
        answer:
            "These plans are presented as one-time purchases. You can use the credits included with your selected plan.",
    },
    {
        question: "Can I edit my website after generating it?",
        answer:
            "Yes. Open your website in the editor to make changes and refine your design using AI.",
    },
    {
        question: "What happens when I run out of credits?",
        answer:
            "You can visit the pricing page and purchase another available credit plan.",
    },
];

function Pricing() {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [openFaq, setOpenFaq] = useState(0);

    const handleBuy = async (planKey) => {
        if (loading) return;

        if (!userData) {
            navigate("/");
            return;
        }

        if (planKey === "free") {
            navigate("/dashboard");
            return;
        }

        setLoading(planKey);
        setError("");

        try {
            const result = await axios.post(
                `${serverUrl}/api/billing`,
                {
                    planType: planKey,
                },
                {
                    withCredentials: true,
                }
            );

            if (result.data?.sessionUrl) {
                window.location.href = result.data.sessionUrl;
            } else {
                throw new Error("Checkout URL was not returned.");
            }
        } catch (error) {
            console.error("Billing Error:", error);

            setError(
                error?.response?.data?.message ||
                    "Unable to start checkout. Please try again."
            );

            setLoading("");
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

            {/* Background */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[850px] h-[650px] rounded-full bg-violet-600/[0.13] blur-[160px]" />

                <div className="absolute top-[600px] -left-60 w-[500px] h-[500px] rounded-full bg-indigo-600/[0.10] blur-[150px]" />

                <div className="absolute top-[900px] -right-60 w-[500px] h-[500px] rounded-full bg-blue-600/[0.08] blur-[150px]" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                        backgroundSize: "55px 55px",
                    }}
                />
            </div>

            {/* Navbar */}

            <header className="relative z-20 border-b border-white/[0.08] bg-black/40 backdrop-blur-2xl">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 h-[72px] flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <motion.button
                            whileTap={{ scale: 0.94 }}
                            onClick={() => navigate("/")}
                            className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition"
                            aria-label="Go back home"
                        >
                            <ArrowLeft size={17} />
                        </motion.button>

                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2.5"
                        >
                            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
                                <Sparkles
                                    size={16}
                                    className="text-black"
                                />
                            </div>

                            <span className="text-lg font-semibold tracking-tight">
                                GenWeb
                                <span className="text-zinc-500">.ai</span>
                            </span>
                        </button>

                    </div>

                    <div className="flex items-center gap-3">

                        {userData && (
                            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm">
                                <Coins
                                    size={15}
                                    className="text-yellow-400"
                                />
                                <span className="text-zinc-300">
                                    {userData.credits ?? 0} credits
                                </span>
                            </div>
                        )}

                        <button
                            onClick={() =>
                                navigate(
                                    userData ? "/dashboard" : "/"
                                )
                            }
                            className="px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition"
                        >
                            {userData ? "Dashboard" : "Get Started"}
                        </button>

                    </div>
                </div>
            </header>

            <main className="relative z-10">

                {/* Hero */}

                <section className="px-5 sm:px-6 pt-20 sm:pt-28 pb-14">

                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >

                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] text-violet-200 text-xs sm:text-sm mb-7">
                            <Sparkles size={15} />
                            Simple pricing. Limitless ideas.
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.045em] leading-[1.08]">
                            Your next big idea.
                            <span className="block mt-2 bg-gradient-to-r from-violet-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent">
                                Starts right here.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-zinc-400">
                            Choose your credits, unleash your creativity,
                            and turn your ideas into beautiful websites
                            with GenWeb.ai.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-zinc-500">
                            <span className="flex items-center gap-2">
                                <Check size={15} className="text-emerald-400" />
                                No recurring subscription
                            </span>

                            <span className="flex items-center gap-2">
                                <Check size={15} className="text-emerald-400" />
                                Flexible credit plans
                            </span>

                            <span className="flex items-center gap-2">
                                <Check size={15} className="text-emerald-400" />
                                Build at your pace
                            </span>
                        </div>

                    </motion.div>

                </section>

                {/* Pricing Cards */}

                <section
                    id="plans"
                    className="px-5 sm:px-6 pb-20"
                >

                    <div className="max-w-7xl mx-auto">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">

                            {plans.map((plan, index) => {
                                const Icon = plan.icon;
                                const isLoading = loading === plan.key;

                                return (
                                    <motion.article
                                        key={plan.key}
                                        initial={{
                                            opacity: 0,
                                            y: 30,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.15,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                        whileHover={{
                                            y: -7,
                                        }}
                                        className={`relative flex flex-col rounded-3xl border p-6 sm:p-7 transition-all duration-300 ${
                                            plan.popular
                                                ? "border-violet-400/50 bg-gradient-to-b from-violet-500/[0.16] via-[#101019] to-[#09090c] shadow-[0_0_70px_-25px_rgba(139,92,246,0.35)]"
                                                : "border-white/[0.09] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]"
                                        }`}
                                    >

                                        {/* Popular glow */}

                                        {plan.popular && (
                                            <>
                                                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />

                                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[11px] sm:text-xs font-semibold shadow-lg shadow-violet-500/25 whitespace-nowrap">
                                                        <Sparkles size={12} />
                                                        Most Popular
                                                    </span>
                                                </div>
                                            </>
                                        )}

                                        {/* Plan heading */}

                                        <div className="flex items-start justify-between mt-2">

                                            <div>
                                                <h2 className="text-xl font-semibold">
                                                    {plan.name}
                                                </h2>

                                                <p className="text-xs text-zinc-500 mt-1.5">
                                                    {plan.label}
                                                </p>
                                            </div>

                                            <div
                                                className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${
                                                    plan.popular
                                                        ? "border-violet-400/20 bg-violet-400/10 text-violet-300"
                                                        : "border-white/10 bg-white/[0.04] text-zinc-300"
                                                }`}
                                            >
                                                <Icon size={20} />
                                            </div>

                                        </div>

                                        <p className="mt-5 text-sm leading-6 text-zinc-400 min-h-[72px]">
                                            {plan.description}
                                        </p>

                                        {/* Price */}

                                        <div className="mt-7 flex items-end gap-2">

                                            <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                                                {plan.price}
                                            </span>

                                            <span className="text-xs text-zinc-500 mb-2">
                                                one-time
                                            </span>

                                        </div>

                                        <p className="text-xs text-zinc-600 mt-2">
                                            Pay once. Use your credits.
                                        </p>

                                        {/* Credits */}

                                        <div
                                            className={`relative overflow-hidden mt-7 mb-7 p-4 rounded-2xl border ${
                                                plan.popular
                                                    ? "border-violet-400/20 bg-violet-500/[0.08]"
                                                    : "border-white/[0.08] bg-white/[0.025]"
                                            }`}
                                        >

                                            <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-violet-500/[0.06] blur-2xl" />

                                            <div className="relative flex items-center justify-between gap-3">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-xl bg-yellow-400/[0.08] border border-yellow-400/10 flex items-center justify-center">
                                                        <Coins
                                                            size={19}
                                                            className="text-yellow-400"
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="text-xs text-zinc-500">
                                                            Included credits
                                                        </p>

                                                        <p className="text-lg font-semibold mt-0.5">
                                                            {plan.credits.toLocaleString()}
                                                        </p>
                                                    </div>

                                                </div>

                                                <span className="text-[10px] text-zinc-500 border border-white/10 rounded-full px-2.5 py-1">
                                                    Credits
                                                </span>

                                            </div>

                                            <div className="mt-4 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{
                                                        width: `${(plan.credits / 2000) * 100}%`,
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 0.8,
                                                        delay: 0.2 + index * 0.1,
                                                    }}
                                                    className={`h-full rounded-full ${
                                                        plan.popular
                                                            ? "bg-gradient-to-r from-violet-400 to-indigo-400"
                                                            : "bg-gradient-to-r from-zinc-500 to-zinc-300"
                                                    }`}
                                                />
                                            </div>

                                        </div>

                                        {/* Features */}

                                        <div className="mb-8 flex-1">

                                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-5">
                                                What's included
                                            </p>

                                            <ul className="space-y-4">

                                                {plan.features.map((feature) => (
                                                    <li
                                                        key={feature}
                                                        className="flex items-start gap-3 text-sm text-zinc-300"
                                                    >
                                                        <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-400/10 flex items-center justify-center">
                                                            <Check
                                                                size={12}
                                                                className="text-emerald-400"
                                                            />
                                                        </span>

                                                        <span>
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}

                                            </ul>

                                        </div>

                                        {/* Button */}

                                        <motion.button
                                            whileTap={{ scale: 0.97 }}
                                            disabled={loading !== ""}
                                            onClick={() => handleBuy(plan.key)}
                                            className={`group w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                                                plan.popular
                                                    ? "bg-white text-black hover:bg-violet-100 shadow-lg shadow-violet-500/10"
                                                    : "bg-white/[0.06] border border-white/10 text-white hover:bg-white/[0.12] hover:border-white/20"
                                            }`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="w-4 h-4 rounded-full border-2 border-current/30 border-t-current animate-spin" />
                                                    Redirecting...
                                                </>
                                            ) : (
                                                <>
                                                    {plan.button}

                                                    <ArrowRight
                                                        size={16}
                                                        className="group-hover:translate-x-1 transition-transform"
                                                    />
                                                </>
                                            )}
                                        </motion.button>

                                    </motion.article>
                                );
                            })}

                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="max-w-xl mx-auto mt-6 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-center text-sm text-red-300"
                            >
                                {error}
                            </div>
                        )}

                        <p className="text-center text-xs text-zinc-600 mt-8">
                            Secure checkout · One-time payment · No recurring billing
                        </p>

                    </div>

                </section>

                {/* Feature strip */}

                <section className="px-5 sm:px-6 pb-24">

                    <div className="max-w-6xl mx-auto">

                        <div className="text-center mb-10">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300 mb-3">
                                Made for your workflow
                            </p>

                            <h2 className="text-2xl sm:text-3xl font-bold">
                                Everything you need to create
                            </h2>

                            <p className="mt-3 text-sm text-zinc-500">
                                From your first prompt to a published website.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                            {[
                                {
                                    icon: Code2,
                                    title: "AI-generated code",
                                    description:
                                        "Turn a description into a website you can customize.",
                                },
                                {
                                    icon: Layers3,
                                    title: "Iterate with AI",
                                    description:
                                        "Refine your design and improve your website as you go.",
                                },
                                {
                                    icon: Globe,
                                    title: "Build and launch",
                                    description:
                                        "Manage your website projects from one workspace.",
                                },
                            ].map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: index * 0.1,
                                        }}
                                        className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 hover:bg-white/[0.045] hover:border-white/15 transition"
                                    >
                                        <div className="w-11 h-11 rounded-xl border border-violet-400/15 bg-violet-500/[0.08] flex items-center justify-center text-violet-300 mb-5">
                                            <Icon size={20} />
                                        </div>

                                        <h3 className="font-semibold">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm leading-6 text-zinc-500 mt-2">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                );
                            })}

                        </div>

                    </div>

                </section>

                {/* FAQ */}

                <section className="px-5 sm:px-6 pb-24">

                    <div className="max-w-3xl mx-auto">

                        <div className="text-center mb-10">

                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300 mb-3">
                                FAQs
                            </p>

                            <h2 className="text-3xl sm:text-4xl font-bold">
                                Got questions?
                            </h2>

                            <p className="mt-3 text-sm text-zinc-500">
                                A few things to know before you get started.
                            </p>

                        </div>

                        <div className="space-y-3">

                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;

                                return (
                                    <div
                                        key={faq.question}
                                        className={`rounded-2xl border transition-colors ${
                                            isOpen
                                                ? "border-violet-400/20 bg-violet-500/[0.04]"
                                                : "border-white/[0.08] bg-white/[0.02]"
                                        }`}
                                    >

                                        <button
                                            onClick={() =>
                                                setOpenFaq(
                                                    isOpen ? -1 : index
                                                )
                                            }
                                            className="w-full flex items-center justify-between gap-4 text-left px-5 py-5"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="text-sm sm:text-base font-medium">
                                                {faq.question}
                                            </span>

                                            <ChevronDown
                                                size={18}
                                                className={`shrink-0 text-zinc-500 transition-transform ${
                                                    isOpen
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-5 pb-5 text-sm leading-7 text-zinc-400">
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </section>

                {/* Bottom CTA */}

                <section className="px-5 sm:px-6 pb-24">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.12] via-white/[0.025] to-blue-500/[0.08] px-6 py-12 sm:px-12 sm:py-16 text-center"
                    >

                        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full bg-violet-500/15 blur-[100px]" />

                        <div className="relative">

                            <div className="mx-auto w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center mb-6">
                                <Rocket size={22} />
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                Have an idea?
                            </h2>

                            <p className="max-w-lg mx-auto mt-4 text-sm sm:text-base leading-7 text-zinc-400">
                                Your next website is just a prompt away.
                                Start creating with GenWeb.ai today.
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        userData ? "/generate" : "/"
                                    )
                                }
                                className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black hover:bg-zinc-200 transition"
                            >
                                Start Building

                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </button>

                        </div>

                    </motion.div>

                </section>

            </main>

            {/* Footer */}

            <footer className="relative z-10 border-t border-white/[0.08] bg-black/40">

                <div className="max-w-7xl mx-auto px-5 sm:px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2.5"
                    >
                        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
                            <Sparkles
                                size={15}
                                className="text-black"
                            />
                        </div>

                        <span className="text-sm font-semibold">
                            GenWeb
                            <span className="text-zinc-500">.ai</span>
                        </span>
                    </button>

                    <div className="flex items-center gap-5 text-xs text-zinc-500">

                        <button
                            onClick={() => navigate("/")}
                            className="hover:text-white transition"
                        >
                            Home
                        </button>

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="hover:text-white transition"
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() => navigate("/generate")}
                            className="hover:text-white transition"
                        >
                            Create Website
                        </button>

                    </div>

                    <p className="text-xs text-zinc-600">
                        © {new Date().getFullYear()} GenWeb.ai
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Pricing;