import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState, ChangeEvent } from 'react';
import Navbar from './components/navbar';
import Button from '@mui/material/Button';
import Board from './components/board';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormState {
  name: string;
  height: number;
  width: number;
  mines: number;
}

function App() {
  const [formState, setFormState] = useState<FormState>({
    name: "Bot",
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
    if (height < 2 || height > 100 || width < 2 || width > 100) {
      toast.error("Height and Width must be between 2 and 100!");
      return;
    }

    if (mines < 1 || mines >= width * height) {
      toast.error(`Mines must be at least 1 and less than (${width * height})!`);
      return;
    }

    setDisplayBoard(true);
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center items-center min-h-screen pt-14'>
        {!displayBoard ? (
          <Box
            className="border border-gray-800 mx-auto flex flex-col space-y-4"
            sx={{ m: 1, p: 2, width: 400 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              id="name"
              name="name"
              label="Enter Your Name"
              variant="standard"
              onChange={handleInputChange}
            />
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

            <Button variant="contained" className="mt-5" onClick={handleSubmit}>Start</Button>
          </Box>
        ) : (
          <Board
            name={formState.name}
            width={formState.width}
            height={formState.height}
            numMines={formState.mines}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
