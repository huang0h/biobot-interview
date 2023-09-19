import {useState} from 'react';
import SearchBar from './components/searchBar';
import ResultBox from './components/resultBox';
import './App.css';

function App() {

  const [data, setData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div id="search-box">
      <SearchBar setData={setData} setIsSearching={setIsSearching} />
      {isSearching ? <p>Loading...</p> : <ResultBox data={data} />}
    </div>
  )
}

export default App
