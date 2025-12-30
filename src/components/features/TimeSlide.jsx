
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CalendarDays, Calendar } from 'lucide-react';

const TimeSlide = ({ stats }) => {
  const { hourlyDistribution, weeklyDistribution, monthlyDistribution, mostActiveHour, busiestDay } = stats.time;
  const [activeTab, setActiveTab] = useState('hourly'); // hourly, weekly, monthly
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Helpers
  const formatHour = (h) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12} ${ampm}`;
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getChartData = () => {
      switch(activeTab) {
          case 'weekly': return { data: weeklyDistribution, labels: days, max: Math.max(...weeklyDistribution) };
          case 'monthly': return { data: monthlyDistribution, labels: months, max: Math.max(...monthlyDistribution) };
          case 'hourly': 
          default: 
            return { data: hourlyDistribution, labels: hourlyDistribution.map((_, i) => i), max: Math.max(...hourlyDistribution) };
      }
  };

  const { data, labels, max } = getChartData();

  return (
    <div className="slide">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={{ width: '100%', maxWidth: '900px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="text-large">Time & Rhythm</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
             You are most chatty around <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{formatHour(mostActiveHour)}</span>.
          </p>
        </div>

        {/* Tabs */}
        <div className="center-all" style={{ flexDirection: 'row', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['hourly', 'weekly', 'monthly'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                        background: activeTab === tab ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)',
                        color: activeTab === tab ? '#000' : '#fff',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '99px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        fontSize: '0.9rem'
                    }}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Chart Area */}
        <div style={{ 
            height: '250px', 
            display: 'flex', 
            alignItems: 'flex-end', 
            gap: activeTab === 'hourly' ? '2px' : '8px',
            marginBottom: '3rem',
            padding: '0 0.5rem',
            width: '100%'
        }}>
            <AnimatePresence mode="wait">
                {data.map((count, i) => (
                        <motion.div
                        key={`${activeTab}-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: `${(count / (max || 1)) * 100}%`, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.02 }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{ 
                            flex: 1, 
                            background: count === max && count > 0 ? 'var(--accent-color)' : 'rgba(255,255,255,0.2)',
                            borderRadius: '4px 4px 0 0',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            minWidth: activeTab === 'hourly' ? '4px' : '10px'
                        }}
                        title={`${labels[i]}: ${count} messages`}
                    >
                        {/* Tooltip */}
                        {hoveredIndex === i && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '100%',
                                    marginBottom: '8px',
                                    background: '#000',
                                    color: '#fff',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.7rem',
                                    whiteSpace: 'nowrap',
                                    pointerEvents: 'none',
                                    zIndex: 10,
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                {count}
                            </motion.div>
                        )}
                        
                        {/* Label below bar */}
                        {activeTab !== 'hourly' && (
                            <span style={{ 
                                position: 'absolute', 
                                bottom: '-25px', 
                                fontSize: '0.7rem', 
                                color: 'var(--text-secondary)',
                                transform: labels.length > 7 ? 'rotate(-45deg)' : 'none',
                                transformOrigin: 'top left',
                                whiteSpace: 'nowrap'
                            }}>
                                {labels[i]}
                            </span>
                        )}
                         {/* Hour markers (every 6 hours) */}
                        {activeTab === 'hourly' && i % 6 === 0 && (
                             <span style={{ 
                                position: 'absolute', 
                                bottom: '-25px', 
                                fontSize: '0.6rem', 
                                color: 'var(--text-secondary)',
                                whiteSpace: 'nowrap'
                            }}>
                                {formatHour(i)}
                            </span>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', width: '100%' }}>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                      <CalendarDays size={20} color="#f59e0b" />
                      <span>Most Active Days</span>
                 </div>
                 <div className="responsive-flex-row" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {(stats.time.topBusiestDays || [stats.time.busiestDay]).map((d, i) => (
                           <div key={d.date} style={{ 
                               background: 'var(--card-bg)', 
                               padding: '0.8rem 1.2rem', 
                               borderRadius: '16px', 
                               display: 'flex', 
                               flexDirection: 'column',
                               alignItems: 'center', 
                               gap: '0.2rem',
                               border: i === 0 ? '1px solid #f59e0b' : '1px solid transparent',
                               minWidth: '100px'
                            }}>
                                <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{d.date}</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{d.count} msgs</div>
                           </div>
                      ))}
                 </div>
             </div>
        </div>

      </motion.div>
    </div>
  );
};

export default TimeSlide;
