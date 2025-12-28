import React from "react";
import Slide from "../Slide";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const MostActiveDaySlide = ({ active, onNext, stats }) => {
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const dayShortNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Find peak day
    const peakDayIndex = stats.weeklyActivity.indexOf(
        Math.max(...stats.weeklyActivity),
    );
    const peakDay = dayNames[peakDayIndex];
    const peakCount = stats.weeklyActivity[peakDayIndex];

    // Fun messages based on the day
    const dayMessages = {
        0: "Sundays are for chatting! 🌞",
        1: "Monday blues? More like Monday chats! 💙",
        2: "Tuesday talks hit different! 🗣️",
        3: "Midweek vibes were strong! 💪",
        4: "Thursday thoughts were flowing! 💭",
        5: "TGIF... Time to chat! 🎉",
        6: "Saturday sessions were lit! 🔥",
    };

    const chartData = {
        labels: dayShortNames,
        datasets: [
            {
                label: "Messages",
                data: stats.weeklyActivity,
                backgroundColor: stats.weeklyActivity.map((_, i) =>
                    i === peakDayIndex ? "#FF0055" : "rgba(112, 0, 255, 0.2)",
                ),
                borderColor: stats.weeklyActivity.map((_, i) =>
                    i === peakDayIndex ? "#FF0055" : "rgba(112, 0, 255, 0.5)",
                ),
                borderWidth: 3,
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#000",
                titleColor: "#fff",
                bodyColor: "#fff",
                displayColors: false,
                padding: 10,
                callbacks: {
                    label: (context) => `${context.parsed.y} messages`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: "#000",
                    font: { size: 12, weight: "bold", family: "Outfit" },
                },
            },
            y: {
                display: false,
                grid: { display: false },
                min: 0,
            },
        },
        animation: {
            duration: 1500,
            easing: "easeOutElastic",
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
                        fontSize: "0.85rem",
                        color: "var(--purple)",
                        fontWeight: "900",
                        marginBottom: "0.75rem",
                        background: "#ECE6FF",
                        display: "inline-block",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "10px",
                        transform: "rotate(-2deg)",
                    }}
                >
                    Most Active Day
                </h3>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    <div
                        style={{
                            fontSize: "3rem",
                            fontWeight: "900",
                            color: "var(--primary)",
                            lineHeight: 1,
                            marginBottom: "0.25rem",
                            fontFamily: "var(--font-display)",
                            textShadow: "3px 3px 0px rgba(0,0,0,0.1)",
                        }}
                    >
                        {peakDay}
                    </div>
                    <div
                        style={{
                            fontSize: "1.2rem",
                            color: "var(--text-secondary)",
                            marginBottom: "0.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        {peakCount.toLocaleString()} messages
                    </div>
                </motion.div>

                <div
                    style={{
                        height: "180px",
                        width: "100%",
                        marginTop: "0.75rem",
                        padding: "0 0.5rem",
                        boxSizing: "border-box",
                    }}
                >
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </motion.div>

            {/* Bottom Quote Box */}
            <motion.div
                style={{
                    marginTop: "auto",
                    marginBottom: "0",
                    background: "#FF0055",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "0.75rem",
                    textAlign: "center",
                    position: "relative",
                    width: "100%",
                    boxShadow: "4px 4px 0px #000",
                    border: "2px solid #000",
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
            >
                <div style={{ fontSize: "0.95rem", fontWeight: "bold" }}>
                    {dayMessages[peakDayIndex]}
                </div>
            </motion.div>
        </Slide>
    );
};

export default MostActiveDaySlide;
