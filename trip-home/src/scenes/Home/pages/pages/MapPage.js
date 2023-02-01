import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'


function MapPage() {
  const location = useLocation()
  const { type } = location.state
 

  return (
      <>
        <p>{type}</p>

      </>
  );
}

export default MapPage;
