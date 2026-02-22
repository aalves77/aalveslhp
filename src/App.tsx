/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';

const Player = ReactPlayer as any;

const Sparkles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -100],
            x: [0, (Math.random() - 0.5) * 50]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: '0 0 10px white',
          }}
        />
      ))}
    </div>
  );
};

import { 
  ExternalLink, 
  Music, 
  Volume2, 
  VolumeX, 
  Disc,
  Globe,
  CheckCircle2,
  Monitor,
  MousePointer2,
  Keyboard,
  Settings,
  User,
  Smartphone,
  Cpu,
  ChevronDown,
  Code2,
  Palette,
  Terminal,
  Zap,
  Briefcase,
  Trophy,
  Shield,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'game' | 'ownership'>('profile');
  const [gamePlatform, setGamePlatform] = useState<'pc' | 'mobile'>('pc');
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} copied to clipboard!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        if (entered && isPlaying) {
          try {
            // Small delay to ensure browser has initialized the audio context after user interaction
            await new Promise(resolve => setTimeout(resolve, 100));
            await audioRef.current.play();
          } catch (err) {
            console.error("Playback failed:", err);
            // If it fails, try reloading the source
            if (audioRef.current) {
              audioRef.current.load();
            }
          }
        } else {
          audioRef.current.pause();
        }
      }
    };
    playAudio();
  }, [entered, isPlaying]);

  useEffect(() => {
    if (entered) {
      const timer = setTimeout(() => setIsReady(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [entered]);

  // Example social links
  const socials = [
    { 
      name: 'Discord', 
      icon: <img src="https://i.imgur.com/MQwlEx8.png" className="w-6 h-6 object-contain" alt="Discord" />, 
      action: () => copyToClipboard('aalves777', 'Discord Username'),
      color: 'hover:text-[#5865F2]' 
    },
    { 
      name: 'Instagram', 
      icon: <img src="https://i.imgur.com/BSVkl2L.png" className="w-6 h-6 object-contain" alt="Instagram" />, 
      url: 'https://www.instagram.com/aalves.lhp/', 
      color: 'hover:text-[#E4405F]' 
    },
    { 
      name: 'TikTok', 
      icon: <img src="https://i.imgur.com/8FjWEoC.png" className="w-6 h-6 object-contain" alt="TikTok" />, 
      url: 'https://www.tiktok.com/@aalves.rh777', 
      color: 'hover:text-[#ff0050]' 
    },
    { 
      name: 'Spotify', 
      icon: <img src="https://i.imgur.com/ytBGlHZ.png" className="w-6 h-6 object-contain" alt="Spotify" />, 
      url: 'https://open.spotify.com/user/aalves777', 
      color: 'hover:text-[#1DB954]' 
    },
    { 
      name: 'Website', 
      icon: <Globe className="w-5 h-5" />, 
      url: 'https://aalves777.dev', 
      color: 'hover:text-[#00ff88]' 
    },
  ];

  const gameSettings = [
    { label: 'Sensitivity', value: '0.85', icon: <MousePointer2 className="w-4 h-4" /> },
    { label: 'DPI', value: '800', icon: <MousePointer2 className="w-4 h-4" /> },
    { label: 'Resolution', value: '1280x960 (4:3)', icon: <Monitor className="w-4 h-4" /> },
    { label: 'Refresh Rate', value: '240Hz', icon: <Monitor className="w-4 h-4" /> },
    { label: 'Keyboard', value: 'Apex Pro TKL', icon: <Keyboard className="w-4 h-4" /> },
    { label: 'Mouse', value: 'G Pro X Superlight', icon: <MousePointer2 className="w-4 h-4" /> },
  ];

  const mobileSettings = [
    { label: 'Device', value: 'iPhone 16', icon: <Smartphone className="w-4 h-4" /> },
    { label: 'Sensitivity', value: '95 (Standard)', icon: <MousePointer2 className="w-4 h-4" /> },
    { label: 'Graphics', value: 'Extreme / 120 FPS', icon: <Monitor className="w-4 h-4" /> },
    { label: 'Processor', value: 'A18', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Layout', value: '5 Fingers Claw', icon: <Keyboard className="w-4 h-4" /> },
    { label: 'Storage', value: '512GB', icon: <Disc className="w-4 h-4" /> },
  ];

  const ownerships = [
    { name: 'Resurgent', category: 'Standoff 2', role: 'Owner', icon: <Trophy className="w-4 h-4 text-yellow-400" /> },
    { name: 'Intercontinental Cup', category: 'Standoff 2', role: 'Owner', icon: <Globe className="w-4 h-4 text-blue-400" /> },
    { name: 'NSO Challenger', category: 'Standoff 2', role: 'Owner', icon: <Shield className="w-4 h-4 text-red-400" /> },
    { name: 'Super copa', category: 'Standoff 2', role: 'Owner', icon: <Trophy className="w-4 h-4 text-orange-400" /> },
    { name: 'Nebular Cheats', category: 'Software', role: 'Owner', icon: <Terminal className="w-4 h-4 text-purple-400" /> },
    { name: 'Nordic City', category: 'FiveM', role: 'Owner', icon: <Globe className="w-4 h-4 text-cyan-400" /> },
    { name: 'Zyphora', category: 'E-commerce', role: 'Owner', icon: <ShoppingBag className="w-4 h-4 text-emerald-400" /> },
  ];

  const handleEnter = () => {
    setEntered(true);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-white/20 overflow-x-hidden font-sans scroll-smooth">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <img 
          src="https://i.imgur.com/MxoYXt6.gif" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale-[0.5]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Sparkles Effect */}
        <Sparkles />
      </div>

      {/* Background Music */}
      {entered && (
        <audio
          ref={audioRef}
          loop
          preload="auto"
          src="https://fancy-azure-jsxllgny9s.edgeone.app/EsDeeKid%20-%20Rottweiler%20(slowed%20+%20reverb)%20-%20stain%E6%9F%93%E8%89%B2%20(youtube).mp3"
        >
          <source src="https://fancy-azure-jsxllgny9s.edgeone.app/EsDeeKid%20-%20Rottweiler%20(slowed%20+%20reverb)%20-%20stain%E6%9F%93%E8%89%B2%20(youtube).mp3" type="audio/mpeg" />
        </audio>
      )}

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="enter-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer"
            onClick={handleEnter}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <p className="text-sm font-display tracking-[0.3em] uppercase opacity-50 mb-4 animate-pulse">Click to enter</p>
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">AALVES777</h1>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6"
          >
            {/* Music Control */}
            <div className="fixed top-6 right-6 z-20 flex items-center gap-3">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 glass px-4 py-2 rounded-full group/volume"
              >
                <div className="flex items-center gap-2 w-0 group-hover/volume:w-24 overflow-hidden transition-all duration-500">
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
                <button
                  onClick={toggleMusic}
                  className="p-1 transition-all duration-300"
                >
                  {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
              </motion.div>
            </div>

            {/* Tab Switcher */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 mb-8 p-1 glass rounded-2xl"
            >
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'profile' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
              >
                <User className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('game')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'game' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
              >
                <Settings className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Game Settings</span>
              </button>
              <button
                onClick={() => setActiveTab('ownership')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'ownership' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
              >
                <Briefcase className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Ownership</span>
              </button>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === 'profile' ? (
                <motion.div
                  key="profile-card"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md glass rounded-3xl p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden"
                >
                  {/* Card Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* Avatar */}
                  <div className="relative mb-6 group">
                    <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full scale-0 group-hover:scale-110 transition-transform duration-500" />
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-white/10 p-1 bg-transparent relative z-10 overflow-hidden">
                      <img 
                        src="https://i.imgur.com/zm3xStY.gif" 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">aalves777</h2>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="bg-blue-500/10 rounded-full p-1 border border-blue-500/20"
                      >
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400 fill-blue-400/20" />
                      </motion.div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase tracking-widest text-white/40">Full-Stack Developer</span>
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase tracking-widest text-white/40">Designer</span>
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-bold uppercase tracking-widest text-white/40">Video Editor</span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex gap-8 mb-8 opacity-40">
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Views</p>
                      <p className="text-sm font-display font-bold">500</p>
                    </div>
                    <div className="w-px h-8 bg-white/20" />
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Joined</p>
                      <p className="text-sm font-display font-bold">Feb 2024</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-10 max-w-[280px]">
                    Building immersive digital experiences. Passionate about design, code, and minimalism.
                  </p>

                  {/* Social Links */}
                  <div className="grid grid-cols-5 gap-4 w-full mb-8">
                    {socials.map((social, idx) => (
                      <motion.a
                        key={social.name}
                        href={social.url || '#'}
                        onClick={(e) => {
                          if (social.action) {
                            e.preventDefault();
                            social.action();
                          }
                        }}
                        target={social.url ? "_blank" : undefined}
                        rel={social.url ? "noopener noreferrer" : undefined}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className={`flex items-center justify-center p-3 glass rounded-xl glass-hover transition-all duration-300 group ${social.color} cursor-pointer`}
                        title={social.name}
                      >
                        <span className="transition-transform duration-300 group-hover:scale-110">
                          {social.icon}
                        </span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Featured Project / Link */}
                  <motion.a
                    href="https://github.com/aalves777/portfolio-v2"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 glass rounded-2xl flex items-center justify-between group glass-hover transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg">
                        <Disc className="w-5 h-5 animate-spin-slow" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Featured</p>
                        <p className="text-sm font-semibold">Latest Portfolio 2024</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </motion.div>
              ) : activeTab === 'game' ? (
                <motion.div
                  key="game-card"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md glass rounded-3xl p-8 md:p-10 flex flex-col items-center relative overflow-hidden"
                >
                  {/* Card Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <div className="w-full mb-8 text-center">
                    <h2 className="text-3xl font-display font-bold tracking-tight mb-2 uppercase italic">Game Config</h2>
                    <div className="flex justify-center gap-4 mt-4">
                      <button 
                        onClick={() => setGamePlatform('pc')}
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${gamePlatform === 'pc' ? 'text-white border-b border-white pb-1' : 'text-white/20 hover:text-white/40'}`}
                      >
                        PC
                      </button>
                      <button 
                        onClick={() => setGamePlatform('mobile')}
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${gamePlatform === 'mobile' ? 'text-white border-b border-white pb-1' : 'text-white/20 hover:text-white/40'}`}
                      >
                        Mobile
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 w-full">
                    {(gamePlatform === 'pc' ? gameSettings : mobileSettings).map((setting, idx) => (
                      <motion.div
                        key={setting.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-4 glass rounded-2xl glass-hover group transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            {setting.icon}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-white/50">{setting.label}</span>
                        </div>
                        <span className="text-sm font-display font-bold text-white/90">{setting.value}</span>
                      </motion.div>
                    ))}
                  </div>

                  {gamePlatform === 'pc' ? (
                    <div className="mt-8 w-full p-4 glass rounded-2xl border border-white/5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Launch Options</p>
                      <code className="text-[10px] block bg-black/40 p-3 rounded-lg text-white/60 font-mono break-all leading-relaxed">
                        -novid -tickrate 128 -high -threads 8 +fps_max 0 -nojoy
                      </code>
                    </div>
                  ) : (
                    <div className="mt-8 w-full p-4 glass rounded-2xl border border-white/5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Mobile Optimization</p>
                      <p className="text-[10px] text-white/60 leading-relaxed italic">
                        "Optimized for A18 Pro Ray Tracing. Stable 120 FPS on Extreme settings with Game Mode enabled."
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="ownership-card"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md glass rounded-3xl p-8 md:p-10 flex flex-col items-center relative overflow-hidden"
                >
                  {/* Card Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <div className="w-full mb-8 text-center">
                    <h2 className="text-3xl font-display font-bold tracking-tight mb-2 uppercase italic">Ownership</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Projects & Organizations</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 w-full">
                    {ownerships.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-4 glass rounded-2xl glass-hover group transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-display font-bold text-white/90">{item.name}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{item.category}</span>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{item.role}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 glass rounded-full border border-white/20 text-sm font-medium shadow-2xl"
                >
                  {toastMessage}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Music Indicator */}
            {isPlaying && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2 glass rounded-full"
              >
                <Music className="w-3 h-3 animate-pulse" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40">Now Playing</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">EsDeeKid - Rottweiler</span>
                </div>
              </motion.div>
            )}

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="text-[8px] uppercase tracking-[0.4em] opacity-30 font-bold">Scroll</span>
              <ChevronDown className="w-4 h-4 opacity-30" />
            </motion.div>

            {/* Additional Sections */}
            <div className="w-full max-w-4xl mt-32 space-y-32 pb-32">
              {/* Skills Section */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="glass p-8 rounded-3xl space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase italic">Development</h3>
                  <p className="text-sm text-white/50 leading-relaxed">Expertise in React, TypeScript, and modern web architectures. Building scalable and performant applications.</p>
                </div>
                <div className="glass p-8 rounded-3xl space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Palette className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase italic">Design</h3>
                  <p className="text-sm text-white/50 leading-relaxed">Focused on minimalist aesthetics and intuitive user experiences. Crafting interfaces that feel alive.</p>
                </div>
                <div className="glass p-8 rounded-3xl space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase italic">Optimization</h3>
                  <p className="text-sm text-white/50 leading-relaxed">Specialized in performance tuning and high-refresh rate experiences for both web and gaming.</p>
                </div>
              </motion.section>

              {/* Projects Section */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-4xl font-display font-bold tracking-tighter uppercase italic">Selected Works</h2>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">A collection of digital artifacts</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10 }}
                      className="group relative aspect-video glass rounded-3xl overflow-hidden cursor-pointer"
                    >
                      <img 
                        src={`https://picsum.photos/seed/${i + 10}/800/450`} 
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                        alt={`Project ${i}`}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Project 0{i}</p>
                        <h4 className="text-2xl font-display font-bold tracking-tight">Digital Artifact {i}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 text-center"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">
                © 2024 AALVES777 • ALL RIGHTS RESERVED
              </p>
            </motion.footer>

            {/* Floating Music Indicator */}
            {isPlaying && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 glass rounded-full"
              >
                <Music className="w-3 h-3 animate-pulse" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40">Now Playing</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">EsDeeKid - Rottweiler (Slowed + Reverb)</span>
                </div>
                <div className="flex gap-1 h-3 items-end ml-2">
                  {[1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 12, 6, 10, 4] }}
                      transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
                      className="w-0.5 bg-white/40 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
