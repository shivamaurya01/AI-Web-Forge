// import axios from "axios";
// import React from "react";
// import { serverUrl } from "../App";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { useState, useRef } from "react";
// import { ClockFading, Code, Code2, Monitor, Rocket } from "lucide-react";
// import { Send } from "lucide-react";

// function Editor() {

//   const { id } = useParams();
//   const [website, setWebsite] = useState(null);
//   const [error, setError] = useState("");
//   const [code,setCode] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [prompt,setPrompt] = useState("")
//   const iframeRef = useRef(null);

//   const handleUpdate=async ()=>{
//     setMessages((m)=>[...m,{role:"user",content:prompt}])
//     try{
//       const result = await axios(`${serverUrl}/api/website/update/${id}`,{prompt},{withCredentials:true})
//       console.log(result);
//       setMessages((m)=>[...m,{role:"ai",content:result.data.message}])
//       setCode(result.data.code)
//     }catch(error){
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     const handleGetWebsite = async () => {
//       try {
//         const result = await axios.get(
//           `${serverUrl}/api/website/get-by-id/${id}`,
//           { withCredentials: true },
//         );
//         setWebsite(result.data);
//         setCode(result.data.latestCode)
//         setMessages(result.data.conversation)

//       } catch (error) {
//         console.log(error);
//         setError(error.response.data.message);
//       }
//     };
//     handleGetWebsite();
//   }, [id]);

//   useEffect(() => {
//     if (!iframeRef.current || !code) return;

//     const blob = new Blob([code], { type: "text/html" });
//     const url = URL.createObjectURL(blob);
//     iframeRef.current.src = url;
//     return () => URL.revokeObjectURL(url);
//   }, [website?.latestCode]);

//   if (error) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-black text-red-400">
//         {error}
//       </div>
//     );
//   }

//   if (!website) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-black text-white-400">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
//       <aside className="hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80 ">
//         <Header />
//         <Chat />
//       </aside>

//       <div className="flex-1 flex flex-col">
//         <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80 ">
//           <span className="text-xs text-zinc-400">Live Preview</span>
//           <div className="flex gap-2">
//             <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition">
//               <Rocket size={14} /> Deploy
//             </button>
//             <button className="p-2 ">
//               {" "}
//               <Code2 size={18} />{" "}
//             </button>
//             <button className="p-2">
//               <Monitor />
//             </button>
//           </div>
//         </div>

//         <iframe ref={iframeRef} className="flex-1 w-full bg-white" />
//       </div>
//     </div>
//   );

//   function Header() {
//     return (
//       <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
//         <span className="font-semibold truncate"> {website.title} </span>
//       </div>
//     );
//   }
//   // function Chat() {
  

//   //   return (
//   //       <>
//   //         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
//   //       {website.conversation.map((m, i) => (
//   //         <div
//   //           key={i}
//   //           className={`max-w-[85%] ${
//   //             m.role === "user" ? "ml-auto" : "mr-auto"
//   //           }`}
//   //         >
//   //           <div
//   //             className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
//   //               m.role === "user"
//   //                 ? "bg-white text-black"
//   //                 : "bg-white/5 border border-white/10 text-zinc-200"
//   //             }`}
//   //           >
//   //             {m.content}
//   //           </div>
//   //         </div>
//   //       ))}

//   //       <div className="p-3 border-t border-white/10">
//   //               <div className="flex gap-2">
//   //                 <textarea rows="1" placeholder="Describe Changes..." className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"></textarea>
//   //                 <button className="px-4 py-3 rounded-2xl bg-white text-black">
//   //                   <Send size={14}/>
//   //                 </button>

//   //               </div>
//   //       </div>

//   //     </div>
    
//   //       </>
    
//   //   );
//   // }

// function Chat() {
//   return (
//     <div className="h-full flex flex-col">

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
//         {messages.conversation.map((m, i) => (
//           <div
//             key={i}
//             className={`max-w-[85%] ${
//               m.role === "user" ? "ml-auto" : "mr-auto"
//             }`}
//           >
//             <div
//               className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
//                 m.role === "user"
//                   ? "bg-white text-black"
//                   : "bg-white/5 border border-white/10 text-zinc-200"
//               }`}
//             >
//               {m.content}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input - Fixed at bottom */}
//       <div className="p-3 border-t border-white/10 shrink-0">
//         <div className="flex gap-2">
//           <textarea
//             rows="1"
//             placeholder="Describe Changes..."
//             className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"
//             onChange={(e)=>setPrompt(e.target.value)}
//             value={prompt}
//           />

//           <button
//             className="px-4 py-3 rounded-2xl bg-white text-black"
//             onClick={handleUpdate}
//           >
//             <Send size={14} />
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }


// }

// export default Editor;









