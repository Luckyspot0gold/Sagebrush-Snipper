import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('🚨 WyoVerse Error Caught:', error, errorInfo);
    
    // Log to Wyoming error tracking
    if (typeof window !== 'undefined') {
      window.gtag?.('event', 'exception', {
        description: error.message,
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
          borderRadius: '15px',
          color: 'white',
          margin: '2rem'
        }}>
          <h2>🤠 Well, partner, something went sideways!</h2>
          <p>Don't worry - the frontier's got bumps. Let's get you back on track.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              background: '#FFD700',
              color: '#8B4513',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔄 Reload the Ranch
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}