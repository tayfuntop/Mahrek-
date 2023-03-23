import React from 'react';

const Error = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-black'>
      <div>
        <h1 className='text-9xl text-red-500'>404</h1>
        <h2 className='text-6xl text-white'>Page Not Found</h2>
      </div>
    </div>
  );
};

export default Error;