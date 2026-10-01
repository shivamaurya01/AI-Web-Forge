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
// import Editor from "@monaco-editor/react";

// // =========================================================
// // THINKING STEPS
// // =========================================================

// const thinkingSteps = [
//     "Understanding your request...",
//     "Planning layout changes...",
//     "Improving layout changes...",
//     "Applying responsiveness...",
//     "Finalizing update...",
// ];

// // =========================================================
// // MESSAGE LIST
// // =========================================================

// function MessageList({
//     messages,
//     updateLoading,
//     thinkingIndex,
// }) {
//     return (
//         <div
//             className="
//                 flex-1
//                 min-h-0
//                 overflow-y-auto
//                 px-4
//                 py-5
//                 space-y-5
//                 scrollbar-thin
//                 scrollbar-thumb-white/10
//                 scrollbar-track-transparent
//             "
//         >
//             {messages.length === 0 && (
//                 <div className="h-full flex items-center justify-center">
//                     <div className="text-center max-w-[250px]">
//                         <div
//                             className="
//                                 mx-auto
//                                 mb-4
//                                 w-12
//                                 h-12
//                                 rounded-2xl
//                                 bg-white/5
//                                 border
//                                 border-white/10
//                                 flex
//                                 items-center
//                                 justify-center
//                             "
//                         >
//                             <MessageSquare
//                                 size={21}
//                                 className="text-zinc-400"
//                             />
//                         </div>

//                         <h3 className="text-sm font-semibold text-white mb-1">
//                             Start building
//                         </h3>

//                         <p className="text-xs leading-relaxed text-zinc-500">
//                             Tell the AI what you want to change in your
//                             website.
//                         </p>
//                     </div>
//                 </div>
//             )}

//             {messages.map((m, i) => (
//                 <motion.div
//                     key={`${m.role}-${i}`}
//                     initial={{
//                         opacity: 0,
//                         y: 8,
//                     }}
//                     animate={{
//                         opacity: 1,
//                         y: 0,
//                     }}
//                     transition={{
//                         duration: 0.2,
//                     }}
//                     className={`flex items-end gap-2 ${
//                         m.role === "user"
//                             ? "justify-end"
//                             : "justify-start"
//                     }`}
//                 >
//                     {m.role !== "user" && (
//                         <div
//                             className="
//                                 w-7
//                                 h-7
//                                 shrink-0
//                                 rounded-full
//                                 bg-gradient-to-br
//                                 from-violet-500
//                                 to-indigo-500
//                                 flex
//                                 items-center
//                                 justify-center
//                             "
//                         >
//                             <span className="text-[10px] font-bold text-white">
//                                 AI
//                             </span>
//                         </div>
//                     )}

//                     <div
//                         className={`
//                             max-w-[82%]
//                             ${
//                                 m.role === "user"
//                                     ? "items-end"
//                                     : "items-start"
//                             }
//                             flex
//                             flex-col
//                         `}
//                     >
//                         <div
//                             className={`
//                                 px-3.5
//                                 py-2.5
//                                 rounded-2xl
//                                 text-[13px]
//                                 leading-relaxed
//                                 break-words
//                                 whitespace-pre-wrap
//                                 ${
//                                     m.role === "user"
//                                         ? "bg-white text-black rounded-br-md"
//                                         : "bg-[#111111] border border-white/10 text-zinc-200 rounded-bl-md"
//                                 }
//                             `}
//                         >
//                             {m.content}
//                         </div>
//                     </div>
//                 </motion.div>
//             ))}

//             {/* AI THINKING */}

//             {updateLoading && (
//                 <motion.div
//                     initial={{
//                         opacity: 0,
//                         y: 8,
//                     }}
//                     animate={{
//                         opacity: 1,
//                         y: 0,
//                     }}
//                     className="flex items-end gap-2"
//                 >
//                     <div
//                         className="
//                             w-7
//                             h-7
//                             shrink-0
//                             rounded-full
//                             bg-gradient-to-br
//                             from-violet-500
//                             to-indigo-500
//                             flex
//                             items-center
//                             justify-center
//                         "
//                     >
//                         <span className="text-[10px] font-bold text-white">
//                             AI
//                         </span>
//                     </div>

//                     <div
//                         className="
//                             px-3.5
//                             py-2.5
//                             rounded-2xl
//                             rounded-bl-md
//                             bg-[#111111]
//                             border
//                             border-white/10
//                         "
//                     >
//                         <div className="flex items-center gap-2">
//                             <div className="flex gap-1">
//                                 <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" />

//                                 <span
//                                     className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce"
//                                     style={{
//                                         animationDelay: "120ms",
//                                     }}
//                                 />

//                                 <span
//                                     className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce"
//                                     style={{
//                                         animationDelay: "240ms",
//                                     }}
//                                 />
//                             </div>

//                             <span className="text-xs text-zinc-500">
//                                 {thinkingSteps[thinkingIndex]}
//                             </span>
//                         </div>
//                     </div>
//                 </motion.div>
//             )}
//         </div>
//     );
// }

// // =========================================================
// // CHAT INPUT
// // =========================================================

// function ChatInput({
//     prompt,
//     setPrompt,
//     updateLoading,
//     handleUpdate,
// }) {
//     const textareaRef = useRef(null);

//     const handlePromptChange = (e) => {
//         const value = e.target.value;

//         // ONLY update the input state.
//         // No API call happens here.
//         setPrompt(value);

//         // Auto resize
//         e.target.style.height = "auto";

//         e.target.style.height =
//             Math.min(e.target.scrollHeight, 140) + "px";
//     };

