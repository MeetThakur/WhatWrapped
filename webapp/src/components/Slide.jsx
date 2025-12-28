import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/Slide.css";

const slideVariants = {
    initial: { opacity: 0, scale: 0.9, y: 50 },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: -50,
        transition: { duration: 0.3, ease: "easeIn" },
    },
};

const Slide = ({ children, active, duration = 8000, onNext }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile device
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (active && duration) {
            const timer = setTimeout(onNext, duration);
            return () => clearTimeout(timer);
        }
    }, [active, duration, onNext]);

    return (
        <motion.div
            className="slide-content centered glass-card no-select"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
                width: "100%",
                maxWidth: isMobile ? "95vw" : "420px",
                height: isMobile ? "82vh" : "85vh",
                maxHeight: isMobile ? "85vh" : "800px",
                minHeight: isMobile ? "450px" : "auto",
                position: "relative",
                margin: isMobile ? "0 auto" : "auto",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                touchAction: "none",
            }}
        >
            {/* Playful Background Shapes for the Card - Hide on very small screens */}
            {!isMobile && (
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: -50,
                            right: -50,
                            width: 150,
                            height: 150,
                            borderRadius: "50%",
                            background: "var(--accent)",
                            opacity: 0.2,
                            zIndex: 0,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: -30,
                            left: -30,
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            background: "var(--secondary)",
                            opacity: 0.2,
                            zIndex: 0,
                        }}
                    />
                </>
            )}

            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: isMobile
                        ? "clamp(2rem, 10vh, 2.5rem) clamp(0.75rem, 4vw, 1rem) clamp(2rem, 8vh, 3rem)"
                        : "2rem 1rem",
                    boxSizing: "border-box",
                    overflowY: "hidden",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
                className="hide-scrollbar"
            >
                {children}
            </div>
        </motion.div>
    );
};

export default Slide;
