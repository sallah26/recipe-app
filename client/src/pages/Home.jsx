import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios";
import Loading from "../components/Loading";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:5000/recipe/')
    .then((res) => {
      setRecipes(res.data)
      setLoading(false);
     
    }).catch((err)=>{
      console.log(err);
    }
    );    
  }, []);

  let ke = -1;
  return (
    <div className="">
      <Navbar />
    {loading && <Loading />}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 justify-center">
      {recipes.map((recipe)=>{
        return (
          <div key={recipe._id} className="maindiv elem  max-w-[350px] border-[1px] rounded-xl bg-stone-200">
            <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className='max-h-[300px] w-full rounded-ss-xl rounded-se-xl'/>
            <div className='flex flex-col gap-5 p-4'>
              <p className="text-[19px] text-slate-800 font-semibold">{recipe.name}</p>
            </div>
            <button className='mainbtn w-5/6 h-10 bg-stone-800 text-white rounded-xl border-2 border-slate-500 ' onClick={()=> {navigate(`/details/${recipe._id}`)}}>Preview the recipe</button>
            <div className='overl'></div>
          </div>
        )
      })}
      
    </div>
    </div>
  )
}

export default Home
