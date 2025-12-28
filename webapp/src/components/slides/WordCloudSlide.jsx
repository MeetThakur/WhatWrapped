import React, { useMemo } from 'react';
import Slide from '../Slide';
import { getTopWords } from '../../utils/analytics';
import { motion } from 'framer-motion';

const WordCloudSlide = ({ active, onNext, stats }) => {
    const topWords = useMemo(() => getTopWords(stats), [stats]);

    return (
        <Slide active={active} onNext={onNext} duration={10000}>
            <motion.h2
                style={{ color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '900', background: '#FFE6EF', padding: '0.5rem 1rem', borderRadius: '12px', border: '2px solid #000', boxShadow: '4px 4px 0px #000' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Vocabulary
            </motion.h2>

            <motion.div
                className="content-section"
                style={{
                    width: '100%',
                    height: '400px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px',
                    background: '#fff',
                    borderRadius: '24px',
                    border: '3px solid #000',
                    boxShadow: '6px 6px 0px rgba(0,0,0,1)',
                    padding: '1.5rem',
                    borderRadius: '24px'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {topWords.slice(0, 20).map((word, i) => {
                    const size = Math.max(1, 2.5 - (i * 0.1)) + 'rem';
                    const colors = ['#FF0055', '#00F0FF', '#7000FF', '#FFD700', '#000'];
                    const color = colors[i % colors.length];

                    return (
                        <motion.span
                            key={word.text}
                            style={{
                                fontSize: size,
                                color: color,
                                margin: '5px',
                                display: 'inline-block',
                                fontFamily: 'var(--font-display)',
                                fontWeight: '900',
                                textShadow: i < 5 ? '3px 3px 0px rgba(0,0,0,0.1)' : 'none',
                                transform: `rotate(${Math.random() * 10 - 5}deg)`
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.05, type: 'spring' }}
                            whileHover={{ scale: 1.2, rotate: 0 }}
                        >
                            {word.text}
                        </motion.span>
                    );
                })}
            </motion.div>
        </Slide>
    );
};

export default WordCloudSlide;
