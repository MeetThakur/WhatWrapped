import React, { useMemo } from 'react';
import Slide from '../Slide';
import { getAdvancedStats } from '../../utils/analytics';
import { motion } from 'framer-motion';

const ConversationStarterSlide = ({ active, onNext, stats }) => {
    const advStats = useMemo(() => getAdvancedStats(stats), [stats]);
    const participants = Object.keys(advStats);

    if (participants.length < 2) return null;

    const p1 = participants[0];
    const p2 = participants[1];
    const data1 = advStats[p1];
    const data2 = advStats[p2];

    const total = data1.initiations + data2.initiations;
    const p1Percent = total ? ((data1.initiations / total) * 100) : 50;
    const p2Percent = 100 - p1Percent;

    const winner = data1.initiations > data2.initiations ? p1 : p2;
    const winnerData = data1.initiations > data2.initiations ? data1 : data2;

    return (
        <Slide active={active} onNext={onNext} duration={8000}>
            <motion.h2
                style={{
                    color: '#00FF9D',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '1rem',
                    fontWeight: '900',
                    background: '#E6FFF5',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '12px',
                    border: '2px solid #000',
                    boxShadow: '3px 3px 0px #000',
                    display: 'inline-block'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Conversation Starter
            </motion.h2>

            {/* Winner Card */}
            <motion.div
                className="content-section"
                style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    background: '#fff',
                    border: '3px solid #000',
                    boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                    borderRadius: '20px',
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
            >
                <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-display)',
                    color: '#000',
                    marginBottom: '0.3rem'
                }}>
                    {winner}
                </div>
                <div style={{
                    fontSize: '0.85rem',
                    color: '#000',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    background: '#00FF9D',
                    display: 'inline-block',
                    padding: '0.15rem 0.75rem',
                    borderRadius: '50px',
                    border: '2px solid #000'
                }}>
                    The Igniter 🚀
                </div>
                <div style={{
                    fontSize: '3rem',
                    fontWeight: '900',
                    fontFamily: 'var(--font-display)',
                    color: '#000',
                    textShadow: '3px 3px 0px #00FF9D'
                }}>
                    {winnerData.initiations}
                </div>
                <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: '#000'
                }}>
                    conversations started
                </div>
            </motion.div>

            {/* Comparison Bar */}
            <motion.div
                style={{ width: '100%' }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    color: '#000'
                }}>
                    <span>{p1}</span>
                    <span>{p2}</span>
                </div>

                <div style={{
                    height: '40px',
                    width: '100%',
                    background: '#fff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    border: '3px solid #000',
                    boxShadow: '4px 4px 0px #000'
                }}>
                    <motion.div
                        style={{
                            width: `${p1Percent}%`,
                            background: '#00FF9D',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            borderRight: '3px solid #000',
                            color: '#000'
                        }}
                        initial={{ width: '50%' }}
                        animate={{ width: `${p1Percent}%` }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
                    >
                        {p1Percent > 15 && (
                            <span style={{ fontSize: '0.9rem' }}>{Math.round(p1Percent)}%</span>
                        )}
                    </motion.div>
                    <motion.div
                        style={{
                            width: `${p2Percent}%`,
                            background: '#00A884',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            color: '#fff'
                        }}
                        initial={{ width: '50%' }}
                        animate={{ width: `${p2Percent}%` }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
                    >
                        {p2Percent > 15 && (
                            <span style={{ fontSize: '0.9rem' }}>{Math.round(p2Percent)}%</span>
                        )}
                    </motion.div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: '#000'
                }}>
                    <span>{data1.initiations} times</span>
                    <span>{data2.initiations} times</span>
                </div>
            </motion.div>

            <motion.p
                style={{
                    marginTop: '1rem',
                    fontSize: '0.75rem',
                    opacity: 0.7,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#000'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.5 }}
            >
                Conversations started after 12+ hours of silence
            </motion.p>
        </Slide>
    );
};

export default ConversationStarterSlide;

