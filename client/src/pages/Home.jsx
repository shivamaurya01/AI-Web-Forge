
import React from "react";

import { AnimatePresence, motion } from "motion/react";

import LoginModel from "../components/LoginModel.jsx";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Coins, Sparkles, ArrowUpRight } from "lucide-react";

import axios from "axios";

import { serverUrl } from "../App.jsx";

import { setUserData } from "../redux/userSlice.js";

import { useNavigate } from "react-router-dom";

function Home() {
    const highlights = [
        "AI Generated Code",
        "Fully Responsive Layouts",
        "Production Ready Output",
    ];

    const [openLogin, setOpenLogin] = useState(false);

    const { userData } = useSelector((state) => state.user);

    const [openProfile, setOpenProfile] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogOut = async () => {
        console.log("logout click");
        console.log("userData:", userData);

        try {
            await axios.get(`${serverUrl}/api/auth/logout`, {
                withCredentials: true,
            });

            dispatch(setUserData(null));
            setOpenProfile(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden flex flex-col">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/10 blur-[140px] rounded-full" />

                <div className="absolute bottom-[-250px] right-[-150px] w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />
            </div>

            {/* Navbar */}
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
            >
                <div className="max-w-7xl w-full mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-lg font-semibold">
                        GenWeb<span className="text-zinc-500">.ai</span>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer transition" 
                        onClick={()=>navigate("/pricing")}>
                            Pricing
                        </div>

                        {userData && (
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition"  onClick={()=>navigate("/pricing")}>
                                <Coins
                                    size={14}
                                    className="text-yellow-400"
                                />

                                <span className="text-zinc-300"
                               
                                >
                                    Credits
                                </span>

                                <span>{userData.credits}</span>

                                <span className="font-semibold">+</span>
                            </div>
                        )}

                        {!userData ? (
                            <button
                                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm transition"
                                onClick={() => setOpenLogin(true)}
                            >
                                Get Started
                            </button>
                        ) : (
                            <div className="relative">
                                <button
                                    className="flex items-center"
                                    onClick={() =>
                                        setOpenProfile(!openProfile)
                                    }
                                >
                                    <img
                                        src={userData?.avatar}
                                        alt={userData?.name || "User"}
                                        referrerPolicy="no-referrer"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                userData?.name || "User"
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
                                                scale: 0.95,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -10,
                                                scale: 0.95,
                                            }}
                                            className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                                        >
                                            <div className="px-4 py-3 border-b border-white/10">
                                                <p className="text-sm font-medium truncate">
                                                    {userData.name}
                                                </p>

                                                <p className="text-xs text-zinc-500 truncate">
                                                    {userData.email}
                                                </p>
                                            </div>

                                            <button className="md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5">
                                                <Coins
                                                    size={14}
                                                    className="text-yellow-400"
                                                />

                                                <span className="text-zinc-300">
                                                    Credits
                                                </span>

                                                <span>
                                                    {userData.credits}
                                                </span>

                                                <span className="font-semibold">
                                                    +
                                                </span>
                                            </button>

                                            <button
                                                className="w-full px-4 py-3 text-left text-sm hover:bg-white/5"
                                                onClick={() =>
                                                    navigate("/dashboard")
                                                }
                                            >
                                                Dashboard
                                            </button>

                                            <button
                                                className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5"
                                                onClick={handleLogOut}
                                            >
                                                Log out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <main className="relative z-10 flex-1">
                {/* Hero Section */}
                <section className="pt-44 pb-32 px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        Build Stunning Websites
                        <br />

                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            with AI
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg"
                    >
                        Describe your idea and let AI generate a modern,
                        responsive, production-ready website.
                    </motion.p>

                    <button
                        className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12"
                        onClick={() => navigate("/dashboard")}
                    >
                        {userData ? "Go to dashboard" : "Get Started"}
                    </button>
                </section>

                {/* Highlights */}
                <section className="max-w-7xl mx-auto px-6 pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] hover:border-white/20 transition"
                            >
                                <h1 className="text-xl font-semibold mb-3">
                                    {h}
                                </h1>

                                <p className="text-sm text-zinc-400">
                                    GenWeb.ai builds real websites — clean
                                    code, animations, responsiveness and
                                    scalable structure.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            {/* ========================= */}
            {/* ATTRACTIVE FIXED FOOTER */}
            {/* ========================= */}

            <footer className="relative z-20 mt-auto border-t border-white/[0.08] bg-black/60 backdrop-blur-xl">
                {/* Top Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                                <Sparkles
                                    size={17}
                                    className="text-black"
                                />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold">
                                    GenWeb
                                    <span className="text-zinc-500">
                                        .ai
                                    </span>
                                </h2>

                                <p className="text-xs text-zinc-600 mt-0.5">
                                    Build the web with AI.
                                </p>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="flex items-center gap-6 text-xs text-zinc-500">
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="hover:text-white transition"
                            >
                                Dashboard
                            </button>

                            <button className="hover:text-white transition" onClick={()=>navigate("/pricing")}>
                                Pricing
                            </button>

                            <button className="hover:text-white transition">
                                About
                            </button>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />

                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                            </span>

                            AI Engine Online
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="mt-7 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-zinc-600">
                            © {new Date().getFullYear()} GenWeb.ai. All rights
                            reserved.
                        </p>

                        {/* <p className="text-xs text-zinc-700">
                            Made with{" "}
                            <span className="text-zinc-500">
                                AI & creativity
                            </span>
                        </p> */}
                    </div>
                </div>
            </footer>

            {/* Login Modal */}
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

