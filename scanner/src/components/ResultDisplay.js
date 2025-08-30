import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  background: ${props => 
    props.type === 'error' 
      ? props.theme.colors.errorBackground 
      : props.theme.colors.cardBackground};
  border-left: 4px solid ${props => 
    props.type === 'error' 
      ? props.theme.colors.error 
      : props.theme.colors.success};
  border-radius: 12px;
  padding: 1.6rem;
  width: 100%;
  max-width: 700px;
  margin-top: 1rem;
  box-shadow: ${props => props.theme.shadows.small};
`;

const Title = styled.h2`
  color: ${props => 
    props.type === 'error' 
      ? props.theme.colors.error 
      : props.theme.colors.success};
  margin-top: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const UrlText = styled.p`
  word-break: break-all;
  background: ${props => props.theme.colors.inputBackground};
  padding: 0.9rem;
  border-radius: 8px;
  font-family: monospace;
  margin: 1.2rem 0;
  border: 1px solid ${props => props.theme.colors.border};
  font-size: 0.9rem;
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.4rem 0;
  padding: 1.4rem;
  background: ${props => props.theme.colors.inputBackground};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const QRCode = styled.img`
  width: 180px;
  height: 180px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: white;
  padding: 0.5rem;
  
  @media (max-width: 480px) {
    width: 160px;
    height: 160px;
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.3rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 1.1rem;
  transition: all 0.3s;
  font-weight: 500;
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    transform: translateY(-2px);
  }
`;

const Timestamp = styled.p`
  margin: 1rem 0 0 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.85rem;
  text-align: center;
`;

const ResultDisplay = ({ type, message, result }) => {
  if (type === 'error') {
    return (
      <ResultContainer type={type}>
        <Title type={type}>
          <i className="fas fa-exclamation-circle"></i>
          Error
        </Title>
        <p>{message}</p>
      </ResultContainer>
    );
  }

  return (
    <ResultContainer type={type}>
      <Title type={type}>
        <i className="fas fa-check-circle"></i>
        QR Code Generated!
      </Title>
      
      <UrlText>{result.url}</UrlText>
      
      {result.qr_code_url && (
        <QRCodeContainer>
          <QRCode src={result.qr_code_url} alt="QR Code" />
          <div>
            <DownloadButton 
              href={result.qr_code_url} 
              download={`qrcode-${result.id}.png`}
            >
              <i className="fas fa-download"></i> Download QR Code
            </DownloadButton>
          </div>
        </QRCodeContainer>
      )}
      
      <Timestamp>Generated on: {result.timestamp}</Timestamp>
    </ResultContainer>
  );
};

export default ResultDisplay;