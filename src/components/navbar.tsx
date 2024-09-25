const Navbar = () => {
  return (
    <div className='fixed bg-black flex justify-between items-center h-14 w-full mx-auto px-4 top-0'>
      <h1 className='w-full text-3xl font-bold text-white cursor-pointer' onClick={() => window.location.reload()}>MinesSweeper</h1>
    </div>
  );
};

export default Navbar;