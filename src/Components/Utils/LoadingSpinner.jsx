import React from 'react';
import { css } from '@emotion/react';
import { SyncLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
`;

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="text-white text-center">
        <SyncLoader color="#ffffff" loading={true} css={override} size={10} />
        <p className="mt-2">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
