import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Auth from './pages/Auth';
import AddRecipe from './pages/AddRecipe';
import UpdateRecipe from './pages/UpdateRecipe';
import DetalisOfRecipe from './pages/DetalisOfRecipe';
import Navbar from './components/Navbar';

function App() {
  return (
    
    <div className="App flex flex-col justify-center  bg-stone-100 text-white">
      <Navbar />
      <Routes>
          <Route path='/' element= {<Home />}/>
          <Route path='/addrecipe' element= {<AddRecipe />}/>
          <Route path='/details/:id' element= {<DetalisOfRecipe />}/>
          <Route path='/auth' element= {<Auth />}/>
          <Route path='/updaterecipe/:id' element= {<UpdateRecipe />}/>
      </Routes>
    </div>
  ); 
}

export default App;
