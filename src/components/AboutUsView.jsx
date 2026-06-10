import React from 'react';
import { motion } from 'framer-motion';
// Separate hi2 and hi imports to resolve compilation errors
import { HiOutlineLanguage, HiOutlineCpuChip, HiOutlineShieldCheck, HiOutlineGlobeAlt, HiOutlineSquaresPlus } from 'react-icons/hi2';
import { HiOutlineDatabase } from 'react-icons/hi';

const AboutUsView = ({ onBack }) => {
  const cardVariants = {
    hover: {
      y: -6,
      borderColor: 'rgba(0, 196, 141, 0.4)',
      backgroundColor: '#131922',
      boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 196, 141, 0.05)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-[#0c0f14] text-slate-100 p-8 custom-chat-scroll relative selection:bg-emerald-500/20">
      <div className="max-w-4xl mx-auto py-6">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -4, color: '#00e0a1' }}
          className="mb-6 text-xs font-bold uppercase tracking-wider text-emerald-400 transition-all flex items-center gap-2 cursor-pointer"
        >
          ← Back to Dashboard
        </motion.button>

        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-[#00c48d] via-[#22d3ee] to-[#4ade80] bg-clip-text text-transparent tracking-tight">
          About मि Garhwali
        </h1>
        <p className="text-slate-500 text-sm mb-10 border-b border-slate-900/80 pb-5">
          The Intelligent System Framework Mitigating Regional Dialect Invisibility across the Generative AI Era.
        </p>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div variants={cardVariants} whileHover="hover" className="bg-[#0d1117] border border-slate-900 p-6 rounded-2xl shadow-xl flex gap-4 transition-all">
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl h-fit text-[#00c48d]">
              <HiOutlineLanguage className="text-xl" />
            </div>
            <div>
              <h3 className="text-slate-100 text-sm font-bold uppercase tracking-wider mb-2">Linguistic Preservation Engine</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                मि Garhwali is a custom computational framework designed to process and represent the structural nuances of the Garhwali language. Rather than relying on simple phrase translations, it treats regional dialects as critical core data parameters.
              </p>
            </div>
          </motion.div>

          <motion.div variants={cardVariants} whileHover="hover" className="bg-[#0d1117] border border-slate-900 p-6 rounded-2xl shadow-xl flex gap-4 transition-all">
            <div className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl h-fit text-purple-400">
              <HiOutlineShieldCheck className="text-xl" />
            </div>
            <div>
              <h3 className="text-slate-100 text-sm font-bold uppercase tracking-wider mb-2">Resolving Digital Footprint Deficits</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Modern AI learning loops inherit parameters from established internet texts. Because Garhwali is predominantly spoken, its virtual footprint is thin. Without targeted integration layers, the language faces absolute exclusion from future foundational models.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Structural Design Cards */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">Platform Architecture & Design</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <motion.div whileHover={{ backgroundColor: '#13171e', borderColor: 'rgba(34, 211, 238, 0.3)' }} className="bg-[#0f131a] p-5 rounded-xl border border-slate-800/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <HiOutlineCpuChip className="text-base" />
                <span className="text-xs font-bold uppercase tracking-wide">Contextual Token Mapping</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                The platform features a multi-tiered dictionary framework that normalizes diverse sub-dialect colloquial phrases, converting mixed inputs smoothly without losing core sentiment parameters or regional idioms.
              </p>
            </div>
          </motion.div>

          <motion.div whileHover={{ backgroundColor: '#13171e', borderColor: 'rgba(168, 85, 247, 0.3)' }} className="bg-[#0f131a] p-5 rounded-xl border border-slate-800/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <HiOutlineSquaresPlus className="text-base" />
                <span className="text-xs font-bold uppercase tracking-wide">Foundational Layer Fine-Tuning</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                By building an isolated vocabulary matrix, the framework prepares low-resource regional syntax for native open-source text execution pipelines, ensuring high-accuracy interactions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Methodology Insight Section */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">Linguistic Processing Philosophy</h2>
        <div className="bg-[#0d1117] border border-slate-900 rounded-2xl p-6 mb-10 shadow-xl space-y-4">
          <p className="text-slate-300 text-xs leading-relaxed">
            Unlike traditional translation engines, मि Garhwali values regional variation. It accommodates distinct stylistic tones and phonetic shifts across communities, ensuring accurate comprehension of historical records and casual dialogue alike.
          </p>
          <div className="p-4 bg-[#0a0d12] rounded-xl border border-slate-900/80 flex items-start gap-3">
            <HiOutlineDatabase className="text-emerald-400 text-lg shrink-0 mt-0.5" />
            <p className="text-slate-400 text-[11px] leading-relaxed">
              <strong>Open Knowledge Access Policy:</strong> All structural elements, grammatical matrices, and semantic models compiled by this ecosystem are cataloged to serve as public technical benchmarks, enabling developers globally to build inclusive software applications for Uttarakhand.
            </p>
          </div>
        </div>

        {/* Statistical Performance Context Targets */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">Platform Objectives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0a0d12] border border-slate-900/60 p-5 rounded-xl text-center">
            <div className="text-2xl font-black text-emerald-400">1,500+</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Core Mapped Forms</div>
          </div>
          <div className="bg-[#0a0d12] border border-slate-900/60 p-5 rounded-xl text-center">
            <div className="text-2xl font-black text-purple-400">Unified</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Grammatical Layout</div>
          </div>
          <div className="bg-[#0a0d12] border border-slate-900/60 p-5 rounded-xl text-center">
            <div className="text-2xl font-black text-cyan-400">Open</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Semantic Pipeline</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsView;