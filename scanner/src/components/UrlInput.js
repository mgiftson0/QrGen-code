import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  padding: 1.8rem;
  border-radius: 14px;
  box-shadow: ${props => props.theme.shadows.medium};
  width: 100%;
  max-width: 700px;
  margin-bottom: 1.8rem;
  
  @media (max-width: 768px) {
    padding: 1.4rem;
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 1.4rem;
  color: ${props => props.theme.colors.text};
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.9rem 1.1rem;
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  padding: 0.9rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 480px) {
    justify-content: center;
    padding: 0.9rem;
  }
`;

const HintText = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const UrlInput = ({ url, setUrl, onScan, isLoading }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      onScan();
    }
  };

  return (
    <InputContainer>
      <Title>
        <i className="fas fa-link"></i>
        Enter URL to Convert
      </Title>
      <InputGroup>
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="https://example.com"
          disabled={isLoading}
        />
        <Button onClick={onScan} disabled={isLoading}>
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Processing...
            </>
          ) : (
            <>
              <i className="fas fa-qrcode"></i>
              Generate QR
            </>
          )}
        </Button>
      </InputGroup>
      <HintText>Press Enter or click the button to generate your QR code</HintText>
    </InputContainer>
  );
};

export default UrlInput;