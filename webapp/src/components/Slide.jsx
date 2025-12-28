import React, { useEffect } from "react";
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
    useEffect(() => {
        if (active && duration) {
            const timer = setTimeout(onNext, duration);
            return () => clearTimeout(timer);
        }
    }, [active, duration, onNext]);

    return (
        <motion.div
            className="slide-content centered glass-card"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
                width: "100%",
                maxWidth: "420px",
                height: "85dvh",
                maxHeight: "800px",
                position: "relative",
                margin: "auto",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // Override glass-card padding if needed, but keeping it standard is good
            }}
        >
            {/* Playful Background Shapes for the Card */}
            <div style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'var(--accent)',
                opacity: 0.2,
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'var(--secondary)',
                opacity: 0.2,
                zIndex: 0
            }} />

            <div className="slide-inner-content">
                {children}
            </div>
        </motion.div>
    );
};

export default Slide;
