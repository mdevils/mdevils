import {default as React, useCallback, useState} from 'react';
import styled from 'styled-components';
import {Modal} from '../../../components/modal';

const portrait = '/photo-20191027.jpg';

const PhotoImg = styled.img`
  max-width: 100%;
  display: block;
`;

const PhotoWrapper = styled.div`
  cursor: pointer;
`;

const getPhotoImg = () => (
  <PhotoImg src={portrait} alt={'Marat Dulin\'s photo'} />
);

export function Photo() {
  const [isModalOpened, setModalOpened] = useState(false);
  const close = useCallback(() => {
    setModalOpened(false);
  }, []);
  const open = useCallback(() => {
    setModalOpened(true);
  }, []);

  return (
    <>
      {isModalOpened && (
        <Modal onClose={close}>
          {getPhotoImg()}
        </Modal>
      )}
      <PhotoWrapper onClick={open}>
        {getPhotoImg()}
      </PhotoWrapper>
    </>
  );
}
