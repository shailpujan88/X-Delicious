import React from 'react';
import Home from './Home';
import Cuisines from './Cuisine';
import { Route, Routes} from 'react-router-dom';

function Pages() {
  return (
   
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cuisine/:type' element={<Cuisines />} />
    </Routes>
   
  );
}

export default Pages

