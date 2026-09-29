
import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ChevronRight,
    Coins,
    ExternalLink,
    Globe,
    LayoutTemplate,
    LogOut,
    Plus,
    Rocket,
    Share2,
    Sparkles,
    WandSparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice.js";

import axios from "axios";

function Dashboard() {
    const { userData } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [websites, setWebsites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copiedId, setCopiedId] = useState(null);
    const [deployingId, setDeployingId] = useState(null);

    // ==================================================
    // GET ALL WEBSITES
    // ==================================================

    const handleGetAllWebsites = async () => {
        setLoading(true);
        setError("");

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

            setError(
                error?.response?.data?.message ||
                    "Failed to load your websites"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetAllWebsites();
    }, []);

    // ==================================================
    // DEPLOY WEBSITE
    // ==================================================

    const handleDeploy = async (id) => {
        try {
            setDeployingId(id);

            const result = await axios.get(
                `${serverUrl}/api/website/deploy/${id}`,
                {
                    withCredentials: true,
                }
            );

            if (result.data?.url) {
                window.open(result.data.url, "_blank");
            }

            setWebsites((prev) =>
                prev.map((website) =>
                    website._id === id
                        ? {
                              ...website,
                              deployed: true,
                              deployUrl: result.data.url,
                          }
                        : website
                )
            );
        } catch (error) {
            console.log("Deploy error:", error);
        } finally {
            setDeployingId(null);
        }
    };

    // ==================================================
    // COPY DEPLOY URL
    // ==================================================

    const handleCopy = async (website) => {
        if (!website?.deployUrl) return;

        try {
            await navigator.clipboard.writeText(website.deployUrl);

            setCopiedId(website._id);

            setTimeout(() => {
                setCopiedId(null);
            }, 2000);
        } catch (error) {
            console.log("Copy error:", error);
        }
    };

    // ==================================================
    // LOGOUT
    // ==================================================

    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, {
                withCredentials: true,
            });

            dispatch(setUserData(null));
            navigate("/");
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    // ==================================================
    // STATS
    // ==================================================

    const totalWebsites = websites.length;

    const deployedWebsites = websites.filter(
        (website) => website.deployed
    ).length;

    const draftWebsites = totalWebsites - deployedWebsites;

    // ==================================================
    // LOADING SKELETON
    // ==================================================

    const WebsiteSkeleton = () => (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden animate-pulse">

            <div className="h-48 bg-white/[0.05]" />

            <div className="p-5 space-y-4">

                <div className="h-5 w-2/3 rounded bg-white/[0.07]" />

                <div className="h-3 w-1/3 rounded bg-white/[0.05]" />

                <div className="grid grid-cols-2 gap-3 pt-3">

                    <div className="h-10 rounded-xl bg-white/[0.06]" />

                    <div className="h-10 rounded-xl bg-white/[0.06]" />

                </div>

            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#030303] text-white">

            {/* ==================================================
                BACKGROUND
            ================================================== */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-purple-600/10 blur-[150px]" />

                <div className="absolute bottom-[-250px] right-[-200px] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px]" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

            </div>

            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/60 backdrop-blur-2xl">

                <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">

                    {/* LEFT */}

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => navigate("/")}
                            className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center hover:bg-white/[0.08] transition"
                        >
                            <ArrowLeft size={17} />
                        </button>

                        <div className="hidden sm:block h-5 w-px bg-white/10" />

                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2"
                        >
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                <Sparkles
                                    size={16}
                                    className="text-black"
                                />
                            </div>

                            <span className="font-semibold">
                                GenWeb
                                <span className="text-zinc-500">
                                    .ai
                                </span>
                            </span>
                        </button>

                    </div>

                    {/* RIGHT */}

                    <div className="flex items-center gap-3">

                        {/* Credits */}

                        <button
                            onClick={() => navigate("/pricing")}
                            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition"
                        >
                            <Coins
                                size={15}
                                className="text-yellow-400"
                            />

                            <span className="text-sm text-zinc-300">
                                {userData?.credits ?? 0}
                            </span>

                            <span className="text-xs text-zinc-500">
                                credits
                            </span>

                            <ChevronRight
                                size={14}
                                className="text-zinc-600"
                            />
                        </button>

                        {/* Profile */}

                        <div className="flex items-center gap-3">

                            <div className="hidden sm:block text-right">

                                <p className="text-sm font-medium">
                                    {userData?.name || "User"}
                                </p>

                                <p className="text-[11px] text-zinc-500">
                                    Workspace
                                </p>

                            </div>

                            <img
                                src={userData?.avatar}
                                alt={userData?.name || "User"}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            userData?.name || "User"
                                        )}`;
                                }}
                                className="w-9 h-9 rounded-full border border-white/20 object-cover"
                            />

                        </div>

                    </div>

                </div>

            </header>

            {/* ==================================================
                MAIN
            ================================================== */}

            <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-14">

                {/* ==================================================
                    WELCOME
                ================================================== */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/[0.08] via-white/[0.02] to-blue-500/[0.06] p-6 sm:p-10 mb-8"
                >

                    <div className="absolute right-[-100px] top-[-100px] w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px]" />

                    <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                        <div>

                            <div className="flex items-center gap-2 text-sm text-purple-300 mb-3">
                                <Sparkles size={15} />
                                Your creative workspace
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                Welcome back,{" "}
                                <span className="text-zinc-400">
                                    {userData?.name?.split(" ")[0] ||
                                        "Creator"}
                                </span>
                            </h1>

                            <p className="mt-3 max-w-xl text-sm sm:text-base leading-7 text-zinc-400">
                                Create, edit and deploy your AI-powered
                                websites from one place.
                            </p>

                        </div>

                        <button
                            onClick={() => navigate("/generate")}
                            className="group shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
                        >
                            <Plus size={18} />

                            New Website

                            <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition"
                            />
                        </button>

                    </div>

                </motion.section>

                {/* ==================================================
                    STATS
                ================================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">

                    {/* Total */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.1,
                        }}
                        className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-xs text-zinc-500 uppercase tracking-wider">
                                    Total Websites
                                </p>

                                <p className="text-3xl font-bold mt-2">
                                    {totalWebsites}
                                </p>

                            </div>

                            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                <LayoutTemplate
                                    size={20}
                                    className="text-purple-300"
                                />
                            </div>

                        </div>

                    </motion.div>

                    {/* Deployed */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.15,
                        }}
                        className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-xs text-zinc-500 uppercase tracking-wider">
                                    Deployed
                                </p>

                                <p className="text-3xl font-bold mt-2">
                                    {deployedWebsites}
                                </p>

                            </div>

                            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <Globe
                                    size={20}
                                    className="text-emerald-400"
                                />
                            </div>

                        </div>

                    </motion.div>

                    {/* Drafts */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.2,
                        }}
                        className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-xs text-zinc-500 uppercase tracking-wider">
                                    Drafts
                                </p>

                                <p className="text-3xl font-bold mt-2">
                                    {draftWebsites}
                                </p>

                            </div>

                            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <WandSparkles
                                    size={20}
                                    className="text-blue-300"
                                />
                            </div>

                        </div>

                    </motion.div>

                </div>

                {/* ==================================================
                    SECTION HEADER
                ================================================== */}

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

                    <div>

                        <p className="text-sm text-purple-400 font-medium mb-2">
                            YOUR PROJECTS
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-bold">
                            Websites
                        </h2>

                    </div>

                    {websites.length > 0 && (
                        <p className="text-sm text-zinc-500">
                            {websites.length}{" "}
                            {websites.length === 1
                                ? "project"
                                : "projects"}
                        </p>
                    )}

                </div>

                {/* ==================================================
                    LOADING
                ================================================== */}

                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                        <WebsiteSkeleton />
                        <WebsiteSkeleton />
                        <WebsiteSkeleton />

                    </div>
                )}

                {/* ==================================================
                    ERROR
                ================================================== */}

                {!loading && error && (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">

                        <p className="text-red-400 text-sm mb-4">
                            {error}
                        </p>

                        <button
                            onClick={handleGetAllWebsites}
                            className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold"
                        >
                            Try Again
                        </button>

                    </div>
                )}

                {/* ==================================================
                    EMPTY STATE
                ================================================== */}

                {!loading &&
                    !error &&
                    websites.length === 0 && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="relative overflow-hidden rounded-3xl border border-dashed border-white/10 bg-white/[0.02] py-20 px-6 text-center"
                        >

                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-purple-500/10 blur-[100px]" />

                            <div className="relative">

                                <div className="mx-auto w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6">
                                    <WandSparkles
                                        size={27}
                                        className="text-purple-300"
                                    />
                                </div>

                                <h3 className="text-xl font-semibold">
                                    Start building your first website
                                </h3>

                                <p className="max-w-md mx-auto mt-3 text-sm leading-6 text-zinc-500">
                                    Describe your idea and let GenWeb.ai
                                    turn it into a working website.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/generate")
                                    }
                                    className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
                                >
                                    <Sparkles size={17} />
                                    Create Website
                                </button>

                            </div>

                        </motion.div>
                    )}

                {/* ==================================================
                    WEBSITES
                ================================================== */}

                {!loading &&
                    !error &&
                    websites.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                            {websites.map((website, index) => {

                                const copied =
                                    copiedId === website._id;

                                const deploying =
                                    deployingId === website._id;

                                return (
                                    <motion.article
                                        key={
                                            website._id ||
                                            index
                                        }
                                        initial={{
                                            opacity: 0,
                                            y: 25,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay:
                                                index * 0.06,
                                        }}
                                        whileHover={{
                                            y: -5,
                                        }}
                                        className="group rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden hover:border-white/20 hover:bg-white/[0.04] transition"
                                    >

                                        {/* PREVIEW */}

                                        <div
                                            onClick={() =>
                                                navigate(
                                                    `/editor/${website._id}`
                                                )
                                            }
                                            className="relative h-48 bg-white overflow-hidden cursor-pointer"
                                        >

                                            {website.latestCode ? (
                                                <iframe
                                                    srcDoc={
                                                        website.latestCode
                                                    }
                                                    title={
                                                        website.title ||
                                                        "Website Preview"
                                                    }
                                                    className="absolute top-0 left-0 w-[140%] h-[140%] scale-[0.715] origin-top-left pointer-events-none"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                                    <LayoutTemplate
                                                        size={
                                                            30
                                                        }
                                                        className="text-zinc-600"
                                                    />
                                                </div>
                                            )}

                                            {/* Preview Overlay */}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-60 group-hover:opacity-80 transition" />

                                            {/* Status */}

                                            <div className="absolute top-3 left-3">

                                                {website.deployed ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/20 text-[11px] text-emerald-300 backdrop-blur-md">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                        Live
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] text-zinc-300 backdrop-blur-md">
                                                        Draft
                                                    </span>
                                                )}

                                            </div>

                                            {/* Open */}

                                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition">

                                                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                                                    <ExternalLink
                                                        size={
                                                            15
                                                        }
                                                    />
                                                </div>

                                            </div>

                                        </div>

                                        {/* INFO */}

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

                                                {website.deployed && (
                                                    <div className="shrink-0 w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                                        <Check
                                                            size={
                                                                14
                                                            }
                                                            className="text-emerald-400"
                                                        />
                                                    </div>
                                                )}

                                            </div>

                                            {/* ACTIONS */}

                                            <div className="grid grid-cols-2 gap-2 mt-5">

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/editor/${website._id}`
                                                        )
                                                    }
                                                    className="px-3 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition"
                                                >
                                                    Open Editor
                                                </button>

                                                {!website.deployed ? (
                                                    <button
                                                        disabled={
                                                            deploying
                                                        }
                                                        onClick={() =>
                                                            handleDeploy(
                                                                website._id
                                                            )
                                                        }
                                                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-semibold hover:bg-white/[0.1] transition disabled:opacity-50"
                                                    >
                                                        <Rocket
                                                            size={
                                                                14
                                                            }
                                                        />

                                                        {deploying
                                                            ? "Deploying..."
                                                            : "Deploy"}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleCopy(
                                                                website
                                                            )
                                                        }
                                                        className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border transition ${
                                                            copied
                                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                                : "bg-white/[0.06] border-white/10 hover:bg-white/[0.1]"
                                                        }`}
                                                    >
                                                        {copied ? (
                                                            <>
                                                                <Check
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                                Copied
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Share2
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                                Share
                                                            </>
                                                        )}
                                                    </button>
                                                )}

                                            </div>

                                            {/* LIVE LINK */}

                                            {website.deployed &&
                                                website.deployUrl && (
                                                    <button
                                                        onClick={() =>
                                                            window.open(
                                                                website.deployUrl,
                                                                "_blank"
                                                            )
                                                        }
                                                        className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/[0.04] transition"
                                                    >
                                                        <Globe
                                                            size={
                                                                13
                                                            }
                                                        />

                                                        View live website

                                                        <ArrowRight
                                                            size={
                                                                13
                                                            }
                                                        />
                                                    </button>
                                                )}

                                        </div>

                                    </motion.article>
                                );
                            })}

                        </div>
                    )}

            </main>

            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="relative z-10 border-t border-white/[0.08] mt-16">

                <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <div className="flex items-center gap-2">

                        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                            <Sparkles
                                size={14}
                                className="text-black"
                            />
                        </div>

                        <span className="text-sm font-medium">
                            GenWeb
                            <span className="text-zinc-500">
                                .ai
                            </span>
                        </span>

                    </div>

                    <div className="flex items-center gap-5 text-xs text-zinc-600">

                        <button
                            onClick={() => navigate("/")}
                            className="hover:text-white transition"
                        >
                            Home
                        </button>

                        <button
                            onClick={() =>
                                navigate("/pricing")
                            }
                            className="hover:text-white transition"
                        >
                            Pricing
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 hover:text-red-400 transition"
                        >
                            <LogOut size={13} />
                            Logout
                        </button>

                    </div>

                    <p className="text-xs text-zinc-700">
                        © {new Date().getFullYear()} GenWeb.ai
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Dashboard;










// import React, { useEffect, useState } from "react";
// import { ArrowLeft, Rocket, Share2, Check } from "lucide-react";
// import { motion } from "motion/react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { serverUrl } from "../App";
// import axios from "axios";

// function Dashboard() {
//   const { userData } = useSelector((state) => state.user);

//   const navigate = useNavigate();

//   const [websites, setWebsites] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [copiedId, setCopiedId] = useState(null);

//   const handleDeploy = async (id) => {
//     try {
//       const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, {
//         withCredentials: true,
//       });
//       window.open(`${result.data.url}`, "_blank");
//       setWebsites((prev)=> prev.map((w)=>
//     w._id === id
//       ?{...w, deployed: true, deployUrl: result.data.url}
//       : w
    
//     )
//     );

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const handleGetAllWebsites = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const result = await axios.get(`${serverUrl}/api/website/get-all`, {
//           withCredentials: true,
//         });

//         console.log("Get all websites response:", result);

//         // API is returning an array
//         setWebsites(result.data);
//       } catch (error) {
//         console.log("Get all websites error:", error);

//         setError(error?.response?.data?.message || "Failed to load websites");
//       } finally {
//         setLoading(false);
//       }
//     };

//     handleGetAllWebsites();
//   }, []);

//   const handleCopy = async (site) => {
//     await navigator.clipboard.writeText(site.deployUrl);
//     setCopiedId(site._id);
//     setTimeout(() => setCopiedId(null), 2000);
//   };
//   return (
//     <div className="min-h-screen bg-[#050505] text-white">
//       {/* Header */}
//       <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               className="p-2 rounded-lg hover:bg-white/10 transition"
//               onClick={() => navigate("/")}
//             >
//               <ArrowLeft size={17} />
//             </button>

//             <h1 className="text-lg font-semibold">Dashboard</h1>
//           </div>

//           <button
//             className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition"
//             onClick={() => navigate("/generate")}
//           >
//             + New Website
//           </button>
//         </div>
//       </div>

//       {/* Main */}
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         {/* Welcome */}
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-10"
//         >
//           <p className="text-sm text-zinc-400 mb-1">Welcome Back</p>

//           <h1 className="text-3xl font-bold">{userData?.name}</h1>
//         </motion.div>

//         {/* Loading */}
//         {loading && (
//           <div className="mt-24 text-center text-zinc-400">
//             Loading Your Websites...
//           </div>
//         )}

//         {/* Error */}
//         {error && !loading && (
//           <div className="mt-24 text-center text-red-400">{error}</div>
//         )}

//         {/* No websites */}
//         {!loading && !error && websites.length === 0 && (
//           <div className="mt-24 text-center">
//             <p className="text-zinc-400 mb-5">You have no websites</p>

//             <button
//               onClick={() => navigate("/generate")}
//               className="px-5 py-2 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
//             >
//               Create Your First Website
//             </button>
//           </div>
//         )}

//         {/* Websites */}
//     {!loading && !error && websites.length > 0 && (
//   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
//     {websites.map((w, i) => {
//       const copied = copiedId === w._id;

//       return (
//         <motion.div
//           key={w._id || i}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: i * 0.05 }}
//           whileHover={{ y: -6 }}
//           className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col"
//         >
//           {/* Website Preview */}
//           <div
//             className="relative h-40 bg-black cursor-pointer"
//             onClick={() => navigate(`/editor/${w._id}`)}
//           >
//             <iframe
//               srcDoc={w.latestCode || ""}
//               className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
//               title={w.title || "Website Preview"}
//             />

//             <div className="absolute inset-0 bg-black/30" />
//           </div>

//           {/* Website Info */}
//           <div className="p-5 flex flex-col gap-4 flex-1">

//             <h3 className="text-base font-semibold line-clamp-2">
//               {w.title || "Untitled Website"}
//             </h3>

//             <p className="text-xs text-zinc-400">
//               Last Updated{" "}
//               {w.updatedAt
//                 ? new Date(w.updatedAt).toLocaleDateString()
//                 : "N/A"}
//             </p>

//             {/* Open Editor */}
//             <button
//               onClick={() => navigate(`/editor/${w._id}`)}
//               className="mt-auto px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition"
//             >
//               Open Editor
//             </button>

//             {/* Deploy */}
//             {!w.deployed ? (
//               <button
//                 className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 transition"
//                 onClick={() => handleDeploy(w._id)}
//               >
//                 <Rocket size={18} />
//                 Deploy
//               </button>
//             ) : (
//               <motion.button
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleCopy(w)}
//                 className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
//                   copied
//                     ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
//                     : "bg-white/10 hover:bg-white/20 border border-white/10"
//                 }`}
//               >
//                 {copied ? (
//                   <>
//                     <Check size={14} />
//                     Link Copied
//                   </>
//                 ) : (
//                   <>
//                     <Share2 size={14} />
//                     Share Link
//                   </>
//                 )}
//               </motion.button>
//             )}
//           </div>
//         </motion.div>
//       );
//     })}
//   </div>
// )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
