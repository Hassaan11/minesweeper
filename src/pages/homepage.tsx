import { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';
import { MIN_COUNT, MAX_COUNT } from '../constants';
import Board from '../components/board';
import { FormState, HomepageProps } from '../types';



const Homepage: React.FC<HomepageProps> = ({ update, setUpdate }) => {
  const [formState, setFormState] = useState<FormState>({
    height: 0,
    width: 0,
    mines: 0,
  });

  const [displayBoard, setDisplayBoard] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const { height, width, mines } = formState;

    // Validation
    if (height < MIN_COUNT || height > MAX_COUNT || width < MIN_COUNT || width > MAX_COUNT) {
      toast.error("Height and Width must be between 2 and 50!");
      return;
    }

    if (mines < 1 || mines >= width * height) {
      toast.error(`Mines must be at least 1 and less than(${width * height})!`);
      return;
    }

    setDisplayBoard(true);
  };

  return (
    <div className='flex flex-col bg-white justify-center items-center min-h-screen pt-14'>
      {!displayBoard ? (
        <Box
          className="border border-gray-800 mx-auto flex flex-col space-y-4"
          sx={{ m: 1, p: 2, width: 400 }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            id="height"
            name="height"
            label="Height"
            variant="standard"
            type='number'
            required
            onChange={handleInputChange}
          />
          <TextField
            id="width"
            name="width"
            label="Width"
            variant="standard"
            type='number'
            required
            onChange={handleInputChange}
          />
          <TextField
            id="mines"
            name="mines"
            label="Mines"
            variant="standard"
            type='number'
            required
            onChange={handleInputChange}
          />

          <Button variant="contained" className="!bg-black mt-5" onClick={handleSubmit}>Start</Button>
        </Box>
      ) : (
        <Board
          width={formState.width}
          height={formState.height}
          numMines={formState.mines}
          setUpdate={setUpdate}
          update={update}
        />
      )}
    </div>
  );
}

export default Homepage;
