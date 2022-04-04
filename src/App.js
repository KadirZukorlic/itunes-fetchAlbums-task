import React, { useState, useEffect } from 'react';
import { searchMusic } from './helpers';

import './App.css';

const initialItems = ['A', 'B', 'C', 'D', 'E'];

const App = () => {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [musicData, setMusicData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchMusic(searchTerm);
      const results = response.results
        .map((item) => item.collectionName)
        .filter((item) => !!item)
        .slice(0, 5)
        .sort((a, b)=> a.localeCompare(b));
        console.log(results)
      setMusicData(results);
    } catch (error) {
      console.log(error);
    }
  };

  const arrangeItems = () => {
    let firstItem = items[0];
    const updatedItems = items.slice(1, items.length);
    if (musicData.length) {
      firstItem = musicData[0];
      setMusicData(musicData.slice(1, musicData.length));
    }
    updatedItems.push(firstItem);
    setItems(updatedItems);
  };

  const handleSubmit = () => {
    if (searchTerm) {
      handleSearch();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      arrangeItems();
    }, 1000);
  }, [items]);

  return (
    <div className="App">
      <div className="wrapper">
        <input
          name="search"
          value={searchTerm}
          onChange={(event) => {
            if (event.target.value === '') {
              setMusicData(initialItems);
            }
            setSearchTerm(event.target.value);
          }}
          placeholder="Search Band"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <div className="items-wrapper">
          {items.map((item, index) => (
            <div key={index} className="item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
