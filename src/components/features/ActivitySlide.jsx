
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp } from 'lucide-react';

const ActivitySlide = ({ stats }) => {
  const { activeDays, activePercentage, messagesPerActiveDay, longestStreak } = stats.overview;

  return (
    <div className="slide">
        <motion.div 
            className="content-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
                maxWidth: '800px', 
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
            }}
        >
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '3rem' }}>Activity Check</h2>
            </div>

            <div className="stat-box" style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px' }}>
                <Calendar size={32} color="var(--accent-color)" />
                <h3 style={{ fontSize: '2.5rem', marginTop: '1rem' }}>{activeDays}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Active Days</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
                    That's {activePercentage}% of the year!
                </p>
            </div>

            <div className="stat-box" style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '24px' }}>
                <TrendingUp size={32} color="#f59e0b" />
                <h3 style={{ fontSize: '2.5rem', marginTop: '1rem' }}>{longestStreak}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Day Streak</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
                    Can't stop, won't stop.
                </p>
            </div>

             <div className="stat-box" style={{ 
                 gridColumn: '1 / -1', 
                 background: 'var(--card-bg)', 
                 padding: '2rem', 
                 borderRadius: '24px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'space-between'
             }}>
                <div>
                     <h3 style={{ fontSize: '2.5rem' }}>{messagesPerActiveDay}</h3>
                     <p style={{ color: 'var(--text-secondary)' }}>Avg. Messages / Day</p>
                </div>
                <div style={{ fontSize: '4rem', opacity: 0.2 }}>💬</div>
            </div>
        </motion.div>
    </div>
  );
};

export default ActivitySlide;
