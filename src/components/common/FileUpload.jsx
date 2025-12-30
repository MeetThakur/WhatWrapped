
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle } from 'lucide-react';

const FileUpload = ({ onFileSelect, loading, error }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      onFileSelect(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  return (
    <div 
      className="center-all" 
      style={{ height: '100vh', padding: '2rem' }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="upload-card center-all"
        style={{ maxWidth: '500px' }}
      >
        <div className="icon-wrapper floating" style={{ marginBottom: '2rem' }}>
          <div style={{ 
            width: '80px', height: '80px', 
            borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent-color)'
          }}>
            <Upload size={40} />
          </div>
        </div>

        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          WhatsApp Wrapped
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Drag & drop your chat export (.txt) here to reveal your story.
        </p>

        <label className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          {loading ? 'Processing...' : 'Select File'}
          <input 
            type="file" 
            accept=".txt" 
            onChange={handleChange} 
            style={{ display: 'none' }} 
            disabled={loading}
          />
          {!loading && <FileText size={20} />}
        </label>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              marginTop: '2rem', 
              color: '#ef4444', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '8px'
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </motion.div>
        )}

        <div style={{ marginTop: '4rem', fontSize: '0.9rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
          <p>Privacy First: Processing happens entirely on your device.</p>
          <p>No data is uploaded to any server.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FileUpload;
