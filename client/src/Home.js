import React from 'react';
import { useParams } from 'react-router-dom';
import RegisterButton from './components/RegisterButton';

const Home = () => {
  const { status } = useParams();
  console.log(status);

  return (
    <div>
      <h1>MyCoolStore</h1>
      <RegisterButton />
    </div>
  );
};

export default Home;
