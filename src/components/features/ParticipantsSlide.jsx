
import React from 'react';
import { motion } from 'framer-motion';

const ParticipantsSlide = ({ stats }) => {
  const { list } = stats.participants;
  // Top 2 participants for 1:1 view
  const p1 = list[0];
  const p2 = list[1];

  if (!p1) return null;

  const renderComparisonRow = (label, p1Value, p2Value, color1, color2) => {
      const total = p1Value + p2Value;
      const p1Perc = total ? ((p1Value / total) * 100) : 0;
      const p2Perc = total ? ((p2Value / total) * 100) : 0;

      return (
          <div style={{ width: '100%', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'flex-end' }}>
                 <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{p1Value.toLocaleString()}</div>
                 </div>
                 <div style={{ fontSize: '0.9rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '2px' }}>{label}</div>
                 <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{p2Value.toLocaleString()}</div>
                 </div>
              </div>

               <div style={{ position: 'relative', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden', display: 'flex' }}>
                    <motion.div 
                        initial={{ width: '50%' }}
                        whileInView={{ width: `${p1Perc}%` }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        style={{ height: '100%', background: color1 }}
                    />
                     <motion.div 
                        initial={{ width: '50%' }}
                        whileInView={{ width: `${p2Perc}%` }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        style={{ height: '100%', background: color2 }}
                    />
                </div>
          </div>
      );
  };

  return (
    <div className="slide">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="content-card"
        style={{ width: '100%', maxWidth: '900px' }}
      >
        <h2 className="text-large" style={{ textAlign: 'center' }}>The Duo</h2>
        
        {p2 ? (
            <div className="responsive-flex-row" style={{ gap: '1rem', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                     <h3 style={{ fontSize: '2rem', color: 'var(--accent-color)' }}>{p1.name}</h3>
                     <h3 style={{ fontSize: '2rem', color: '#38bdf8' }}>{p2.name}</h3>
                </div>

                {renderComparisonRow('Messages', p1.count, p2.count, 'var(--accent-color)', '#38bdf8')}
                {renderComparisonRow('Total Words', p1.wordCount, p2.wordCount, 'var(--accent-color)', '#38bdf8')}
                {renderComparisonRow('Emojis Sent', p1.emojiCount, p2.emojiCount, 'var(--accent-color)', '#38bdf8')}
                


                <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '2rem', fontSize: '0.9rem' }}>
                    Total Combined: {(p1.count + p2.count).toLocaleString()} messages
                </div>
            </div>
        ) : (
             <div style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{p1.name}</div>
                 <div style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{p1.count.toLocaleString()} messages</div>
                 <div style={{ marginTop: '2rem', opacity: 0.7 }}>Solo monologue? 🎤</div>
             </div>
        )}
      </motion.div>
    </div>
  );
};

export default ParticipantsSlide;
