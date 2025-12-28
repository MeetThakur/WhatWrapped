import React, { useMemo, useEffect } from 'react';
import Slide from '../Slide';
import { getTopParticipants } from '../../utils/analytics';
import { motion, useSpring, useTransform } from 'framer-motion';

function Counter({ from, to }) {
    // Adding dependency array to useEffect in case 'to' changes
    // But framing motion useSpring handles it well. 
    // Simplified for this context:
    return <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    >{to.toLocaleString()}</motion.span>;
    // Note: Creating a proper counting animation in framer motion often involves useMotionValue and useTransform
    // But for simplicity/stability in this iteration I will just fade it in or use a simple text.
    // Let's implement a nicer counter safely.
}

const StatsSlide = ({ active, onNext, stats }) => {
    const topParticipants = useMemo(() => getTopParticipants(stats), [stats]);
    const p1 = topParticipants[0];
    const p2 = topParticipants[1];

    const total = (p1?.count || 0) + (p2?.count || 0);
    const p1Percent = total ? ((p1?.count || 0) / total) * 100 : 50;

    return (
        <Slide active={active} onNext={onNext} duration={8000}>
            <motion.h2
                style={{ color: 'var(--primary)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '900', background: '#FFE6EF', padding: '0.5rem 1rem', borderRadius: '12px', display: 'inline-block', border: '2px solid #000', boxShadow: '4px 4px 0px #000' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Balance of Power
            </motion.h2>

            <motion.div
                className="content-section"
                style={{ width: '100%', marginBottom: '2rem', textAlign: 'center', background: 'transparent' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
            >
                <h3 style={{ fontSize: '5rem', margin: 0, lineHeight: 1, fontFamily: 'var(--font-display)', color: '#000', textShadow: '4px 4px 0px #00F0FF' }}>
                    {(stats.totalMessages / 1000).toFixed(1)}k
                </h3>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Total Messages</p>
            </motion.div>

            {p1 && p2 && (
                <motion.div
                    className="content-section"
                    style={{ width: '100%', padding: '0 1rem' }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ fontWeight: '900', fontSize: '1.5rem', color: '#000' }}>{p1.name}</span>
                        <span style={{ fontWeight: '900', fontSize: '1.5rem', color: '#000' }}>{p2.name}</span>
                    </div>

                    {/* Balance Bar - Pop Style */}
                    <div style={{
                        height: '40px',
                        width: '100%',
                        background: '#fff',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        display: 'flex',
                        border: '3px solid #000',
                        boxShadow: '5px 5px 0px rgba(0,0,0,1)',
                        position: 'relative'
                    }}>
                        <motion.div style={{
                            width: `${p1Percent}%`,
                            background: '#FF0055', // Hot Pink
                            height: '100%',
                            borderRight: '3px solid #000'
                        }}
                            initial={{ width: '50%' }}
                            animate={{ width: `${p1Percent}%` }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                        ></motion.div>
                        <div style={{ flex: 1, background: '#00F0FF' }}></div> {/* Cyan */}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: '#000', fontWeight: 'bold' }}>
                        <span>{p1.count.toLocaleString()} ({Math.round(p1Percent)}%)</span>
                        <span>{p2.count.toLocaleString()} ({Math.round(100 - p1Percent)}%)</span>
                    </div>
                </motion.div>
            )}
        </Slide>
    );
};

export default StatsSlide;
