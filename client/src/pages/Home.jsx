import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios";
import Loading from "../components/Loading";
import {useNavigate} from "react-router-dom";
import hero_img from "../images/transparent-happy-face1.png";

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
    <div className="py-20 flex flex-col items-center px-4 md:px-16 text-slate-900">
    
    <div className="flex flex-col md:flex-row justify-between items-center pb-20">
      <div className='flex flex-col items-center justify-center'>
        <p className='text-5xl md:text-[60px]  font-bold py-1 leading-relaxed'>Make Delicious Recipes With Me</p>
        <p className='text-lg pb-20 max-w-[900px] '>"Discover new recipes effortlessly with our user-friendly app. Cook up a storm with easy-to-follow instructions. Enjoy delicious meals tailored to your taste buds."</p>
      </div>
      <img src={hero_img} className="w-[500px]" alt="chefe img" />
    </div>
    <p className="text-2xl md:text-3xl text text-center py-10 font-semibold">Here Enjoy Our Recipes...</p>
    {loading && <Loading />}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 justify-center">
      {recipes.map((recipe)=>{
        return (
          <div key={recipe._id} className="maindiv elem shadow-2xl  max-w-[350px] border-[1px] rounded-xl ">
            <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className='max-h-[300px] w-full rounded-ss-xl rounded-se-xl'/>
            <div className='flex flex-col gap-5 p-4'>
              <p className="text-[19px] font-semibold">{recipe.name}</p>
            </div>
            <button className='mainbtn w-5/6 h-10 bg-stone-800 text-white rounded-full border-2 border-slate-500 ' onClick={()=> {navigate(`/details/${recipe._id}`)}}>Preview the recipe</button>
            <div className='overl'></div>
          </div>
        )
      })}
      
    </div>
    </div>
  )
}

export default Home
