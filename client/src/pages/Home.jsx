
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    ChevronRight,
    Code2,
    Coins,
    LayoutTemplate,
    LogOut,
    Menu,
    Monitor,
    Sparkles,
    WandSparkles,
    X,
    Zap,
} from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginModel from "../components/LoginModel.jsx";
import { serverUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";

function Home() {
    const [openLogin, setOpenLogin] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [websites, setWebsites] = useState([]);

    const { userData } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // --------------------------------------------------
    // DATA
    // --------------------------------------------------

    const features = [
        {
            icon: <Sparkles size={22} />,
            title: "AI-Powered Generation",
            description:
                "Turn a simple idea into a complete website using AI-generated code.",
        },
        {
            icon: <Monitor size={22} />,
            title: "Responsive by Default",
            description:
                "Generate websites that look great on desktop, tablet and mobile.",
        },
        {
            icon: <Code2 size={22} />,
            title: "Clean Code",
            description:
                "Get structured, readable and editable code instead of a static mockup.",
        },
        {
            icon: <Zap size={22} />,
            title: "Fast Iteration",
            description:
                "Keep improving your website with AI without starting from scratch.",
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Describe your idea",
            description:
                "Tell GenWeb.ai what kind of website you want to create.",
        },
        {
            number: "02",
            title: "AI builds it",
            description:
                "Our AI generates the layout, styling and website code for you.",
        },
        {
            number: "03",
            title: "Customize & deploy",
            description:
                "Edit your website, preview it and deploy when you're ready.",
        },
    ];

    // --------------------------------------------------
    // LOGOUT
    // --------------------------------------------------

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, {
                withCredentials: true,
            });

            dispatch(setUserData(null));
            setOpenProfile(false);
            navigate("/");
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    // --------------------------------------------------
    // GET WEBSITES
    // --------------------------------------------------

    useEffect(() => {
        if (!userData) {
            setWebsites([]);
            return;
        }

        const handleGetAllWebsites = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/website/get-all`,
                    {
                        withCredentials: true,
                    }
                );

                setWebsites(result.data || []);
            } catch (error) {
                console.log("Get all websites error:", error);
                setWebsites([]);
            }
        };

        handleGetAllWebsites();
    }, [userData]);

    // --------------------------------------------------
    // CLOSE MOBILE MENU
    // --------------------------------------------------

    const handleNavigation = (path) => {
        setMobileMenu(false);
        setOpenProfile(false);
        navigate(path);
    };

    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#030303] text-white">

            {/* ============================================
                BACKGROUND
            ============================================ */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/15 blur-[160px]" />

                <div className="absolute top-[35%] left-[-250px] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

                <div className="absolute bottom-[-250px] right-[-200px] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[160px]" />

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            {/* ============================================
                NAVBAR
            ============================================ */}

            <motion.nav
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-black/60 backdrop-blur-2xl"
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4">

                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <button
                            onClick={() => handleNavigation("/")}
                            className="flex items-center gap-2"
                        >
                            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                                <Sparkles
                                    size={18}
                                    className="text-black"
                                />
                            </div>

                            <div className="text-lg font-semibold tracking-tight">
                                GenWeb
                                <span className="text-zinc-500">.ai</span>
                            </div>
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">

                            <button
                                onClick={() => handleNavigation("/pricing")}
                                className="text-sm text-zinc-400 hover:text-white transition"
                            >
                                Pricing
                            </button>

                            {userData && (
                                <button
                                    onClick={() =>
                                        handleNavigation("/dashboard")
                                    }
                                    className="text-sm text-zinc-400 hover:text-white transition"
                                >
                                    Dashboard
                                </button>
                            )}

                            {userData && (
                                <button
                                    onClick={() =>
                                        handleNavigation("/pricing")
                                    }
                                    className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition"
                                >
                                    <Coins
                                        size={15}
                                        className="text-yellow-400"
                                    />

                                    <span className="text-sm text-zinc-300">
                                        {userData.credits ?? 0}
                                    </span>

                                    <span className="text-zinc-500 text-sm">
                                        credits
                                    </span>

                                    <ArrowUpRight size={14} />
                                </button>
                            )}

                            {!userData ? (
                                <button
                                    onClick={() => setOpenLogin(true)}
                                    className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition"
                                >
                                    Get Started
                                </button>
                            ) : (
                                <div className="relative">

                                    <button
                                        onClick={() =>
                                            setOpenProfile(!openProfile)
                                        }
                                        className="flex items-center"
                                    >
                                        <img
                                            src={userData?.avatar}
                                            alt={userData?.name || "User"}
                                            referrerPolicy="no-referrer"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                        userData?.name ||
                                                            "User"
                                                    )}`;
                                            }}
                                            className="w-9 h-9 rounded-full border border-white/20 object-cover"
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {openProfile && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: -10,
                                                    scale: 0.96,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -10,
                                                    scale: 0.96,
                                                }}
                                                className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/10 bg-[#0b0b0b] shadow-2xl overflow-hidden"
                                            >
                                                <div className="p-4 border-b border-white/10">
                                                    <p className="font-medium truncate">
                                                        {userData?.name}
                                                    </p>

                                                    <p className="text-xs text-zinc-500 mt-1 truncate">
                                                        {userData?.email}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        handleNavigation(
                                                            "/dashboard"
                                                        )
                                                    }
                                                    className="w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition"
                                                >
                                                    Dashboard
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleNavigation(
                                                            "/pricing"
                                                        )
                                                    }
                                                    className="w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition"
                                                >
                                                    Buy Credits
                                                </button>

                                                <button
                                                    onClick={handleLogOut}
                                                    className="w-full px-4 py-3 flex items-center gap-2 text-left text-sm text-red-400 hover:bg-red-500/5 transition"
                                                >
                                                    <LogOut size={15} />
                                                    Log out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </div>
                            )}
                        </div>

                        {/* Mobile Button */}
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="md:hidden w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center"
                        >
                            {mobileMenu ? (
                                <X size={20} />
                            ) : (
                                <Menu size={20} />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenu && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    height: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    height: "auto",
                                }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                }}
                                className="md:hidden overflow-hidden"
                            >
                                <div className="pt-5 pb-2 flex flex-col gap-2">

                                    <button
                                        onClick={() =>
                                            handleNavigation("/pricing")
                                        }
                                        className="w-full text-left px-4 py-3 rounded-xl text-sm text-zinc-300 hover:bg-white/5"
                                    >
                                        Pricing
                                    </button>

                                    {userData && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleNavigation(
                                                        "/dashboard"
                                                    )
                                                }
                                                className="w-full text-left px-4 py-3 rounded-xl text-sm text-zinc-300 hover:bg-white/5"
                                            >
                                                Dashboard
                                            </button>

                                            <div className="px-4 py-3 rounded-xl bg-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Coins
                                                        size={15}
                                                        className="text-yellow-400"
                                                    />
                                                    <span className="text-sm">
                                                        Credits
                                                    </span>
                                                </div>

                                                <span className="text-sm font-semibold">
                                                    {userData?.credits ?? 0}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {!userData && (
                                        <button
                                            onClick={() => {
                                                setMobileMenu(false);
                                                setOpenLogin(true);
                                            }}
                                            className="mt-2 w-full py-3 rounded-xl bg-white text-black text-sm font-semibold"
                                        >
                                            Get Started
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.nav>

            {/* ============================================
                MAIN
            ============================================ */}

            <main className="relative z-10">

                {/* ========================================
                    HERO
                ======================================== */}

                <section className="relative pt-36 sm:pt-44 pb-24 sm:pb-32 px-5">

                    <div className="max-w-6xl mx-auto text-center">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs sm:text-sm text-zinc-300"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                            AI-powered website builder

                            <ChevronRight size={14} className="text-zinc-500" />
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 35 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: 0.1,
                            }}
                            className="mt-8 text-5xl sm:text-6xl md:text-8xl font-bold tracking-[-0.05em] leading-[0.95]"
                        >
                            Turn ideas into

                            <br />

                            <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                                websites with AI.
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                            }}
                            className="mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-8 text-zinc-400"
                        >
                            Describe what you want to build. GenWeb.ai
                            generates a modern, responsive website and lets
                            you refine it with AI.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3,
                            }}
                            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                        >
                            <button
                                onClick={() =>
                                    userData
                                        ? navigate("/dashboard")
                                        : setOpenLogin(true)
                                }
                                className="group w-full sm:w-auto px-7 py-4 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition"
                            >
                                {userData
                                    ? "Open Dashboard"
                                    : "Start Building"}

                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition"
                                />
                            </button>

                            <button
                                onClick={() => navigate("/pricing")}
                                className="w-full sm:w-auto px-7 py-4 rounded-xl border border-white/10 bg-white/[0.04] text-white font-medium hover:bg-white/[0.08] transition"
                            >
                                View Pricing
                            </button>
                        </motion.div>

                        {/* Trust line */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.5,
                            }}
                            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-600"
                        >
                            <span className="flex items-center gap-1.5">
                                <Check size={13} />
                                AI generated code
                            </span>

                            <span className="flex items-center gap-1.5">
                                <Check size={13} />
                                Responsive layouts
                            </span>

                            <span className="flex items-center gap-1.5">
                                <Check size={13} />
                                Fast iteration
                            </span>
                        </motion.div>

                    </div>

                    {/* ====================================
                        HERO PRODUCT PREVIEW
                    ==================================== */}

                   
                    

                    

                </section>

                {/* ========================================
                    HOW IT WORKS
                ======================================== */}

                <section className="border-y border-white/[0.07] bg-white/[0.015]">

                    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-24">

                        <div className="text-center max-w-2xl mx-auto mb-16">

                            <p className="text-sm text-purple-400 font-medium mb-3">
                                SIMPLE WORKFLOW
                            </p>

                            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                                From idea to website
                                <span className="text-zinc-500">
                                    {" "}in minutes.
                                </span>
                            </h2>

                        </div>

                        <div className="grid md:grid-cols-3 gap-6">

                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.number}
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
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className="relative rounded-2xl border border-white/10 bg-black/30 p-7"
                                >

                                    <div className="flex items-center justify-between mb-10">

                                        <span className="text-4xl font-bold text-white/10">
                                            {step.number}
                                        </span>

                                        <ArrowUpRight
                                            size={20}
                                            className="text-zinc-600"
                                        />

                                    </div>

                                    <h3 className="text-xl font-semibold mb-3">
                                        {step.title}
                                    </h3>

                                    <p className="text-sm leading-6 text-zinc-500">
                                        {step.description}
                                    </p>

                                </motion.div>
                            ))}

                        </div>

                    </div>

                </section>

                {/* ========================================
                    USER WEBSITES
                ======================================== */}

                {userData && websites?.length > 0 && (
                    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-24">

                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">

                            <div>

                                <p className="text-sm text-purple-400 font-medium mb-2">
                                    YOUR WORKSPACE
                                </p>

                                <h2 className="text-3xl font-bold">
                                    Recent websites
                                </h2>

                            </div>

                            <button
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
                            >
                                View all
                                <ArrowRight size={15} />
                            </button>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                            {websites.slice(0, 3).map((website) => (
                                <motion.div
                                    key={website._id}
                                    whileHover={{
                                        y: -6,
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/editor/${website._id}`
                                        )
                                    }
                                    className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/[0.025] hover:border-white/20 transition"
                                >

                                    <div className="relative h-48 bg-white overflow-hidden">

                                        {website.latestCode ? (
                                            <iframe
                                                title={
                                                    website.title ||
                                                    "Website Preview"
                                                }
                                                srcDoc={
                                                    website.latestCode
                                                }
                                                className="absolute top-0 left-0 w-[140%] h-[140%] scale-[0.715] origin-top-left pointer-events-none"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                                <LayoutTemplate
                                                    size={30}
                                                    className="text-zinc-600"
                                                />
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                                    </div>

                                    <div className="p-5">

                                        <div className="flex items-start justify-between gap-3">

                                            <div className="min-w-0">

                                                <h3 className="font-semibold truncate">
                                                    {website.title ||
                                                        "Untitled Website"}
                                                </h3>

                                                <p className="text-xs text-zinc-500 mt-1">
                                                    Updated{" "}
                                                    {website.updatedAt
                                                        ? new Date(
                                                              website.updatedAt
                                                          ).toLocaleDateString()
                                                        : "Recently"}
                                                </p>

                                            </div>

                                            <ArrowUpRight
                                                size={17}
                                                className="text-zinc-600 group-hover:text-white transition"
                                            />

                                        </div>

                                    </div>

                                </motion.div>
                            ))}

                        </div>

                    </section>
                )}

                {/* ========================================
                    CTA
                ======================================== */}

                <section className="max-w-6xl mx-auto px-5 sm:px-6 py-24">

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.98,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}
                        viewport={{
                            once: true,
                        }}
                        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-white/[0.03] to-blue-500/10 p-8 sm:p-14 text-center"
                    >

                        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-purple-500/20 blur-[100px]" />

                        <div className="relative">

                            <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                                <WandSparkles
                                    size={24}
                                    className="text-black"
                                />
                            </div>

                            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                                Your next website starts
                                <br />
                                with one idea.
                            </h2>

                            <p className="max-w-xl mx-auto mt-5 text-zinc-400">
                                Stop starting from a blank screen. Describe
                                your idea and let GenWeb.ai handle the first
                                draft.
                            </p>

                            <button
                                onClick={() =>
                                    userData
                                        ? navigate("/dashboard")
                                        : setOpenLogin(true)
                                }
                                className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
                            >
                                {userData
                                    ? "Open Dashboard"
                                    : "Start Building"}

                                <ArrowRight size={18} />
                            </button>

                        </div>

                    </motion.div>

                </section>

            </main>

            {/* ============================================
                FOOTER
            ============================================ */}

            <footer className="relative z-20 border-t border-white/[0.08] bg-black/60 backdrop-blur-xl">

                <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                                <Sparkles
                                    size={17}
                                    className="text-black"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold">
                                    GenWeb
                                    <span className="text-zinc-500">
                                        .ai
                                    </span>
                                </p>

                                <p className="text-xs text-zinc-600 mt-1">
                                    Build the web with AI.
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-6 text-xs text-zinc-500">

                            <button
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                                className="hover:text-white transition"
                            >
                                Dashboard
                            </button>

                            <button
                                onClick={() =>
                                    navigate("/pricing")
                                }
                                className="hover:text-white transition"
                            >
                                Pricing
                            </button>

                        </div>

                        <div className="flex items-center gap-2 text-xs text-zinc-500">

                            <span className="relative flex h-2 w-2">

                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />

                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />

                            </span>

                            AI Engine Online

                        </div>

                    </div>

                    <div className="mt-7 pt-5 border-t border-white/[0.06] text-center sm:text-left">

                        <p className="text-xs text-zinc-600">
                            © {new Date().getFullYear()} GenWeb.ai. All
                            rights reserved.
                        </p>

                    </div>

                </div>

            </footer>

            {/* ============================================
                LOGIN MODAL
            ============================================ */}

            {openLogin && (
                <LoginModel
                    open={openLogin}
                    onClose={() => setOpenLogin(false)}
                />
            )}

        </div>
    );
}

export default Home;






















// import React from "react";

// import { AnimatePresence, motion } from "motion/react";

// import LoginModel from "../components/LoginModel.jsx";

// import { useState } from "react";

// import { useDispatch, useSelector } from "react-redux";

// import { Coins, Sparkles, ArrowUpRight } from "lucide-react";

// import axios from "axios";

// import { serverUrl } from "../App.jsx";

// import { setUserData } from "../redux/userSlice.js";

// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// function Home() {
//     const highlights = [
//         "AI Generated Code",
//         "Fully Responsive Layouts",
//         "Production Ready Output",
//     ];

//     const [openLogin, setOpenLogin] = useState(false);

//     const { userData } = useSelector((state) => state.user);

//     const [openProfile, setOpenProfile] = useState(false);
//     const [websites, setWebsites] = useState(null)

//     const dispatch = useDispatch();

//     const navigate = useNavigate();

//     const handleLogOut = async () => {
//         console.log("logout click");
//         console.log("userData:", userData);

//         try {
//             await axios.get(`${serverUrl}/api/auth/logout`, {
//                 withCredentials: true,
//             });

//             dispatch(setUserData(null));
//             setOpenProfile(false);
//         } catch (error) {
//             console.log(error);
//         }
//     };


//       useEffect(() => {
//         if(!userData) return;
//         const handleGetAllWebsites = async () => {
        
    
//           try {
//             const result = await axios.get(`${serverUrl}/api/website/get-all`, {
//               withCredentials: true,
//             });
    
           
    
//             // API is returning an array
//             setWebsites(result.data || []);

//           } catch (error) {
//             console.log("Get all websites error:", error);
    
            
//           }
//         };
    
//         handleGetAllWebsites();
//       }, [userData]);
//     return (
//         <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden flex flex-col">
//             {/* Background Glow */}
//             <div className="absolute inset-0 pointer-events-none overflow-hidden">
//                 <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/10 blur-[140px] rounded-full" />

//                 <div className="absolute bottom-[-250px] right-[-150px] w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />
//             </div>

//             {/* Navbar */}
//             <motion.div
//                 initial={{ y: -40, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
//             >
//                 <div className="max-w-7xl w-full mx-auto px-6 py-4 flex justify-between items-center">
//                     <div className="text-lg font-semibold">
//                         GenWeb<span className="text-zinc-500">.ai</span>
//                     </div>

//                     <div className="flex items-center gap-5">
//                         <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer transition" 
//                         onClick={()=>navigate("/pricing")}>
//                             Pricing
//                         </div>

//                         {userData && (
//                             <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition"  onClick={()=>navigate("/pricing")}>
//                                 <Coins
//                                     size={14}
//                                     className="text-yellow-400"
//                                 />

//                                 <span className="text-zinc-300"
                               
//                                 >
//                                     Credits
//                                 </span>

//                                 <span>{userData.credits}</span>

//                                 <span className="font-semibold">+</span>
//                             </div>
//                         )}

//                         {!userData ? (
//                             <button
//                                 className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm transition"
//                                 onClick={() => setOpenLogin(true)}
//                             >


//                                 Get Started
//                             </button>
//                         ) : (
//                             <div className="relative">
//                                 <button
//                                     className="flex items-center"
//                                     onClick={() =>
//                                         setOpenProfile(!openProfile)
//                                     }
//                                 >
//                                     <img
//                                         src={userData?.avatar}
//                                         alt={userData?.name || "User"}
//                                         referrerPolicy="no-referrer"
//                                         onError={(e) => {
//                                             e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                                                 userData?.name || "User"
//                                             )}`;
//                                         }}
//                                         className="w-9 h-9 rounded-full border border-white/20 object-cover"
//                                     />
//                                 </button>

//                                 <AnimatePresence>
//                                     {openProfile && (
//                                         <motion.div
//                                             initial={{
//                                                 opacity: 0,
//                                                 y: -10,
//                                                 scale: 0.95,
//                                             }}
//                                             animate={{
//                                                 opacity: 1,
//                                                 y: 0,
//                                                 scale: 1,
//                                             }}
//                                             exit={{
//                                                 opacity: 0,
//                                                 y: -10,
//                                                 scale: 0.95,
//                                             }}
//                                             className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
//                                         >
//                                             <div className="px-4 py-3 border-b border-white/10">
//                                                 <p className="text-sm font-medium truncate">
//                                                     {userData.name}
//                                                 </p>

//                                                 <p className="text-xs text-zinc-500 truncate">
//                                                     {userData.email}
//                                                 </p>
//                                             </div>

//                                             <button className="md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5">
//                                                 <Coins
//                                                     size={14}
//                                                     className="text-yellow-400"
//                                                 />

//                                                 <span className="text-zinc-300">
//                                                     Credits
//                                                 </span>

//                                                 <span>
//                                                     {userData.credits}
//                                                 </span>

//                                                 <span className="font-semibold">
//                                                     +
//                                                 </span>
//                                             </button>

//                                             <button
//                                                 className="w-full px-4 py-3 text-left text-sm hover:bg-white/5"
//                                                 onClick={() =>
//                                                     navigate("/dashboard")
//                                                 }
//                                             >
//                                                 Dashboard
//                                             </button>

//                                             <button
//                                                 className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5"
//                                                 onClick={handleLogOut}
//                                             >
//                                                 Log out
//                                             </button>
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </motion.div>

//             {/* Main Content */}
//             <main className="relative z-10 flex-1">
//                 {/* Hero Section */}
//                 <section className="pt-44 pb-32 px-6 text-center">
//                     <motion.h1
//                         initial={{ opacity: 0, y: 40 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="text-5xl md:text-7xl font-bold tracking-tight"
//                     >
//                         Build Stunning Websites
//                         <br />
//                         <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//                             with AI
//                         </span>
//                     </motion.h1>

//                     <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg"
//                     >
//                         Describe your idea and let AI generate a modern,
//                         responsive, production-ready website.
//                     </motion.p>

//                     <button
//                         className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12"
//                         onClick={() => userData? navigate("/dashboard"):setOpenLogin(true)}
//                     >
//                         {userData ? "Go to dashboard" : "Get Started"}
//                     </button>
//                 </section>

//                 {/* Highlights */}
//                 {!userData && 
//                 <section className="max-w-7xl mx-auto px-6 pb-32">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//                         {highlights.map((h, i) => (
//                             <motion.div
//                                 key={i}
//                                 initial={{ opacity: 0, y: 40 }}
//                                 whileInView={{
//                                     opacity: 1,
//                                     y: 0,
//                                 }}
//                                 transition={{ duration: 0.6 }}
//                                 viewport={{ once: true }}
//                                 className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] hover:border-white/20 transition"
//                             >
//                                 <h1 className="text-xl font-semibold mb-3">
//                                     {h}
//                                 </h1>

//                                 <p className="text-sm text-zinc-400">
//                                     GenWeb.ai builds real websites — clean
//                                     code, animations, responsiveness and
//                                     scalable structure.
//                                 </p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </section>
//                 }
//             </main>

//                 {userData && websites?.length>0 && (
//                     <section className="max-w-7xl mx-auto px-6 pb-32">

//                         <h3 className="text-2xl font-semibold mb-6">Your Websites</h3>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             {websites.slice(0,3).map((w,i)=>(
//                                 <motion.div
//                                 key={w._id}
//                                 whileHover={{y: -6}}
//                                 onClick={()=> navigate(`/editor/${w._id}`)}
//                                 className="cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
//                                 >
//                                     <div className="h-40 bg-black">
//                                         <iframe
//                                         srcDoc={w.latestCode}
//                                         className="w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
//                                         />
//                                     </div>

//                                     <div className="p-4">
//                                         <h3 className="text-base font-semibold line-clamp-2">
//               {w.title || "Untitled Website"}
//             </h3>

//             <p className="text-xs text-zinc-400">
//               Last Updated{" "}
//               {w.updatedAt
//                 ? new Date(w.updatedAt).toLocaleDateString()
//                 : "N/A"}
//             </p>
//                                     </div>
                                     


//                                 </motion.div>
//                             ))}

//                         </div>
//                     </section>
//                 )}
//             {/* ========================= */}
//             {/* ATTRACTIVE FIXED FOOTER */}
//             {/* ========================= */}

//             <footer className="relative z-20 mt-auto border-t border-white/[0.08] bg-black/60 backdrop-blur-xl">
//                 {/* Top Glow */}
//                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

//                 <div className="max-w-7xl mx-auto px-6 py-8">
//                     <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                         {/* Brand */}
//                         <div className="flex items-center gap-3">
//                             <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
//                                 <Sparkles
//                                     size={17}
//                                     className="text-black"
//                                 />
//                             </div>

//                             <div>
//                                 <h2 className="text-sm font-semibold">
//                                     GenWeb
//                                     <span className="text-zinc-500">
//                                         .ai
//                                     </span>
//                                 </h2>

//                                 <p className="text-xs text-zinc-600 mt-0.5">
//                                     Build the web with AI.
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Footer Links */}
//                         <div className="flex items-center gap-6 text-xs text-zinc-500">
//                             <button
//                                 onClick={() => navigate("/dashboard")}
//                                 className="hover:text-white transition"
//                             >
//                                 Dashboard
//                             </button>

//                             <button className="hover:text-white transition" onClick={()=>navigate("/pricing")}>
//                                 Pricing
//                             </button>

//                             <button className="hover:text-white transition">
//                                 About
//                             </button>
//                         </div>

//                         {/* Status */}
//                         <div className="flex items-center gap-2 text-xs text-zinc-500">
//                             <span className="relative flex h-2 w-2">
//                                 <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />

//                                 <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
//                             </span>

//                             AI Engine Online
//                         </div>
//                     </div>

//                     {/* Bottom Row */}
//                     <div className="mt-7 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
//                         <p className="text-xs text-zinc-600">
//                             © {new Date().getFullYear()} GenWeb.ai. All rights
//                             reserved.
//                         </p>

//                         {/* <p className="text-xs text-zinc-700">
//                             Made with{" "}
//                             <span className="text-zinc-500">
//                                 AI & creativity
//                             </span>
//                         </p> */}
//                     </div>
//                 </div>
//             </footer>

//             {/* Login Modal */}
//             {openLogin && (
//                 <LoginModel
//                     open={openLogin}
//                     onClose={() => setOpenLogin(false)}
//                 />
//             )}
//         </div>
//     );
// }

// export default Home;

