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

// =========================================================
// THINKING STEPS
// =========================================================

const thinkingSteps = [
    "Understanding your request...",
    "Planning layout changes...",
    "Improving layout changes...",
    "Applying responsiveness...",
    "Finalizing update...",
];

// =========================================================
// MESSAGE LIST
// =========================================================

function MessageList({
    messages,
    updateLoading,
    thinkingIndex,
}) {
    return (
        <div
            className="
                flex-1
                min-h-0
                overflow-y-auto
                px-4
                py-5
                space-y-5
                scrollbar-thin
                scrollbar-thumb-white/10
                scrollbar-track-transparent
            "
        >
            {messages.length === 0 && (
                <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-[250px]">
                        <div
                            className="
                                mx-auto
                                mb-4
                                w-12
                                h-12
                                rounded-2xl
                                bg-white/5
                                border
                                border-white/10
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <MessageSquare
                                size={21}
                                className="text-zinc-400"
                            />
                        </div>

                        <h3 className="text-sm font-semibold text-white mb-1">
                            Start building
                        </h3>

                        <p className="text-xs leading-relaxed text-zinc-500">
                            Tell the AI what you want to change in your
                            website.
                        </p>
                    </div>
                </div>
            )}

            {messages.map((m, i) => (
                <motion.div
                    key={`${m.role}-${i}`}
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
                        <div
                            className="
                                w-7
                                h-7
                                shrink-0
                                rounded-full
                                bg-gradient-to-br
                                from-violet-500
                                to-indigo-500
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <span className="text-[10px] font-bold text-white">
                                AI
                            </span>
                        </div>
                    )}

                    <div
                        className={`
                            max-w-[82%]
                            ${
                                m.role === "user"
                                    ? "items-end"
                                    : "items-start"
                            }
                            flex
                            flex-col
                        `}
                    >
                        <div
                            className={`
                                px-3.5
                                py-2.5
                                rounded-2xl
                                text-[13px]
                                leading-relaxed
                                break-words
                                whitespace-pre-wrap
                                ${
                                    m.role === "user"
                                        ? "bg-white text-black rounded-br-md"
                                        : "bg-[#111111] border border-white/10 text-zinc-200 rounded-bl-md"
                                }
                            `}
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
                    <div
                        className="
                            w-7
                            h-7
                            shrink-0
                            rounded-full
                            bg-gradient-to-br
                            from-violet-500
                            to-indigo-500
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <span className="text-[10px] font-bold text-white">
                            AI
                        </span>
                    </div>

                    <div
                        className="
                            px-3.5
                            py-2.5
                            rounded-2xl
                            rounded-bl-md
                            bg-[#111111]
                            border
                            border-white/10
                        "
                    >
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
}

// =========================================================
// CHAT INPUT
// =========================================================

function ChatInput({
    prompt,
    setPrompt,
    updateLoading,
    handleUpdate,
}) {
    const textareaRef = useRef(null);

    const handlePromptChange = (e) => {
        const value = e.target.value;

        // ONLY update the input state.
        // No API call happens here.
        setPrompt(value);

        // Auto resize
        e.target.style.height = "auto";

        e.target.style.height =
            Math.min(e.target.scrollHeight, 140) + "px";
    };

    const handlePromptKeyDown = (e) => {
        // Ctrl + Enter / Cmd + Enter = Send
        if (
            (e.ctrlKey || e.metaKey) &&
            e.key === "Enter"
        ) {
            e.preventDefault();

            if (
                !updateLoading &&
                prompt.trim()
            ) {
                handleUpdate();
            }
        }
    };

    return (
        <div className="shrink-0 p-3 border-t border-white/10 bg-[#080808]">
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={handlePromptChange}
                    onKeyDown={handlePromptKeyDown}
                    disabled={updateLoading}
                    rows={1}
                    placeholder={
                        updateLoading
                            ? "AI is updating your website..."
                            : "Describe what you want to change..."
                    }
                    className="
                        w-full
                        min-h-[48px]
                        max-h-[140px]
                        resize-none
                        rounded-xl
                        border
                        border-white/10
                        bg-[#111111]
                        text-white
                        placeholder:text-zinc-600
                        text-sm
                        leading-5
                        px-3.5
                        py-3
                        pr-12
                        outline-none
                        transition
                        focus:border-white/20
                        focus:bg-[#151515]
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                    "
                />

                <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={
                        updateLoading ||
                        !prompt.trim()
                    }
                    className="
                        absolute
                        right-2
                        bottom-2
                        w-9
                        h-9
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        bg-white
                        text-black
                        transition
                        hover:bg-zinc-200
                        disabled:opacity-30
                        disabled:cursor-not-allowed
                    "
                    title="Send"
                >
                    {updateLoading ? (
                        <div
                            className="
                                w-4
                                h-4
                                rounded-full
                                border-2
                                border-black/20
                                border-t-black
                                animate-spin
                            "
                        />
                    ) : (
                        <Send size={16} />
                    )}
                </button>
            </div>

            <div className="flex items-center justify-between mt-2 px-1">
                <span className="text-[10px] text-zinc-600">
                    Describe your changes naturally
                </span>

                <span className="text-[10px] text-zinc-600">
                    Ctrl + Enter
                </span>
            </div>
        </div>
    );
}

// =========================================================
// HEADER
// =========================================================

function Header({ website }) {
    return (
        <div
            className="
                h-14
                px-4
                flex
                items-center
                justify-between
                border-b
                border-white/10
                shrink-0
                bg-[#080808]
            "
        >
            <div className="flex items-center gap-3 min-w-0">
                <div
                    className="
                        w-8
                        h-8
                        rounded-lg
                        bg-gradient-to-br
                        from-violet-500
                        to-indigo-500
                        flex
                        items-center
                        justify-center
                        shrink-0
                    "
                >
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

// =========================================================
// MAIN COMPONENT
// =========================================================

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

    // =========================================================
    // THINKING ANIMATION
    // =========================================================

    useEffect(() => {
        if (!updateLoading) return;

        const interval = setInterval(() => {
            setThinkingIndex(
                (i) => (i + 1) % thinkingSteps.length
            );
        }, 1500);

        return () => clearInterval(interval);
    }, [updateLoading]);

    // =========================================================
    // GET WEBSITE
    // =========================================================

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
                    error.response?.data ||
                        error.message
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

    // =========================================================
    // UPDATE WEBSITE
    // =========================================================

    const handleUpdate = async () => {
        const currentPrompt = prompt.trim();

        // Prevent empty request
        if (!currentPrompt) {
            return;
        }

        // Prevent multiple API calls
        if (updateLoading) {
            return;
        }

        setUpdateLoading(true);
        setThinkingIndex(0);

        // Add user message immediately
        setMessages((m) => [
            ...m,
            {
                role: "user",
                content: currentPrompt,
            },
        ]);

        // Clear input only after saving currentPrompt
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

            console.log(
                "Update response:",
                result.data
            );

            const aiMessage =
                result.data.message ||
                "Website updated successfully.";

            // Add AI response
            setMessages((m) => [
                ...m,
                {
                    role: "ai",
                    content: aiMessage,
                },
            ]);

            // Update generated code
            if (result.data.code) {
                setCode(result.data.code);
            }

            // Update website state
            setWebsite((prev) => {
                if (!prev) return prev;

                return {
                    ...prev,

                    latestCode:
                        result.data.code ||
                        prev.latestCode,

                    conversation: [
                        ...(prev.conversation || []),

                        {
                            role: "user",
                            content: currentPrompt,
                        },

                        {
                            role: "ai",
                            content: aiMessage,
                        },
                    ],
                };
            });
        } catch (error) {
            console.error(
                "Update website error:",
                error.response?.data ||
                    error.message
            );

            const errorMessage =
                error.response?.data?.message ||
                "Something went wrong while updating the website.";

            setMessages((m) => [
                ...m,
                {
                    role: "ai",
                    content: errorMessage,
                },
            ]);
        } finally {
            setUpdateLoading(false);
        }
    };

    // =========================================================
    // UPDATE IFRAME
    // =========================================================

    useEffect(() => {
        if (!iframeRef.current || !code) {
            return;
        }

        const blob = new Blob([code], {
            type: "text/html",
        });

        const url =
            URL.createObjectURL(blob);

        iframeRef.current.src = url;

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [code]);

    // =========================================================
    // ERROR SCREEN
    // =========================================================

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

    // =========================================================
    // LOADING SCREEN
    // =========================================================

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

    // =========================================================
    // MAIN UI
    // =========================================================

    return (
        <div className="h-screen w-screen flex bg-[#050505] text-white overflow-hidden">

            {/* =================================================
                DESKTOP AI SIDEBAR
            ================================================= */}

            <aside
                className="
                    hidden
                    lg:flex
                    w-[320px]
                    xl:w-[350px]
                    2xl:w-[370px]
                    shrink-0
                    flex-col
                    border-r
                    border-white/10
                    bg-[#080808]
                "
            >
                <Header website={website} />

                <div className="flex-1 flex flex-col min-h-0">
                    <MessageList
                        messages={messages}
                        updateLoading={updateLoading}
                        thinkingIndex={thinkingIndex}
                    />

                    <ChatInput
                        prompt={prompt}
                        setPrompt={setPrompt}
                        updateLoading={updateLoading}
                        handleUpdate={handleUpdate}
                    />
                </div>
            </aside>

            {/* =================================================
                PREVIEW AREA
            ================================================= */}

            <main className="flex-1 min-w-0 flex flex-col bg-[#0a0a0a]">

                {/* PREVIEW TOOLBAR */}

                <div
                    className="
                        h-14
                        shrink-0
                        px-3
                        sm:px-4
                        flex
                        items-center
                        justify-between
                        border-b
                        border-white/10
                        bg-[#080808]
                    "
                >
                    {/* LEFT SIDE */}

                    <div className="flex items-center gap-3 min-w-0">
                        <div
                            className="
                                hidden
                                sm:flex
                                w-8
                                h-8
                                rounded-lg
                                bg-white/5
                                border
                                border-white/10
                                items-center
                                justify-center
                            "
                        >
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
                            type="button"
                            onClick={() =>
                                setShowChat(true)
                            }
                            className="
                                lg:hidden
                                w-9
                                h-9
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                text-zinc-400
                                hover:text-white
                                hover:bg-white/10
                                transition
                            "
                            title="Open chat"
                        >
                            <MessageSquare size={17} />
                        </button>

                        {/* CODE */}

                        <button
                            type="button"
                            onClick={() =>
                                setShowCode(true)
                            }
                            className="
                                w-9
                                h-9
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                text-zinc-400
                                hover:text-white
                                hover:bg-white/10
                                transition
                            "
                            title="Open code"
                        >
                            <Code2 size={17} />
                        </button>

                        {/* FULLSCREEN */}

                        <button
                            type="button"
                            onClick={() =>
                                setShowFullPreview(true)
                            }
                            className="
                                w-9
                                h-9
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                text-zinc-400
                                hover:text-white
                                hover:bg-white/10
                                transition
                            "
                            title="Fullscreen preview"
                        >
                            <Monitor size={17} />
                        </button>

                        {/* DEPLOY */}

                        <button
                            type="button"
                            className="
                                ml-1
                                h-9
                                px-3
                                sm:px-4
                                rounded-lg
                                bg-white
                                text-black
                                flex
                                items-center
                                gap-1.5
                                text-xs
                                font-semibold
                                hover:bg-zinc-200
                                transition
                            "
                        >
                            <Rocket size={14} />

                            <span className="hidden sm:inline">
                                Deploy
                            </span>
                        </button>
                    </div>
                </div>

                {/* WEBSITE PREVIEW */}

                <div
                    className="
                        flex-1
                        min-h-0
                        p-2
                        sm:p-3
                        lg:p-4
                        xl:p-5
                        bg-[#0a0a0a]
                    "
                >
                    <div
                        className="
                            relative
                            w-full
                            h-full
                            rounded-xl
                            lg:rounded-2xl
                            overflow-hidden
                            border
                            border-white/10
                            bg-white
                            shadow-2xl
                        "
                    >
                        {/* BROWSER BAR */}

                        <div
                            className="
                                absolute
                                top-0
                                left-0
                                right-0
                                z-10
                                h-9
                                bg-[#f5f5f5]
                                border-b
                                border-black/10
                                flex
                                items-center
                                px-3
                            "
                        >
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

                        {/* IFRAME */}

                        <div className="w-full h-full pt-9">
                            <iframe
                                ref={iframeRef}
                                sandbox='allow-scripts allow-same-origin allow-forms'
                                title="Website Preview"
                                className="w-full h-full bg-white border-0"
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* =================================================
                CODE DRAWER
            ================================================= */}

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
                        className="
                            fixed
                            inset-y-0
                            right-0
                            w-full
                            sm:w-[90%]
                            md:w-[75%]
                            lg:w-[55%]
                            xl:w-[48%]
                            z-[9999]
                            bg-[#1e1e1e]
                            border-l
                            border-white/10
                            shadow-2xl
                            flex
                            flex-col
                        "
                    >
                        {/* CODE HEADER */}

                        <div
                            className="
                                h-12
                                shrink-0
                                px-4
                                flex
                                items-center
                                justify-between
                                border-b
                                border-white/10
                                bg-[#1e1e1e]
                            "
                        >
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
                                type="button"
                                onClick={() =>
                                    setShowCode(false)
                                }
                                className="
                                    w-8
                                    h-8
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-zinc-400
                                    hover:text-white
                                    hover:bg-white/10
                                    transition
                                "
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
                                    cursorSmoothCaretAnimation:
                                        "on",
                                    renderWhitespace:
                                        "selection",
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* =================================================
                FULLSCREEN PREVIEW
            ================================================= */}

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
                        className="
                            fixed
                            inset-0
                            z-[9999]
                            bg-black
                            flex
                            flex-col
                        "
                    >
                        {/* FULLSCREEN HEADER */}

                        <div
                            className="
                                h-12
                                shrink-0
                                bg-[#090909]
                                border-b
                                border-white/10
                                flex
                                items-center
                                justify-between
                                px-4
                            "
                        >
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
                                type="button"
                                onClick={() =>
                                    setShowFullPreview(false)
                                }
                                className="
                                    w-8
                                    h-8
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-zinc-400
                                    hover:text-white
                                    hover:bg-white/10
                                    transition
                                "
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* FULLSCREEN WEBSITE */}

                        <div className="flex-1 min-h-0 bg-white">
                            <iframe
                                title="Full Website Preview"
                                sandbox='allow-scripts allow-same-origin allow-forms'
                                className="w-full h-full border-0 bg-white"
                                srcDoc={code}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* =================================================
                MOBILE CHAT
            ================================================= */}

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
                        className="
                            fixed
                            inset-0
                            z-[9999]
                            bg-[#050505]
                            flex
                            flex-col
                        "
                    >
                        {/* MOBILE CHAT HEADER */}

                        <div
                            className="
                                h-14
                                shrink-0
                                px-4
                                flex
                                items-center
                                justify-between
                                border-b
                                border-white/10
                                bg-[#080808]
                            "
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <div
                                    className="
                                        w-8
                                        h-8
                                        rounded-lg
                                        bg-gradient-to-br
                                        from-violet-500
                                        to-indigo-500
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <span className="text-[10px] font-bold text-white">
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
                                type="button"
                                onClick={() =>
                                    setShowChat(false)
                                }
                                className="
                                    w-8
                                    h-8
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-zinc-400
                                    hover:text-white
                                    hover:bg-white/10
                                    transition
                                "
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* MOBILE CHAT BODY */}

                        <div className="flex-1 flex flex-col min-h-0">
                            <MessageList
                                messages={messages}
                                updateLoading={updateLoading}
                                thinkingIndex={thinkingIndex}
                            />

                            <ChatInput
                                prompt={prompt}
                                setPrompt={setPrompt}
                                updateLoading={updateLoading}
                                handleUpdate={handleUpdate}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default WebsiteEditor;