
import React from 'react';
import { motion } from 'framer-motion';
import { Smile } from 'lucide-react';

const EmojiSlide = ({ stats }) => {
  const { topEmojis, topEmojisPerSender } = stats.content;

  return (
    <div className="slide">
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="content-card"
            style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '3rem' }}
        >
            {/* Header */}
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(251, 191, 36, 0.2)', borderRadius: '50%', marginBottom: '1rem' }}>
                    <Smile size={40} color="#fbbf24" />
                </div>
                <h2 className="text-large" style={{ marginBottom: '0.5rem' }}>The Vibe</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Expressing feelings without words</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', alignItems: 'flex-start' }}>
                {/* Global Top 5 */}
                <div>
                     <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #fbbf24', display: 'inline-block', paddingBottom: '0.5rem' }}>
                         Crowd Favorites
                     </h3>
                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                        {topEmojis.length > 0 ? topEmojis.map((e, i) => (
                             <motion.div 
                                key={e.item} 
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, type: 'spring' }}
                                style={{ 
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'center'
                             }}>
                                 <span style={{ fontSize: i === 0 ? '4rem' : '2.5rem', lineHeight: 1 }}>{e.item}</span>
                                 <span style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '0.5rem' }}>{e.count}</span>
                             </motion.div>
                        )) : <p>No emojis found.</p>}
                    </div>
                </div>

                {/* Per Person Top 3 */}
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #fbbf24', display: 'inline-block', paddingBottom: '0.5rem' }}>
                         Signatures
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {Object.keys(topEmojisPerSender).slice(0, 2).map((sender, idx) => {
                             const tops = topEmojisPerSender[sender].slice(0, 3);
                             if (!tops.length) return null;

                             return (
                                 <div key={sender} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '24px' }}>
                                     <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.8rem', color: idx === 0 ? 'var(--accent-color)' : '#38bdf8' }}>
                                         {sender}'s Mood
                                     </div>
                                     <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                         {tops.map((t, i) => (
                                             <div key={t.item} style={{ 
                                                 background: 'rgba(0,0,0,0.3)', 
                                                 padding: '0.5rem 1rem', 
                                                 borderRadius: '16px',
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 gap: '0.5rem',
                                                  border: i === 0 ? `1px solid ${idx === 0 ? 'var(--accent-color)' : '#38bdf8'}` : 'none'
                                              }}>
                                                 <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{t.item}</span>
                                                 <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>{t.count}</span>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                             );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default EmojiSlide;
