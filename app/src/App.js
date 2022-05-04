import './App.css';
import Pantry from './pages/Pantry'
import RecipeSearchPage from './pages/RecipeSearchPage'

import Navbar from './components/Navbar'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pantry />} />
          <Route path="pantry" element={<Pantry />} />
          <Route path="search" element={<RecipeSearchPage />} />
        </Routes>
      </BrowserRouter>,

    </>
  );
}

export default App;
