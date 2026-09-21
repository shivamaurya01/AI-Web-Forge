import React from 'react'
import {ArrowLeft, Check} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {motion} from "motion/react";

const plans = [
    {
        key: "free",
        name: "Free",
        price: "₹0",
        credits : 100,
        description: "Perfect to explore GenWeb.ai",
        features: [
            "AI websites generation",
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
        credits : 500,
        description: "For serious creators & freelancers",
        
        features: [
            "Everything in Free",
            "Faster generation",
            "Edit & regenerate",
           
        ],
        popular: true,
        button: "Upgrade to pro",
    },
    {
        
        key: "enterprise",
        name: "Enterprise",
        price: "₹1499",
        credits : 1000,
        description: "For teams & power users",
        features: [
            "Unlimited iterations",
            "Highest priority",
            "Team collaboration",
            "Dedicated support",
        ],
        popular: false,
        button: "Contact Sales",
    }

]

function Pricing() {

    const navigate=useNavigate();
  return (
    <div className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute-top-40 left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]'/>
        <div className= 'absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]'/>
      </div>

      <button className='relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'
      onClick={()=>navigate("/")}
      >
        <ArrowLeft size={16}/>
        Back
      </button>
      <motion.div
      initial = {{opacity:0 , y: 24}}
      animate = {{opacity:1, y: 0}}
      className='relative z-10 max-w-4xl mx-auto text-center mb-14' 
      >
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Simple, transparent pricing</h1>
        <p className='text-zinc-400 text-lg'>Buy credits once. Build anytime.</p>


      </motion.div>

      <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {plans.map((p,i)=>(
            <motion.div
             key={i}
             initial={{opacity:0, y:40}}
             whileInView={{opacity:1,y:0}}
             transition={{delay:i*0.12}}
             whileHover={{y:-14, scale: 1.03}}
             className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all ${p.popular
                ? "border-indigo-500 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30"
                : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"

             }`}
            >


            </motion.div>
        ))}

      </div>
    </div>
  )
}

export default Pricing
