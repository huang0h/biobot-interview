import React, {useState} from 'react';
import SearchBar from './components/searchBar';
import './App.css';

function App() {

  const [data, setData] = useState();
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div id="searchbox">
      <SearchBar setData={setData} setIsSearching={setIsSearching} />
      {isSearching ? <p>Loading...</p> : <></>}
    </div>
  )
}

export default App
