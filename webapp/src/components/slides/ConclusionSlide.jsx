import React from "react";
import Slide from "../Slide";
import { motion } from "framer-motion";

const ConclusionSlide = ({ active, onNext, stats }) => {
    return (
        <Slide active={active} onNext={onNext} duration={10000}>
            <div
                className="content-section"
                style={{
                    textAlign: "center",
                    padding: "2rem 1rem",
                    background: "transparent",
                }}
            >
                {/* Pop Style Icon */}
                <motion.div
                    style={{
                        fontSize: "3rem",
                        marginBottom: "0.5rem",
                        filter: "drop-shadow(4px 4px 0px rgba(0,0,0,1))",
                    }}
                    initial={{ scale: 0, rotate: 360 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{
                        duration: 1,
                        scale: { type: "spring" }, // Spring for scale
                        rotate: { type: "tween", ease: "easeInOut" }, // Tween for rotation wobble
                    }}
                >
                    👋
                </motion.div>

                <motion.h1
                    style={{
                        fontSize: "2.5rem",
                        marginBottom: "0.25rem",
                        lineHeight: 1.1,
                        color: "#FF0055",
                        fontFamily: "var(--font-display)",
                        fontWeight: "900",
                        textShadow: "3px 3px 0px #000",
                        WebkitTextStroke: "2px #000",
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", delay: 0.3 }}
                >
                    That's a Wrap!
                </motion.h1>

                <motion.p
                    style={{
                        fontSize: "1rem",
                        color: "#000",
                        marginBottom: "0.25rem",
                        fontWeight: "bold",
                        background: "#00F0FF",
                        display: "inline-block",
                        padding: "0.3rem 0.8rem",
                        border: "2px solid #000",
                        boxShadow: "3px 3px 0px #000",
                        transform: "rotate(-2deg)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Your 2025 Chat Story
                </motion.p>

                <motion.p
                    style={{
                        fontSize: "1rem",
                        color: "#000",
                        opacity: 1,
                        marginTop: "0.75rem",
                        fontWeight: "bold",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Thanks for the memories 💚
                </motion.p>

                <motion.button
                    onClick={() => window.location.reload()}
                    style={{
                        marginTop: "1.5rem",
                        padding: "0.9rem 2rem",
                        background: "#FFD700",
                        border: "3px solid #000",
                        borderRadius: "12px",
                        color: "#000",
                        fontSize: "1rem",
                        fontWeight: "900",
                        cursor: "pointer",
                        boxShadow: "4px 4px 0px #000",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        transition: "all 0.1s ease",
                        fontFamily: "var(--font-display)",
                    }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{
                        translateY: "-2px",
                        boxShadow: "6px 6px 0px #000",
                    }}
                    whileTap={{
                        translateY: "1px",
                        boxShadow: "2px 2px 0px #000",
                    }}
                    transition={{ delay: 1 }}
                >
                    📊 Analyze Another Chat
                </motion.button>

                <motion.div
                    style={{
                        marginTop: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        fontSize: "0.75rem",
                        opacity: 0.7,
                        letterSpacing: "0.1em",
                        color: "#000",
                        fontWeight: "bold",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 1.5 }}
                >
                    <span style={{ fontSize: "1rem" }}>🔒</span>
                    <span>YOUR DATA STAYS PRIVATE</span>
                </motion.div>

                <motion.p
                    style={{
                        marginTop: "0.75rem",
                        fontSize: "0.75rem",
                        opacity: 0.6,
                        letterSpacing: "0.1em",
                        color: "#000",
                        fontWeight: "bold",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.7 }}
                >
                    WHATSAPP WRAPPED • 2025
                </motion.p>
            </div>
        </Slide>
    );
};

export default ConclusionSlide;
