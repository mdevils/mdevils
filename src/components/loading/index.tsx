import styled, {keyframes} from 'styled-components';
import * as React from 'react';

const pointAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(32px);
  }
  25% {
    opacity: 1;
    transform: translateX(0px);
  }
  75% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(-32px);
  }
`;

const LoadingPoint = styled.div`
  display: inline-block;
  animation: ${pointAnimation} 2s linear 0s infinite;
  & + & {
    margin-left: 10px;
  }
  &:nth-child(2n) {
    animation: ${pointAnimation} 2s linear -0.5s infinite;
  }
  
  width: 22px;
  height: 5px;
  background: #777;
`;

export function Loading() {
  return (
    <div>
      <LoadingPoint />
      <LoadingPoint />
      <LoadingPoint />
      <LoadingPoint />
      <LoadingPoint />
    </div>
  );
}
