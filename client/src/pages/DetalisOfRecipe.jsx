import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import { FaChevronLeft, FaMapMarker } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useGetUserId } from '../hooks/useGetUserId';


const DetailsOfRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState(false);
  const userId = useGetUserId();


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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/recipe/${id}`)
      .then((res) => {
        setRecipe(res.data);
        var owner = res.data.userOwner;
        if (owner === userId){
          setOwner(true);
        } else{
          setOwner(false);
        }
        console.log(res.data);
        console.log(owner === userId);

      })
      .catch((err) => {
        console.error('Error fetching recipe:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const colures = ["text-teal-500","text-green-500","text-yellow-500","text-blue-600","text-red-500","text-orange-400","text-red-400"];

  return (
      <div className='flex flex-col items-center'>
        <div>
          {loading ? (
            <Loading />
          ) : recipe && (
            <div className='max-w-[1300px] bg-stone-200 text-stone-800  border-slate-400 shadow-xl my-20 border-[1px] p-10 rounded-xl'>
            <div className="flex flex-col lg:flex-row ">
              <div className="w-full lg:w-1/2 flex flex-col gap-8 p-4 items-start text-start">
                <p className="text-4xl text-stone-900 font-bold">{recipe.name}</p>
                <div className="flex flex-col gap-2 justify-center">
                <p className="text-xl font-semibold">Ingredients:</p>
                  {recipe.ingredients.map((ingr, index) => (
                    <div className={`flex gap-2 items-center ${colures[index]}`}>
                      <FaMapMarker /> <p key={index}>{ingr}</p>
                    </div>
                  ))}{" "}
                </div>
                <p className="text-xl font-semibold">Total Cooking Time: <span className="text-yellow-800">{recipe.cookingTime} Mins</span></p>
                <p className="text-md text-justify"><span  className="text-xl font-semibold">Instructions to make it </span><br /> {recipe.instructions}</p>
              </div>
              <div className='w-full lg:w-1/2 flex flex-col gap-3'>
                <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className="h-80 rounded-3xl" />
                <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className="h-80 rounded-3xl" />

              </div>
            </div>
              <div>
                <p>Give it rate!</p>
              </div>
              {owner && (
                <div className="flex flex-col lg:flex-row">
                  <button onClick={()=>{navigate(`/updaterecipe/${recipe._id}`)}} className='m-10 h-10 w-1/2 bg-green-600 text-white font-bold rounded-full border-2'>Edit the recipe</button>
                  <button onClick={()=>{navigate(`/deleterecipe/${recipe._id}`)}} className='m-10 h-10 w-1/2 bg-red-600 text-black font-bold rounded-full border-2'>Delete the recipe</button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="text-4xl text-stone-900 font-bold">Here Explore Other available Recipes!</p>
            
        {/* The whole page is here */}
        {loading && <Loading />}
        <div className="my-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 justify-center">
          {recipes.map((recipe)=>{
            return (
              <div key={recipe._id} className="maindiv elem  max-w-[350px] border-[1px] rounded-xl bg-stone-200">
                <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className='max-h-[300px] w-full rounded-ss-xl rounded-se-xl'/>
                <div className='flex flex-col gap-5 p-4'>
                  <p className="text-[19px] text-slate-800 font-semibold">{recipe.name}</p>
                  <button className='mainbtn w-5/6 h-10 bg-stone-800 text-white rounded-full border-2 border-slate-500 ' onClick={()=> {navigate(`/details/${recipe._id}`)}}>Preview the recipe</button>
                  <div className='overl'></div>
                </div>
              </div>
            )
          })}
          
        </div>
      </div>
  );
};

export default DetailsOfRecipe;
