import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/FileUpload.css';

const FileUpload = ({ onFileUpload }) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
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
        if (file.type === 'text/plain') {
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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100dvh',
            width: '100vw',
            position: 'relative',
            zIndex: 10
        }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                style={{
                    background: '#fff',
                    padding: 'clamp(1rem, 5vw, 3rem)',
                    borderRadius: '32px',
                    border: '4px solid #000',
                    boxShadow: '12px 12px 0px #000',
                    textAlign: 'center',
                    maxWidth: '500px',
                    width: '90%',
                    position: 'relative'
                }}
            >
                {/* Decoration Sticker */}
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: '-30px',
                        right: '-20px',
                        fontSize: '4rem',
                        filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.5))'
                    }}
                >
                    🎁
                </motion.div>

                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 8vw, 3rem)',
                        fontWeight: '900',
                        lineHeight: '1.1',
                        marginBottom: '0.25rem',
                        color: '#000',
                        textShadow: '2px 2px 0px #FF0055'
                    }}
                >
                    YOUR CHAT
                </motion.h1>
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.8rem, 10vw, 3rem)',
                        fontWeight: '900',
                        lineHeight: '1.1',
                        marginBottom: '0.75rem',
                        color: '#00F0FF',
                        WebkitTextStroke: '1.5px #000',
                        textShadow: '2px 2px 0px #000'
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
                        border: '3px dashed #000',
                        backgroundColor: dragActive ? '#E6FFFF' : '#fff',
                        borderRadius: '20px',
                        padding: 'clamp(0.5rem, 3vw, 1.5rem)',
                        marginBottom: '0.75rem',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', marginBottom: '0.25rem' }}>📂</div>
                    <p style={{
                        fontSize: 'clamp(0.8rem, 3vw, 1rem)',
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '0'
                    }}>
                        Drag & drop your chat .txt file
                    </p>
                </div>

                <div className="divider" style={{
                    fontWeight: '900',
                    margin: '0.5rem 0',
                    opacity: 0.5
                }}>OR</div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                        type="file"
                        id="file-upload"
                        accept=".txt"
                        onChange={handleChange}
                        hidden
                    />
                    <motion.label
                        htmlFor="file-upload"
                        whileHover={{ scale: 1.05, boxShadow: '6px 6px 0px #000' }}
                        whileTap={{ scale: 0.95, boxShadow: '2px 2px 0px #000' }}
                        style={{
                            display: 'inline-block',
                            background: '#FF0055',
                            color: '#fff',
                            fontSize: '1rem',
                            fontWeight: '900',
                            padding: '0.6rem 1.5rem',
                            borderRadius: '50px',
                            border: '3px solid #000',
                            boxShadow: '4px 4px 0px #000',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        Select File
                    </motion.label>

                    <p style={{
                        margin: 0,
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        background: '#FFD700',
                        display: 'inline-block',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        border: '2px solid #000',
                        boxShadow: '2px 2px 0px rgba(0,0,0,0.2)'
                    }}>
                        🔒 Private & Secure: Processed on device
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default FileUpload;
