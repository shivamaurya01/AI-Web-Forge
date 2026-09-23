// import React from 'react'
// import {ArrowLeft, Check,Coins} from "lucide-react";
// import {useNavigate} from "react-router-dom";
// import {motion} from "motion/react";

// const plans = [
//     {
//         key: "free",
//         name: "Free",
//         price: "₹0",
//         credits : 100,
//         description: "Perfect to explore GenWeb.ai",
//         features: [
//             "AI websites generation",
//             "Responsive HTML output",
//             "Basic animations",
//         ],
//         popular: false,
//         button: "Get Started",
//     },
//     {
       
//         key: "pro",
//         name: "Pro",
//         price: "₹499",
//         credits : 500,
//         description: "For serious creators & freelancers",
        
//         features: [
//             "Everything in Free",
//             "Faster generation",
//             "Edit & regenerate",
           
//         ],
//         popular: true,
//         button: "Upgrade to pro",
//     },
//     {
        
//         key: "enterprise",
//         name: "Enterprise",
//         price: "₹1499",
//         credits : 2000,
//         description: "For teams & power users",
//         features: [
//             "Unlimited iterations",
//             "Highest priority",
//             "Team collaboration",
//             "Dedicated support",
//         ],
//         popular: false,
//         button: "Contact Sales",
//     }

// ]

// function Pricing() {

//     const navigate=useNavigate();
//   return (
//     <div className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24'>
//       <div className='absolute inset-0 pointer-events-none'>
//         <div className='absolute-top-40 left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]'/>
//         <div className= 'absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]'/>
//       </div>

//       <button className='relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'
//       onClick={()=>navigate("/")}
//       >
//         <ArrowLeft size={16}/>
//         Back
//       </button>
//       <motion.div
//       initial = {{opacity:0 , y: 24}}
//       animate = {{opacity:1, y: 0}}
//       className='relative z-10 max-w-4xl mx-auto text-center mb-14' 
//       >
//         <h1 className='text-4xl md:text-5xl font-bold mb-4'>Simple, transparent pricing</h1>
//         <p className='text-zinc-400 text-lg'>Buy credits once. Build anytime.</p>


//       </motion.div>

//       <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
//         {plans.map((p,i)=>(
//             <motion.div
//              key={i}
//              initial={{opacity:0, y:40}}
//              whileInView={{opacity:1,y:0}}
//              transition={{delay:i*0.12}}
//              whileHover={{y:-14, scale: 1.03}}
//              className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all ${p.popular
//                 ? "border-indigo-500 bg-linear-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30"
//                 : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"

//              }`}
//             >
//               {p.popular &&(
//                 <span className='absolute top-5 right-5 px-3 py-1 text-xs rounded-full bg-indigo-500'>Most Popular</span>
//               )}
//               <h1 className='text-xl font-semibold mb-2'>{p.name}</h1>
//               <p className='text-zinc-400 text-sm mb-6'>{p.description}</p>

//               <div className='flex items-end gap-1 mb-4'>
//                 <span className='text-4xl font-bold'>{p.price}</span>
//                 <span className='text-sm text-zinc-400 mb-1'>/one-time</span>

//               </div>

//               <div className='flex items-center gap-2 mb-8'>
//                 <Coins size={18} className='text-yellow-400'>
//                   <span className='font-semibold'>{p.credits} Credits</span>
//                 </Coins>
//               </div>
//               <ul className='space-y-3 mb-10'>
//                 {p.features.map((f)=>(
//                   <li 
//                   key={f}
//                   className='flex items-center gap-2 text-sm text-zinc-300'
//                   >
//                     <Check size={16} className='text-green-400'/>
//                     {f}
//                   </li>
//                 ))}
//               </ul>

//                 <motion.button
//                 whileTap={{scale:0.96}}
//                 className={`w-full py-3 rounded-xl font-semibold transition 
//                   ${p.popular
//                     ? "bg-indigo-500 hover:bg-indigo-600"
//                     : "bg-white/10 hover:bg-white/20"
                  
