import React, { useState, useEffect } from 'react';

interface RevenueStream {
  name: string;
  amount: number;
  status: 'active' | 'pending' | 'error';
  fallback?: () => Promise<number>;
}

export function RevenueFallback() {
  const [streams, setStreams] = useState<RevenueStream[]>([
    { name: 'NFT Porting', amount: 320, status: 'active' },
    { name: 'Battle Commissions', amount: 180, status: 'active' },
    { name: 'Fiverr Gigs', amount: 200, status: 'active' },
    { name: 'Emergency NFT Sale', amount: 150, status: 'pending' }
  ]);

  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const total = streams.reduce((sum, stream) => 
      stream.status === 'active' ? sum + stream.amount : sum, 0
    );
    setTotalRevenue(total);
  }, [streams]);

  const activateEmergencyRevenue = async () => {
    try {
      // Simulate emergency revenue activation
      setStreams(prev => prev.map(stream => 
        stream.name === 'Emergency NFT Sale' 
          ? { ...stream, status: 'active' as const }
          : stream
      ));
    } catch (error) {
      console.error('Emergency revenue activation failed:', error);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      padding: '1.5rem',
      borderRadius: '10px',
      color: 'white',
      margin: '1rem 0'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#FFD700' }}>
        💰 Revenue Dashboard
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        {streams.map((stream, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{stream.name}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFD700' }}>
              ${stream.amount}
            </div>
            <div style={{ fontSize: '0.8rem' }}>
              {stream.status === 'active' ? '✅ Active' : 
               stream.status === 'pending' ? '⏳ Pending' : '❌ Error'}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        textAlign: 'center', 
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        paddingTop: '1rem'
      }}>
        <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Total Daily Revenue: <span style={{ color: '#FFD700', fontWeight: 'bold' }}>
            ${totalRevenue}
          </span>
        </div>
        
        {streams.some(s => s.status === 'pending') && (
          <button
            onClick={activateEmergencyRevenue}
            style={{
              background: '#FFD700',
              color: '#1e3c72',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🚨 Activate Emergency Revenue
          </button>
        )}
      </div>
    </div>
  );
}