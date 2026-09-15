import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { serverUrl } from "../App";
import { useParams } from "react-router-dom";

import {
    ClockFading,
    Code2,
    MessageSquare,
    Monitor,
    Rocket,
    Send,
    X,
} from "lucide-react";

import { AnimatePresence, motion } from "motion/react";
import Editor from "@monaco-editor/react";


function WebsiteEditor() {

    const { id } = useParams();

    const [website, setWebsite] = useState(null);
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [updateLoading, setUpdateLoading] = useState(false);
    const [thinkingIndex, setThinkingIndex] = useState(0);

    const [showCode, setShowCode] = useState(false);
    const [showFullPreview, setShowFullPreview] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const iframeRef = useRef(null);

    const thinkingSteps = [
        "Understanding your request...",
        "Planning layout changes...",
        "Improving layout changes...",
        "Applying responsiveness...",
        "Finalizing update...",
    ];


    // =========================
    // THINKING ANIMATION
    // =========================

    useEffect(() => {

        if (!updateLoading) {
            return;
        }

        const interval = setInterval(() => {

            setThinkingIndex(
                (i) => (i + 1) % thinkingSteps.length
            );

        }, 1500);

        return () => clearInterval(interval);

    }, [updateLoading]);


    // =========================
    // UPDATE WEBSITE
    // =========================

    const handleUpdate = async () => {

        if (!prompt.trim() || updateLoading) {
            return;
        }

        const currentPrompt = prompt.trim();

        setUpdateLoading(true);

        setThinkingIndex(0);

        // Show user message immediately
        setMessages((m) => [
            ...m,
            {
                role: "user",
                content: currentPrompt,
            },
        ]);

        // Clear input
        setPrompt("");


        try {

            const result = await axios.post(
                `${serverUrl}/api/website/update/${id}`,
                {
                    prompt: currentPrompt,
                },
                {
                    withCredentials: true,
                }
            );

            console.log("Update response:", result.data);


            // Add AI response
            setMessages((m) => [
                ...m,
                {
                    role: "ai",
                    content:
                        result.data.message ||
                        "Website updated successfully.",
                },
            ]);


            // Update generated code
            if (result.data.code) {
                setCode(result.data.code);
            }


            // Update website state
            setWebsite((prev) => {

                if (!prev) {
                    return prev;
                }

                return {
                    ...prev,

                    latestCode:
                        result.data.code || prev.latestCode,

                    conversation: [
                        ...(prev.conversation || []),

                        {
                            role: "user",
                            content: currentPrompt,
                        },

                        {
                            role: "ai",
                            content:
                                result.data.message ||
                                "Website updated successfully.",
                        },
                    ],
                };

            });


        } catch (error) {

            console.error(
                "Update website error:",
                error.response?.data || error.message
            );


            // Show error in chat
            setMessages((m) => [
                ...m,
                {
                    role: "ai",
                    content:
                        error.response?.data?.message ||
                        "Something went wrong while updating the website.",
                },
            ]);

        } finally {

            setUpdateLoading(false);

        }
    };


    // =========================
    // GET WEBSITE
    // =========================

    useEffect(() => {

        const handleGetWebsite = async () => {

            try {

                setError("");

                const result = await axios.get(
                    `${serverUrl}/api/website/get-by-id/${id}`,
                    {
                        withCredentials: true,
                    }
                );

                console.log("Website:", result.data);

                setWebsite(result.data);

                setCode(
                    result.data.latestCode || ""
                );

                setMessages(
                    result.data.conversation || []
                );


            } catch (error) {

                console.error(
                    "Get website error:",
                    error.response?.data || error.message
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load website."
                );

            }
        };


        if (id) {
            handleGetWebsite();
        }

    }, [id]);


    // =========================
    // UPDATE IFRAME
    // =========================

    useEffect(() => {

        if (!iframeRef.current || !code) {
            return;
        }

        const blob = new Blob(
            [code],
            {
                type: "text/html",
            }
        );

        const url = URL.createObjectURL(blob);

        iframeRef.current.src = url;

        return () => {
            URL.revokeObjectURL(url);
        };

    }, [code]);


    // =========================
    // ERROR SCREEN
    // =========================

    if (error) {

        return (
            <div className="h-screen w-screen flex items-center justify-center bg-[#050505] text-red-400 px-4 text-center">
                <div className="max-w-md">
                    <div className="text-lg font-semibold mb-2">
                        Something went wrong
                    </div>

                    <p className="text-sm text-red-300/80">
                        {error}
                    </p>
                </div>
            </div>
        );

    }


    // =========================
    // LOADING SCREEN
    // =========================

    if (!website) {

        return (
            <div className="h-screen w-screen flex items-center justify-center bg-[#050505] text-zinc-400">

                <div className="flex flex-col items-center gap-4">

                    <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin" />

                    <span className="text-sm">
                        Loading website...
                    </span>

                </div>

            </div>
        );

    }


    // =========================
    // CHAT MESSAGE COMPONENT
    // =========================

    const MessageList = () => {

        return (
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

                {messages.length === 0 && (

                    <div className="h-full flex items-center justify-center">

                        <div className="text-center max-w-[250px]">

                            <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">

                                <MessageSquare
                                    size={21}
                                    className="text-zinc-400"
                                />

                            </div>

                            <h3 className="text-sm font-semibold text-white mb-1">
                                Start building
                            </h3>

                            <p className="text-xs leading-relaxed text-zinc-500">
                                Tell the AI what you want to change in your website.
                            </p>

                        </div>

                    </div>

                )}


                {messages.map((m, i) => (

                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            y: 8,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className={`flex items-end gap-2 ${
                            m.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >

                        {m.role !== "user" && (

                            <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">

                                <span className="text-[10px] font-bold text-white">
                                    AI
                                </span>

                            </div>

                        )}


                        <div
                            className={`max-w-[82%] ${
                                m.role === "user"
                                    ? "items-end"
                                    : "items-start"
                            } flex flex-col`}
                        >

                            <div
                                className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed break-words ${
                                    m.role === "user"
                                        ? "bg-white text-black rounded-br-md"
                                        : "bg-[#111111] border border-white/10 text-zinc-200 rounded-bl-md"
                                }`}
                            >
                                {m.content}
                            </div>

                        </div>

                    </motion.div>

                ))}


                {/* AI THINKING */}

                {updateLoading && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 8,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="flex items-end gap-2"
                    >

                        <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">

                            <span className="text-[10px] font-bold">
                                AI
                            </span>

                        </div>


                        <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-[#111111] border border-white/10">

                            <div className="flex items-center gap-2">

                                <div className="flex gap-1">

                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" />

                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce"
                                        style={{
                                            animationDelay: "120ms",
                                        }}
                                    />

                                    <span
                                        className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce"
                                        style={{
                                            animationDelay: "240ms",
                                        }}
                                    />

                                </div>

                                <span className="text-xs text-zinc-500">
                                    {thinkingSteps[thinkingIndex]}
                                </span>

                            </div>

                        </div>

                    </motion.div>

                )}

            </div>
        );

    };


    // =========================
    // CHAT INPUT
    // =========================

    const ChatInput = () => {

        return (

            <div className="shrink-0 p-3 border-t border-white/10 bg-[#070707]">

                <div className="relative flex items-center">

                    <input
                        type="text"
                        placeholder="Describe changes..."
                        className="w-full min-w-0 h-11 pl-4 pr-12 rounded-xl bg-[#111111] border border-white/10 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/20 focus:bg-[#151515] disabled:opacity-50"
                        onChange={(e) =>
                            setPrompt(e.target.value)
                        }
                        value={prompt}
                        disabled={updateLoading}
                        onKeyDown={(e) => {

                            if (
                                e.key === "Enter" &&
                                !e.shiftKey
                            ) {

                                e.preventDefault();

                                handleUpdate();

                            }

                        }}
                    />


                    <button
                        onClick={handleUpdate}
                        disabled={
                            updateLoading ||
                            !prompt.trim()
                        }
                        className="absolute right-1.5 w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >

                        {updateLoading ? (

                            <div className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />

                        ) : (

                            <Send size={14} />

                        )}

                    </button>

                </div>


                <p className="text-[10px] text-zinc-600 text-center mt-2">
                    Press Enter to update your website
                </p>

            </div>

        );

    };


    // =========================
    // MAIN EDITOR
    // =========================

    return (

        <div className="h-screen w-screen flex bg-[#050505] text-white overflow-hidden">


            {/* ================================================= */}
            {/* DESKTOP AI SIDEBAR */}
            {/* ================================================= */}

            <aside className="hidden lg:flex w-[320px] xl:w-[350px] 2xl:w-[370px] shrink-0 flex-col border-r border-white/10 bg-[#080808]">


                {/* ================= HEADER ================= */}

                <Header />


                {/* ================= CHAT ================= */}

                <div className="flex-1 flex flex-col min-h-0">

                    <MessageList />

                    <ChatInput />

                </div>

            </aside>



            {/* ================================================= */}
            {/* PREVIEW AREA */}
            {/* ================================================= */}

            <main className="flex-1 min-w-0 flex flex-col bg-[#0a0a0a]">


                {/* ================= PREVIEW TOOLBAR ================= */}

                <div className="h-14 shrink-0 px-3 sm:px-4 flex items-center justify-between border-b border-white/10 bg-[#080808]">


                    {/* LEFT SIDE */}

                    <div className="flex items-center gap-3 min-w-0">

                        <div className="hidden sm:flex w-8 h-8 rounded-lg bg-white/5 border border-white/10 items-center justify-center">

                            <Monitor
                                size={15}
                                className="text-zinc-400"
                            />

                        </div>


                        <div className="min-w-0">

                            <p className="text-sm font-medium text-white truncate">
                                {website.title}
                            </p>

                            <div className="flex items-center gap-1.5">

                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                                <span className="text-[10px] text-zinc-500">
                                    Live Preview
                                </span>

                            </div>

                        </div>

                    </div>



                    {/* RIGHT SIDE */}

                    <div className="flex items-center gap-1.5">


                        {/* MOBILE CHAT */}

                        <button
                            onClick={() =>
                                setShowChat(true)
                            }
                            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            title="Open chat"
                        >

                            <MessageSquare size={17} />

                        </button>



                        {/* CODE */}

                        <button
                            onClick={() =>
                                setShowCode(true)
                            }
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            title="Open code"
                        >

                            <Code2 size={17} />

                        </button>



                        {/* FULLSCREEN */}

                        <button
                            onClick={() =>
                                setShowFullPreview(true)
                            }
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            title="Fullscreen preview"
                        >

                            <Monitor size={17} />

                        </button>



                        {/* DEPLOY */}

                        <button
                            className="ml-1 h-9 px-3 sm:px-4 rounded-lg bg-white text-black flex items-center gap-1.5 text-xs font-semibold hover:bg-zinc-200 transition"
                        >

                            <Rocket size={14} />

                            <span className="hidden sm:inline">
                                Deploy
                            </span>

                        </button>

                    </div>

                </div>



                {/* ================================================= */}
                {/* WEBSITE PREVIEW */}
                {/* ================================================= */}

                <div className="flex-1 min-h-0 p-2 sm:p-3 lg:p-4 xl:p-5 bg-[#0a0a0a]">


                    {/* PREVIEW FRAME */}

                    <div className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 bg-white shadow-2xl">


                        {/* ================= BROWSER BAR ================= */}

                        <div className="absolute top-0 left-0 right-0 z-10 h-9 bg-[#f5f5f5] border-b border-black/10 flex items-center px-3">


                            <div className="flex items-center gap-1.5">

                                <span className="w-2.5 h-2.5 rounded-full bg-black/15" />

                                <span className="w-2.5 h-2.5 rounded-full bg-black/15" />

                                <span className="w-2.5 h-2.5 rounded-full bg-black/15" />

                            </div>


                            <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2">

                                <div className="px-4 py-1 rounded-md bg-black/5 text-[10px] text-black/40">

                                    Preview

                                </div>

                            </div>


                        </div>



                        {/* ================= IFRAME ================= */}

                        <div className="w-full h-full pt-9">

                            <iframe
                                ref={iframeRef}
                                title="Website Preview"
                                className="w-full h-full bg-white border-0"
                            />

                        </div>


                    </div>

                </div>

            </main>



            {/* ================================================= */}
            {/* CODE DRAWER */}
            {/* ================================================= */}

            <AnimatePresence>

                {showCode && (

                    <motion.div
                        initial={{
                            x: "100%",
                        }}
                        animate={{
                            x: 0,
                        }}
                        exit={{
                            x: "100%",
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="fixed inset-y-0 right-0 w-full sm:w-[90%] md:w-[75%] lg:w-[55%] xl:w-[48%] z-[9999] bg-[#1e1e1e] border-l border-white/10 shadow-2xl flex flex-col"
                    >


                        {/* CODE HEADER */}

                        <div className="h-12 shrink-0 px-4 flex items-center justify-between border-b border-white/10 bg-[#1e1e1e]">

                            <div className="flex items-center gap-2">

                                <Code2
                                    size={16}
                                    className="text-zinc-400"
                                />

                                <span className="text-sm font-medium">
                                    index.html
                                </span>

                            </div>


                            <button
                                onClick={() =>
                                    setShowCode(false)
                                }
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                                title="Close editor"
                            >

                                <X size={17} />

                            </button>

                        </div>



                        {/* MONACO EDITOR */}

                        <div className="flex-1 min-h-0">

                            <Editor
                                height="100%"
                                language="html"
                                value={code}
                                theme="vs-dark"
                                onChange={(value) =>
                                    setCode(value || "")
                                }
                                options={{
                                    minimap: {
                                        enabled: false,
                                    },

                                    fontSize: 14,

                                    lineNumbers: "on",

                                    wordWrap: "on",

                                    automaticLayout: true,

                                    padding: {
                                        top: 12,
                                        bottom: 12,
                                    },

                                    scrollBeyondLastLine: false,

                                    smoothScrolling: true,

                                    cursorSmoothCaretAnimation: "on",

                                    renderWhitespace: "selection",
                                }}
                            />

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>



            {/* ================================================= */}
            {/* FULLSCREEN PREVIEW */}
            {/* ================================================= */}

            <AnimatePresence>

                {showFullPreview && (

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="fixed inset-0 z-[9999] bg-black flex flex-col"
                    >


                        {/* FULLSCREEN HEADER */}

                        <div className="h-12 shrink-0 bg-[#090909] border-b border-white/10 flex items-center justify-between px-4">

                            <div className="flex items-center gap-2">

                                <Monitor
                                    size={16}
                                    className="text-zinc-400"
                                />

                                <span className="text-sm text-zinc-300">
                                    Full Preview
                                </span>

                            </div>


                            <button
                                onClick={() =>
                                    setShowFullPreview(false)
                                }
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            >

                                <X size={18} />

                            </button>

                        </div>



                        {/* FULLSCREEN WEBSITE */}

                        <div className="flex-1 min-h-0 bg-white">

                            <iframe
                                title="Full Website Preview"
                                className="w-full h-full border-0 bg-white"
                                srcDoc={code}
                            />

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>



            {/* ================================================= */}
            {/* MOBILE CHAT */}
            {/* ================================================= */}

            <AnimatePresence>

                {showChat && (

                    <motion.div
                        initial={{
                            y: "100%",
                        }}
                        animate={{
                            y: 0,
                        }}
                        exit={{
                            y: "100%",
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col"
                    >


                        {/* MOBILE CHAT HEADER */}

                        <div className="h-14 shrink-0 px-4 flex items-center justify-between border-b border-white/10 bg-[#080808]">

                            <div className="flex items-center gap-2 min-w-0">

                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">

                                    <span className="text-[10px] font-bold">
                                        AI
                                    </span>

                                </div>


                                <div className="min-w-0">

                                    <p className="text-sm font-medium truncate">
                                        {website.title}
                                    </p>

                                    <p className="text-[10px] text-zinc-500">
                                        AI Website Assistant
                                    </p>

                                </div>

                            </div>


                            <button
                                onClick={() =>
                                    setShowChat(false)
                                }
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            >

                                <X size={18} />

                            </button>

                        </div>



                        {/* MOBILE CHAT BODY */}

                        <div className="flex-1 flex flex-col min-h-0">

                            <MessageList />

                            <ChatInput />

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>
    );


    // =========================
    // HEADER COMPONENT
    // =========================

    function Header() {

        return (

            <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 shrink-0 bg-[#080808]">


                <div className="flex items-center gap-3 min-w-0">

                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shrink-0">

                        <ClockFading
                            size={16}
                            className="text-white"
                        />

                    </div>


                    <div className="min-w-0">

                        <p className="text-sm font-semibold text-white truncate">
                            {website.title}
                        </p>

                        <div className="flex items-center gap-1.5">

                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                            <span className="text-[10px] text-zinc-500">
                                AI Assistant
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        );

    }

}


export default WebsiteEditor;









































// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { serverUrl } from "../App";
// import { useParams } from "react-router-dom";

// import {
//     ClockFading,
//     Code2,
//     MessageSquare,
//     Monitor,
//     Rocket,
//     Send,
//     X,
//     Sparkles,
//     Bot,
//     User,
//     Eye,
//     Terminal,
//     Maximize2,
//     ChevronLeft,
// } from "lucide-react";

// import { AnimatePresence, motion } from "motion/react";
// import Editor from "@monaco-editor/react";


// function WebsiteEditor() {

//     const { id } = useParams();

//     const [website, setWebsite] = useState(null);
//     const [error, setError] = useState("");
//     const [code, setCode] = useState("");
//     const [messages, setMessages] = useState([]);
//     const [prompt, setPrompt] = useState("");
//     const [updateLoading, setUpdateLoading] = useState(false);
//     const [thinkingIndex, setThinkingIndex] = useState(0);

//     const [showCode, setShowCode] = useState(false);
//     const [showFullPreview, setShowFullPreview] = useState(false);
//     const [showChat, setShowChat] = useState(false);

//     const iframeRef = useRef(null);

//     const thinkingSteps = [
//         "Understanding your request...",
//         "Planning layout changes...",
//         "Improving layout changes...",
//         "Applying responsiveness...",
//         "Finalizing update...",
//     ];


//     // =========================
//     // THINKING ANIMATION
//     // =========================

//     useEffect(() => {

//         if (!updateLoading) {
//             return;
//         }

//         const interval = setInterval(() => {

//             setThinkingIndex(
//                 (i) => (i + 1) % thinkingSteps.length
//             );

//         }, 1500);

//         return () => clearInterval(interval);

//     }, [updateLoading]);


//     // =========================
//     // UPDATE WEBSITE
//     // =========================

//     const handleUpdate = async () => {

//         if (!prompt.trim() || updateLoading) {
//             return;
//         }

//         const currentPrompt = prompt.trim();

//         setUpdateLoading(true);

//         // Reset thinking animation
//         setThinkingIndex(0);

//         // Show user message immediately
//         setMessages((m) => [
//             ...m,
//             {
//                 role: "user",
//                 content: currentPrompt,
//             },
//         ]);

//         // Clear input
//         setPrompt("");


//         try {

//             const result = await axios.post(
//                 `${serverUrl}/api/website/update/${id}`,
//                 {
//                     prompt: currentPrompt,
//                 },
//                 {
//                     withCredentials: true,
//                 }
//             );

//             console.log("Update response:", result.data);


//             // Add AI response
//             setMessages((m) => [
//                 ...m,
//                 {
//                     role: "ai",
//                     content:
//                         result.data.message ||
//                         "Website updated successfully.",
//                 },
//             ]);


//             // Update generated code
//             if (result.data.code) {
//                 setCode(result.data.code);
//             }


//             // Update website state
//             setWebsite((prev) => {

//                 if (!prev) {
//                     return prev;
//                 }

//                 return {
//                     ...prev,

//                     latestCode:
//                         result.data.code || prev.latestCode,

//                     conversation: [
//                         ...(prev.conversation || []),

//                         {
//                             role: "user",
//                             content: currentPrompt,
//                         },

//                         {
//                             role: "ai",
//                             content:
//                                 result.data.message ||
//                                 "Website updated successfully.",
//                         },
//                     ],
//                 };

//             });


//         } catch (error) {

//             console.error(
//                 "Update website error:",
//                 error.response?.data || error.message
//             );


//             // Show error in chat
//             setMessages((m) => [
//                 ...m,
//                 {
//                     role: "ai",
//                     content:
//                         error.response?.data?.message ||
//                         "Something went wrong while updating the website.",
//                 },
//             ]);

//         } finally {

//             setUpdateLoading(false);

//         }
//     };


//     // =========================
//     // GET WEBSITE
//     // =========================

//     useEffect(() => {

//         const handleGetWebsite = async () => {

//             try {

//                 setError("");

//                 const result = await axios.get(
//                     `${serverUrl}/api/website/get-by-id/${id}`,
//                     {
//                         withCredentials: true,
//                     }
//                 );

//                 console.log("Website:", result.data);

//                 setWebsite(result.data);

//                 setCode(
//                     result.data.latestCode || ""
//                 );

//                 setMessages(
//                     result.data.conversation || []
//                 );

//             } catch (error) {

//                 console.error(
//                     "Get website error:",
//                     error.response?.data || error.message
//                 );

//                 setError(
//                     error.response?.data?.message ||
//                     "Unable to load website."
//                 );
//             }
//         };


//         if (id) {
//             handleGetWebsite();
//         }

//     }, [id]);


//     // =========================
//     // UPDATE IFRAME
//     // =========================

//     useEffect(() => {

//         if (!iframeRef.current || !code) {
//             return;
//         }

//         const blob = new Blob(
//             [code],
//             {
//                 type: "text/html",
//             }
//         );

//         const url = URL.createObjectURL(blob);

//         iframeRef.current.src = url;

//         return () => {
//             URL.revokeObjectURL(url);
//         };

//     }, [code]);


//     // =========================
//     // ERROR SCREEN
//     // =========================

//     if (error) {

//         return (
//             <div className="h-screen w-screen flex items-center justify-center bg-[#050505] text-white px-6">

//                 <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center">

//                     <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">

//                         <X
//                             size={25}
//                             className="text-red-400"
//                         />

//                     </div>

//                     <h2 className="text-lg font-semibold mb-2">
//                         Unable to load website
//                     </h2>

//                     <p className="text-sm text-zinc-400 leading-relaxed">
//                         {error}
//                     </p>

//                 </div>

//             </div>
//         );
//     }


//     // =========================
//     // LOADING SCREEN
//     // =========================

//     if (!website) {

//         return (
//             <div className="h-screen w-screen flex items-center justify-center bg-[#050505] text-white">

//                 <div className="flex flex-col items-center gap-5">

//                     <div className="relative">

//                         <div className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">

//                             <Sparkles
//                                 size={22}
//                                 className="text-purple-400"
//                             />

//                         </div>

//                         <div className="absolute -inset-2 rounded-2xl border border-purple-500/10 animate-pulse" />

//                     </div>

//                     <div className="text-center">

//                         <p className="text-sm font-medium">
//                             Loading your website
//                         </p>

//                         <p className="text-xs text-zinc-500 mt-1">
//                             Preparing the editor...
//                         </p>

//                     </div>

//                 </div>

//             </div>
//         );
//     }


//     // =========================
//     // MESSAGE COMPONENT
//     // =========================

//     const MessageList = ({ mobile = false }) => {

//         return (
//             <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

//                 {messages.length === 0 && (

//                     <div className="h-full flex items-center justify-center">

//                         <div className="max-w-[280px] text-center">

//                             <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/20">

//                                 <Sparkles
//                                     size={23}
//                                     className="text-purple-400"
//                                 />

//                             </div>

//                             <h3 className="text-sm font-semibold text-white mb-2">
//                                 Let's build something amazing
//                             </h3>

//                             <p className="text-xs leading-relaxed text-zinc-500">
//                                 Tell the AI what you want to change in your
//                                 website. For example, "Make the hero section
//                                 more modern."
//                             </p>

//                         </div>

//                     </div>
//                 )}


//                 {messages.map((m, i) => (

//                     <motion.div
//                         key={i}
//                         initial={{
//                             opacity: 0,
//                             y: 8,
//                         }}
//                         animate={{
//                             opacity: 1,
//                             y: 0,
//                         }}
//                         transition={{
//                             duration: 0.2,
//                         }}
//                         className={`flex gap-2.5 ${
//                             m.role === "user"
//                                 ? "justify-end"
//                                 : "justify-start"
//                         }`}
//                     >

//                         {/* AI ICON */}

//                         {m.role !== "user" && (

//                             <div className="w-7 h-7 shrink-0 mt-1 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/20 flex items-center justify-center">

//                                 <Bot
//                                     size={14}
//                                     className="text-purple-400"
//                                 />

//                             </div>

//                         )}


//                         {/* MESSAGE */}

//                         <div
//                             className={`max-w-[82%] ${
//                                 m.role === "user"
//                                     ? "items-end"
//                                     : "items-start"
//                             } flex flex-col`}
//                         >

//                             <div
//                                 className={`px-4 py-3 rounded-2xl text-sm leading-relaxed break-words whitespace-pre-wrap ${
//                                     m.role === "user"
//                                         ? "bg-white text-black rounded-br-md shadow-lg shadow-white/5"
//                                         : "bg-white/[0.045] border border-white/[0.08] text-zinc-200 rounded-bl-md"
//                                 }`}
//                             >

//                                 {m.content}

//                             </div>

//                             <span className="text-[10px] text-zinc-600 mt-1.5 px-1">

//                                 {m.role === "user"
//                                     ? "You"
//                                     : "AI Assistant"}

//                             </span>

//                         </div>


//                         {/* USER ICON */}

//                         {m.role === "user" && (

//                             <div className="w-7 h-7 shrink-0 mt-1 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">

//                                 <User
//                                     size={13}
//                                     className="text-zinc-300"
//                                 />

//                             </div>

//                         )}

//                     </motion.div>

//                 ))}


//                 {/* ================= AI THINKING ================= */}

//                 {updateLoading && (

//                     <motion.div
//                         initial={{
//                             opacity: 0,
//                             y: 8,
//                         }}
//                         animate={{
//                             opacity: 1,
//                             y: 0,
//                         }}
//                         className="flex gap-2.5"
//                     >

//                         <div className="w-7 h-7 shrink-0 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/20 flex items-center justify-center">

//                             <Sparkles
//                                 size={13}
//                                 className="text-purple-400 animate-pulse"
//                             />

//                         </div>

//                         <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.045] border border-white/[0.08]">

//                             <div className="flex items-center gap-2">

//                                 <div className="flex gap-1">

//                                     <span className="w-1 h-1 rounded-full bg-purple-400 animate-bounce" />

//                                     <span
//                                         className="w-1 h-1 rounded-full bg-purple-400 animate-bounce"
//                                         style={{
//                                             animationDelay: "0.15s",
//                                         }}
//                                     />

//                                     <span
//                                         className="w-1 h-1 rounded-full bg-purple-400 animate-bounce"
//                                         style={{
//                                             animationDelay: "0.3s",
//                                         }}
//                                     />

//                                 </div>

//                                 <span className="text-xs text-zinc-400">
//                                     {thinkingSteps[thinkingIndex]}
//                                 </span>

//                             </div>

//                         </div>

//                     </motion.div>

//                 )}

//             </div>
//         );
//     };


//     // =========================
//     // CHAT INPUT
//     // =========================

//     const ChatInput = () => {

//         return (
//             <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-black/40 shrink-0">

//                 <div className="relative flex items-center gap-2 rounded-2xl border border-white/[0.10] bg-white/[0.045] p-1.5 transition-all focus-within:border-purple-500/40 focus-within:bg-white/[0.06]">

//                     <input
//                         type="text"
//                         placeholder="Describe a change..."
//                         className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none disabled:opacity-50"
//                         onChange={(e) =>
//                             setPrompt(e.target.value)
//                         }
//                         value={prompt}
//                         disabled={updateLoading}
//                         onKeyDown={(e) => {

//                             if (
//                                 e.key === "Enter" &&
//                                 !e.shiftKey
//                             ) {

//                                 e.preventDefault();

//                                 handleUpdate();

//                             }

//                         }}
//                     />

//                     <button
//                         className="w-10 h-10 shrink-0 rounded-xl bg-white text-black flex items-center justify-center transition-all hover:bg-zinc-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
//                         onClick={handleUpdate}
//                         disabled={
//                             updateLoading ||
//                             !prompt.trim()
//                         }
//                         title="Send message"
//                     >

//                         {updateLoading ? (

//                             <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />

//                         ) : (

//                             <Send size={15} />

//                         )}

//                     </button>

//                 </div>

//                 <p className="text-[10px] text-zinc-600 text-center mt-2">
//                     Press Enter to send
//                 </p>

//             </div>
//         );
//     };


//     // =========================
//     // HEADER COMPONENT
//     // =========================

//     function Header({ mobile = false, onClose }) {

//         return (

//             <div className="h-14 px-4 flex items-center justify-between border-b border-white/[0.08] shrink-0 bg-black/60 backdrop-blur-xl">

//                 <div className="flex items-center gap-3 min-w-0">

//                     <div className="relative shrink-0">

//                         <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/20 flex items-center justify-center">

//                             <ClockFading
//                                 size={16}
//                                 className="text-purple-400"
//                             />

//                         </div>

//                         <span className="absolute -right-0.5 -bottom-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-black" />

//                     </div>


//                     <div className="min-w-0">

//                         <p className="text-[11px] text-zinc-500 leading-none mb-1">
//                             Editing
//                         </p>

//                         <span className="font-semibold text-sm truncate block max-w-[240px]">
//                             {website.title}
//                         </span>

//                     </div>

//                 </div>


//                 {mobile && (

//                     <button
//                         onClick={onClose}
//                         className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition"
//                         title="Close chat"
//                     >

//                         <X size={18} />

//                     </button>

//                 )}

//             </div>
//         );
//     }


//     // =========================
//     // MAIN EDITOR
//     // =========================

//     return (

//         <div className="h-screen w-screen flex bg-[#050505] text-white overflow-hidden">


//             {/* ================================================= */}
//             {/* SIDEBAR */}
//             {/* ================================================= */}

//             <aside className="hidden lg:flex w-[390px] xl:w-[410px] flex-col border-r border-white/[0.08] bg-black">

//                 <Header />


//                 <div className="flex-1 flex flex-col min-h-0">

//                     {/* CHAT TOP INFO */}

//                     <div className="px-4 py-3 border-b border-white/[0.06]">

//                         <div className="flex items-center justify-between">

//                             <div className="flex items-center gap-2">

//                                 <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">

//                                     <MessageSquare
//                                         size={14}
//                                         className="text-zinc-400"
//                                     />

//                                 </div>

//                                 <div>

//                                     <p className="text-xs font-medium">
//                                         AI Assistant
//                                     </p>

//                                     <p className="text-[10px] text-zinc-600">
//                                         Describe what you want to change
//                                     </p>

//                                 </div>

//                             </div>


//                             <div className="flex items-center gap-1.5">

//                                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

//                                 <span className="text-[10px] text-zinc-500">
//                                     Ready
//                                 </span>

//                             </div>

//                         </div>

//                     </div>


//                     {/* MESSAGES */}

//                     <MessageList />


//                     {/* INPUT */}

//                     <ChatInput />

//                 </div>

//             </aside>


//             {/* ================================================= */}
//             {/* PREVIEW */}
//             {/* ================================================= */}

//             <div className="flex-1 flex flex-col min-w-0 bg-[#0b0b0b]">


//                 {/* ================= PREVIEW HEADER ================= */}

//                 <div className="h-14 px-3 sm:px-4 flex justify-between items-center border-b border-white/[0.08] bg-black/70 backdrop-blur-xl shrink-0">

//                     {/* LEFT */}

//                     <div className="flex items-center gap-3 min-w-0">

//                         <div className="hidden sm:flex items-center gap-2">

//                             <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">

//                                 <Eye
//                                     size={14}
//                                     className="text-zinc-400"
//                                 />

//                             </div>

//                         </div>

//                         <div className="min-w-0">

//                             <p className="text-[10px] uppercase tracking-wider text-zinc-600">
//                                 Preview
//                             </p>

//                             <p className="text-xs font-medium text-zinc-300 truncate max-w-[180px] sm:max-w-[300px]">
//                                 {website.title}
//                             </p>

//                         </div>

//                     </div>


//                     {/* RIGHT ACTIONS */}

//                     <div className="flex items-center gap-1.5">


//                         {/* DEPLOY */}

//                         <button
//                             className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-xs font-semibold shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:brightness-110 active:scale-[0.98] transition"
//                             title="Deploy website"
//                         >

//                             <Rocket size={14} />

//                             <span>
//                                 Deploy
//                             </span>

//                         </button>


//                         {/* MOBILE CHAT */}

//                         <button
//                             className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
//                             onClick={() => setShowChat(true)}
//                             title="Open AI assistant"
//                         >

//                             <MessageSquare
//                                 size={17}
//                                 className="text-zinc-300"
//                             />

//                         </button>


//                         {/* CODE */}

//                         <button
//                             className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition"
//                             onClick={() => setShowCode(true)}
//                             title="Open code editor"
//                         >

//                             <Code2
//                                 size={17}
//                                 className="text-zinc-300"
//                             />

//                         </button>


//                         {/* FULL PREVIEW */}

//                         <button
//                             className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition"
//                             onClick={() => setShowFullPreview(true)}
//                             title="Open full preview"
//                         >

//                             <Maximize2
//                                 size={16}
//                                 className="text-zinc-300"
//                             />

//                         </button>

//                     </div>

//                 </div>


//                 {/* ================= PREVIEW AREA ================= */}

//                 <div className="flex-1 min-h-0 p-0 sm:p-2 lg:p-3">

//                     <div className="relative w-full h-full overflow-hidden sm:rounded-2xl border border-white/[0.08] bg-white shadow-2xl">

//                         {/* BROWSER DOTS */}

//                         <div className="hidden sm:flex absolute top-0 left-0 right-0 h-9 z-10 items-center gap-1.5 px-4 bg-black/[0.04] border-b border-black/10 pointer-events-none">

//                             <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
//                             <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
//                             <span className="w-2.5 h-2.5 rounded-full bg-black/15" />

//                         </div>


//                         <iframe
//                             ref={iframeRef}
//                             title="Website Preview"
//                             className="w-full h-full bg-white border-0"
//                         />

//                     </div>

//                 </div>

//             </div>


//             {/* ================================================= */}
//             {/* CODE EDITOR */}
//             {/* ================================================= */}

//             <AnimatePresence>

//                 {showCode && (

//                     <motion.div
//                         initial={{
//                             x: "100%",
//                             opacity: 0.5,
//                         }}
//                         animate={{
//                             x: 0,
//                             opacity: 1,
//                         }}
//                         exit={{
//                             x: "100%",
//                             opacity: 0.5,
//                         }}
//                         transition={{
//                             duration: 0.28,
//                             ease: "easeOut",
//                         }}
//                         className="fixed inset-y-0 right-0 w-full sm:w-[90%] lg:w-[55%] xl:w-[50%] z-[9999] bg-[#1e1e1e] flex flex-col shadow-2xl shadow-black"
//                     >


//                         {/* CODE HEADER */}

//                         <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 bg-[#181818] shrink-0">

//                             <div className="flex items-center gap-3">

//                                 <button
//                                     onClick={() => setShowCode(false)}
//                                     className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition"
//                                     title="Close editor"
//                                 >

//                                     <ChevronLeft size={18} />

//                                 </button>


//                                 <div className="flex items-center gap-2">

//                                     <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">

//                                         <Code2
//                                             size={14}
//                                             className="text-orange-400"
//                                         />

//                                     </div>

//                                     <div>

//                                         <p className="text-xs font-semibold text-zinc-200">
//                                             index.html
//                                         </p>

//                                         <p className="text-[10px] text-zinc-600">
//                                             HTML Source
//                                         </p>

//                                     </div>

//                                 </div>

//                             </div>


//                             <button
//                                 onClick={() => setShowCode(false)}
//                                 className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-500 hover:text-white transition"
//                                 title="Close"
//                             >

//                                 <X size={17} />

//                             </button>

//                         </div>


//                         {/* MONACO */}

//                         <div className="flex-1 min-h-0">

//                             <Editor
//                                 height="100%"
//                                 language="html"
//                                 value={code}
//                                 theme="vs-dark"

//                                 onChange={(value) => {
//                                     setCode(value || "");
//                                 }}

//                                 options={{
//                                     minimap: {
//                                         enabled: false,
//                                     },

//                                     fontSize: 14,

//                                     lineHeight: 22,

//                                     padding: {
//                                         top: 15,
//                                         bottom: 15,
//                                     },

//                                     wordWrap: "on",

//                                     scrollBeyondLastLine: false,

//                                     smoothScrolling: true,

//                                     cursorBlinking: "smooth",

//                                     renderWhitespace: "selection",

//                                     automaticLayout: true,

//                                     bracketPairColorization: {
//                                         enabled: true,
//                                     },
//                                 }}
//                             />

//                         </div>

//                     </motion.div>

//                 )}

//             </AnimatePresence>


//             {/* ================================================= */}
//             {/* FULL SCREEN PREVIEW */}
//             {/* ================================================= */}

//             <AnimatePresence>

//                 {showFullPreview && (

//                     <motion.div
//                         initial={{
//                             opacity: 0,
//                             scale: 0.98,
//                         }}
//                         animate={{
//                             opacity: 1,
//                             scale: 1,
//                         }}
//                         exit={{
//                             opacity: 0,
//                             scale: 0.98,
//                         }}
//                         transition={{
//                             duration: 0.2,
//                         }}
//                         className="fixed inset-0 z-[9999] bg-black"
//                     >

//                         {/* FULL PREVIEW HEADER */}

//                         <div className="absolute top-0 left-0 right-0 z-10 h-12 px-4 flex items-center justify-between bg-black/70 backdrop-blur-xl border-b border-white/10">

//                             <div className="flex items-center gap-2">

//                                 <Monitor
//                                     size={16}
//                                     className="text-zinc-400"
//                                 />

//                                 <span className="text-xs font-medium text-zinc-300">
//                                     Full Preview
//                                 </span>

//                             </div>


//                             <button
//                                 onClick={() =>
//                                     setShowFullPreview(false)
//                                 }
//                                 className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
//                                 title="Close preview"
//                             >

//                                 <X size={18} />

//                             </button>

//                         </div>


//                         <iframe
//                             className="w-full h-full bg-white border-0"
//                             srcDoc={code}
//                             title="Full Website Preview"
//                         />

//                     </motion.div>

//                 )}

//             </AnimatePresence>


//             {/* ================================================= */}
//             {/* MOBILE CHAT */}
//             {/* ================================================= */}

//             <AnimatePresence>

//                 {showChat && (

//                     <motion.div
//                         initial={{
//                             y: "100%",
//                         }}
//                         animate={{
//                             y: 0,
//                         }}
//                         exit={{
//                             y: "100%",
//                         }}
//                         transition={{
//                             duration: 0.28,
//                             ease: "easeOut",
//                         }}
//                         className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col lg:hidden"
//                     >


//                         {/* MOBILE HEADER */}

//                         <Header
//                             mobile={true}
//                             onClose={() =>
//                                 setShowChat(false)
//                             }
//                         />


//                         {/* CHAT CONTENT */}

//                         <div className="flex-1 flex flex-col min-h-0">

//                             <MessageList mobile />

//                             <ChatInput />

//                         </div>

//                     </motion.div>

//                 )}

//             </AnimatePresence>

//         </div>
//     );
// }


// export default WebsiteEditor;







// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { serverUrl } from "../App";
// import { useParams } from "react-router-dom";
// import {
//     ClockFading,
//     Code2,
//     MessageSquare,
//     Monitor,
//     Rocket,
//     Send,
//     X,
// } from "lucide-react";
// import { AnimatePresence, motion } from "motion/react";
// import Editor from '@monaco-editor/react';


// function WebsiteEditor() {

//     const { id } = useParams();

//     const [website, setWebsite] = useState(null);
//     const [error, setError] = useState("");
//     const [code, setCode] = useState("");
//     const [messages, setMessages] = useState([]);
//     const [prompt, setPrompt] = useState("");
//     const [updateLoading, setUpdateLoading] = useState(false);
//     const [thinkingIndex, setThinkingIndex] = useState(0);
//     const [showCode,setShowCode] = useState(false);
//     const [showFullPreview, setShowFullPreview] = useState(false);
//     const [showChat, setShowChat] = useState(false);

//     const iframeRef = useRef(null);

//     const thinkingSteps = [
//         "Understanding your request...",
//         "Planning layout changes...",
//         "Improving layout changes...",
//         "Applying responsiveness...",
//         "Finalizing update...",
//     ];


//     // =========================
//     // THINKING ANIMATION
//     // =========================

//     useEffect(() => {

//         if (!updateLoading) {
//             return;
//         }

//         const interval = setInterval(() => {

//             setThinkingIndex(
//                 (i) => (i + 1) % thinkingSteps.length
//             );

//         }, 1500);

//         return () => clearInterval(interval);

//     }, [updateLoading]);


//     // =========================
//     // UPDATE WEBSITE
//     // =========================

//     const handleUpdate = async () => {

//         if (!prompt.trim() || updateLoading) {
//             return;
//         }

//         const currentPrompt = prompt.trim();

//         setUpdateLoading(true);

//         // Reset thinking animation
//         setThinkingIndex(0);

//         // Show user message immediately
//         setMessages((m) => [
//             ...m,
//             {
//                 role: "user",
//                 content: currentPrompt,
//             },
//         ]);

//         // Clear input
//         setPrompt("");


//         try {

//             const result = await axios.post(
//                 `${serverUrl}/api/website/update/${id}`,
//                 {
//                     prompt: currentPrompt,
//                 },
//                 {
//                     withCredentials: true,
//                 }
//             );

//             console.log("Update response:", result.data);


//             // Add AI response
//             setMessages((m) => [
//                 ...m,
//                 {
//                     role: "ai",
//                     content:
//                         result.data.message ||
//                         "Website updated successfully.",
//                 },
//             ]);


//             // Update generated code
//             if (result.data.code) {
//                 setCode(result.data.code);
//             }


//             // Update website state
//             setWebsite((prev) => {

//                 if (!prev) {
//                     return prev;
//                 }

//                 return {
//                     ...prev,

//                     latestCode:
//                         result.data.code || prev.latestCode,

//                     conversation: [
//                         ...(prev.conversation || []),

//                         {
//                             role: "user",
//                             content: currentPrompt,
//                         },

//                         {
//                             role: "ai",
//                             content:
//                                 result.data.message ||
//                                 "Website updated successfully.",
//                         },
//                     ],
//                 };

//             });


//         } catch (error) {

//             console.error(
//                 "Update website error:",
//                 error.response?.data || error.message
//             );


//             // Show error in chat
//             setMessages((m) => [
//                 ...m,
//                 {
//                     role: "ai",
//                     content:
//                         error.response?.data?.message ||
//                         "Something went wrong while updating the website.",
//                 },
//             ]);

//         } finally {

//             setUpdateLoading(false);

//         }
//     };


//     // =========================
//     // GET WEBSITE
//     // =========================

//     useEffect(() => {

//         const handleGetWebsite = async () => {

//             try {

//                 setError("");

//                 const result = await axios.get(
//                     `${serverUrl}/api/website/get-by-id/${id}`,
//                     {
//                         withCredentials: true,
//                     }
//                 );

//                 console.log("Website:", result.data);

//                 setWebsite(result.data);

//                 setCode(
//                     result.data.latestCode || ""
//                 );

//                 setMessages(
//                     result.data.conversation || []
//                 );

//             } catch (error) {

//                 console.error(
//                     "Get website error:",
//                     error.response?.data || error.message
//                 );

//                 setError(
//                     error.response?.data?.message ||
//                     "Unable to load website."
//                 );
//             }
//         };


//         if (id) {
//             handleGetWebsite();
//         }

//     }, [id]);


//     // =========================
//     // UPDATE IFRAME
//     // =========================

//     useEffect(() => {

//         if (!iframeRef.current || !code) {
//             return;
//         }

//         const blob = new Blob(
//             [code],
//             {
//                 type: "text/html",
//             }
//         );

//         const url = URL.createObjectURL(blob);

//         iframeRef.current.src = url;

//         return () => {
//             URL.revokeObjectURL(url);
//         };

//     }, [code]);


//     // =========================
//     // ERROR SCREEN
//     // =========================

//     if (error) {

//         return (
//             <div className="h-screen flex items-center justify-center bg-black text-red-400 px-4 text-center">
//                 {error}
//             </div>
//         );
//     }


//     // =========================
//     // LOADING SCREEN
//     // =========================

//     if (!website) {

//         return (
//             <div className="h-screen flex items-center justify-center bg-black text-zinc-400">
//                 Loading...
//             </div>
//         );
//     }


//     // =========================
//     // MAIN EDITOR
//     // =========================

//     return (

//         <div className="h-screen w-screen flex bg-black text-white overflow-hidden">


//             {/* ================= SIDEBAR ================= */}

//             <aside className="hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80">

//                 <Header />

//                 <div className="flex-1 flex flex-col min-h-0">


//                     {/* ================= MESSAGES ================= */}

//                     <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

//                         {messages.map((m, i) => (

//                             <div
//                                 key={i}
//                                 className={`max-w-[85%] ${
//                                     m.role === "user"
//                                         ? "ml-auto"
//                                         : "mr-auto"
//                                 }`}
//                             >

//                                 <div
//                                     className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
//                                         m.role === "user"
//                                             ? "bg-white text-black"
//                                             : "bg-white/5 border border-white/10 text-zinc-200"
//                                     }`}
//                                 >

//                                     {m.content}

//                                 </div>

//                             </div>

//                         ))}


//                         {/* ================= AI THINKING ================= */}

//                         {updateLoading && (

//                             <div className="max-w-[85%] mr-auto">

//                                 <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">

//                                     {thinkingSteps[thinkingIndex]}

//                                 </div>

//                             </div>

//                         )}

//                     </div>


//                     {/* ================= INPUT ================= */}

//                     <div className="p-3 border-t border-white/10 shrink-0">

//                         <div className="flex gap-2">

//                             <input

//                                 type="text"

//                                 placeholder="Describe Changes..."

//                                 className="flex-1 min-w-0 rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none focus:border-white/20 disabled:opacity-50"

//                                 onChange={(e) =>
//                                     setPrompt(e.target.value)
//                                 }

//                                 value={prompt}

//                                 disabled={updateLoading}

//                                 onKeyDown={(e) => {

//                                     if (
//                                         e.key === "Enter" &&
//                                         !e.shiftKey
//                                     ) {

//                                         e.preventDefault();

//                                         handleUpdate();

//                                     }

//                                 }}

//                             />


//                             <button

//                                 className="px-4 py-3 rounded-2xl bg-white text-black hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"

//                                 onClick={handleUpdate}

//                                 disabled={
//                                     updateLoading ||
//                                     !prompt.trim()
//                                 }

//                             >

//                                 {updateLoading ? (

//                                     <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />

//                                 ) : (

//                                     <Send size={14} />

//                                 )}

//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             </aside>


//             {/* ================= PREVIEW ================= */}

//             <div className="flex-1 flex flex-col">


//                 {/* ================= PREVIEW HEADER ================= */}

//                 <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80 shrink-0">

//                     <span className="text-xs text-zinc-400">
//                         Live Preview
//                     </span>


//                     <div className="flex gap-2">

//                         <button
//                             className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition"
//                         >

//                             <Rocket size={14} />

//                             Deploy

//                         </button>

//                         <button  className="p-2 hover:bg-white/10 rounded-lg transition lg:hidden "
//                         onClick={()=>setShowChat(true)}
//                         >
//                             <MessageSquare size={18}/>
//                         </button>


//                         <button
//                             className="p-2 hover:bg-white/10 rounded-lg transition"
//                             onClick={()=>setShowCode(true)}
//                         >

//                             <Code2 size={20} />

//                         </button>


//                         <button
//                             className="p-2 hover:bg-white/10 rounded-lg transition"
//                             onClick={()=>setShowFullPreview(true)}
//                         >

//                             <Monitor size={18} />

//                         </button>

//                     </div>

//                 </div>


//                 {/* ================= IFRAME ================= */}

//                 <iframe
//                     ref={iframeRef}
//                     title="Website Preview"
//                     className="flex-1 w-full bg-white border-0"
//                 />

//             </div>

// <AnimatePresence>
//   {showCode && (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: 0 }}
//       exit={{ x: "100%" }}
//       className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col"
//     >
//       <div className="h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]">
//         <span>index.html</span>

//         <button onClick={() => setShowCode(false)}>
//           <X size={18} />
//         </button>
//       </div>

//       <div className="flex-1">
//         <Editor
//           height="100%"
//           defaultLanguage="html"
//           defaultValue={website?.latestCode || ""}
//           theme="vs-dark"
//           onChange={(v)=>setCode(v)}
//           options={{
//             minimap: { enabled: false },
//             fontSize: 14,
//           }}
//         />
//       </div>
//     </motion.div>
//   )}
// </AnimatePresence>

//     <AnimatePresence>
//         {showFullPreview && (
//             <motion.div
//             className="fixed inset-0 z-[9999] bg-black"
//             >
//                 <iframe className="w-full h-full bg-white" srcDoc={code}/>

//                 <button onClick={()=>setShowFullPreview(false)} className="absolute top-4 right-4 p-2 bg-black/70 rounded-lg"> <X/> </button>


//             </motion.div>
//         )}
//     </AnimatePresence>

//     <AnimatePresence>
//         {showChat && (
//             <motion.div
//       initial={{ y: "100%" }}
//       animate={{ y: 0 }}
//       exit={{ y: "100%" }}
//       transition={{ duration: 0.25 }}
//       className="fixed inset-0 z-[9999] bg-black flex flex-col"
//     >
//              <Header />

//               <div className="flex-1 flex flex-col min-h-0">


//                     {/* ================= MESSAGES ================= */}

//                     <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

//                         {messages.map((m, i) => (

//                             <div
//                                 key={i}
//                                 className={`max-w-[85%] ${
//                                     m.role === "user"
//                                         ? "ml-auto"
//                                         : "mr-auto"
//                                 }`}
//                             >

//                                 <div
//                                     className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
//                                         m.role === "user"
//                                             ? "bg-white text-black"
//                                             : "bg-white/5 border border-white/10 text-zinc-200"
//                                     }`}
//                                 >

//                                     {m.content}

//                                 </div>

//                             </div>

//                         ))}


//                         {/* ================= AI THINKING ================= */}

//                         {updateLoading && (

//                             <div className="max-w-[85%] mr-auto">

//                                 <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">

//                                     {thinkingSteps[thinkingIndex]}

//                                 </div>

//                             </div>

//                         )}

//                     </div>


//                     {/* ================= INPUT ================= */}

//                     <div className="p-3 border-t border-white/10 shrink-0">

//                         <div className="flex gap-2">

//                             <input

//                                 type="text"

//                                 placeholder="Describe Changes..."

//                                 className="flex-1 min-w-0 rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none focus:border-white/20 disabled:opacity-50"

//                                 onChange={(e) =>
//                                     setPrompt(e.target.value)
//                                 }

//                                 value={prompt}

//                                 disabled={updateLoading}

//                                 onKeyDown={(e) => {

//                                     if (
//                                         e.key === "Enter" &&
//                                         !e.shiftKey
//                                     ) {

//                                         e.preventDefault();

//                                         handleUpdate();

//                                     }

//                                 }}

//                             />


//                             <button

//                                 className="px-4 py-3 rounded-2xl bg-white text-black hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"

//                                 onClick={handleUpdate}

//                                 disabled={
//                                     updateLoading ||
//                                     !prompt.trim()
//                                 }

//                             >

//                                 {updateLoading ? (

//                                     <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />

//                                 ) : (

//                                     <Send size={14} />

//                                 )}

//                             </button>

//                         </div>

//                     </div>

//                 </div>

            
//                 <button onClick={()=>setShowChat(false)} className="absolute top-4 right-4 p-2 bg-black/70 rounded-lg"> <X/> </button>



//             </motion.div>
//         )}
//     </AnimatePresence>

//         </div>
//     );


//     // =========================
//     // HEADER COMPONENT
//     // =========================

//     function Header() {

//         return (

//             <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 shrink-0">

//                 <div className="flex items-center gap-2 min-w-0">

//                     <ClockFading
//                         size={18}
//                         className="text-purple-400 shrink-0"
//                     />

//                     <span className="font-semibold truncate">

//                         {website.title}

//                     </span>
                   





//                 </div>

//             </div>
//         );
//     }

// }

// export default WebsiteEditor;



































// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { serverUrl } from "../App";
// import { useParams } from "react-router-dom";
// import {
//     ClockFading,
//     Code2,
//     Monitor,
//     Rocket,
//     Send,
// } from "lucide-react";

// function Editor() {

//     const { id } = useParams();

//     const [website, setWebsite] = useState(null);
//     const [error, setError] = useState("");
//     const [code, setCode] = useState("");
//     const [messages, setMessages] = useState([]);
//     const [prompt, setPrompt] = useState("");
//     const [updateLoading, setUpdateLoading] = useState(false);
//     const [thinkingIndex, setThinkingIndex] = useState(0)
//     const iframeRef = useRef(null);

//     const thinkingSteps =  [
//         "Understanding your request...",
//         "Planning layout changes...",
//         "Improving layout changes...",
//         "Applying responsiveness...",
//         "Finalizing update...",   
//     ]

//     // =========================
//     // UPDATE WEBSITE
//     // =========================

//     const handleUpdate = async () => {
//         setUpdateLoading(true)
//         if (!prompt.trim()) return;

//         const currentPrompt = prompt;

//         // Show user message immediately
//         setMessages((m) => [
//             ...m,
//             {
//                 role: "user",
//                 content: currentPrompt,
//             },
//         ]);

//         setPrompt("");
        

//         try {

//             const result = await axios.post(
//                 `${serverUrl}/api/website/update/${id}`,
//                 {
//                     prompt: currentPrompt,
//                 },
//                 {
//                     withCredentials: true,
//                 }
//             );

//             // console.log("Update response:", result.data);
//             setUpdateLoading(false)

//             // Add AI response
//             setMessages((m) => [
//                 ...m,
//                 {
//                     role: "ai",
//                     content: result.data.message,
//                 },
//             ]);

//             // Update generated code
//             setCode(result.data.code);

//             // Update website state as well
//             setWebsite((prev) => ({
//                 ...prev,
//                 latestCode: result.data.code,
//                 conversation: [
//                     ...(prev?.conversation || []),
//                     {
//                         role: "user",
//                         content: currentPrompt,
//                     },
//                     {
//                         role: "ai",
//                         content: result.data.message,
//                     },
//                 ],
//             }));

//         } catch (error) {

//             console.error(
//                 "Update website error:",
//                 error.response?.data || error.message
//             );

//             setMessages((m) => [
//                 ...m,
//                 {
//                     role: "ai",
//                     content:
//                         error.response?.data?.message ||
//                         "Something went wrong while updating the website.",
//                 },
//             ]);

//         } finally {
//              setUpdateLoading(false)
//         }
//     };

//     // =========================
//     // GET WEBSITE
//     // =========================

//     useEffect(() => {

//         const handleGetWebsite = async () => {

//             try {

//                 setError("");

//                 const result = await axios.get(
//                     `${serverUrl}/api/website/get-by-id/${id}`,
//                     {
//                         withCredentials: true,
//                     }
//                 );

//                 // console.log("Website:", result.data);

//                 setWebsite(result.data);

//                 setCode(result.data.latestCode || "");

//                 setMessages(result.data.conversation || []);

//             } catch (error) {

//                 console.error(
//                     "Get website error:",
//                     error.response?.data || error.message
//                 );

//                 setError(
//                     error.response?.data?.message ||
//                     "Unable to load website."
//                 );
//             }
//         };

//         if (id) {
//             handleGetWebsite();
//         }

//     }, [id]);

//     // =========================
//     // UPDATE IFRAME
//     // =========================

//     useEffect(() => {

//         if (!iframeRef.current || !code) return;

//         const blob = new Blob(
//             [code],
//             {
//                 type: "text/html",
//             }
//         );

//         const url = URL.createObjectURL(blob);

//         iframeRef.current.src = url;

//         return () => {
//             URL.revokeObjectURL(url);
//         };

//     }, [code]);

//     // =========================
//     // ERROR SCREEN
//     // =========================

//     if (error) {

//         return (
//             <div className="h-screen flex items-center justify-center bg-black text-red-400 px-4 text-center">
//                 {error}
//             </div>
//         );
//     }

//     // =========================
//     // LOADING SCREEN
//     // =========================

//     useEffect(()=>{
//        const i = setInterval(()=>{

//             setThinkingIndex((i)=>(i+1)%thinkingSteps.length)

//         },1200)

//         return ()=>clearInterval(i)
//     },[updateLoading])

//     if (!website) {

//         return (
//             <div className="h-screen flex items-center justify-center bg-black text-zinc-400">
//                 Loading...
//             </div>
//         );
//     }

//     // =========================
//     // MAIN EDITOR
//     // =========================

//     return (

//         <div className="h-screen w-screen flex bg-black text-white overflow-hidden">

//             {/* ================= SIDEBAR ================= */}

//             <aside className="hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80">

//                 <Header />

//                  <div className="h-full flex flex-col">

//                 {/* Messages */}

//                 <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

//                     {messages.map((m, i) => (

//                         <div
//                             key={i}
//                             className={`max-w-[85%] ${
//                                 m.role === "user"
//                                     ? "ml-auto"
//                                     : "mr-auto"
//                             }`}
//                         >

//                             <div
//                                 className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
//                                     m.role === "user"
//                                         ? "bg-white text-black"
//                                         : "bg-white/5 border border-white/10 text-zinc-200"
//                                 }`}
//                             >

//                                 {m.content}

//                             </div>

//                         </div>

//                     ))}


//                     {updateLoading && 
//                     <div className="max-w-[85%] mr-auto">
//                         <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
//                             {thinkingSteps[thinkingIndex]}
//                         </div>
                        
                        
//                         </div>}


//                     {/* AI Loading */}

//                     {loading && (

//                         <div className="mr-auto max-w-[85%]">

//                             <div className="px-4 py-2.5 rounded-2xl text-sm bg-white/5 border border-white/10 text-zinc-400">

//                                 Generating changes...

//                             </div>

//                         </div>

//                     )}

//                 </div>


//                 {/* Input */}

//                 <div className="p-3 border-t border-white/10 shrink-0">

//                     <div className="flex gap-2">

//                         <input
                            
//                             placeholder="Describe Changes..."
//                             className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none focus:border-white/20"
//                             onChange={(e) =>
//                                 setPrompt(e.target.value)
//                             }
//                             value={prompt}
//                             onKeyDown={(e) => {

//                                 if (
//                                     e.key === "Enter" &&
//                                     !e.shiftKey
//                                 ) {
//                                     e.preventDefault();
//                                     handleUpdate();
//                                 }

//                             }}
//                         />


//                         <button
//                             className="px-4 py-3 rounded-2xl bg-white text-black hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                             onClick={handleUpdate}
//                             disabled={loading || !prompt.trim()}
//                         >

//                             <Send size={14} />

//                         </button>

//                     </div>

//                 </div>

//             </div>

//             </aside>


//             {/* ================= PREVIEW ================= */}

//             <div className="flex-1 flex flex-col">

//                 {/* Preview Header */}

//                 <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">

//                     <span className="text-xs text-zinc-400">
//                         Live Preview
//                     </span>

//                     <div className="flex gap-2">

//                         <button
//                             className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition"
//                         >
//                             <Rocket size={14} />
//                             Deploy
//                         </button>

//                         <button
//                             className="p-2 hover:bg-white/10 rounded-lg transition"
//                         >
//                             <Code2 size={18} />
//                         </button>

//                         <button
//                             className="p-2 hover:bg-white/10 rounded-lg transition"
//                         >
//                             <Monitor size={18} />
//                         </button>

//                     </div>

//                 </div>


//                 {/* Iframe */}

//                 <iframe
//                     ref={iframeRef}
//                     title="Website Preview"
//                     className="flex-1 w-full bg-white"
//                 />

//             </div>

//         </div>
//     );


//     // =========================
//     // HEADER COMPONENT
//     // =========================

//     function Header() {

//         return (

//             <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">

//                 <div className="flex items-center gap-2 min-w-0">

//                     <ClockFading
//                         size={18}
//                         className="text-purple-400 shrink-0"
//                     />

//                     <span className="font-semibold truncate">
//                         {website.title}
//                     </span>

//                 </div>

//             </div>
//         );
//     }


  

    
// }

// export default Editor;