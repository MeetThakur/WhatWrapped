import React, { useMemo } from 'react';
import Slide from '../Slide';
import { getAdvancedStats } from '../../utils/analytics';
import { motion } from 'framer-motion';

const ChatStyleSlide = ({ active, onNext, stats }) => {
    const advStats = useMemo(() => getAdvancedStats(stats), [stats]);
    const participants = Object.keys(advStats);

    if (participants.length < 2) return null;

    return (
        <Slide active={active} onNext={onNext} duration={12000}>
            <motion.h2
                style={{ color: 'var(--purple)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '900', background: '#ECE6FF', padding: '0.5rem 1rem', borderRadius: '12px', border: '2px solid #000', boxShadow: '4px 4px 0px #000', transform: 'rotate(-2deg)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Chat Vibe
            </motion.h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
                {participants.map((p, i) => {
                    const data = advStats[p];
                    const isYapper = data.avgLength > 30; // Arbitrary threshold
                    const isNightOwl = data.nightOwlScore > 20;
                    const isInitiator = data.initiations > advStats[participants[1 - i]].initiations;

                    return (
                        <motion.div
                            key={p}
                            className="content-section"
                            style={{
                                padding: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                background: '#fff',
                                borderRadius: '24px',
                                border: '3px solid #000',
                                boxShadow: '6px 6px 0px rgba(0,0,0,1)',
                                position: 'relative'
                            }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + (i * 0.2) }}
                        >
                            <h3 style={{ borderBottom: '3px solid #000', paddingBottom: '0.5rem', fontSize: '1.5rem', fontWeight: '900', color: '#000' }}>{p}</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <Badge label={isYapper ? "The Yapper 🗣️" : "Short & Sweet 🤏"}
                                    value={`${data.avgLength} chars/msg`} color={isYapper ? "#FF0055" : "#00F0FF"} delay={0.4 + (i * 0.2)} rotate={-2} />

                                <Badge label={isNightOwl ? "Night Owl 🦉" : "Early Bird ☀️"}
                                    value={`${data.nightOwlScore}% night msgs`} color={isNightOwl ? "#7000FF" : "#FFD700"} delay={0.6 + (i * 0.2)} rotate={2} />

                                {isInitiator && <Badge label="Conversation Starter 🚀" value={`${data.initiations} times`} color="#25D366" delay={0.8 + (i * 0.2)} rotate={-1} />}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Slide>
    );
};

const Badge = ({ label, value, color, delay, rotate }) => (
    <motion.div
        style={{
            background: color,
            padding: '0.8rem',
            borderRadius: '12px',
            border: '2px solid #000',
            boxShadow: '3px 3px 0px rgba(0,0,0,0.5)',
            transform: `rotate(${rotate}deg)`,
            marginBottom: '0.2rem',
            color: color === '#FFD700' || color === '#25D366' || color === '#00F0FF' ? '#000' : '#fff'
        }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: delay }}
        whileHover={{ scale: 1.05, rotate: 0 }}
    >
        <div style={{ fontWeight: '900', fontSize: '0.9rem' }}>{label}</div>
        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.9 }}>{value}</div>
    </motion.div>
);

export default ChatStyleSlide;
