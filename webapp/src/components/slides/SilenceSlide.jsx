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
                        fontSize: "0.85rem",
                        color: "var(--purple)",
                        fontWeight: "900",
                        marginBottom: "0.75rem",
                        background: "#ECE6FF",
                        display: "inline-block",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "10px",
                        transform: "rotate(-1deg)",
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
                            gap: "0.75rem",
                            marginBottom: "1rem",
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
                                        borderRadius: "12px",
                                        padding: "0.75rem",
                                        border: "2px solid #000",
                                        boxShadow: "3px 3px 0px #000",
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
                                                style={{ fontSize: "1.3rem" }}
                                            >
                                                {medals[index]}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "1.3rem",
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
                                            fontSize: "0.75rem",
                                            color: "var(--text-secondary)",
                                            fontWeight: "bold",
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
                            padding: "2rem 1.5rem",
                            textAlign: "center",
                            opacity: 0.7,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div
                            style={{
                                fontSize: "2.5rem",
                                marginBottom: "0.75rem",
                            }}
                        >
                            💬
                        </div>
                        <div
                            style={{
                                fontSize: "1rem",
                                color: "#000",
                                fontWeight: "bold",
                            }}
                        >
                            You kept the conversation going!
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Bottom Quote Box */}
            <motion.div
                style={{
                    marginTop: "auto",
                    marginBottom: "0",
                    background: "var(--accent)", // Yellow pop
                    color: "#000",
                    borderRadius: "12px",
                    padding: "0.75rem",
                    textAlign: "center",
                    position: "relative",
                    width: "100%",
                    maxWidth: "400px",
                    boxShadow: "4px 4px 0px #000",
                    border: "2px solid #000",
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
            >
                <div
                    style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.3,
                        fontWeight: "bold",
                    }}
                >
                    {messages[0]}
                </div>
            </motion.div>
        </Slide>
    );
};

export default SilenceSlide;
