import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  height: 100vh;
`;

const Title = styled.h1`
  color: #833;
  margin-bottom: 1.2rem;
  font-family: 'Gil-Sans'; 
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultContainer = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  margin-top: 1rem;
  text-align: center;
  /* Add dynamic background color based on status */
  // background-color: ${props => props.success ? '#d4edda' : '#f8d7da'};
`;

const StatusCode = styled.p`
  color: ${props => props.success ? '#155724' : '#721c24'};
  font-weight: bold;
`;

const QRCode = styled.img`
  margin-top: 1rem;
  width: 200px;
  height: 200px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    setResult(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Title>url scanner</Title>
      <Input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <Button onClick={handleScan}>Scan</Button>
      {result && (
        <ResultContainer success={result.status_code === 200}>
          <StatusCode success={result.status_code === 200}>
             {/* Return status code */}
            Status Code: {result.status_code}
          </StatusCode>
          {/* Return the QR Code */}
          <QRCode src={result.qr_code_url} alt="QR Code" />
        </ResultContainer>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

export default App;
