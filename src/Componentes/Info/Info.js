import './Info.css';
import React from 'react';


function Info(props) {
  return (
    <div className="Infolist">
      <h2>Show Info</h2>
      <h3>{props.name}</h3>
      <div className='showDetails'>
        <div className='imgContainer'>
          <img src={props.image['url']} alt={props.name}/>
        </div>  
        <p>{props.description}</p>
        
      </div>
      <button onClick={props.clearInfo}> {'Back'} </button>  
    </div>
  );
}

export default Info;
