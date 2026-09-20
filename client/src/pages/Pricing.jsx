import React from 'react'


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
  return (
    <div>
      
    </div>
  )
}

export default Pricing
