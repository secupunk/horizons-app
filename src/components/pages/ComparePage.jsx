import React from 'react';

// Utilisation d'un export simple et d'un style inline pour forcer le rendu
const ComparePage = () => {
  return (
    <div style={{ 
      height: '100vh', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'red', // Fond rouge pour qu'on ne puisse pas le rater
      color: 'white',
      fontSize: '30px',
      fontWeight: 'bold',
      zIndex: 9999,
      position: 'relative'
    }}>
      L'IMPORT FONCTIONNE ENFIN !
    </div>
  );
};

export default ComparePage;
