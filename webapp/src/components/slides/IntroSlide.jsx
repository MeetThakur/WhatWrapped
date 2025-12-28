import React, { useState, useEffect } from "react";
import Slide from "../Slide";
import { motion } from "framer-motion";

const IntroSlide = ({ active, onNext }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <Slide active={active} onNext={onNext} duration={6000}>
            <div
                className="content-section floating"
                style={{
                    textAlign: "center",
                    padding: isMobile ? "0.5rem 0.75rem" : "3rem",
                    marginBottom: isMobile ? "0" : "1.5rem",
                }}
            >
                {/* Pop Style Icon */}
                <motion.div
                    style={{
                        fontSize: isMobile ? "2.5rem" : "4.5rem",
                        marginBottom: isMobile ? "0.5rem" : "1rem",
                        filter: "drop-shadow(3px 3px 0px rgba(0,0,0,1))",
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{
                        delay: 0.2,
                        duration: 1.5,
                        scale: { type: "spring" },
                        rotate: { type: "tween", ease: "easeInOut" },
                    }}
                >
                    🎁
                </motion.div>

                <motion.h1
                    style={{
                        fontSize: isMobile
                            ? "clamp(1.5rem, 6vw, 2rem)"
                            : "2.5rem",
                        marginBottom: isMobile ? "0.15rem" : "0.25rem",
                        color: "#000",
                        fontFamily: "var(--font-display)",
                        fontWeight: "900",
                        lineHeight: 1,
                        textShadow: isMobile
                            ? "2px 2px 0px #fff"
                            : "3px 3px 0px #fff",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    YOUR CHAT
                </motion.h1>

                <motion.h2
                    style={{
                        fontSize: isMobile ? "clamp(2rem, 9vw, 3rem)" : "4rem",
                        marginBottom: isMobile ? "0.5rem" : "1.5rem",
                        marginTop: isMobile ? "0.25rem" : "0",
                        color: "#FF0055",
                        fontFamily: "var(--font-display)",
                        fontWeight: "900",
                        lineHeight: 0.95,
                        textShadow: isMobile
                            ? "2px 2px 0px #000"
                            : "5px 5px 0px #000",
                        WebkitTextStroke: isMobile ? "1px #000" : "2px #000",
                        transform: "rotate(-2deg)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                >
                    WRAPPED
                </motion.h2>

                <motion.div
                    style={{
                        fontSize: isMobile ? "0.85rem" : "1.2rem",
                        color: "#000",
                        fontWeight: "bold",
                        background: "#00F0FF",
                        display: "inline-block",
                        padding: isMobile ? "0.4rem 0.8rem" : "0.4rem 1.2rem",
                        borderRadius: "50px",
                        border: isMobile ? "2px solid #000" : "3px solid #000",
                        boxShadow: isMobile
                            ? "2px 2px 0px #000"
                            : "4px 4px 0px #000",
                        marginBottom: isMobile ? "0.5rem" : "1.5rem",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    2025 Edition
                </motion.div>

                <motion.div
                    style={{
                        marginTop: isMobile ? "0.5rem" : "1rem",
                        fontSize: isMobile ? "0.8rem" : "1rem",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.4rem",
                        color: "#000",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <span style={{ fontSize: isMobile ? "1.1rem" : "1.5rem" }}>
                        👉
                    </span>
                    {isMobile ? "Tap or swipe" : "Tap to unbox"}
                </motion.div>
            </div>
        </Slide>
    );
};

export default IntroSlide;
