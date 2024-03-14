import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios";
import Loading from "../components/Loading";


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:5000/recipe/')
    .then((res) => {
      setRecipes(res.data)
      setLoading(false);
      console.log(res.data);
      
    }).catch((err)=>{
      console.log(err);
    })
    
  }, [])
  let ke = -1;
  return (
    <div className="App">
      <Navbar />
    {loading && <Loading />}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-center">
      {recipes.map((recipe)=>{
        return (
          <div key={recipe._id} className="max-w-[400px] border-[2px] rounded-xl ">
            <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className='w-full h-60 '/>
            <div className='flex flex-col gap-5 p-4'>
              <p className="text-2xl text-green-600 font-semibold">{recipe.name}</p>
              <p className="">Ingredients :</p>
              <div className='flex gap-3'>
                {recipe.ingredients.map((ingr)=>{
                  ke = ke + 1;
                  return (
                    <p key={ke}>{ingr}</p>
                    )
                  })}
              </div>
              <p className="">Total Cooking Time : {recipe.cookingTime}</p>
            </div>
          </div>
        )
      })}
      
    </div>
    </div>
  )
}

export default Home
