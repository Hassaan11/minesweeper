import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/navbar';
import Homepage from './pages/homepage';
import { UpdateProvider } from './context/UpdateContext';

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Router>
      <UpdateProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Homepage />
            }
          />
        </Routes>
      </UpdateProvider>
      <ToastContainer />
    </Router >
  );
}

export default App;
