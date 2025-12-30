
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Clock } from 'lucide-react';

const ConversationSlide = ({ stats }) => {
  const { totalSessions, avgLengthMinutes, longestSessionMinutes } = stats.conversations;

  return (
    <div className="slide">
        <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="content-card center-all"
             style={{ maxWidth: '800px', width: '100%' }}
        >
             <h2 className="text-large" style={{ marginBottom: '3rem' }}>Deep Dives</h2>
             
             <div className="responsive-grid-3">
             {/* Sessions */}
             <div className="stat-box center-all">
                <MessageCircle size={24} color="var(--accent-color)" />
                <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.conversations.totalSessions}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Conversations</div>
                </div>
             </div>

             {/* Avg Duration */}
             <div className="stat-box center-all">
                <Clock size={24} color="#38bdf8" />
                <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.conversations.avgLengthMinutes}m</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Avg Duration</div>
                </div>
             </div>

             {/* Top 3 Longest Sessions */}
             <div style={{ width: '100%', marginTop: '0rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', gridColumn: 'span 1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                      <img src="https://api.iconify.design/lucide:flame.svg?color=%23f472b6" alt="" style={{ width: 20, height: 20 }} />
                      <span>Longest Marathon Chats</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {stats.conversations.topSessions.map((s, i) => (
                           <div key={i} style={{ 
                               background: 'rgba(255,255,255,0.05)', 
                               padding: '0.5rem 1rem', 
                               borderRadius: '16px',
                               display: 'flex',
                               flexDirection: 'column',
                               alignItems: 'center',
                               border: i === 0 ? '1px solid var(--accent-color)' : '1px solid transparent'
                           }}>
                               <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{s.durationMinutes}m</div>
                               <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{new Date(s.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}</div>
                           </div>
                      ))}
                  </div>
             </div>
             </div>
             
             {/* Longest Silence - Separate row or grid */}
             <div className="stat-box center-all" style={{ marginTop: '2rem' }}>
                <img src="https://api.iconify.design/lucide:moon.svg?color=%23fbbf24" alt="" style={{ width: 24, height: 24 }} />
                <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.conversations.longestSilence.days}d</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Longest Usage Gap</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '0.25rem' }}>
                        {stats.conversations.longestSilence.date ? new Date(stats.conversations.longestSilence.date).toLocaleDateString() : ''}
                    </div>
                </div>
             </div>
             
             <div style={{ marginTop: '4rem', fontStyle: 'italic', color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.9rem' }}>
                 "A conversation session is defined by gaps shorter than 30 minutes."
             </div>
        </motion.div>
    </div>
  );
};

export default ConversationSlide;
