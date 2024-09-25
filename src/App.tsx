import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState, ChangeEvent } from 'react';
import Navbar from './components/navbar';
import Button from '@mui/material/Button';

interface FormState {
  height: string;
  width: string;
  mines: string;
}

function App() {
  const [formState, setFormState] = useState<FormState>({
    height: '',
    width: '',
    mines: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: parseInt(value)
    }));
  };

  const handleSubmit = () => {
    if (Object.values(formState).some((value) => value === "")) {
      alert("All fields are required!");
    } else {
      console.log("formState", formState)
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <Box
          className="border border-gray-300 mx-auto flex flex-col space-y-4"
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

          <Button variant="outlined" className="mt-5" onClick={handleSubmit}>Start</Button>
        </Box>
      </div>
    </>
  )
}

export default App
