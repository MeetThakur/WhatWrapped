import React, { useMemo, useState, useEffect } from "react";
import Slide from "../Slide";
import { getAdvancedStats } from "../../utils/analytics";
import { motion } from "framer-motion";

const ResponseTimeSlide = ({ active, onNext, stats }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const advStats = useMemo(() => getAdvancedStats(stats), [stats]);
    const participants = Object.keys(advStats);
    const p1 = participants[0];
    const p2 = participants[1];

    if (!p1 || !p2) return null;

    const t1 = advStats[p1].avgResponse;
    const t2 = advStats[p2].avgResponse;

    const winner = t1 < t2 ? p1 : p2;

    return (
        <Slide active={active} onNext={onNext} duration={10000}>
            <motion.h2
                style={{
                    color: "var(--primary)",
                    marginBottom: isMobile ? "0.75rem" : "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: "900",
                    background: "#ECE6FF",
                    padding: isMobile ? "0.3rem 0.6rem" : "0.4rem 0.8rem",
                    borderRadius: isMobile ? "8px" : "10px",
                    border: "2px solid #000",
                    boxShadow: isMobile
                        ? "3px 3px 0px #000"
                        : "4px 4px 0px #000",
                    fontSize: isMobile ? "0.75rem" : "0.9rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Need for Speed
            </motion.h2>

            <div
                style={{
                    width: "100%",
                    marginBottom: isMobile ? "0.75rem" : "1rem",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexWrap: isMobile ? "nowrap" : "wrap",
                    gap: isMobile ? "0.5rem" : "1rem",
                }}
            >
                <motion.div
                    className="content-section"
                    style={{
                        textAlign: "center",
                        padding: isMobile ? "0.75rem" : "1rem",
                        flex: 1,
                        margin: isMobile ? "0" : "0 0.5rem",
                        background: "#fff",
                        border: "2px solid #000",
                        boxShadow: isMobile
                            ? "3px 3px 0px #000"
                            : "4px 4px 0px #000",
                        borderRadius: isMobile ? "12px" : "14px",
                        minWidth: isMobile ? "0" : "auto",
                    }}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div
                        style={{
                            fontSize: isMobile ? "0.75rem" : "0.9rem",
                            fontWeight: "900",
                            marginBottom: "0.25rem",
                            color: "#000",
                            wordBreak: "break-word",
                        }}
                    >
                        {p1}
                    </div>
                    <div
                        style={{
                            fontSize: isMobile
                                ? "clamp(1.3rem, 5vw, 1.75rem)"
                                : "1.75rem",
                            fontWeight: 900,
                            color: "#FF0055",
                        }}
                    >
                        {t1}m
                    </div>
                </motion.div>

                <motion.div
                    style={{
                        fontSize: isMobile ? "1.2rem" : "1.5rem",
                        fontWeight: "900",
                        color: "#000",
                        background: "#FFD700",
                        borderRadius: "50%",
                        width: isMobile ? "40px" : "50px",
                        height: isMobile ? "40px" : "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #000",
                        zIndex: 10,
                        flexShrink: 0,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    VS
                </motion.div>

                <motion.div
                    className="content-section"
                    style={{
                        textAlign: "center",
                        padding: isMobile ? "0.75rem" : "1rem",
                        flex: 1,
                        margin: isMobile ? "0" : "0 0.5rem",
                        background: "#fff",
                        border: "2px solid #000",
                        boxShadow: isMobile
                            ? "3px 3px 0px #000"
                            : "4px 4px 0px #000",
                        borderRadius: isMobile ? "12px" : "14px",
                        minWidth: isMobile ? "0" : "auto",
                    }}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div
                        style={{
                            fontSize: isMobile ? "0.75rem" : "0.9rem",
                            fontWeight: "900",
                            marginBottom: "0.25rem",
                            color: "#000",
                            wordBreak: "break-word",
                        }}
                    >
                        {p2}
                    </div>
                    <div
                        style={{
                            fontSize: isMobile
                                ? "clamp(1.3rem, 5vw, 1.75rem)"
                                : "1.75rem",
                            fontWeight: 900,
                            color: "#00F0FF",
                        }}
                    >
                        {t2}m
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="content-section"
                style={{
                    width: "100%",
                    textAlign: "center",
                    background: "#FFD700",
                    padding: isMobile ? "0.75rem" : "1rem",
                    borderRadius: isMobile ? "12px" : "16px",
                    border: "2px solid #000",
                    boxShadow: isMobile
                        ? "3px 3px 0px #000"
                        : "4px 4px 0px #000",
                    color: "#000",
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <p
                    style={{
                        margin: 0,
                        opacity: 1,
                        textTransform: "uppercase",
                        fontSize: isMobile ? "0.7rem" : "0.8rem",
                        letterSpacing: "0.1em",
                        fontWeight: "bold",
                    }}
                >
                    Fastest Replier
                </p>
                <motion.h3
                    style={{
                        fontSize: isMobile
                            ? "clamp(2rem, 8vw, 2.75rem)"
                            : "2.75rem",
                        margin: "0.25rem 0",
                        fontFamily: "var(--font-display)",
                        fontWeight: "900",
                        wordBreak: "break-word",
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    {winner}
                </motion.h3>
                <p
                    style={{
                        margin: 0,
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                        color: "#000",
                        fontWeight: "bold",
                    }}
                >
                    Zoom zoom. 🏎️💨
                </p>
            </motion.div>
        </Slide>
    );
};

export default ResponseTimeSlide;
