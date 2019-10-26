import {useEffect} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import * as React from 'react';

const ModalBodyStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.3);
  padding: 20px;
  overflow-y: auto;
  z-index: 10;
`;

const ModalActions = styled.div`
  position: relative;
`;

const ModalClose = styled.div`
  ::before {
    content: '';
    opacity: 0.7;
    background: radial-gradient(closest-side at center, rgba(0,0,0,0.8), rgba(0,0,0,0));
    transition: opacity 0.15s linear;    
  }
  ::after {
    content: '✖';
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  ::before, ::after {
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    right: 0;
  }
  &:hover::before {
    opacity: 1;
  }
`;

export function Modal({
  children,
  onClose
}: {
  children: React.ReactNode,
  onClose: () => void
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <ModalWrapper>
      <ModalBodyStyle />
      <ModalActions>
        <ModalClose title={'Close modal'} onClick={onClose} />
      </ModalActions>
      {children}
    </ModalWrapper>
  );
}
