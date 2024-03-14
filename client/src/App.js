import logo from './logo.svg';
import './App.css';
import {Routes, Route, useNavigate} from "react-router-dom";
import Home from './pages/Home';
import Auth from './pages/Auth';
import AddRecipe from './pages/AddRecipe';
import DeleteRecipe from './pages/DeleteRecipe';
import UpdateRecipe from './pages/UpdateRecipe';
import DetalisOfRecipe from './pages/DetalisOfRecipe';

function App() {
  return (
    <div className="App flex items-center justify-center min-h-screen bg-teal-800 text-white">
      <Routes>
          <Route path='/' element= {<Home />}/>
          <Route path='/addrecipe' element= {<AddRecipe />}/>
          <Route path='/deleterecipe/:id' element= {<DeleteRecipe />}/>
          <Route path='/updaterecipe/:id' element= {<UpdateRecipe />}/>
          <Route path='/details/:id' element= {<DetalisOfRecipe />}/>
          <Route path='/auth' element= {<Auth />}/>
      </Routes>
    </div>
  ); 
}

export default App;