import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { serverUrl } from "../App";
import { useParams } from "react-router-dom";
import {
    ClockFading,
    Code2,
    Monitor,
    Rocket,
    Send,
} from "lucide-react";

function Editor() {

    const { id } = useParams();

    const [website, setWebsite] = useState(null);
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const iframeRef = useRef(null);

    // =========================
    // UPDATE WEBSITE
    // =========================

    const handleUpdate = async () => {

        if (!prompt.trim()) return;

        const currentPrompt = prompt;

        // Show user message immediately
        setMessages((m) => [
            ...m,
            {
                role: "user",
                content: currentPrompt,
            },
        ]);

        setPrompt("");
        setLoading(true);

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

            // console.log("Update response:", result.data);

            // Add AI response
            setMessages((m) => [
                ...m,
                {
                    role: "ai",
                    content: result.data.message,
                },
            ]);

            // Update generated code
            setCode(result.data.code);

            // Update website state as well
            setWebsite((prev) => ({
                ...prev,
                latestCode: result.data.code,
                conversation: [
                    ...(prev?.conversation || []),
                    {
                        role: "user",
                        content: currentPrompt,
                    },
                    {
                        role: "ai",
                        content: result.data.message,
                    },
                ],
            }));

        } catch (error) {

            console.error(
                "Update website error:",
                error.response?.data || error.message
            );

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
            setLoading(false);
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

                // console.log("Website:", result.data);

                setWebsite(result.data);

                setCode(result.data.latestCode || "");

                setMessages(result.data.conversation || []);

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

        if (!iframeRef.current || !code) return;

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
            <div className="h-screen flex items-center justify-center bg-black text-red-400 px-4 text-center">
                {error}
            </div>
        );
    }

    // =========================
    // LOADING SCREEN
    // =========================

    if (!website) {

        return (
            <div className="h-screen flex items-center justify-center bg-black text-zinc-400">
                Loading...
            </div>
        );
    }

    // =========================
    // MAIN EDITOR
    // =========================

    return (

        <div className="h-screen w-screen flex bg-black text-white overflow-hidden">

            {/* ================= SIDEBAR ================= */}

            <aside className="hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80">

                <Header />

                 <div className="h-full flex flex-col">

                {/* Messages */}

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

                    {messages.map((m, i) => (

                        <div
                            key={i}
                            className={`max-w-[85%] ${
                                m.role === "user"
                                    ? "ml-auto"
                                    : "mr-auto"
                            }`}
                        >

                            <div
                                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                    m.role === "user"
                                        ? "bg-white text-black"
                                        : "bg-white/5 border border-white/10 text-zinc-200"
                                }`}
                            >

                                {m.content}

                            </div>

                        </div>

                    ))}


                    {/* AI Loading */}

                    {loading && (

                        <div className="mr-auto max-w-[85%]">

                            <div className="px-4 py-2.5 rounded-2xl text-sm bg-white/5 border border-white/10 text-zinc-400">

                                Generating changes...

                            </div>

                        </div>

                    )}

                </div>


                {/* Input */}

                <div className="p-3 border-t border-white/10 shrink-0">

                    <div className="flex gap-2">

                        <input
                            
                            placeholder="Describe Changes..."
                            className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none focus:border-white/20"
                            onChange={(e) =>
                                setPrompt(e.target.value)
                            }
                            value={prompt}
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
                            className="px-4 py-3 rounded-2xl bg-white text-black hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleUpdate}
                            disabled={loading || !prompt.trim()}
                        >

                            <Send size={14} />

                        </button>

                    </div>

                </div>

            </div>

            </aside>


            {/* ================= PREVIEW ================= */}

            <div className="flex-1 flex flex-col">

                {/* Preview Header */}

                <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">

                    <span className="text-xs text-zinc-400">
                        Live Preview
                    </span>

                    <div className="flex gap-2">

                        <button
                            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition"
                        >
                            <Rocket size={14} />
                            Deploy
                        </button>

                        <button
                            className="p-2 hover:bg-white/10 rounded-lg transition"
                        >
                            <Code2 size={18} />
                        </button>

                        <button
                            className="p-2 hover:bg-white/10 rounded-lg transition"
                        >
                            <Monitor size={18} />
                        </button>

                    </div>

                </div>


                {/* Iframe */}

                <iframe
                    ref={iframeRef}
                    title="Website Preview"
                    className="flex-1 w-full bg-white"
                />

            </div>

        </div>
    );


    // =========================
    // HEADER COMPONENT
    // =========================

    function Header() {

        return (

            <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">

                <div className="flex items-center gap-2 min-w-0">

                    <ClockFading
                        size={18}
                        className="text-purple-400 shrink-0"
                    />

                    <span className="font-semibold truncate">
                        {website.title}
                    </span>

                </div>

            </div>
        );
    }


  

    
}

export default Editor;