import './Playlist.css';
import React from 'react';
import TrackList from '../TrackList/TrackList';


function Playlist(props) {
  return (
    <div className="Playlist">
      <h2>Added Shows/Podcast</h2>
      <TrackList  tracks={props.playlistTracks}
                    onRemove={props.onRemove}
                    getInfo={props.getInfo}
                    isRemoval={true}/>
      <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
