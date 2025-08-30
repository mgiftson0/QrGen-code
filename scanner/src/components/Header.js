import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  color: white;
  padding: 0.8rem 2rem;
  box-shadow: ${props => props.theme.shadows.medium};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Subtitle = styled.span`
  opacity: 0.85;
  font-size: 0.9rem;
  font-weight: 400;
  margin-left: 0.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
  
  @media (max-width: 480px) {
    span {
      display: none;
    }
    padding: 0.5rem;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <IconWrapper>
          <i className="fas fa-qrcode"></i>
        </IconWrapper>
        <Title>
          QRGen
          <Subtitle>Instant QR Code Generator</Subtitle>
        </Title>
      </LogoContainer>
      
      <NavItems>
        <NavButton>
          <i className="fas fa-history"></i>
          <span>History</span>
        </NavButton>
        <NavButton>
          <i className="fas fa-download"></i>
          <span>Export</span>
        </NavButton>
        <NavButton>
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </NavButton>
      </NavItems>
    </HeaderContainer>
  );
};

export default Header;