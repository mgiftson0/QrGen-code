import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import UrlInput from '../components/UrlInput';
import ResultDisplay from '../components/ResultDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import HistoryPanel from '../components/HistoryPanel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  padding: 1.2rem;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1.2rem;
  }
`;

const ScannerSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Sidebar = styled.div`
  flex: 1;
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  padding: 1.4rem;
  box-shadow: ${props => props.theme.shadows.medium};
  max-height: calc(100vh - 120px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    max-height: none;
    padding: 1.2rem;
  }
`;

function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);

  const handleScan = async () => {
    setResult(null);
    setError(null);
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    
    try {
      // Updated to\\ use your Render backend URL
      const response = await fetch('https://qrgen-code-729b.onrender.com/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      // Handle connection errors
      if (response.status >= 500) {
        throw new Error('Server is not responding. Please try again later.');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while generating the QR code');
      }
      
      // Backend returns only qr_code_url, so we need to create our result object
      const newResult = { 
        qr_code_url: data.qr_code_url,
        url, 
        timestamp: new Date().toLocaleString(),
        id: Date.now()
      };
      
      setResult(newResult);
      setScanHistory(prev => [newResult, ...prev.slice(0, 9)]); // Keep last 10 scans
    } catch (error) {
      setError(error.message || 'Failed to connect to the server. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setScanHistory([]);
  };

  const handleHistoryItemClick = (item) => {
    setUrl(item.url);
    setResult(item);
  };

  return (
    <Container>
      <Header />
      <MainContent>
        <ScannerSection>
          <UrlInput 
            url={url}
            setUrl={setUrl}
            onScan={handleScan}
            isLoading={isLoading}
          />
          
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <ResultDisplay type="error" message={error} />
          )}
          
          {result && (
            <ResultDisplay 
              type="success" 
              result={result} 
            />
          )}
        </ScannerSection>
        
        <Sidebar>
          <HistoryPanel 
            scans={scanHistory}
            onClear={handleClearHistory}
            onItemClick={handleHistoryItemClick}
          />
        </Sidebar>
      </MainContent>
    </Container>
  );
}

export default Home;