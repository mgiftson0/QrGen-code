import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const ClearButton = styled.button`
  background: ${props => props.theme.colors.error};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s;

  &:hover {
    background: ${props => props.theme.colors.errorDark};
  }
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.inputBackground};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
`;

const HistoryItem = styled.li`
  padding: 0.9rem;
  border-radius: 10px;
  margin-bottom: 0.7rem;
  background: ${props => props.theme.colors.inputBackground};
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    background: ${props => props.theme.colors.primary + '30'};
    transform: translateX(4px);
  }
`;

const HistoryUrl = styled.p`
  margin: 0;
  font-size: 0.85rem;
  word-break: break-all;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  line-height: 1.4;
`;

const HistoryTime = styled.p`
  margin: 0.3rem 0 0 0;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 0;
  color: ${props => props.theme.colors.textSecondary};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyIcon = styled.div`
  font-size: 2.2rem;
  margin-bottom: 0.8rem;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 0.95rem;
`;

const HistoryPanel = ({ scans, onClear, onItemClick }) => {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          <i className="fas fa-history"></i>
          Recent Scans
        </PanelTitle>
        {scans.length > 0 && (
          <ClearButton onClick={onClear}>
            <i className="fas fa-trash"></i> Clear
          </ClearButton>
        )}
      </PanelHeader>

      {scans.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <i className="fas fa-inbox"></i>
          </EmptyIcon>
          <EmptyText>No scan history yet</EmptyText>
        </EmptyState>
      ) : (
        <HistoryList>
          {scans.map(scan => (
            <HistoryItem key={scan.id} onClick={() => onItemClick(scan)}>
              <HistoryUrl>{scan.url}</HistoryUrl>
              <HistoryTime>{scan.timestamp}</HistoryTime>
            </HistoryItem>
          ))}
        </HistoryList>
      )}
    </Panel>
  );
};

export default HistoryPanel;