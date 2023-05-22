import './SearchResults.css';
import React from 'react';
import TrackList from '../TrackList/TrackList';


function SearchResults(props) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={props.searchResults} 
                  onAdd={props.onAdd}
                  getInfo={props.getInfo}
                  isRemoval={false}
      />
    </div>
  );
}

export default SearchResults;
