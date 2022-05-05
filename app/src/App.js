import './App.css';
import Pantry from './pages/Pantry'
import RecipeSearchPage from './pages/RecipeSearchPage'

import Navbar from './components/Navbar'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'gestalt/dist/gestalt.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Pantry />} />
          <Route path="pantry" element={<Pantry />} />
          <Route path="search" element={<RecipeSearchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
