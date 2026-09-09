// import React from "react";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "motion/react";

// function Generate() {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white">
//       <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               className="p-2 rounded-lg hover:bg-white/10 transition"
//               onClick={() => navigate("/")}
//             >
//               <ArrowLeft size={17} />
//             </button>
//             <h1 className="text-lg font-semibold">
//               Genweb.<span className="text-zinc-400">ai</span>
//             </h1>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 py-16">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
//             Build Websites with{" "}
//             <span className="block bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
//               Real AI Power
//             </span>
//           </h1>

//           <p className="text-zinc-400 max-w-2xl mx-auto">
//             This process may take several minutes. genweb.ai focuses on quality,
//             not shortcuts.
//           </p>
//         </motion.div>

//         <div className="mb-14">
//           <h1 className="text-xl font-semibold mb-2">Describe your Website</h1>
//           <div className="relative">
//             <textarea
//               name=""
//               id=""
//               placeholder="Describe your website in detail..."
//               className="w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus-ring-white/20"
//             ></textarea>

//           </div>


//         </div>
//         <div className="flex justify-center"> 
//             <motion.button
//             whileHover={{scale:1.05}}
//             whileTap={{scale: 0.96}}
//             className="px-14 py-4 rounded-2xl font-semibold text-lg  bg-white text-black"
            
//             >
//                 Generate Website
//             </motion.button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Generate;










import React, { useState } from 'react';
import { ArrowLeft, Sparkles, WandSparkles, Globe, Zap, Trophy, Server, ClockFading } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import axios from "axios"
import { serverUrl } from '../App.jsx';

