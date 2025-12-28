import React from "react";
import Slide from "../Slide";
import { motion } from "framer-motion";

const SessionSlide = ({ active, onNext, stats }) => {
    let topSessions = stats.topSessions || [];

    // Fallback to single longest session if topSessions is empty
    if (topSessions.length === 0 && stats.longestSession.duration > 0) {
        topSessions = [
            {
                duration: stats.longestSession.duration,
                date: stats.longestSession.date,
            },
        ];
    }

    const formatDuration = (mins) => {
        const hours = Math.floor(mins / 60);
        const minutes = Math.round(mins % 60);
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

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
                        color: "var(--primary)",
                        fontWeight: "900",
                        marginBottom: "2rem",
                        background: '#FFE6EF',
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px'
                    }}
                >
                    Marathon Chatters
                </h3>

                {/* Top Sessions */}
                {topSessions.length > 0 ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            marginBottom: "1rem",
                        }}
                    >
                        {topSessions.slice(0, 3).map((session, index) => {
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
                                    initial={{ x: -30, opacity: 0 }}
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
                                                    fontSize: "1.8rem",
                                                    fontWeight: "900",
                                                    color: "#000",
                                                    fontFamily:
                                                        "var(--font-display)",
                                                }}
                                            >
                                                {formatDuration(
                                                    session.duration,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.85rem",
                                            color: "var(--text-secondary)",
                                            marginTop: "0.2rem",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        on {session.date}
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
                            marginBottom: "2rem",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.5 }}
                    >
                        {/* Empty state simplified */}
                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                            ⚡
                        </div>
                        <div style={{ fontSize: "1.2rem", color: "#000", fontWeight: 'bold' }}>
                            Quick and sweet chats!
                        </div>
                    </motion.div>
                )}

                {/* Days Active Card */}
                <motion.div
                    className="content-section"
                    style={{
                        display: "inline-block",
                        padding: "1rem 2rem",
                        background: "var(--accent)", // Pop Yellow
                        borderRadius: "16px",
                        border: "2px solid #000",
                        boxShadow: "4px 4px 0px #000",
                        color: "#000"
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                >
                    <div
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "900",
                            color: "#000",
                            lineHeight: 1,
                            fontFamily: "var(--font-display)",
                        }}
                    >
                        {stats.daysActive}
                    </div>
                    <div
                        style={{
                            fontSize: "0.85rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            fontWeight: "bold",
                            marginTop: "0.3rem"
                        }}
                    >
                        Days Active
                    </div>
                </motion.div>
            </motion.div>
        </Slide>
    );
};

export default SessionSlide;
