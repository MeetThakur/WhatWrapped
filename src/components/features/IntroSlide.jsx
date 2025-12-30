
import React from 'react';
import { motion } from 'framer-motion';

const IntroSlide = ({ stats }) => {
  const year = stats.overview.dateRange 
    ? new Date(stats.overview.dateRange.start).getFullYear() 
    : 'This Year';
    
  return (
    <div className="slide section-intro">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="center-all"
      >
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '1rem', 
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '4px'
        }}>
          WhatsApp Wrapped
        </h2>
        
        <h1 className="gradient-text" style={{ fontSize: '6rem', lineHeight: 1, marginBottom: '4rem' }}>
          {year}
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', width: '100%' }}>
            {/* Total Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}
                >
                    {(stats.overview.totalMessages || 0).toLocaleString()}
                </motion.div>
                <div style={{ fontSize: '1.2rem', opacity: 0.8 }}>Messages</div>
            </div>

             {/* Total Words */}
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#38bdf8' }}
                >
                    {(stats.overview.totalWords || 0).toLocaleString()}
                </motion.div>
                <div style={{ fontSize: '1.2rem', opacity: 0.8 }}>Words</div>
            </div>

             {/* Total Emojis */}
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, type: 'spring' }}
                    style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#fbbf24' }}
                >
                    {(stats.overview.totalEmojis || 0).toLocaleString()}
                </motion.div>
                <div style={{ fontSize: '1.2rem', opacity: 0.8 }}>Emojis</div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroSlide;
