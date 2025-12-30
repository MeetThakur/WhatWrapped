
import React from 'react';
import { motion } from 'framer-motion';
import { Image, Zap } from 'lucide-react';

const FunStatsSlide = ({ stats }) => {
  const { total, ratio } = stats.media;
  const { avgReplyTimeMinutes, medianReplyTimeMinutes } = stats.responsiveness;

  return (
    <div className="slide">
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '2rem',
            maxWidth: '900px',
            width: '100%'
        }}>
            {/* Media Stats */}
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{ 
                    background: '#1e293b', 
                    padding: '3rem', 
                    borderRadius: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '2rem' }}>Media Gallery</h3>
                    <Image size={32} color="#3b82f6" />
                </div>
                
                <div>
                    <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>{total}</div>
                    <p style={{ color: 'var(--text-secondary)' }}>Photos & Videos Shared</p>
                </div>
                
                <div style={{ marginTop: '2rem', background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                    That's about <strong>{(ratio * 100).toFixed(1)}%</strong> of your messages.
                </div>
            </motion.div>
            
            {/* Responsiveness Stats */}
            <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ 
                    background: '#1e293b', 
                    padding: '3rem', 
                    borderRadius: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '2rem' }}>Speed Check</h3>
                    <Zap size={32} color="#eab308" />
                </div>
                
                <div>
                    <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>{Math.round(avgReplyTimeMinutes)}m</div>
                    <p style={{ color: 'var(--text-secondary)' }}>Average Reply Time</p>
                </div>
                
                <div style={{ marginTop: '2rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Typical Wait: <span style={{ color: '#fff', fontWeight: 'bold' }}>{Math.round(medianReplyTimeMinutes)}m</span>
                    </p>
                </div>
            </motion.div>
        </div>
    </div>
  );
};

export default FunStatsSlide;
