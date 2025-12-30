
import React, { useState, useEffect } from 'react';
import { parseWhatsAppChat } from './utils/parser';
import { calculateStats } from './utils/stats';
import FileUpload from './components/common/FileUpload';
import WrappedContainer from './components/layout/WrappedContainer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [file, setFile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileProcess = async (fileObj) => {
    setLoading(true);
    setError(null);
    try {
      const text = await fileObj.text();
      const messages = parseWhatsAppChat(text);
      if (messages.length === 0) {
        throw new Error("No messages found. Please check the file format.");
      }
      const computedStats = calculateStats(messages);
      setStats(computedStats);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to process file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {!stats ? (
          <motion.div 
            key="upload"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, y: -50 }}
            className="full-screen"
          >
            <FileUpload 
              onFileSelect={handleFileProcess} 
              loading={loading} 
              error={error} 
            />
          </motion.div>
        ) : (
          <motion.div 
            key="wrapped"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            className="full-screen"
          >
            <WrappedContainer stats={stats} onReset={() => setStats(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