//     const handlePromptKeyDown = (e) => {
//         // Ctrl + Enter / Cmd + Enter = Send
//         if (
//             (e.ctrlKey || e.metaKey) &&
//             e.key === "Enter"
//         ) {
//             e.preventDefault();

//             if (
//                 !updateLoading &&
//                 prompt.trim()
//             ) {
//                 handleUpdate();
//             }
//         }
//     };

//     return (
//         <div className="shrink-0 p-3 border-t border-white/10 bg-[#080808]">
//             <div className="relative">
//                 <textarea
//                     ref={textareaRef}
//                     value={prompt}
//                     onChange={handlePromptChange}
//                     onKeyDown={handlePromptKeyDown}
//                     disabled={updateLoading}
//                     rows={1}
//                     placeholder={
//                         updateLoading
//                             ? "AI is updating your website..."
//                             : "Describe what you want to change..."
//                     }
//                     className="
//                         w-full
//                         min-h-[48px]
//                         max-h-[140px]
//                         resize-none
//                         rounded-xl
//                         border
//                         border-white/10
//                         bg-[#111111]
//                         text-white
//                         placeholder:text-zinc-600
//                         text-sm
//                         leading-5
//                         px-3.5
//                         py-3
//                         pr-12
//                         outline-none
//                         transition
//                         focus:border-white/20
//                         focus:bg-[#151515]
//                         disabled:opacity-60
//                         disabled:cursor-not-allowed
//                     "
//                 />

//                 <button
//                     type="button"
//                     onClick={handleUpdate}
//                     disabled={
//                         updateLoading ||
//                         !prompt.trim()
//                     }
//                     className="
//                         absolute
//                         right-2
//                         bottom-2
//                         w-9
//                         h-9
//                         rounded-lg
//                         flex
//                         items-center
//                         justify-center
//                         bg-white
//                         text-black
//                         transition
//                         hover:bg-zinc-200
//                         disabled:opacity-30
//                         disabled:cursor-not-allowed
//                     "
//                     title="Send"
//                 >
//                     {updateLoading ? (
//                         <div
//                             className="
//                                 w-4
//                                 h-4
//                                 rounded-full
//                                 border-2
//                                 border-black/20
//                                 border-t-black
//                                 animate-spin
//                             "
//                         />
//                     ) : (
//                         <Send size={16} />
//                     )}
//                 </button>
//             </div>

//             <div className="flex items-center justify-between mt-2 px-1">
//                 <span className="text-[10px] text-zinc-600">
//                     Describe your changes naturally
//                 </span>

//                 <span className="text-[10px] text-zinc-600">
//                     Ctrl + Enter
//                 </span>
//             </div>
//         </div>
//     );
// }

// // =========================================================
// // HEADER
// // =========================================================

// function Header({ website }) {
//     return (
//         <div
//             className="
//                 h-14
//                 px-4
//                 flex
//                 items-center
//                 justify-between
//                 border-b
//                 border-white/10
//                 shrink-0
//                 bg-[#080808]
//             "
//         >
//             <div className="flex items-center gap-3 min-w-0">
//                 <div
//                     className="
//                         w-8
//                         h-8
//                         rounded-lg
//                         bg-gradient-to-br
//                         from-violet-500
//                         to-indigo-500
//                         flex
//                         items-center
//                         justify-center
//                         shrink-0
//                     "
//                 >
//                     <ClockFading
//                         size={16}
//                         className="text-white"
//                     />
//                 </div>

//                 <div className="min-w-0">
//                     <p className="text-sm font-semibold text-white truncate">
//                         {website.title}
//                     </p>

//                     <div className="flex items-center gap-1.5">
//                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

//                         <span className="text-[10px] text-zinc-500">
//                             AI Assistant
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // =========================================================
// // MAIN COMPONENT
// // =========================================================

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

//     // =========================================================
//     // THINKING ANIMATION
//     // =========================================================

//     useEffect(() => {
//         if (!updateLoading) return;

//         const interval = setInterval(() => {
//             setThinkingIndex(
//                 (i) => (i + 1) % thinkingSteps.length
//             );
//         }, 1500);

//         return () => clearInterval(interval);
//     }, [updateLoading]);

//     // =========================================================
//     // GET WEBSITE
//     // =========================================================

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
//                     error.response?.data ||
//                         error.message
//                 );

//                 setError(
//                     error.response?.data?.message ||
//                         "Unable to load website."
//                 );
//             }
//         };

//         if (id) {
//             handleGetWebsite();
//         }
//     }, [id]);

//     // =========================================================
//     // UPDATE WEBSITE
//     // =========================================================

//     const handleUpdate = async () => {
//         const currentPrompt = prompt.trim();

//         // Prevent empty request
//         if (!currentPrompt) {
//             return;
//         }

//         // Prevent multiple API calls
//         if (updateLoading) {
//             return;
//         }

//         setUpdateLoading(true);
//         setThinkingIndex(0);

//         // Add user message immediately
//         setMessages((m) => [
//             ...m,
//             {
//                 role: "user",
//                 content: currentPrompt,
//             },
//         ]);

//         // Clear input only after saving currentPrompt
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

//             console.log(
//                 "Update response:",
//                 result.data
//             );

//             const aiMessage =
//                 result.data.message ||
//                 "Website updated successfully.";

//             // Add AI response
//             setMessages((m) => [
//                 ...m,
//                 {
//                     role: "ai",
//                     content: aiMessage,
//                 },
//             ]);

//             // Update generated code
//             if (result.data.code) {
//                 setCode(result.data.code);
//             }

//             // Update website state
//             setWebsite((prev) => {
//                 if (!prev) return prev;

