import React from "react";
import { AnimatePresence, motion } from "motion/react";
import LoginModel from "../components/LoginModel.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Coins, CoinsIcon } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";
function Home() {
  const highlights = [
    "AI Generated Code",
    "Fully Responsive Layouts",
    "Production Ready Output",
  ];

  const [openLogin, setOpenLogin] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch()

  const handleLogOut=async ()=>{
    console.log("logout click")
    try{
      await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      dispatch(setUserData(null))
      setOpenProfile(false)

    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl w-full mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold">GenWeb.ai</div>
          <div className="flex items-center gap-5">
            <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer">
              Pricing
            </div>

            {userData && (
              <div className=" hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition">
                <Coins size={14} className="text-yellow-400" />
                <span className="text-zinc-300">Credits</span>
                <span>{userData.credits}</span>
                <span className="font-semibold">+</span>
              </div>
            )}

            {!userData ? (
              <button
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm"
                onClick={() => setOpenLogin(true)}
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <img
                    src={
                      userData.avatar ||
                      `https://ui-avatars.com/api/?name=${userData.name}`
                    }
                    alt=""
                    className="w-9 h-9 rounded-full border border-white/20 object-cover"
                  />
                </button>
                <AnimatePresence>
                  {openProfile && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden
              "
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium truncate">
                            {userData.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {userData.email}
                          </p>
                        </div>

                        <button className="md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5">
                          <Coins size={14} className="text-yellow-400" />
                          <span className="text-zinc-300">Credits</span>
                          <span>{userData.credits}</span>
                          <span className="font-semibold">+</span>
                        </button>

                        <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/5">Dashboard</button>
                        <button className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5" onClick={handleLogOut}>Log out</button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <section className="pt-44 pb-32 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Build Stunning Websites<br></br>
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {" "}
            with AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg"
        >
          Describe your idea and let AI generate a modern, responsive,
          production-ready website.
        </motion.p>

        <button className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12">
          Get Started
        </button>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-8"
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-xl font-semibold mb-3">{h}</h1>
              <p className="text-sm text-zinc-400">
                GenWeb.ai builts real websites - clean code, animations,
                responsiveness and scalable structure.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} GenWeb.ai
      </footer>

      {openLogin && (
        <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </div>
  );
}

export default Home;