//                   } disabled:opacity-60`}
//                 >
//                 {p.button}

//                 </motion.button>

//             </motion.div>
//         ))}

//       </div>
//     </div>
//   )
// }

// export default Pricing











import React from "react";
import { ArrowLeft, Check, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    description:
      "A great way to explore AI-powered website creation and start building for free.",
    features: [
      "AI website generation",
      "Responsive HTML output",
      "Basic animations",
    ],
    popular: false,
    button: "Get Started",
  },
  {
    key: "pro",
    name: "Pro",
    price: "₹499",
    credits: 500,
    description:
      "For creators and freelancers who want more credits, faster generation, and greater control.",
    features: [
      "Everything in Free",
      "Faster generation",
      "Edit & regenerate",
    ],
    popular: true,
    button: "Upgrade to Pro",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "₹1499",
    credits: 2000,
    description:
      "For teams and power users building multiple websites with advanced capabilities and higher limits.",
    features: [
      "Unlimited iterations",
      "Highest priority",
      "Team collaboration",
      "Dedicated support",
    ],
    popular: false,
    button: "Contact Sales",
  },
];

function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-10 pb-24">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px]" />

        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px]" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Back Button */}
      <button
        className="relative z-10 mb-12 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-all duration-300 group"
        onClick={() => navigate("/")}
      >
        <ArrowLeft
          size={17}
          className="group-hover:-translate-x-1 transition-transform"
        />

        Back
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto text-center mb-16"
      >
        {/* Small Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-sm">
          <Coins size={16} />

          Simple plans. Powerful AI.
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
          Build More.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Create Faster.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-7">
          Choose the plan that fits your workflow. Generate, customize, and
          launch beautiful websites with AI using GenWeb.ai.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">

        {plans.map((p, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              delay: i * 0.12,
              duration: 0.5,
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            className={`relative flex flex-col rounded-3xl p-7 md:p-8 border backdrop-blur-xl transition-all duration-300 ${
              p.popular
                ? "border-indigo-500/70 bg-gradient-to-b from-indigo-500/20 via-indigo-500/5 to-transparent shadow-2xl shadow-indigo-500/20"
                : "border-white/10 bg-white/[0.04] hover:border-indigo-400/40 hover:bg-white/[0.07]"
            }`}
          >

            {/* Popular Badge */}
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 whitespace-nowrap">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Name */}
            <div className="mb-2">
              <h2 className="text-xl font-semibold">
                {p.name}
              </h2>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm leading-6 mb-7 min-h-[72px]">
              {p.description}
            </p>

            {/* Price */}
            <div className="flex items-end gap-2 mb-5">
              <span className="text-4xl md:text-5xl font-bold tracking-tight">
                {p.price}
              </span>

              <span className="text-sm text-zinc-500 mb-1">
                / one-time
              </span>
            </div>

            {/* Credits */}
            <div
              className={`flex items-center gap-3 mb-8 px-4 py-3 rounded-xl border ${
                p.popular
                  ? "border-indigo-500/20 bg-indigo-500/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="p-2 rounded-lg bg-yellow-400/10">
                <Coins
                  size={18}
                  className="text-yellow-400"
                />
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  Included
                </p>

                <p className="font-semibold text-sm">
                  {p.credits} Credits
                </p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-10 flex-1">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                >
                  <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check
                      size={13}
                      className="text-green-400"
                    />
                  </div>

                  <span>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <motion.button
              whileTap={{
                scale: 0.96,
              }}
              whileHover={{
                scale: 1.01,
              }}
              className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                p.popular
                  ? "bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/20"
                  : "bg-white/10 hover:bg-white/20 border border-white/10"
              } disabled:opacity-60`}
            >
              {p.button}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Bottom Note */}
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.8,
        }}
        className="relative z-10 text-center text-xs text-zinc-600 mt-12"
      >
        No subscription. Pay once and use your credits whenever you need.
      </motion.p>
    </div>
  );
}

export default Pricing;










