import React from "react";
import Slide from "../Slide";
import { motion } from "framer-motion";

const SilenceSlide = ({ active, onNext, stats }) => {
    let topSilences = stats.topSilences || [];

    // Fallback to single longest silence if topSilences is empty
    if (topSilences.length === 0 && stats.longestSilence.duration > 0) {
        topSilences = [
            {
                duration: stats.longestSilence.duration,
                from: stats.longestSilence.from,
                to: stats.longestSilence.to,
            },
        ];
    }

    const messages = [
        "Absence makes the heart grow fonder? 🤔",
        "Sometimes silence speaks volumes... 🤫",
        "The quiet before the storm of messages! 🌪️",
    ];

    return (
        <Slide active={active} onNext={onNext} duration={10000}>
            <motion.div
                style={{ textAlign: "center", zIndex: 1, width: "100%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <h3
                    style={{
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontSize: "1rem",
                        color: "var(--purple)",
                        fontWeight: "900",
                        marginBottom: "1rem",
                        background: '#ECE6FF',
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        transform: 'rotate(-1deg)'
                    }}
                >
                    Longest Silences
                </h3>

                {/* Top Silences */}
                {topSilences.length > 0 ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            marginBottom: "1.5rem",
                        }}
                    >
                        {topSilences.slice(0, 3).map((silence, index) => {
                            const days = Math.round(silence.duration);
                            const medals = ["🥇", "🥈", "🥉"];
                            const colors = ["#FF0055", "#00F0FF", "#7000FF"]; // Vibrant Colors

                            return (
                                <motion.div
                                    key={index}
                                    style={{
                                        background: "#fff",
                                        borderRadius: "16px",
                                        padding: "1rem",
                                        border: "2px solid #000",
                                        boxShadow: "4px 4px 0px #000",
                                        textAlign: "left",
                                    }}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{
                                        delay: 0.4 + index * 0.15,
                                        type: "spring",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginBottom: "0.2rem",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.8rem",
                                            }}
                                        >
                                            <span
                                                style={{ fontSize: "1.5rem" }}
                                            >
                                                {medals[index]}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "1.5rem",
                                                    fontWeight: "900",
                                                    color: "#000",
                                                    fontFamily:
                                                        "var(--font-display)",
                                                }}
                                            >
                                                {days}{" "}
                                                {days === 1 ? "Day" : "Days"}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.85rem",
                                            color: "var(--text-secondary)",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {silence.from} — {silence.to}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <motion.div
                        style={{
                            padding: "3rem 2rem",
                            textAlign: "center",
                            opacity: 0.7,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                            💬
                        </div>
                        <div style={{ fontSize: "1.2rem", color: "#000", fontWeight: 'bold' }}>
                            You kept the conversation going!
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Bottom Quote Box */}
            <motion.div
                style={{
                    marginTop: "auto",
                    marginBottom: "1rem",
                    background: "var(--accent)", // Yellow pop
                    color: "#000",
                    borderRadius: "16px",
                    padding: "1.25rem",
                    textAlign: "center",
                    position: "relative",
                    width: "100%",
                    maxWidth: "400px",
                    boxShadow: "5px 5px 0px #000",
                    border: "2px solid #000"
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
            >
                <div style={{ fontSize: "1.1rem", lineHeight: 1.4, fontWeight: "bold" }}>
                    {messages[0]}
                </div>
                <div
                    style={{
                        fontSize: "0.85rem",
                        marginTop: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                        fontWeight: "600"
                    }}
                >
                    <span style={{ fontSize: "1rem" }}>💬</span> Keeping the
                    chat alive?
                </div>
            </motion.div>
        </Slide>
    );
};

export default SilenceSlide;
