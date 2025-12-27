import React, { useMemo } from 'react';
import Slide from '../Slide';
import { getAdvancedStats } from '../../utils/analytics';
import { motion } from 'framer-motion';

const MessageLengthSlide = ({ active, onNext, stats }) => {
    const advStats = useMemo(() => getAdvancedStats(stats), [stats]);
    const participants = Object.keys(advStats);

    if (participants.length < 2) return null;

    const p1 = participants[0];
    const p2 = participants[1];
    const data1 = advStats[p1];
    const data2 = advStats[p2];

    const isYapper1 = data1.avgLength > 30;
    const isYapper2 = data2.avgLength > 30;

    return (
        <Slide active={active} onNext={onNext} duration={8000}>
            <motion.h2
                style={{
                    color: '#00F0FF',
                    marginBottom: '2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    background: '#E6FFFF',
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    border: '2px solid #000',
                    boxShadow: '4px 4px 0px #000',
                    display: 'inline-block'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Message Length
            </motion.h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                width: '100%',
                height: '100%',
                alignContent: 'center'
            }}>
                {[p1, p2].map((p, i) => {
                    const data = i === 0 ? data1 : data2;
                    const isYapper = data.avgLength > 30;
                    const bgColor = isYapper ? '#FF0055' : '#00F0FF';
                    const textColor = isYapper ? '#fff' : '#000';
                    const borderColor = '#000';

                    return (
                        <motion.div
                            key={p}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + (i * 0.2) }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                height: '100%'
                            }}
                        >
                            {/* Header */}
                            <div style={{
                                background: '#fff',
                                border: '3px solid #000',
                                boxShadow: '4px 4px 0px #000',
                                borderRadius: '16px',
                                padding: '1rem',
                                textAlign: 'center'
                            }}>
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '900',
                                    margin: 0,
                                    color: '#000',
                                    textTransform: 'uppercase'
                                }}>{p}</h3>
                            </div>

                            {/* Main Card - Length */}
                            <div style={{
                                background: bgColor,
                                border: '3px solid #000',
                                boxShadow: '4px 4px 0px #000',
                                borderRadius: '16px',
                                padding: '1rem',
                                textAlign: 'center',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <div style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: '900', fontFamily: 'var(--font-display)', color: textColor }}>
                                    {data.avgLength}
                                </div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: textColor, opacity: 0.9 }}>
                                    chars/msg
                                </div>
                            </div>

                            {/* Secondary Stats Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                                {/* Words */}
                                <div style={{
                                    background: '#fff',
                                    border: '2px solid #000',
                                    boxShadow: '3px 3px 0px #000',
                                    borderRadius: '12px',
                                    padding: '0.5rem',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#000' }}>{data.avgWords}</div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#666' }}>words/msg</div>
                                </div>

                                {/* Emojis */}
                                <div style={{
                                    background: '#fff',
                                    border: '2px solid #000',
                                    boxShadow: '3px 3px 0px #000',
                                    borderRadius: '12px',
                                    padding: '0.5rem',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#000' }}>{data.avgEmojis}</div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#666' }}>emojis/msg</div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Slide>
    );
};

export default MessageLengthSlide;
