import React, { useMemo } from "react";
import Slide from "../Slide";
import { getTopEmojis } from "../../utils/analytics";
import { motion } from "framer-motion";

const EmojiSlide = ({ active, onNext, stats }) => {
    const topEmojis = useMemo(() => getTopEmojis(stats), [stats]);

    return (
        <Slide active={active} onNext={onNext} duration={8000}>
            <motion.h2
                style={{
                    color: "var(--purple)",
                    marginBottom: "1.5rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontSize: "1rem",
                    fontWeight: "900",
                    background: '#ECE6FF',
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    border: '2px solid #000',
                    boxShadow: '4px 4px 0px #000',
                    display: 'inline-block'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
            >
                Vibe Check
            </motion.h2>

            {/* Podium Style Layout for Top 3 - Pop Art Version */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: "1rem",
                    marginBottom: "2rem",
                    height: "250px",
                    padding: "0 0.5rem",
                }}
            >
                {/* Second Place */}
                {topEmojis[1] && (
                    <motion.div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                    >
                        <motion.span
                            style={{
                                fontSize: "3.5rem",
                                filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.5))",
                            }}
                            animate={{ y: [0, -6, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2.5,
                                delay: 0.3,
                            }}
                        >
                            {topEmojis[1].emoji}
                        </motion.span>
                        <div
                            style={{
                                background: "#C0C0C0", // Silver
                                padding: "1rem",
                                borderRadius: "16px",
                                border: "3px solid #000",
                                boxShadow: "4px 4px 0px rgba(0,0,0,1)",
                                minWidth: "90px",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "900",
                                    fontFamily: "var(--font-display)",
                                    color: "#000",
                                }}
                            >
                                {topEmojis[1].count}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    color: "#000",
                                    marginTop: "0.25rem",
                                    fontWeight: "bold"
                                }}
                            >
                                2nd
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* First Place - Taller */}
                {topEmojis[0] && (
                    <motion.div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                            position: "relative",
                        }}
                        initial={{ y: 100, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, type: "spring" }}
                    >
                        <motion.div
                            style={{
                                position: "absolute",
                                top: "-30px",
                                fontSize: "2rem",
                            }}
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        >
                            👑
                        </motion.div>
                        <motion.span
                            style={{
                                fontSize: "4.5rem",
                                filter: "drop-shadow(4px 4px 0px rgba(0,0,0,0.5))",
                            }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            {topEmojis[0].emoji}
                        </motion.span>
                        <div
                            style={{
                                background: "#FFD700", // Gold
                                padding: "1.5rem 1.25rem",
                                borderRadius: "16px",
                                border: "3px solid #000",
                                boxShadow: "6px 6px 0px rgba(0,0,0,1)",
                                minWidth: "100px",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "2rem",
                                    fontWeight: "900",
                                    fontFamily: "var(--font-display)",
                                    color: "#000",
                                }}
                            >
                                {topEmojis[0].count}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.9rem",
                                    color: "#000",
                                    marginTop: "0.25rem",
                                    fontWeight: "bold"
                                }}
                            >
                                1st
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Third Place */}
                {topEmojis[2] && (
                    <motion.div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        <motion.span
                            style={{
                                fontSize: "3rem",
                                filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.5))",
                            }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 3,
                                delay: 0.5,
                            }}
                        >
                            {topEmojis[2].emoji}
                        </motion.span>
                        <div
                            style={{
                                background: "#CD7F32", // Bronze
                                padding: "1rem",
                                borderRadius: "16px",
                                border: "3px solid #000",
                                boxShadow: "4px 4px 0px rgba(0,0,0,1)",
                                minWidth: "80px",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "1.25rem",
                                    fontWeight: "900",
                                    fontFamily: "var(--font-display)",
                                    color: "#000",
                                }}
                            >
                                {topEmojis[2].count}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    color: "#000",
                                    marginTop: "0.25rem",
                                    fontWeight: "bold"
                                }}
                            >
                                3rd
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Rest of Top 6 - Simplified */}
            {topEmojis.length > 3 && (
                <motion.div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        flexWrap: "wrap",
                        padding: "0 1rem",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    {topEmojis.slice(3, 6).map((item, i) => (
                        <motion.div
                            key={item.emoji}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.5rem 1rem",
                                background: "#fff",
                                borderRadius: "12px",
                                border: "2px solid #000",
                                boxShadow: "3px 3px 0px #000"
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: 0.9 + i * 0.1,
                                type: "spring",
                            }}
                        >
                            <span style={{ fontSize: "2rem" }}>
                                {item.emoji}
                            </span>
                            <span
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "900",
                                    color: "#000",
                                }}
                            >
                                {item.count}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </Slide>
    );
};

export default EmojiSlide;
