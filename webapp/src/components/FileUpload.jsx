import React, { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/FileUpload.css";

const FileUpload = ({ onFileUpload }) => {
    const [dragActive, setDragActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = (e) => {
                onFileUpload(e.target.result);
            };
            reader.readAsText(file);
        } else {
            alert("Please upload a valid .txt file");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                position: "relative",
                zIndex: 10,
                padding: "1rem",
            }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                style={{
                    background: "#fff",
                    padding: isMobile ? "2rem 1.5rem" : "3rem",
                    borderRadius: isMobile ? "24px" : "32px",
                    border: isMobile ? "3px solid #000" : "4px solid #000",
                    boxShadow: isMobile
                        ? "8px 8px 0px #000"
                        : "12px 12px 0px #000",
                    textAlign: "center",
                    maxWidth: "500px",
                    width: "90%",
                    position: "relative",
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: isMobile
                            ? "clamp(2rem, 10vw, 3rem)"
                            : "3.5rem",
                        fontWeight: "900",
                        lineHeight: "1",
                        marginBottom: "0.5rem",
                        color: "#000",
                        textShadow: isMobile
                            ? "3px 3px 0px #FF0055"
                            : "4px 4px 0px #FF0055",
                    }}
                >
                    YOUR CHAT
                </motion.h1>
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: isMobile
                            ? "clamp(2rem, 10vw, 3rem)"
                            : "3.5rem",
                        fontWeight: "900",
                        lineHeight: "1",
                        marginBottom: isMobile ? "1.5rem" : "2rem",
                        color: "#00F0FF",
                        WebkitTextStroke: isMobile ? "1.5px #000" : "2px #000",
                        textShadow: isMobile
                            ? "3px 3px 0px #000"
                            : "4px 4px 0px #000",
                    }}
                >
                    WRAPPED
                </motion.h1>

                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    style={{
                        border: isMobile
                            ? "2px dashed #000"
                            : "3px dashed #000",
                        backgroundColor: dragActive ? "#E6FFFF" : "#fff",
                        borderRadius: isMobile ? "16px" : "20px",
                        padding: isMobile ? "1.5rem" : "2rem",
                        marginBottom: isMobile ? "1.5rem" : "2rem",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            fontSize: isMobile ? "2.5rem" : "3rem",
                            marginBottom: "1rem",
                        }}
                    >
                        📂
                    </div>
                    <p
                        style={{
                            fontSize: isMobile ? "1rem" : "1.1rem",
                            fontWeight: "bold",
                            color: "#000",
                            marginBottom: "0",
                        }}
                    >
                        {isMobile
                            ? "Tap to select your chat file"
                            : "Drag & drop your chat .txt file"}
                    </p>
                </div>

                {!isMobile && (
                    <div
                        className="divider"
                        style={{
                            fontWeight: "900",
                            margin: "1.5rem 0",
                            opacity: 0.5,
                        }}
                    >
                        OR
                    </div>
                )}

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: isMobile ? "1rem" : "1.5rem",
                    }}
                >
                    <input
                        type="file"
                        id="file-upload"
                        accept=".txt"
                        onChange={handleChange}
                        hidden
                    />
                    {!isMobile && (
                        <motion.label
                            htmlFor="file-upload"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "6px 6px 0px #000",
                            }}
                            whileTap={{
                                scale: 0.95,
                                boxShadow: "2px 2px 0px #000",
                            }}
                            style={{
                                display: "flex",
                                background: "#FF0055",
                                color: "#fff",
                                fontSize: "1.2rem",
                                fontWeight: "900",
                                padding: "1rem 2.5rem",
                                borderRadius: "50px",
                                border: "3px solid #000",
                                boxShadow: "4px 4px 0px #000",
                                cursor: "pointer",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                minHeight: "48px",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            Select File
                        </motion.label>
                    )}

                    <p
                        style={{
                            margin: 0,
                            fontSize: isMobile ? "0.75rem" : "0.8rem",
                            fontWeight: "bold",
                            background: "#FFD700",
                            display: "inline-block",
                            padding: isMobile
                                ? "0.5rem 1rem"
                                : "0.25rem 0.75rem",
                            borderRadius: "8px",
                            border: "2px solid #000",
                            boxShadow: "3px 3px 0px rgba(0,0,0,0.2)",
                            textAlign: "center",
                        }}
                    >
                        🔒 Private & Secure: Processed on device
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default FileUpload;
