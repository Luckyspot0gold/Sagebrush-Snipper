import React from 'react';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
        WyoVerse Ecosystem
      </h1>
      <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px' }}>
        Wyoming-themed crypto gaming ecosystem with AI integration
      </p>
    </div>
  );
}