//                 return {
//                     ...prev,

//                     latestCode:
//                         result.data.code ||
//                         prev.latestCode,

//                     conversation: [
//                         ...(prev.conversation || []),

//                         {
//                             role: "user",
//                             content: currentPrompt,
//                         },

//                         {
//                             role: "ai",
//                             content: aiMessage,
//                         },
//                     ],
//                 };
//             });
//         } catch (error) {
//             console.error(
//                 "Update website error:",
//                 error.response?.data ||
//                     error.message
//             );

//             const errorMessage =
//                 error.response?.data?.message ||
//                 "Something went wrong while updating the website.";

//             setMessages((m) => [
//                 ...m,
//                 {
//                     role: "ai",
//                     content: errorMessage,
//                 },
//             ]);
//         } finally {
//             setUpdateLoading(false);
//         }
//     };

//     // =========================================================
//     // UPDATE IFRAME
//     // =========================================================

//     useEffect(() => {
//         if (!iframeRef.current || !code) {
//             return;
//         }

//         const blob = new Blob([code], {
//             type: "text/html",
//         });

//         const url =
//             URL.createObjectURL(blob);

//         iframeRef.current.src = url;

//         return () => {
//             URL.revokeObjectURL(url);
//         };
//     }, [code]);

//     // =========================================================
//     // ERROR SCREEN
//     // =========================================================

//     if (error) {
//         return (
//             <div className="h-screen w-screen flex items-center justify-center bg-[#050505] text-red-400 px-4 text-center">
//                 <div className="max-w-md">
//                     <div className="text-lg font-semibold mb-2">
//                         Something went wrong
//                     </div>

//                     <p className="text-sm text-red-300/80">
//                         {error}
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     // =========================================================
//     // LOADING SCREEN
//     // =========================================================

//     if (!website) {
//         return (
//             <div className="h-screen w-screen flex items-center justify-center bg-[#050505] text-zinc-400">
//                 <div className="flex flex-col items-center gap-4">
//                     <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin" />

//                     <span className="text-sm">
//                         Loading website...
//                     </span>
//                 </div>
//             </div>
//         );
//     }

//     // =========================================================
//     // MAIN UI
//     // =========================================================

//     return (
//         <div className="h-screen w-screen flex bg-[#050505] text-white overflow-hidden">

//             {/* =================================================
//                 DESKTOP AI SIDEBAR
//             ================================================= */}

//             <aside
//                 className="
//                     hidden
//                     lg:flex
//                     w-[320px]
//                     xl:w-[350px]
//                     2xl:w-[370px]
//                     shrink-0
//                     flex-col
//                     border-r
//                     border-white/10
//                     bg-[#080808]
//                 "
//             >
//                 <Header website={website} />

//                 <div className="flex-1 flex flex-col min-h-0">
//                     <MessageList
//                         messages={messages}
//                         updateLoading={updateLoading}
//                         thinkingIndex={thinkingIndex}
//                     />

//                     <ChatInput
//                         prompt={prompt}
//                         setPrompt={setPrompt}
//                         updateLoading={updateLoading}
//                         handleUpdate={handleUpdate}
//                     />
//                 </div>
//             </aside>

//             {/* =================================================
//                 PREVIEW AREA
//             ================================================= */}

//             <main className="flex-1 min-w-0 flex flex-col bg-[#0a0a0a]">

//                 {/* PREVIEW TOOLBAR */}

//                 <div
//                     className="
//                         h-14
//                         shrink-0
//                         px-3
//                         sm:px-4
//                         flex
//                         items-center
//                         justify-between
//                         border-b
//                         border-white/10
//                         bg-[#080808]
//                     "
//                 >
//                     {/* LEFT SIDE */}

//                     <div className="flex items-center gap-3 min-w-0">
//                         <div
//                             className="
//                                 hidden
//                                 sm:flex
//                                 w-8
//                                 h-8
//                                 rounded-lg
//                                 bg-white/5
//                                 border
//                                 border-white/10
//                                 items-center
//                                 justify-center
//                             "
//                         >
//                             <Monitor
//                                 size={15}
//                                 className="text-zinc-400"
//                             />
//                         </div>

//                         <div className="min-w-0">
//                             <p className="text-sm font-medium text-white truncate">
//                                 {website.title}
//                             </p>

//                             <div className="flex items-center gap-1.5">
//                                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

//                                 <span className="text-[10px] text-zinc-500">
//                                     Live Preview
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT SIDE */}

//                     <div className="flex items-center gap-1.5">

//                         {/* MOBILE CHAT */}

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setShowChat(true)
//                             }
//                             className="
//                                 lg:hidden
//                                 w-9
//                                 h-9
//                                 rounded-lg
//                                 flex
//                                 items-center
//                                 justify-center
//                                 text-zinc-400
//                                 hover:text-white
//                                 hover:bg-white/10
//                                 transition
//                             "
//                             title="Open chat"
//                         >
//                             <MessageSquare size={17} />
//                         </button>

//                         {/* CODE */}

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setShowCode(true)
//                             }
//                             className="
//                                 w-9
//                                 h-9
//                                 rounded-lg
//                                 flex
//                                 items-center
//                                 justify-center
//                                 text-zinc-400
//                                 hover:text-white
//                                 hover:bg-white/10
//                                 transition
//                             "
//                             title="Open code"
//                         >
//                             <Code2 size={17} />
//                         </button>

