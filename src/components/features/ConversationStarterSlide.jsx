
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react';

const ConversationStarterSlide = ({ stats }) => {
  const { starters } = stats.conversations;
  
  // Convert object to array and sort
  const starterList = Object.entries(starters)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Take top 2 for comparison
  const p1 = starterList[0];
  const p2 = starterList[1];

  const totalStarters = p1 ? p1.count + (p2 ? p2.count : 0) : 0;

  return (
    <div className="slide">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="content-card center-all"
        style={{ maxWidth: '900px', width: '100%' }}
      >
        <div style={{ marginBottom: '3rem', position: 'relative', textAlign: 'center' }}>
             <div className="floating" style={{ 
                 position: 'absolute', 
                 top: '-60px', 
                 left: '50%', 
                 transform: 'translateX(-50%)',
                 background: 'rgba(34, 197, 94, 0.2)',
                 padding: '1rem',
                 borderRadius: '50%',
                 zIndex: -1
             }}>
                 <MessageSquarePlus size={50} color="var(--accent-color)" />
             </div>
             <h2 style={{ fontSize: '3rem', marginTop: '1rem' }}>The Icebreaker</h2>
             <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Who breaks the silence after 12 hours?</p>
        </div>

        {p1 ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: p2 ? '1fr 1fr' : '1fr', gap: '2rem' }}>
                    {/* Person 1 */}
                     <div style={{ 
                         background: 'rgba(255,255,255,0.05)', 
                         padding: '2rem', 
                         borderRadius: '24px',
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center',
                         border: '1px solid rgba(255,255,255,0.1)'
                     }}>
                         <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{p1.name}</div>
                         <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{p1.count}</div>
                         <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>starts</div>
                     </div>

                     {/* Person 2 */}
                     {p2 && (
                        <div style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            padding: '2rem', 
                            borderRadius: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                             border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{p2.name}</div>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#38bdf8' }}>{p2.count}</div>
                            <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>starts</div>
                        </div>
                     )}
                </div>

                {/* Comparative Text */}
                {p2 && (
                    <div style={{ textAlign: 'center', opacity: 0.8, fontSize: '1.1rem' }}>
                         It's often 
                         <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}> {p1.name} </span> 
                         who reaches out first, but 
                         <span style={{ color: '#38bdf8', fontWeight: 'bold' }}> {p2.name} </span> 
                         isn't far behind!
                    </div>
                )}
            </div>
        ) : (
            <div style={{ fontSize: '1.5rem', opacity: 0.7 }}>
                No long silences broken this year!
            </div>
        )}
      </motion.div>
    </div>
  );
};

export default ConversationStarterSlide;
