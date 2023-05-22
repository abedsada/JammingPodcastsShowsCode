import React,{useState} from 'react';
import './SearchBar.css';

export default function SearchBar(props) {
  const [term,setTerm]=useState('');
  
  function handleTermChange(e){
    setTerm(e.target.value);
  }
  
  function searchHandler(){
    props.onSearch(term);
    setTerm('');
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Show or Poadcast" onChange={handleTermChange} value={term}/>
      <button className="SearchButton" onClick={searchHandler}>SEARCH</button>
    </div>
  );
}
