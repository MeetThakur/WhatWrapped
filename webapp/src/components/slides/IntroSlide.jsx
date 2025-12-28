import React from "react";
import Slide from "../Slide";
import { motion } from "framer-motion";

const IntroSlide = ({ active, onNext }) => {
    return (
        <Slide active={active} onNext={onNext} duration={6000}>
            <div
                className="content-section floating"
                style={{ textAlign: "center", padding: "3rem" }}
            >
                {/* Pop Style Icon */}
                <motion.div
                    style={{
                        fontSize: "4.5rem", // Reduced from 6rem
                        marginBottom: "1rem",
                        filter: "drop-shadow(5px 5px 0px rgba(0,0,0,1))",
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{
                        delay: 0.2,
                        duration: 1.5,
                        scale: { type: "spring" }, // Keep spring for scale
                        rotate: { type: "tween", ease: "easeInOut" } // Use tween for keyframes
                    }}
                >
                    🎁
                </motion.div>

                <motion.h1
                    style={{
                        fontSize: "2.5rem", // Reduced from 3.5rem
                        marginBottom: "0.25rem", // Reduced margin
                        color: "#000",
                        fontFamily: "var(--font-display)",
                        fontWeight: "900",
                        textShadow: "3px 3px 0px #fff"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    YOUR CHAT
                </motion.h1>

                <motion.h2
                    style={{
                        fontSize: "4rem", // Reduced from 5rem
                        marginBottom: "1.5rem",
                        color: "#FF0055", // Hot Pink
                        fontFamily: "var(--font-display)",
                        fontWeight: "900",
                        textShadow: "5px 5px 0px #000",
                        WebkitTextStroke: "2px #000",
                        transform: "rotate(-2deg)"
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                >
                    WRAPPED
                </motion.h2>

                <motion.div
                    style={{
                        fontSize: "1.2rem", // Reduced from 1.5rem
                        color: "#000",
                        fontWeight: "bold",
                        background: "#00F0FF", // Cyan
                        display: "inline-block",
                        padding: "0.4rem 1.2rem",
                        borderRadius: "50px",
                        border: "3px solid #000",
                        boxShadow: "4px 4px 0px #000",
                        marginBottom: "1.5rem"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    2025 Edition
                </motion.div>

                <motion.div
                    style={{
                        marginTop: "1rem",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        color: "#000"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <span style={{ fontSize: "1.5rem" }}>👉</span>
                    Tap to unbox
                </motion.div>
            </div>
        </Slide>
    );
};

export default IntroSlide;
