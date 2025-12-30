
import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

const ConclusionSlide = ({ onReset }) => {
  return (
    <div className="slide">
       <motion.div
         initial={{ scale: 0.8, opacity: 0 }}
         whileInView={{ scale: 1, opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="center-all"
       >
         <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '2rem' }}>
           That's a Wrap!
         </h1>
         <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px' }}>
            Your year in text was full of moments. Here's to many more conversations!
         </p>

         <button className="btn-primary" onClick={onReset} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RotateCcw size={20} />
            Analyze Another Chat
         </button>
       </motion.div>
    </div>
  );
};

export default ConclusionSlide;
