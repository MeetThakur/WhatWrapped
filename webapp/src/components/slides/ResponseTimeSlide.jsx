import React, { useMemo } from 'react';
import Slide from '../Slide';
import { getAdvancedStats } from '../../utils/analytics';
import { motion } from 'framer-motion';

const ResponseTimeSlide = ({ active, onNext, stats }) => {
    const advStats = useMemo(() => getAdvancedStats(stats), [stats]);
    const participants = Object.keys(advStats);
    const p1 = participants[0];
    const p2 = participants[1];

    if (!p1 || !p2) return null;

    const t1 = advStats[p1].avgResponse;
    const t2 = advStats[p2].avgResponse;

    const winner = t1 < t2 ? p1 : p2;

    return (
        <Slide active={active} onNext={onNext} duration={10000}>
            <motion.h2
                style={{ color: 'var(--primary)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '900', background: '#ECE6FF', padding: '0.5rem 1rem', borderRadius: '12px', border: '2px solid #000', boxShadow: '4px 4px 0px #000' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Need for Speed
            </motion.h2>

            <div style={{ width: '100%', marginBottom: '2rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <motion.div
                    className="content-section"
                    style={{ textAlign: 'center', padding: '1.5rem', flex: 1, margin: '0 0.5rem', background: '#fff', border: '2px solid #000', boxShadow: '5px 5px 0px #000', borderRadius: '16px' }}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div style={{ fontSize: '1rem', fontWeight: '900', marginBottom: '0.5rem', color: '#000' }}>{p1}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#FF0055' }}>{t1}m</div>
                </motion.div>

                <motion.div
                    style={{ fontSize: '1.5rem', fontWeight: '900', color: '#000', background: '#FFD700', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #000', zIndex: 10 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                >
                    VS
                </motion.div>

                <motion.div
                    className="content-section"
                    style={{ textAlign: 'center', padding: '1.5rem', flex: 1, margin: '0 0.5rem', background: '#fff', border: '2px solid #000', boxShadow: '5px 5px 0px #000', borderRadius: '16px' }}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div style={{ fontSize: '1rem', fontWeight: '900', marginBottom: '0.5rem', color: '#000' }}>{p2}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00F0FF' }}>{t2}m</div>
                </motion.div>
            </div>

            <motion.div
                className="content-section"
                style={{ width: '100%', textAlign: 'center', background: '#FFD700', padding: '1.5rem', borderRadius: '20px', border: '3px solid #000', boxShadow: '6px 6px 0px #000', color: '#000' }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <p style={{ margin: 0, opacity: 1, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em', fontWeight: 'bold' }}>Fastest Replier</p>
                <motion.h3
                    style={{ fontSize: '3.5rem', margin: '0.5rem 0', fontFamily: 'var(--font-display)', fontWeight: '900' }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    {winner}
                </motion.h3>
                <p style={{ margin: 0, fontSize: '1rem', color: '#000', fontWeight: 'bold' }}>Zoom zoom. 🏎️💨</p>
            </motion.div>
        </Slide>
    );
};

export default ResponseTimeSlide;
