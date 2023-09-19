import { useState, useCallback, useEffect } from 'react'
import wretch from 'wretch'
import { debounce } from 'lodash';

function SearchBar({ setData, setIsSearching }) {
  // labels to use as a base pool of autofill options
  const [allLabels, setAllLabels] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchError, setSearchError] = useState(null);
  const [isSearchSelected, setIsSearchSelected] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);

  // fetch all labels once on component mount
  useEffect(() => {
    wretch('http://localhost:4000/kits/labels')
      .get()
      .json(data => {
        setAllLabels(data.labels);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const onSearch = useCallback(() => {
    setIsSearching(true);

    wretch(`http://localhost:4000/kits/search/${searchText}`)
      .get()
      .json(data => {
        setData(data.kit);
        setSearchError(null);
        setIsSearching(false);
      })
      .catch(err => {
        setSearchError(err.message)
        setIsSearching(false);
      });
  }, [searchText, setData, setIsSearching]);

  // function to update autofill options based on current search text
  const updateAutofill = debounce((text) => {
    const filteredOptions = allLabels.filter(label => label.indexOf(text) === 0);
    setSearchOptions(filteredOptions);
  }, 250);

  return (
    <div id="search-container">
      <div id="search-bar-container">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {setSearchText(e.target.value); updateAutofill(e.target.value)}}
          onFocus={() => setIsSearchSelected(true)}
          onBlur={() => setIsSearchSelected(false)}
          placeholder='Enter a kit label'
        />
        {searchError !== null && 
          <div id="search-bar-error">
            {searchError}
          </div>
        }
      </div>
      <button id="search-button" disabled={searchText === ''} onClick={onSearch}>Search</button>
    </div>
  )
}

export default SearchBar