function Generate() {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');

    const handleGenerateWebsite=async ()=>{
        try{
            const result = await axios.post(`${serverUrl}/api/website/generate`,{prompt},{withCredentials:true})
            console.log(result)
        }catch (error) {
    console.error("Generation Error:", error);

    console.error("Backend response:", error.response?.data);
}
    }

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
                        'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '45px 45px'
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
                        Describe what you want to build. Genweb.ai will transform
                        your idea into a beautiful, functional website.
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
                                    <WandSparkles size={18} className="text-zinc-300" />
                                </div>

                                <div className="flex-1">

                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Describe the website you want to create..."
                                        className="w-full h-40 bg-transparent resize-none outline-none text-lg text-white placeholder:text-zinc-700 leading-relaxed"
                                    />

                                </div>

                            </div>

                            {/* Suggestions */}
                            <div className="flex flex-wrap gap-2 mt-5">

                                {[
                                    "Modern SaaS landing page",
                                    "Portfolio website",
                                    "AI startup",
                                    "E-commerce store"
                                ].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setPrompt(item)}
                                        className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs text-zinc-500 hover:text-white hover:bg-white/[0.06] transition"
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
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    disabled={!prompt.trim()}
                                    onClick={handleGenerateWebsite}
                                    className="group w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                                >
                                    <Sparkles size={16} />

                                    Generate Website

                                    <span className="group-hover:translate-x-1 transition">
                                        →
                                    </span>

                                </motion.button>

                            </div>

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























// import React, { useEffect, useState } from 'react';

// import {
//     ArrowLeft,
//     Sparkles,
//     WandSparkles,
//     Globe,
//     Zap,
//     Loader2,
//     Check,
//     Code2,
//     Palette,
//     LayoutTemplate
// } from 'lucide-react';

// import { useNavigate } from 'react-router-dom';

// import { motion, AnimatePresence } from 'motion/react';

// function Generate() {

//     const navigate = useNavigate();

//     const [prompt, setPrompt] = useState('');

//     // Generation state
//     const [isGenerating, setIsGenerating] = useState(false);

//     const [generationStep, setGenerationStep] = useState(0);

//     const generationSteps = [
//         {
//             title: "Understanding your idea",
//             description: "Analyzing your website requirements...",
//             icon: WandSparkles
//         },
//         {
//             title: "Planning the structure",
//             description: "Creating the layout and page structure...",
//             icon: LayoutTemplate
//         },
//         {
//             title: "Building your website",
//             description: "Generating components and functionality...",
//             icon: Code2
//         },
//         {
//             title: "Adding the final touch",
//             description: "Applying styles and responsive design...",
//             icon: Palette
//         }
//     ];

//     // Generation simulation
//     useEffect(() => {

//         if (!isGenerating) return;

//         const interval = setInterval(() => {

//             setGenerationStep((prev) => {

//                 if (prev < generationSteps.length - 1) {
//                     return prev + 1;
//                 }

//                 return prev;

//             });

//         }, 2200);

//         return () => clearInterval(interval);

//     }, [isGenerating]);


//     const handleGenerate = () => {

//         if (!prompt.trim()) return;

//         setGenerationStep(0);
//         setIsGenerating(true);

//         /*
//             Later replace this simulated generation
//             with your actual AI API call.

//             Example:

//             const response = await axios.post(
//                 `${serverUrl}/api/generate`,
//                 { prompt }
//             );
//         */

//     };


//     return (

//         <div className="min-h-screen bg-[#030303] text-white overflow-hidden relative">

//             {/* Background Effects */}

//             <div className="absolute inset-0 pointer-events-none">

//                 <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/10 blur-[140px] rounded-full" />

//                 <div className="absolute bottom-[-250px] left-[-150px] w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />

//                 <div className="absolute top-1/2 right-[-200px] w-[450px] h-[450px] bg-cyan-500/5 blur-[120px] rounded-full" />

//             </div>


//             {/* Grid Background */}

//             <div
//                 className="absolute inset-0 opacity-[0.035] pointer-events-none"
//                 style={{
//                     backgroundImage:
//                         'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
//                     backgroundSize: '45px 45px'
//                 }}
//             />


//             {/* Navbar */}

//             <div className="sticky top-0 z-40 backdrop-blur-2xl bg-black/40 border-b border-white/[0.08]">

//                 <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

//                     <div className="flex items-center gap-4">

//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition disabled:opacity-40"
//                             onClick={() => navigate("/")}
//                             disabled={isGenerating}
//                         >

//                             <ArrowLeft size={17} />

//                         </motion.button>


//                         <div className="flex items-center gap-2">

//                             <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">

//                                 <Sparkles
//                                     size={15}
//                                     className="text-black"
//                                 />

//                             </div>


//                             <h1 className="text-lg font-semibold tracking-tight">

//                                 Genweb.

//                                 <span className="text-zinc-500">
//                                     ai
//                                 </span>

//                             </h1>

//                         </div>

//                     </div>


//                     {/* AI Status */}

//                     <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500">

//                         <span className="relative flex h-2 w-2">

//                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />

//                             <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />

//                         </span>

//                         {isGenerating
//                             ? "AI Engine Working"
//                             : "AI Engine Online"
//                         }

//                     </div>

//                 </div>

//             </div>


//             {/* Main Content */}

//             <main className="relative z-10 max-w-5xl mx-auto px-6 py-20">


//                 {/* Heading */}

//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     className="text-center mb-14"
//                 >

//                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-400 mb-6">

//                         <Sparkles size={13} />

//                         AI Website Generator

//                     </div>


//                     <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">

//                         Turn your idea into

//                         <span className="block mt-2 bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">

//                             a real website.

//                         </span>

//                     </h1>


//                     <p className="mt-6 text-zinc-500 max-w-xl mx-auto leading-relaxed">

//                         Describe what you want to build. Genweb.ai will transform
//                         your idea into a beautiful, functional website.

//                     </p>

//                 </motion.div>


//                 {/* Generator Card */}

//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.96 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6, delay: 0.15 }}
//                     className="relative"
//                 >

//                     {/* Glow */}

//                     <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-white/20 via-purple-500/20 to-cyan-500/20 blur-sm opacity-60" />


//                     <div className="relative rounded-3xl border border-white/10 bg-[#080808]/90 backdrop-blur-xl overflow-hidden">


//                         {/* Card Header */}

//                         <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">

//                             <div className="flex items-center gap-2">

//                                 <div className="flex gap-1.5">

//                                     <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />

//                                     <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />

//                                     <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />

//                                 </div>

//                             </div>


//                             <div className="text-[11px] text-zinc-600 uppercase tracking-[0.2em]">

//                                 {isGenerating
//                                     ? "Generating"
//                                     : "Create"
//                                 }

//                             </div>

//                         </div>


//                         {/* Prompt Area */}

//                         <div className="p-6 md:p-8">

//                             <div className="flex gap-4">


//                                 <div className="hidden sm:flex w-10 h-10 shrink-0 rounded-xl bg-white/[0.05] border border-white/10 items-center justify-center">

//                                     <WandSparkles
//                                         size={18}
//                                         className={
//                                             isGenerating
//                                                 ? "text-purple-300 animate-pulse"
//                                                 : "text-zinc-300"
//                                         }
//                                     />

//                                 </div>


//                                 <div className="flex-1">

//                                     <textarea
//                                         value={prompt}
//                                         onChange={(e) => setPrompt(e.target.value)}
//                                         placeholder="Describe the website you want to create..."
//                                         disabled={isGenerating}
//                                         className="w-full h-40 bg-transparent resize-none outline-none text-lg text-white placeholder:text-zinc-700 leading-relaxed disabled:opacity-40 transition"
//                                     />

//                                 </div>

//                             </div>


//                             {/* Suggestions */}

//                             <div className="flex flex-wrap gap-2 mt-5">

//                                 {[

//                                     "Modern SaaS landing page",

//                                     "Portfolio website",

//                                     "AI startup",

//                                     "E-commerce store"

//                                 ].map((item) => (

//                                     <button
//                                         key={item}
//                                         onClick={() => setPrompt(item)}
//                                         disabled={isGenerating}
//                                         className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs text-zinc-500 hover:text-white hover:bg-white/[0.06] transition disabled:opacity-30 disabled:cursor-not-allowed"
//                                     >

//                                         {item}

//                                     </button>

//                                 ))}

//                             </div>


//                             {/* Bottom Controls */}

//                             <div className="mt-7 pt-5 border-t border-white/[0.07] flex flex-col sm:flex-row gap-4 items-center justify-between">


//                                 <div className="flex items-center gap-5 text-xs text-zinc-600">

//                                     <div className="flex items-center gap-2">

//                                         <Globe size={14} />

//                                         Responsive

//                                     </div>


//                                     <div className="flex items-center gap-2">

//                                         <Zap size={14} />

//                                         AI Powered

//                                     </div>

//                                 </div>


//                                 {/* Generate Button */}

//                                 <motion.button
//                                     whileHover={!isGenerating ? { scale: 1.03 } : {}}
//                                     whileTap={!isGenerating ? { scale: 0.97 } : {}}
//                                     disabled={!prompt.trim() || isGenerating}
//                                     onClick={handleGenerate}
//                                     className="group w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
//                                 >

//                                     {isGenerating ? (

//                                         <>

//                                             <Loader2
//                                                 size={16}
//                                                 className="animate-spin"
//                                             />

//                                             Generating Website...

//                                         </>

//                                     ) : (

//                                         <>

//                                             <Sparkles size={16} />

//                                             Generate Website

//                                             <span className="group-hover:translate-x-1 transition">
//                                                 →
//                                             </span>

//                                         </>

//                                     )}

//                                 </motion.button>

//                             </div>


//                         </div>

//                     </div>

//                 </motion.div>


//                 {/* Generation Status */}

//                 <AnimatePresence>

//                     {isGenerating && (

//                         <motion.div
//                             initial={{ opacity: 0, y: 20, height: 0 }}
//                             animate={{ opacity: 1, y: 0, height: "auto" }}
//                             exit={{ opacity: 0, y: 20, height: 0 }}
//                             transition={{ duration: 0.4 }}
//                             className="mt-8"
//                         >

//                             <div className="relative rounded-2xl border border-white/10 bg-[#080808]/80 backdrop-blur-xl overflow-hidden">

//                                 {/* Progress Glow */}

//                                 <motion.div
//                                     className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
//                                     initial={{ x: "-100%" }}
//                                     animate={{ x: "100%" }}
//                                     transition={{
//                                         duration: 2,
//                                         repeat: Infinity,
//                                         ease: "linear"
//                                     }}
//                                     style={{ width: "100%" }}
//                                 />


//                                 <div className="p-6">


//                                     {/* Status Header */}

//                                     <div className="flex items-center justify-between mb-6">

//                                         <div>

//                                             <div className="flex items-center gap-2">

//                                                 <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">

//                                                     <Sparkles
//                                                         size={15}
//                                                         className="text-purple-300"
//                                                     />

//                                                 </div>


//                                                 <div>

//                                                     <h3 className="text-sm font-semibold">
//                                                         Creating your website
//                                                     </h3>

//                                                     <p className="text-xs text-zinc-600 mt-1">
//                                                         Genweb AI is working on your idea
//                                                     </p>

//                                                 </div>

//                                             </div>

//                                         </div>


//                                         {/* Step Counter */}

//                                         <div className="text-xs text-zinc-600">

//                                             {generationStep + 1} / {generationSteps.length}

//                                         </div>

//                                     </div>


//                                     {/* Steps */}

//                                     <div className="space-y-3">

//                                         {generationSteps.map((step, index) => {

//                                             const Icon = step.icon;

//                                             const completed =
//                                                 index < generationStep;

//                                             const current =
//                                                 index === generationStep;

//                                             return (

//                                                 <motion.div
//                                                     key={step.title}
//                                                     initial={{ opacity: 0, x: -10 }}
//                                                     animate={{ opacity: 1, x: 0 }}
//                                                     transition={{
//                                                         delay: index * 0.05
//                                                     }}
//                                                     className={`flex items-center gap-3 p-3 rounded-xl transition ${
//                                                         current
//                                                             ? "bg-white/[0.05] border border-white/[0.08]"
//                                                             : ""
//                                                     }`}
//                                                 >

//                                                     <div
//                                                         className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
//                                                             completed
//                                                                 ? "bg-green-400/10 text-green-400"
//                                                                 : current
//                                                                 ? "bg-purple-400/10 text-purple-300"
//                                                                 : "bg-white/[0.03] text-zinc-700"
//                                                         }`}
//                                                     >

//                                                         {completed ? (

//                                                             <Check size={15} />

//                                                         ) : current ? (

//                                                             <Loader2
//                                                                 size={15}
//                                                                 className="animate-spin"
//                                                             />

//                                                         ) : (

//                                                             <Icon size={15} />

//                                                         )}

//                                                     </div>


//                                                     <div className="flex-1">

//                                                         <p
//                                                             className={`text-xs font-medium ${
//                                                                 current
//                                                                     ? "text-white"
//                                                                     : completed
//                                                                     ? "text-zinc-400"
//                                                                     : "text-zinc-700"
//                                                             }`}
//                                                         >

//                                                             {step.title}

//                                                         </p>


//                                                         {current && (

//                                                             <motion.p
//                                                                 initial={{ opacity: 0 }}
//                                                                 animate={{ opacity: 1 }}
//                                                                 className="text-[11px] text-zinc-600 mt-1"
//                                                             >

//                                                                 {step.description}

//                                                             </motion.p>

//                                                         )}

//                                                     </div>


//                                                     {completed && (

//                                                         <span className="text-[10px] text-green-500/70">
//                                                             Done
//                                                         </span>

//                                                     )}

//                                                 </motion.div>

//                                             );

//                                         })}

//                                     </div>


//                                     {/* Bottom Message */}

//                                     <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-zinc-600">

//                                         <Loader2
//                                             size={12}
//                                             className="animate-spin"
//                                         />

//                                         This may take a few minutes. Please don't close this page.

//                                     </div>

//                                 </div>

//                             </div>

//                         </motion.div>

//                     )}

//                 </AnimatePresence>


//                 {/* Bottom Info */}

//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.7 }}
//                     className="mt-8 text-center"
//                 >

//                     <p className="text-xs text-zinc-700">

//                         Generation may take a few minutes. Quality takes time.

//                     </p>

//                 </motion.div>


//             </main>

//         </div>

//     );

// }

// export default Generate;
