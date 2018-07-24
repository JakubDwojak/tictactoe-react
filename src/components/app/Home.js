import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => (
    <div>
      <h2>Welcome to TIC TAC TOE!</h2>
      <Link className="btn btn-success start" to="/game">Play TIC TAC TOE</Link>
    </div>
);

export default Home;
