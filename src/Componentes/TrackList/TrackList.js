import './TrackList.css';
import React from 'react';
import Track from '../Track/Track';


export default function TrackList(props) {
  return (
        <div className="TrackList">
            {
                props.tracks.map(i=>{
                    return <Track 
                                track={i}
                                key={i.id}
                                onAdd={props.onAdd}
                                getInfo={props.getInfo}
                                onRemove={props.onRemove}
                                isRemoval={props.isRemoval}
                            />;
                })
            }
        </div>
        );
}