import React, { useMemo, useState, useEffect } from "react";
import Slide from "../Slide";
import { getTopWords } from "../../utils/analytics";
import { motion } from "framer-motion";

const WordCloudSlide = ({ active, onNext, stats }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const topWords = useMemo(() => getTopWords(stats), [stats]);
    const wordCount = isMobile ? 15 : 20;

    return (
        <Slide active={active} onNext={onNext} duration={10000}>
            <motion.h2
                style={{
                    color: "var(--primary)",
                    marginBottom: isMobile ? "0.75rem" : "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: "900",
                    background: "#FFE6EF",
                    padding: isMobile ? "0.4rem 0.8rem" : "0.5rem 1rem",
                    borderRadius: isMobile ? "10px" : "12px",
                    border: "2px solid #000",
                    boxShadow: isMobile
                        ? "3px 3px 0px #000"
                        : "4px 4px 0px #000",
                    fontSize: isMobile ? "0.85rem" : "1rem",
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Vocabulary
            </motion.h2>

            <motion.div
                className="content-section"
                style={{
                    width: "100%",
                    height: isMobile ? "300px" : "400px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: isMobile ? "10px" : "15px",
                    background: "#fff",
                    borderRadius: isMobile ? "20px" : "24px",
                    border: isMobile ? "2px solid #000" : "3px solid #000",
                    boxShadow: isMobile
                        ? "4px 4px 0px rgba(0,0,0,1)"
                        : "6px 6px 0px rgba(0,0,0,1)",
                    padding: isMobile ? "1rem" : "1.5rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {topWords.slice(0, wordCount).map((word, i) => {
                    const baseSizeDesktop = Math.max(1, 2.5 - i * 0.1);
                    const baseSizeMobile = Math.max(0.9, 2 - i * 0.08);
                    const size =
                        (isMobile ? baseSizeMobile : baseSizeDesktop) + "rem";
                    const colors = [
                        "#FF0055",
                        "#00F0FF",
                        "#7000FF",
                        "#FFD700",
                        "#000",
                    ];
                    const color = colors[i % colors.length];

                    return (
                        <motion.span
                            key={word.text}
                            style={{
                                fontSize: size,
                                color: color,
                                margin: isMobile ? "3px" : "5px",
                                display: "inline-block",
                                fontFamily: "var(--font-display)",
                                fontWeight: "900",
                                textShadow:
                                    i < 5
                                        ? isMobile
                                            ? "2px 2px 0px rgba(0,0,0,0.1)"
                                            : "3px 3px 0px rgba(0,0,0,0.1)"
                                        : "none",
                                transform: `rotate(${Math.random() * 10 - 5}deg)`,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.05, type: "spring" }}
                            whileHover={
                                isMobile ? {} : { scale: 1.2, rotate: 0 }
                            }
                        >
                            {word.text}
                        </motion.span>
                    );
                })}
            </motion.div>
        </Slide>
    );
};

export default WordCloudSlide;
