import { useState, useEffect } from 'react'

interface NavbarProps {
  update: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ update }) => {
  const [record, setRecord] = useState<{ games: number; won: number }>(JSON.parse(localStorage.getItem('record') || '{ }'))

  useEffect(() => {
    setRecord(JSON.parse(localStorage.getItem('record') || '{}'))
  }, [update])

  return (
    <div className='fixed bg-black flex justify-between items-center h-14 w-full mx-auto px-4 top-0 text-white '>
      <h1 className='text-3xl font-bold cursor-pointer' onClick={() => window.location.reload()}>MinesSweeper</h1>
      <h5>Played: {record?.games || 0} Won: {record?.won || 0} Loss: {record?.games - record?.won || 0} </h5>
    </div>
  );
};

export default Navbar;