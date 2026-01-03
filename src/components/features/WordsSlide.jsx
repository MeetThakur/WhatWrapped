
import React from 'react';
import { motion } from 'framer-motion';
import { Type } from 'lucide-react';

const WordsSlide = ({ stats }) => {
  const { topWords, topWordsPerSender } = stats.content;

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
                <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(52, 211, 153, 0.2)', borderRadius: '50%', marginBottom: '1rem' }}>
                    <Type size={40} color="var(--accent-color)" />
                </div>
                <h2 className="text-large" style={{ marginBottom: '0.5rem' }}>The Lingo</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Defining the year in words</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'flex-start' }}>
                {/* Global Top 5 */}
                <div>
                     <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--accent-color)', display: 'inline-block', paddingBottom: '0.5rem' }}>
                         Crowd Favorites
                     </h3>
                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {topWords.length > 0 ? topWords.map((w, i) => (
                             <motion.div 
                                key={w.item} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                style={{ 
                                 padding: '0.8rem 1.2rem', 
                                 background: i === 0 ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)', 
                                 color: i === 0 ? '#000' : '#fff',
                                 fontWeight: i === 0 ? 'bold' : 'normal',
                                 borderRadius: '16px',
                                 fontSize: i === 0 ? '1.5rem' : '1rem',
                                 flexGrow: i === 0 ? 0 : 1,
                                 textAlign: 'center'
                             }}>
                                 {w.item} <span style={{ fontSize: '0.6em', opacity: 0.7, display: 'block' }}>{w.count}</span>
                             </motion.div>
                        )) : <p>No words found.</p>}
                    </div>
                </div>

                {/* Per Person Top 3 */}
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #38bdf8', display: 'inline-block', paddingBottom: '0.5rem' }}>
                         Signatures
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {Object.keys(topWordsPerSender).slice(0, 2).map((sender, idx) => {
                             const tops = topWordsPerSender[sender].slice(0, 3);
                             if (!tops.length) return null;

                             return (
                                 <div key={sender} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '24px' }}>
                                     <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.8rem', color: idx === 0 ? 'var(--accent-color)' : '#38bdf8' }}>
                                         {sender}'s Vocabulary
                                     </div>
                                     <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                         {tops.map((t, i) => (
                                             <div key={t.item} style={{ 
                                                 background: 'rgba(0,0,0,0.3)', 
                                                 padding: '0.4rem 0.8rem', 
                                                 borderRadius: '12px',
                                                 fontSize: '0.9rem',
                                                 border: i === 0 ? `1px solid ${idx === 0 ? 'var(--accent-color)' : '#38bdf8'}` : 'none'
                                              }}>
                                                 <span style={{ marginRight: '0.5rem' }}>{t.item}</span>
                                                 <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>{t.count}</span>
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

export default WordsSlide;
