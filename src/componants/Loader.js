import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

function Loader({ show }) {
  if (show) {
    return (
      <div style={{textAlign:'center', alignItems:'center'}} className='loading'>
        <p> <ClipLoader/> </p>
      </div>
    );
  }
  
  return null; // Explicitly return null when show is false
}

export default Loader;
