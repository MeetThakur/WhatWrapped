import React from "react";
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
                borderWidth: 4,
                tension: 0.4, // Curved lines
                pointRadius: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
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
                    maxTicksLimit: 6,
                    font: { size: 10, weight: 'bold', family: 'Outfit' },
                },
            },
            y: {
                display: false,
                grid: { display: false },
                min: 0,
            },
        },
        animation: {
            duration: 2000,
            easing: "easeOutQuart",
        },
        layout: {
            padding: { left: 10, right: 10, bottom: 0 },
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
                        marginBottom: "1rem",
                        background: '#FFE6EF',
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        borderRadius: '12px'
                    }}
                >
                    Peak Chat Time
                </h3>

                <h1
                    style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        marginTop: "1.5rem",
                        marginBottom: "0.5rem",
                        lineHeight: 1.2,
                        color: "#000"
                    }}
                >
                    Most active at
                </h1>
                <div
                    style={{
                        fontSize: "clamp(3rem, 10vw, 4.5rem)",
                        fontWeight: "900",
                        color: "var(--purple)",
                        textShadow: "3px 3px 0px rgba(0,0,0,0.1)",
                        lineHeight: 1,
                    }}
                >
                    {formatHour(peakHour)}
                </div>

                <div
                    style={{
                        fontSize: "1.2rem",
                        marginTop: "1rem",
                        color: "var(--text-secondary)",
                        fontWeight: "bold",
                        background: "#ECE6FF",
                        display: "inline-block",
                        padding: "0.2rem 0.8rem",
                        borderRadius: "8px"
                    }}
                >
                    {chatterType}
                </div>

                <div
                    style={{
                        height: "220px",
                        width: "100%",
                        marginTop: "2rem",
                        padding: "0 1rem",
                        boxSizing: "border-box"
                    }}
                >
                    <Line data={chartData} options={chartOptions} />
                </div>
            </motion.div>

            {/* Bottom Quote Box */}
            <motion.div
                style={{
                    marginTop: "auto",
                    marginBottom: "1.5rem",
                    background: "var(--secondary)",
                    color: "#000",
                    borderRadius: "16px",
                    padding: "1.25rem",
                    textAlign: "center",
                    position: "relative",
                    width: "100%",
                    maxWidth: "400px",
                    boxShadow: "5px 5px 0px #000",
                    border: "2px solid #000"
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
            >
                <div style={{ fontSize: "1.2rem", lineHeight: 1.4, fontWeight: "bold" }}>
                    Keeping the chat alive throughout the day! 💬
                </div>
            </motion.div>
        </Slide>
    );
};

export default TimeStatsSlide;
