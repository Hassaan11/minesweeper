import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/navbar';
import Homepage from './pages/homepage';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [update, setUpdate] = useState<boolean>(false);

  return (
    <Router>
      <Navbar update={update} />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage update={update} setUpdate={setUpdate} />
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