//                         {/* FULLSCREEN */}

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setShowFullPreview(true)
//                             }
//                             className="
//                                 w-9
//                                 h-9
//                                 rounded-lg
//                                 flex
//                                 items-center
//                                 justify-center
//                                 text-zinc-400
//                                 hover:text-white
//                                 hover:bg-white/10
//                                 transition
//                             "
//                             title="Fullscreen preview"
//                         >
//                             <Monitor size={17} />
//                         </button>

//                         {/* DEPLOY */}

//                         <button
//                             type="button"
//                             className="
//                                 ml-1
//                                 h-9
//                                 px-3
//                                 sm:px-4
//                                 rounded-lg
//                                 bg-white
//                                 text-black
//                                 flex
//                                 items-center
//                                 gap-1.5
//                                 text-xs
//                                 font-semibold
//                                 hover:bg-zinc-200
//                                 transition
//                             "
//                         >
//                             <Rocket size={14} />

//                             <span className="hidden sm:inline">
//                                 Deploy
//                             </span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* WEBSITE PREVIEW */}

//                 <div
//                     className="
//                         flex-1
//                         min-h-0
//                         p-2
//                         sm:p-3
//                         lg:p-4
//                         xl:p-5
//                         bg-[#0a0a0a]
//                     "
//                 >
//                     <div
//                         className="
//                             relative
//                             w-full
//                             h-full
//                             rounded-xl
//                             lg:rounded-2xl
//                             overflow-hidden
//                             border
//                             border-white/10
//                             bg-white
//                             shadow-2xl
//                         "
//                     >
//                         {/* BROWSER BAR */}

//                         <div
//                             className="
//                                 absolute
//                                 top-0
//                                 left-0
//                                 right-0
//                                 z-10
//                                 h-9
//                                 bg-[#f5f5f5]
//                                 border-b
//                                 border-black/10
//                                 flex
//                                 items-center
//                                 px-3
//                             "
//                         >
//                             <div className="flex items-center gap-1.5">
//                                 <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
//                                 <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
//                                 <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
//                             </div>

//                             <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2">
//                                 <div className="px-4 py-1 rounded-md bg-black/5 text-[10px] text-black/40">
//                                     Preview
//                                 </div>
//                             </div>
//                         </div>

//                         {/* IFRAME */}

//                         <div className="w-full h-full pt-9">
//                             <iframe
//                                 ref={iframeRef}
//                                 sandbox='allow-scripts allow-same-origin allow-forms'
//                                 title="Website Preview"
//                                 className="w-full h-full bg-white border-0"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </main>

//             {/* =================================================
//                 CODE DRAWER
//             ================================================= */}

//             <AnimatePresence>
//                 {showCode && (
//                     <motion.div
//                         initial={{
//                             x: "100%",
//                         }}
//                         animate={{
//                             x: 0,
//                         }}
//                         exit={{
//                             x: "100%",
//                         }}
//                         transition={{
//                             duration: 0.25,
//                         }}
//                         className="
//                             fixed
//                             inset-y-0
//                             right-0
//                             w-full
//                             sm:w-[90%]
//                             md:w-[75%]
//                             lg:w-[55%]
//                             xl:w-[48%]
//                             z-[9999]
//                             bg-[#1e1e1e]
//                             border-l
//                             border-white/10
//                             shadow-2xl
//                             flex
//                             flex-col
//                         "
//                     >
//                         {/* CODE HEADER */}

//                         <div
//                             className="
//                                 h-12
//                                 shrink-0
//                                 px-4
//                                 flex
//                                 items-center
//                                 justify-between
//                                 border-b
//                                 border-white/10
//                                 bg-[#1e1e1e]
//                             "
//                         >
//                             <div className="flex items-center gap-2">
//                                 <Code2
//                                     size={16}
//                                     className="text-zinc-400"
//                                 />

//                                 <span className="text-sm font-medium">
//                                     index.html
//                                 </span>
//                             </div>

//                             <button
//                                 type="button"
//                                 onClick={() =>
//                                     setShowCode(false)
//                                 }
//                                 className="
//                                     w-8
//                                     h-8
//                                     rounded-lg
//                                     flex
//                                     items-center
//                                     justify-center
//                                     text-zinc-400
//                                     hover:text-white
//                                     hover:bg-white/10
//                                     transition
//                                 "
//                                 title="Close editor"
//                             >
//                                 <X size={17} />
//                             </button>
//                         </div>

//                         {/* MONACO EDITOR */}

//                         <div className="flex-1 min-h-0">
//                             <Editor
//                                 height="100%"
//                                 language="html"
//                                 value={code}
//                                 theme="vs-dark"
//                                 onChange={(value) =>
//                                     setCode(value || "")
//                                 }
//                                 options={{
//                                     minimap: {
//                                         enabled: false,
//                                     },
//                                     fontSize: 14,
//                                     lineNumbers: "on",
//                                     wordWrap: "on",
//                                     automaticLayout: true,
//                                     padding: {
//                                         top: 12,
//                                         bottom: 12,
//                                     },
//                                     scrollBeyondLastLine: false,
//                                     smoothScrolling: true,
//                                     cursorSmoothCaretAnimation:
//                                         "on",
//                                     renderWhitespace:
//                                         "selection",
//                                 }}
//                             />
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* =================================================
//                 FULLSCREEN PREVIEW
//             ================================================= */}

//             <AnimatePresence>
//                 {showFullPreview && (
//                     <motion.div
//                         initial={{
//                             opacity: 0,
//                         }}
//                         animate={{
//                             opacity: 1,
//                         }}
//                         exit={{
//                             opacity: 0,
//                         }}
//                         transition={{
//                             duration: 0.2,
//                         }}
//                         className="
//                             fixed
//                             inset-0
//                             z-[9999]
//                             bg-black
//                             flex
//                             flex-col
//                         "
//                     >
//                         {/* FULLSCREEN HEADER */}

