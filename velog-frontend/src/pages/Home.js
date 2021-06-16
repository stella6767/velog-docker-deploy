import React, { useEffect } from 'react';
import { useState } from 'react';
import AppLayout from '../components/AppLayout';

const Home = () => {
  const [isHome, setIshome] = useState(true);

  return (
    <>
      <AppLayout isHome={isHome}></AppLayout>
    </>
  );
};

export default Home;
