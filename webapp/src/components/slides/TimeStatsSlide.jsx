import React, { useState, useEffect } from "react";
import Slide from "../Slide";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const TimeStatsSlide = ({ active, onNext, stats }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Find peak hour
    const peakHour = stats.hourlyActivity.indexOf(
        Math.max(...stats.hourlyActivity),
    );
    const formatHour = (h) => {
        const ampm = h >= 12 ? "PM" : "AM";
        const hour = h % 12 || 12;
        return `${hour} ${ampm}`;
    };

    // Determine chatter type
    let chatterType = "Daytime Chatters ☀️";
    if (peakHour >= 22 || peakHour < 5) chatterType = "Night Owls 🦉";
    else if (peakHour >= 5 && peakHour < 12) chatterType = "Early Birds 🌅";

    const chartData = {
        labels: Array.from({ length: 24 }, (_, i) =>
            i === 0 ? "12 AM" : i === 12 ? "12 PM" : i > 12 ? i - 12 : i,
        ),
        datasets: [
            {
                label: "Messages",
                data: stats.hourlyActivity,
                fill: true,
                backgroundColor: "rgba(255, 0, 85, 0.2)",
                borderColor: "#FF0055",
                borderWidth: isMobile ? 3 : 4,
                tension: 0.4, // Curved lines
                pointRadius: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#000",
                titleColor: "#fff",
                bodyColor: "#fff",
                displayColors: false,
                padding: 10,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: "#000",
                    maxTicksLimit: isMobile ? 4 : 6,
                    font: {
                        size: isMobile ? 8 : 10,
                        weight: "bold",
                        family: "Outfit",
                    },
                },
            },
            y: {
                display: false,
                grid: { display: false },
                min: 0,
            },
        },
        animation: {
            duration: isMobile ? 1500 : 2000,
            easing: "easeOutQuart",
        },
        layout: {
            padding: {
                left: isMobile ? 5 : 10,
                right: isMobile ? 5 : 10,
                bottom: 0,
            },
        },
    };

    return (
        <Slide active={active} onNext={onNext} duration={10000}>
            <motion.div
                style={{ textAlign: "center", width: "100%", zIndex: 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <h3
                    style={{
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontSize: isMobile ? "0.7rem" : "0.9rem",
                        color: "var(--primary)",
                        fontWeight: "900",
                        marginBottom: isMobile ? "0.5rem" : "0.5rem",
                        background: "#FFE6EF",
                        display: "inline-block",
                        padding: isMobile ? "0.3rem 0.6rem" : "0.4rem 0.8rem",
                        borderRadius: isMobile ? "8px" : "10px",
                    }}
                >
                    Peak Chat Time
                </h3>

                <h1
                    style={{
                        fontSize: isMobile
                            ? "clamp(1.1rem, 4.5vw, 1.35rem)"
                            : "1.5rem",
                        fontWeight: "bold",
                        marginTop: isMobile ? "0" : "0.5rem",
                        marginBottom: isMobile ? "0.25rem" : "0.25rem",
                        lineHeight: 1.1,
                        color: "#000",
                    }}
                >
                    Most active at
                </h1>
                <div
                    style={{
                        fontSize: isMobile
                            ? "clamp(2.5rem, 10vw, 3.5rem)"
                            : "3.5rem",
                        fontWeight: "900",
                        color: "var(--purple)",
                        textShadow: isMobile
                            ? "2px 2px 0px rgba(0,0,0,0.1)"
                            : "3px 3px 0px rgba(0,0,0,0.1)",
                        lineHeight: 1,
                        marginBottom: isMobile ? "0.5rem" : "0",
                    }}
                >
                    {formatHour(peakHour)}
                </div>

                <div
                    style={{
                        fontSize: isMobile ? "0.8rem" : "1rem",
                        marginTop: isMobile ? "0" : "0.5rem",
                        marginBottom: isMobile ? "0.75rem" : "0",
                        color: "var(--text-secondary)",
                        fontWeight: "bold",
                        background: "#ECE6FF",
                        display: "inline-block",
                        padding: isMobile ? "0.3rem 0.6rem" : "0.3rem 0.6rem",
                        borderRadius: "8px",
                    }}
                >
                    {chatterType}
                </div>

                <div
                    style={{
                        height: isMobile ? "160px" : "180px",
                        width: isMobile
                            ? "calc(100% + 10px)"
                            : "calc(100% + 20px)",
                        marginTop: isMobile ? "0" : "0.75rem",
                        marginLeft: isMobile ? "-5px" : "-10px",
                        boxSizing: "border-box",
                    }}
                >
                    <Line data={chartData} options={chartOptions} />
                </div>
            </motion.div>

            {/* Bottom Quote Box */}
            <motion.div
                style={{
                    marginTop: isMobile ? "auto" : "auto",
                    marginBottom: "0",
                    background: "var(--secondary)",
                    color: "#000",
                    borderRadius: isMobile ? "10px" : "12px",
                    padding: isMobile ? "0.7rem 0.85rem" : "1rem",
                    textAlign: "center",
                    position: "relative",
                    width: "100%",
                    maxWidth: "400px",
                    boxShadow: isMobile
                        ? "3px 3px 0px #000"
                        : "4px 4px 0px #000",
                    border: "2px solid #000",
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
            >
                <div
                    style={{
                        fontSize: isMobile ? "0.85rem" : "1rem",
                        lineHeight: 1.3,
                        fontWeight: "bold",
                    }}
                >
                    Keeping the chat alive throughout the day! 💬
                </div>
            </motion.div>
        </Slide>
    );
};

export default TimeStatsSlide;
