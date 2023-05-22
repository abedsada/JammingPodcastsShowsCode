import './App.css';
import React,{useState} from 'react';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Info from '../Info/Info';
import Spotify from '../../util/Spotify';

function App() {
  const [searchResults,setSearchResults]=useState([]);
  const [playlistTracks,setPlaylistTracks]=useState([]);
  const [currentShow,setCurrentShow]=useState({});
  const [sw,setSw]=useState(false);

  const search = (text)=>{
    Spotify.search(text).then(i=>{
      setSearchResults(i);
    });
  }

  function onAddf(track){
    setPlaylistTracks(prev=>{
      if(!(prev.find(i=>i.id===track.id))){
        return [...prev,track];
      } else {
        return prev;
      }

    });      
  }

  function onRemovef(track){
    const tracksList = playlistTracks.filter(i=>i.id !== track.id);
    setPlaylistTracks(tracksList);
  }

  function getInfo(show){
    setCurrentShow(show);
    setSw(true);
  }

  function clearInfo(){
    setCurrentShow({});
    setSw(false);
  }

  function savePlaylist(){
    let a = playlistTracks.map(i=>i.id);
    a.join(',')
    Spotify.saveAlbums(a);
    setPlaylistTracks([]);
    alert('Saved!');
  }
  return (
    <div>    
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search}/>
        <div className="App-playlist">
          <SearchResults  searchResults={searchResults} onAdd={onAddf} getInfo={getInfo}/>
          {(!sw) ? <Playlist playlistTracks={playlistTracks}
                    onRemove = {onRemovef}
                    getInfo={getInfo}
                    onSave = {savePlaylist}
          />
           : <Info 
                name={currentShow.name}
                description = {currentShow.description}
                image = {currentShow.image}
                clearInfo={clearInfo}
          />} 
        </div> 
      </div>
    </div>
  );
}

export default App;
