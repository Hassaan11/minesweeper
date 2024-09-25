import { useState, useEffect } from 'react'

import { useUpdateContext } from '../context/UpdateContext';

const Navbar = () => {
  const { update, displayBoard, setDisplayBoard } = useUpdateContext();
  const [record, setRecord] = useState<{ games: number; won: number }>(
    () => {
      const savedRecord = localStorage.getItem('record');
      return savedRecord ? JSON.parse(savedRecord) : { games: 0, won: 0 };
    }
  );


  useEffect(() => {
    const savedRecord = localStorage.getItem('record');
    const record: { games: number; won: number } = savedRecord ? JSON.parse(savedRecord) : { games: 0, won: 0 };
    setRecord(record);
  }, [update]);


  return (
    <div className='fixed bg-black flex justify-between items-center h-14 w-full mx-auto px-4 top-0 text-white '>
      <h1 className='text-3xl font-bold cursor-pointer' onClick={() => setDisplayBoard(!displayBoard)}>MinesSweeper</h1>
      <h5>Played: {record.games} Won: {record.won} Loss: {record.games - record.won} </h5>
    </div>
  );
};

export default Navbar;