//                         <div
//                             className="
//                                 h-12
//                                 shrink-0
//                                 bg-[#090909]
//                                 border-b
//                                 border-white/10
//                                 flex
//                                 items-center
//                                 justify-between
//                                 px-4
//                             "
//                         >
//                             <div className="flex items-center gap-2">
//                                 <Monitor
//                                     size={16}
//                                     className="text-zinc-400"
//                                 />

//                                 <span className="text-sm text-zinc-300">
//                                     Full Preview
//                                 </span>
//                             </div>

//                             <button
//                                 type="button"
//                                 onClick={() =>
//                                     setShowFullPreview(false)
//                                 }
//                                 className="
//                                     w-8
//                                     h-8
//                                     rounded-lg
//                                     flex
//                                     items-center
//                                     justify-center
//                                     text-zinc-400
//                                     hover:text-white
//                                     hover:bg-white/10
//                                     transition
//                                 "
//                             >
//                                 <X size={18} />
//                             </button>
//                         </div>

//                         {/* FULLSCREEN WEBSITE */}

//                         <div className="flex-1 min-h-0 bg-white">
//                             <iframe
//                                 title="Full Website Preview"
//                                 sandbox='allow-scripts allow-same-origin allow-forms'
//                                 className="w-full h-full border-0 bg-white"
//                                 srcDoc={code}
//                             />
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* =================================================
//                 MOBILE CHAT
//             ================================================= */}

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
//                             duration: 0.25,
//                         }}
//                         className="
//                             fixed
//                             inset-0
//                             z-[9999]
//                             bg-[#050505]
//                             flex
//                             flex-col
//                         "
//                     >
//                         {/* MOBILE CHAT HEADER */}

//                         <div
//                             className="
//                                 h-14
//                                 shrink-0
//                                 px-4
//                                 flex
//                                 items-center
//                                 justify-between
//                                 border-b
//                                 border-white/10
//                                 bg-[#080808]
//                             "
//                         >
//                             <div className="flex items-center gap-2 min-w-0">
//                                 <div
//                                     className="
//                                         w-8
//                                         h-8
//                                         rounded-lg
//                                         bg-gradient-to-br
//                                         from-violet-500
//                                         to-indigo-500
//                                         flex
//                                         items-center
//                                         justify-center
//                                     "
//                                 >
//                                     <span className="text-[10px] font-bold text-white">
//                                         AI
//                                     </span>
//                                 </div>

//                                 <div className="min-w-0">
//                                     <p className="text-sm font-medium truncate">
//                                         {website.title}
//                                     </p>

//                                     <p className="text-[10px] text-zinc-500">
//                                         AI Website Assistant
//                                     </p>
//                                 </div>
//                             </div>

//                             <button
//                                 type="button"
//                                 onClick={() =>
//                                     setShowChat(false)
//                                 }
//                                 className="
//                                     w-8
//                                     h-8
//                                     rounded-lg
//                                     flex
//                                     items-center
//                                     justify-center
//                                     text-zinc-400
//                                     hover:text-white
//                                     hover:bg-white/10
//                                     transition
//                                 "
//                             >
//                                 <X size={18} />
//                             </button>
//                         </div>

//                         {/* MOBILE CHAT BODY */}

//                         <div className="flex-1 flex flex-col min-h-0">
//                             <MessageList
//                                 messages={messages}
//                                 updateLoading={updateLoading}
//                                 thinkingIndex={thinkingIndex}
//                             />

//                             <ChatInput
//                                 prompt={prompt}
//                                 setPrompt={setPrompt}
//                                 updateLoading={updateLoading}
//                                 handleUpdate={handleUpdate}
//                             />
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }

// export default WebsiteEditor;
























import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { serverUrl } from "../App";
import { useParams } from "react-router-dom";

import {
    Bot,
    Check,
    ChevronDown,
    Clock3,
    Code2,
    ExternalLink,
    Globe,
    Loader2,
    MessageSquare,
    Monitor,
    RefreshCw,
    Rocket,
    Send,
    Smartphone,
    Sparkles,
    Tablet,
    X,
} from "lucide-react";

import { AnimatePresence, motion } from "motion/react";
import Editor from "@monaco-editor/react";

// =========================================================
// THINKING STEPS
// =========================================================

const thinkingSteps = [
    "Understanding your request...",
    "Planning the changes...",
    "Designing the improvements...",
    "Applying responsive styles...",
    "Optimizing the website...",
    "Finalizing your update...",
];

// =========================================================
// SUGGESTED PROMPTS
// =========================================================

const suggestedPrompts = [
    "Make the design more modern and premium",
    "Improve the mobile responsiveness",
    "Add smoother animations",
    "Make the hero section more attractive",
];

// =========================================================
// MESSAGE LIST
// =========================================================

