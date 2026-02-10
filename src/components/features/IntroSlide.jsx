
import React from 'react';
import { motion } from 'framer-motion';

const IntroSlide = ({ stats }) => {
  const startDate = stats.overview.dateRange ? new Date(stats.overview.dateRange.start) : null;
  const endDate = stats.overview.dateRange ? new Date(stats.overview.dateRange.end) : null;

  let title = 'Chat History';
  if (startDate && endDate) {
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      if (startYear === endYear) {
          title = `${startYear}`;
      } else {
          title = `${startYear} - ${endYear}`;
      }
  }

    
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
        
        <h1 className="gradient-text text-huge" style={{ marginBottom: '4rem' }}>
          {title}
        </h1>
        
        <div className="responsive-grid-3">
            {/* Total Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="text-stat"
                    style={{ color: 'var(--accent-color)' }}
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
                    className="text-stat"
                    style={{ color: '#38bdf8' }}
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
                    className="text-stat"
                    style={{ color: '#fbbf24' }}
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
