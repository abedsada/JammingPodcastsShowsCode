import './Track.css';
import React from 'react';

export default function Track(props) {

  function addTrack(){
    props.onAdd(props.track);
  }
  function getInfo(){
    props.getInfo(props.track);
  }

  function removeTrack(){
    props.onRemove(props.track);
  }

  function renderAction(){
    let buttoninfo = (<div>
                          <button className="Track-action" onClick={addTrack}> + </button>
                      </div>);
    if(props.isRemoval){
      buttoninfo = (<button className="Track-action" onClick={removeTrack}> - </button>);
    }
    return buttoninfo;
  }

  return (
    <div className="Track">
        <div className="Track-information">
          <h3 onClick={getInfo}>{props.track.name}</h3>
          <p>{props.track.publisher} | {props.track.languages}</p>
        </div>
          {renderAction()}        
    </div>
    );

}