function MessageList({
    messages,
    updateLoading,
    thinkingIndex,
    onSuggestion,
}) {
    return (
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.length === 0 ? (
                <div className="min-h-full flex items-center justify-center">
                    <div className="text-center max-w-[270px]">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-400/20 flex items-center justify-center"
                        >
                            <Sparkles
                                size={23}
                                className="text-violet-300"
                            />
                        </motion.div>

                        <h3 className="text-sm font-semibold text-white mb-1">
                            Build with AI
                        </h3>

                        <p className="text-xs leading-relaxed text-zinc-500 mb-5">
                            Tell the AI what you want to change and it will
                            update your website automatically.
                        </p>

                        <div className="space-y-2 text-left">
                            {suggestedPrompts.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => onSuggestion(item)}
                                    className="w-full px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-zinc-400 text-left hover:text-white hover:bg-white/[0.07] hover:border-white/20 transition"
                                >
                                    <span className="flex items-center gap-2">
                                        <Sparkles
                                            size={12}
                                            className="text-violet-400 shrink-0"
                                        />
                                        {item}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {messages.map((message, index) => (
                        <motion.div
                            key={`${message.role}-${index}`}
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
                                message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            {message.role !== "user" && (
                                <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/10">
                                    <Bot
                                        size={13}
                                        className="text-white"
                                    />
                                </div>
                            )}

                            <div
                                className={`max-w-[84%] flex flex-col ${
                                    message.role === "user"
                                        ? "items-end"
                                        : "items-start"
                                }`}
                            >
                                <div
                                    className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed break-words whitespace-pre-wrap ${
                                        message.role === "user"
                                            ? "bg-white text-black rounded-br-md"
                                            : "bg-[#111111] border border-white/10 text-zinc-200 rounded-bl-md"
                                    }`}
                                >
                                    {message.content}
                                </div>

                                <span className="text-[9px] text-zinc-700 mt-1 px-1">
                                    {message.role === "user"
                                        ? "You"
                                        : "AI Assistant"}
                                </span>
                            </div>
                        </motion.div>
                    ))}

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
                                <Bot
                                    size={13}
                                    className="text-white"
                                />
                            </div>

                            <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-[#111111] border border-white/10">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />

                                        <span
                                            className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
                                            style={{
                                                animationDelay: "120ms",
                                            }}
                                        />

                                        <span
                                            className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
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
                </>
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

        setPrompt(value);

        e.target.style.height = "auto";
        e.target.style.height =
            Math.min(e.target.scrollHeight, 140) + "px";
    };

    const handlePromptKeyDown = (e) => {
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
                    className="w-full min-h-[50px] max-h-[140px] resize-none rounded-xl border border-white/10 bg-[#111111] text-white placeholder:text-zinc-600 text-sm leading-5 px-3.5 py-3 pr-12 outline-none transition focus:border-violet-400/40 focus:bg-[#151515] disabled:opacity-60 disabled:cursor-not-allowed"
                />

                <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={
                        updateLoading ||
                        !prompt.trim()
                    }
                    className="absolute right-2 bottom-2 w-9 h-9 rounded-lg flex items-center justify-center bg-white text-black transition hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Send"
                >
                    {updateLoading ? (
                        <Loader2
                            size={16}
                            className="animate-spin"
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
        <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 shrink-0 bg-[#080808]">
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/10">
                    <Sparkles
                        size={15}
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
                            AI Website Builder
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

    const [updateLoading, setUpdateLoading] =
        useState(false);

    const [deployLoading, setDeployLoading] =
        useState(false);

    const [deployedUrl, setDeployedUrl] =
        useState("");

    const [thinkingIndex, setThinkingIndex] =
        useState(0);

    const [showCode, setShowCode] =
        useState(false);

    const [showFullPreview, setShowFullPreview] =
        useState(false);

    const [showChat, setShowChat] =
        useState(false);

    const [previewMode, setPreviewMode] =
        useState("desktop");

    const iframeRef = useRef(null);

    // =========================================================
    // THINKING ANIMATION
    // =========================================================

    useEffect(() => {
        if (!updateLoading) return;

        const interval = setInterval(() => {
            setThinkingIndex(
                (i) =>
                    (i + 1) %
                    thinkingSteps.length
            );
        }, 1500);

        return () =>
            clearInterval(interval);
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

                console.log(
                    "Website:",
                    result.data
                );

                setWebsite(result.data);

                setCode(
                    result.data.latestCode || ""
                );

                setMessages(
                    result.data.conversation || []
                );

                if (result.data.deployUrl) {
                    setDeployedUrl(
                        result.data.deployUrl
                    );
                }
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
        const currentPrompt =
            prompt.trim();

        if (!currentPrompt) return;

        if (updateLoading) return;

        setUpdateLoading(true);
        setThinkingIndex(0);

        setMessages((m) => [
            ...m,
            {
                role: "user",
                content: currentPrompt,
            },
        ]);

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

            setMessages((m) => [
                ...m,
                {
                    role: "ai",
                    content: aiMessage,
                },
            ]);

            if (result.data.code) {
                setCode(result.data.code);
            }

            setWebsite((prev) => {
                if (!prev) return prev;

                return {
                    ...prev,
                    latestCode:
                        result.data.code ||
                        prev.latestCode,

                    conversation: [
                        ...(prev.conversation ||
                            []),
                        {
                            role: "user",
                            content:
                                currentPrompt,
                        },
                        {
                            role: "ai",
                            content:
                                aiMessage,
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
    // DEPLOY WEBSITE
    // =========================================================
    const handleDeploy = async () => {
    if (deployLoading) return;

    if (!code) {
        alert("Please generate your website before deploying.");
        return;
    }

    try {
        setDeployLoading(true);

        const result = await axios.get(
            `${serverUrl}/api/website/deploy/${id}`,
            {
                withCredentials: true,
            }
        );

        console.log("Deploy response:", result.data);

        const url =
            result.data?.url ||
            result.data?.deployUrl ||
            result.data?.data?.url;

        if (!url) {
            throw new Error(
                "Deployment URL was not returned by the server."
            );
        }

        // Update deployed URL
        setDeployedUrl(url);

        // Update local website state
        setWebsite((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                deployUrl: url,
                deployed: true,
            };
        });

        // Open deployed website
        window.open(url, "_blank", "noopener,noreferrer");

    } catch (error) {
        console.error(
            "Deploy website error:",
            error.response?.data || error.message
        );

        alert(
            error.response?.data?.message ||
                error.message ||
                "Deployment failed. Please try again."
        );
    } finally {
        setDeployLoading(false);
    }
};

    // =========================================================
    // UPDATE IFRAME
    // =========================================================

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

        const url =
            URL.createObjectURL(blob);

        iframeRef.current.src = url;

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [code]);

    // =========================================================
    // SUGGESTION
    // =========================================================

    const handleSuggestion = (text) => {
        setPrompt(text);

        setTimeout(() => {
            const textarea =
                document.querySelector(
                    "textarea"
                );

            if (textarea) {
                textarea.focus();
            }
        }, 50);
    };

    // =========================================================
    // ERROR
    // =========================================================

    if (error) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-[#050505] text-white px-4 text-center">
                <div className="max-w-md">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <X
                            size={22}
                            className="text-red-400"
                        />
                    </div>

                    <div className="text-lg font-semibold mb-2">
                        Something went wrong
                    </div>

                    <p className="text-sm text-zinc-500">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    // =========================================================
    // LOADING
    // =========================================================

    if (!website) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-[#050505] text-zinc-400">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-9 h-9 rounded-full border-2 border-white/10 border-t-violet-400 animate-spin" />

                    <span className="text-sm">
                        Loading your website...
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

            <aside className="hidden lg:flex w-[320px] xl:w-[350px] 2xl:w-[370px] shrink-0 flex-col border-r border-white/10 bg-[#080808]">
                <Header website={website} />

                <div className="flex-1 flex flex-col min-h-0">
                    <MessageList
                        messages={messages}
                        updateLoading={
                            updateLoading
                        }
                        thinkingIndex={
                            thinkingIndex
                        }
                        onSuggestion={
                            handleSuggestion
                        }
                    />

                    <ChatInput
                        prompt={prompt}
                        setPrompt={setPrompt}
                        updateLoading={
                            updateLoading
                        }
                        handleUpdate={
                            handleUpdate
                        }
                    />
                </div>
            </aside>

            {/* =================================================
                PREVIEW AREA
            ================================================= */}

            <main className="flex-1 min-w-0 flex flex-col bg-[#0a0a0a]">
                {/* TOOLBAR */}

                <div className="h-14 shrink-0 px-3 sm:px-4 flex items-center justify-between border-b border-white/10 bg-[#080808]">
                    {/* LEFT */}

                    <div className="flex items-center gap-3 min-w-0">
                        <div className="hidden sm:flex w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 items-center justify-center">
                            <Globe
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

                    {/* RIGHT */}

                    <div className="flex items-center gap-1.5">
                        {/* MOBILE CHAT */}

                        <button
                            type="button"
                            onClick={() =>
                                setShowChat(
                                    true
                                )
                            }
                            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            title="Open AI chat"
                        >
                            <MessageSquare
                                size={17}
                            />
                        </button>

                        {/* DEVICE SELECTOR */}

                        <div className="hidden sm:flex items-center gap-0.5 p-1 rounded-lg bg-white/[0.04] border border-white/10">
                            <button
                                type="button"
                                onClick={() =>
                                    setPreviewMode(
                                        "desktop"
                                    )
                                }
                                className={`w-8 h-7 rounded-md flex items-center justify-center transition ${
                                    previewMode ===
                                    "desktop"
                                        ? "bg-white/10 text-white"
                                        : "text-zinc-500 hover:text-white"
                                }`}
                                title="Desktop preview"
                            >
                                <Monitor
                                    size={14}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setPreviewMode(
                                        "tablet"
                                    )
                                }
                                className={`w-8 h-7 rounded-md flex items-center justify-center transition ${
                                    previewMode ===
                                    "tablet"
                                        ? "bg-white/10 text-white"
                                        : "text-zinc-500 hover:text-white"
                                }`}
                                title="Tablet preview"
                            >
                                <Tablet
                                    size={14}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setPreviewMode(
                                        "mobile"
                                    )
                                }
                                className={`w-8 h-7 rounded-md flex items-center justify-center transition ${
                                    previewMode ===
                                    "mobile"
                                        ? "bg-white/10 text-white"
                                        : "text-zinc-500 hover:text-white"
                                }`}
                                title="Mobile preview"
                            >
                                <Smartphone
                                    size={14}
                                />
                            </button>
                        </div>

                        {/* CODE */}

                        <button
                            type="button"
                            onClick={() =>
                                setShowCode(
                                    true
                                )
                            }
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            title="Open code"
                        >
                            <Code2
                                size={17}
                            />
                        </button>

                        {/* REFRESH */}

                        <button
                            type="button"
                            onClick={() => {
                                if (
                                    iframeRef.current
                                ) {
                                    iframeRef.current.src =
                                        iframeRef.current.src;
                                }
                            }}
                            className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            title="Refresh preview"
                        >
                            <RefreshCw
                                size={16}
                            />
                        </button>

                        {/* FULLSCREEN */}

                        <button
                            type="button"
                            onClick={() =>
                                setShowFullPreview(
                                    true
                                )
                            }
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            title="Fullscreen preview"
                        >
                            <Monitor
                                size={17}
                            />
                        </button>

                        {/* DEPLOY */}

                        <button
                            type="button"
                            onClick={
                                handleDeploy
                            }
                            disabled={
                                deployLoading
                            }
                            className="ml-1 h-9 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white flex items-center gap-1.5 text-xs font-semibold hover:from-violet-400 hover:to-indigo-400 transition shadow-lg shadow-violet-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {deployLoading ? (
                                <>
                                    <Loader2
                                        size={
                                            14
                                        }
                                        className="animate-spin"
                                    />

                                    <span className="hidden sm:inline">
                                        Deploying...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Rocket
                                        size={
                                            14
                                        }
                                    />

                                    <span className="hidden sm:inline">
                                        {deployedUrl
                                            ? "Redeploy"
                                            : "Deploy"}
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* PREVIEW */}

                <div className="flex-1 min-h-0 p-2 sm:p-3 lg:p-4 xl:p-5 bg-[#0a0a0a] flex justify-center">
                    <motion.div
                        animate={{
                            width:
                                previewMode ===
                                "mobile"
                                    ? "390px"
                                    : previewMode ===
                                      "tablet"
                                    ? "768px"
                                    : "100%",
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        className="relative h-full rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 bg-white shadow-2xl"
                    >
                        {/* BROWSER BAR */}

                        <div className="absolute top-0 left-0 right-0 z-10 h-9 bg-[#f5f5f5] border-b border-black/10 flex items-center px-3">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
                                <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
                                <span className="w-2.5 h-2.5 rounded-full bg-black/15" />
                            </div>

                            <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
                                <div className="px-5 py-1 rounded-md bg-black/5 text-[10px] text-black/40">
                                    {deployedUrl ||
                                        "Live Preview"}
                                </div>
                            </div>
                        </div>

                        {/* IFRAME */}

                        <div className="w-full h-full pt-9">
                            <iframe
                                ref={
                                    iframeRef
                                }
                                sandbox="allow-scripts allow-same-origin allow-forms"
                                title="Website Preview"
                                className="w-full h-full bg-white border-0"
                            />
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* =================================================
                DEPLOYED URL FLOATING CARD
            ================================================= */}

            <AnimatePresence>
                {deployedUrl && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="fixed bottom-5 right-5 z-[9000] hidden sm:block"
                    >
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111111]/95 backdrop-blur-xl border border-emerald-500/20 shadow-2xl">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <Check
                                    size={15}
                                    className="text-emerald-400"
                                />
                            </div>

                            <div className="max-w-[220px]">
                                <p className="text-xs font-medium text-white">
                                    Website deployed
                                </p>

                                <p className="text-[10px] text-zinc-500 truncate">
                                    {deployedUrl}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    window.open(
                                        deployedUrl,
                                        "_blank",
                                        "noopener,noreferrer"
                                    )
                                }
                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
                                title="Open deployed website"
                            >
                                <ExternalLink
                                    size={14}
                                    className="text-zinc-300"
                                />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                        className="fixed inset-y-0 right-0 w-full sm:w-[90%] md:w-[75%] lg:w-[55%] xl:w-[48%] z-[9999] bg-[#1e1e1e] border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        <div className="h-12 shrink-0 px-4 flex items-center justify-between border-b border-white/10 bg-[#1e1e1e]">
                            <div className="flex items-center gap-2">
                                <Code2
                                    size={16}
                                    className="text-violet-400"
                                />

                                <span className="text-sm font-medium">
                                    index.html
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowCode(
                                        false
                                    )
                                }
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                                title="Close editor"
                            >
                                <X
                                    size={17}
                                />
                            </button>
                        </div>

                        <div className="flex-1 min-h-0">
                            <Editor
                                height="100%"
                                language="html"
                                value={code}
                                theme="vs-dark"
                                onChange={(
                                    value
                                ) =>
                                    setCode(
                                        value ||
                                            ""
                                    )
                                }
                                options={{
                                    minimap: {
                                        enabled: false,
                                    },
                                    fontSize: 14,
                                    lineNumbers:
                                        "on",
                                    wordWrap:
                                        "on",
                                    automaticLayout:
                                        true,
                                    padding: {
                                        top: 12,
                                        bottom: 12,
                                    },
                                    scrollBeyondLastLine:
                                        false,
                                    smoothScrolling:
                                        true,
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
                        className="fixed inset-0 z-[9999] bg-black flex flex-col"
                    >
                        <div className="h-12 shrink-0 bg-[#090909] border-b border-white/10 flex items-center justify-between px-4">
                            <div className="flex items-center gap-2">
                                <Monitor
                                    size={16}
                                    className="text-violet-400"
                                />

                                <span className="text-sm text-zinc-300">
                                    Full Preview
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowFullPreview(
                                        false
                                    )
                                }
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            >
                                <X
                                    size={18}
                                />
                            </button>
                        </div>

                        <div className="flex-1 min-h-0 bg-white">
                            <iframe
                                title="Full Website Preview"
                                sandbox="allow-scripts allow-same-origin allow-forms"
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
                        className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col lg:hidden"
                    >
                        <div className="h-14 shrink-0 px-4 flex items-center justify-between border-b border-white/10 bg-[#080808]">
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                                    <Bot
                                        size={15}
                                        className="text-white"
                                    />
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
                                    setShowChat(
                                        false
                                    )
                                }
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                            >
                                <X
                                    size={18}
                                />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col min-h-0">
                            <MessageList
                                messages={
                                    messages
                                }
                                updateLoading={
                                    updateLoading
                                }
                                thinkingIndex={
                                    thinkingIndex
                                }
                                onSuggestion={
                                    handleSuggestion
                                }
                            />

                            <ChatInput
                                prompt={
                                    prompt
                                }
                                setPrompt={
                                    setPrompt
                                }
                                updateLoading={
                                    updateLoading
                                }
                                handleUpdate={
                                    handleUpdate
                                }
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default WebsiteEditor;
