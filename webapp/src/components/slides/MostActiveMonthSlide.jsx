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

const MostActiveMonthSlide = ({ active, onNext, stats }) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const monthShortNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Find peak month
    const peakMonthIndex = stats.monthlyActivity.indexOf(
        Math.max(...stats.monthlyActivity),
    );
    const peakMonth = monthNames[peakMonthIndex];
    const peakCount = stats.monthlyActivity[peakMonthIndex];

    // Fun messages based on the month
    const monthMessages = {
        0: "New year, new conversations! 🎊",
        1: "February was full of love... and messages! 💖",
        2: "March madness in the chat! 🌸",
        3: "April showers brought message flowers! 🌧️",
        4: "May the chats be with you! 🌻",
        5: "June vibes were immaculate! ☀️",
        6: "July was on fire with conversations! 🔥",
        7: "August heat brought hot takes! 🌞",
        8: "September had you both talking non-stop! 🍂",
        9: "October chats were spooktacular! 🎃",
        10: "November gratitude for all the convos! 🦃",
        11: "December magic filled the chat! ✨",
    };

    const chartData = {
        labels: monthShortNames,
        datasets: [
            {
                label: "Messages",
                data: stats.monthlyActivity,
                backgroundColor: stats.monthlyActivity.map((_, i) =>
                    i === peakMonthIndex ? "#FFD700" : "rgba(255, 0, 85, 0.2)",
                ),
                borderColor: stats.monthlyActivity.map((_, i) =>
                    i === peakMonthIndex ? "#FFD700" : "rgba(255, 0, 85, 0.5)",
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
                    font: { size: 10, weight: "bold", family: "Outfit" },
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
                        fontSize: "1rem",
                        color: "var(--primary)",
                        fontWeight: "900",
                        marginBottom: "1.5rem",
                        background: "#FFE6EF",
                        display: "inline-block",
                        padding: "0.5rem 1rem",
                        borderRadius: "12px",
                        transform: "rotate(2deg)",
                    }}
                >
                    Peak Month
                </h3>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    <div
                        style={{
                            fontSize: "3.5rem",
                            fontWeight: "900",
                            color: "var(--purple)",
                            lineHeight: 1,
                            marginBottom: "0.5rem",
                            fontFamily: "var(--font-display)",
                            textShadow: "3px 3px 0px rgba(0,0,0,0.1)",
                        }}
                    >
                        {peakMonth}
                    </div>
                    <div
                        style={{
                            fontSize: "1.5rem",
                            color: "var(--text-secondary)",
                            marginBottom: "1rem",
                            fontWeight: "bold",
                        }}
                    >
                        {peakCount.toLocaleString()} messages
                    </div>
                </motion.div>

                <div
                    style={{
                        height: "250px",
                        width: "100%",
                        marginTop: "2rem",
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
                    background: "var(--accent)",
                    color: "#000",
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
                    {monthMessages[peakMonthIndex]}
                </div>
            </motion.div>
        </Slide>
    );
};

export default MostActiveMonthSlide;
