import axios from "axios";
import React from "react";
import { serverUrl } from "../App";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { Code, Code2, Monitor, Rocket } from "lucide-react";
import { Send } from "lucide-react";

function Editor() {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/website/get-by-id/${id}`,
          { withCredentials: true },
        );
        setWebsite(result.data);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };
    handleGetWebsite();
  }, [id]);

  useEffect(() => {
    if (!iframeRef.current || !website?.latestCode) return;

    const blob = new Blob([website.latestCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [website?.latestCode]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }

  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
      <aside className="hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80 ">
        <Header />
        <Chat />
      </aside>

      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80 ">
          <span className="text-xs text-zinc-400">Live Preview</span>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition">
              <Rocket size={14} /> Deploy
            </button>
            <button className="p-2 ">
              {" "}
              <Code2 size={18} />{" "}
            </button>
            <button className="p-2">
              <Monitor />
            </button>
          </div>
        </div>

        <iframe ref={iframeRef} className="flex-1 w-full bg-white" />
      </div>
    </div>
  );

  function Header() {
    return (
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
        <span className="font-semibold truncate"> {website.title} </span>
      </div>
    );
  }
  // function Chat() {
  

  //   return (
  //       <>
  //         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
  //       {website.conversation.map((m, i) => (
  //         <div
  //           key={i}
  //           className={`max-w-[85%] ${
  //             m.role === "user" ? "ml-auto" : "mr-auto"
  //           }`}
  //         >
  //           <div
  //             className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
  //               m.role === "user"
  //                 ? "bg-white text-black"
  //                 : "bg-white/5 border border-white/10 text-zinc-200"
  //             }`}
  //           >
  //             {m.content}
  //           </div>
  //         </div>
  //       ))}

  //       <div className="p-3 border-t border-white/10">
  //               <div className="flex gap-2">
  //                 <textarea rows="1" placeholder="Describe Changes..." className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"></textarea>
  //                 <button className="px-4 py-3 rounded-2xl bg-white text-black">
  //                   <Send size={14}/>
  //                 </button>

  //               </div>
  //       </div>

  //     </div>
    
  //       </>
    
  //   );
  // }

function Chat() {
  return (
    <div className="h-full flex flex-col">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {website.conversation.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] ${
              m.role === "user" ? "ml-auto" : "mr-auto"
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
      </div>

      {/* Input - Fixed at bottom */}
      <div className="p-3 border-t border-white/10 shrink-0">
        <div className="flex gap-2">
          <textarea
            rows="1"
            placeholder="Describe Changes..."
            className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"
          />

          <button
            className="px-4 py-3 rounded-2xl bg-white text-black"
          >
            <Send size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}


}

export default Editor;
