import React from 'react';

const SVTech = () => {

  const handleLogout = () => {
    fetch(`${import.meta.env.VITE_SV_TECH_API}/users/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    
  }
  return (
    <div className='sv-tech-container'>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default SVTech;
