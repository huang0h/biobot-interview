import React, {useState, useCallback} from 'react'

function SearchBar({setData, setIsSearching}) {
    const [searchText, setSearchText] = useState('');

    const onSearch = useCallback(() => {
        setIsSearching(true);

        fetch(`http://localhost:4000/kits/${searchText}`, {
            method: 'GET',
        }).then((res) => res.json()
        ).then((data) => {
            console.log(data);
            setData(data);
            setIsSearching(false);
        })
        .catch((err) => {
            console.log('error', err);
            setIsSearching(false);
        });
    }, [searchText, setData, setIsSearching]);

    return (
        <>
            <input 
                type="text" 
                value={searchText} 
                onChange={(e) => setSearchText(e.target.value)} 
                placeholder='Enter a kit label' 
            />
            <button onClick={onSearch}>Search</button>
        </>
    )
}

export default SearchBar