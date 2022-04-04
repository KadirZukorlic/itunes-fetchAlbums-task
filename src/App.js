import React, { useState, useEffect } from 'react';
import { searchMusic } from './utils';

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
        .slice(0, 5);
        setMusicData(results)
      console.log(results);
    } catch (error) {}
  };

  const arrangeItems = () => {
    let firstItem = items[0];
    const updatedItems = items.slice(1, items.length)
    if (musicData.length) {
      firstItem = musicData[0];
      setMusicData(musicData.slice(1, musicData.length));
    }
      updatedItems.push(firstItem);
      setItems(updatedItems)
  };

  const handleSubmit = () => {
    if (searchTerm) {
      handleSearch();
    } else setMusicData(initialItems);
  };

  useEffect(() => {
    setTimeout(() => {
      arrangeItems();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="wrapper">
      <input
        type="text"
        className="input"
        placeholder="Search Band"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <div className="box">
        {items.map((item, index) => (
          <ul key={index}>
            <li>{item}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default App;
