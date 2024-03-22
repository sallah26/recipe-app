import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import { FaChevronLeft, FaMapMarker } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useGetUserId } from '../hooks/useGetUserId';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoRestaurantOutline } from 'react-icons/io5';
import Star from '../components/Star';

const DetailsOfRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState(false);
  const [doesRated, setDoesRated] = useState(false);
  const userId = useGetUserId();


  // For getting all of the recipes
  useEffect(() => { 
    setLoading(true)
    axios.get('http://localhost:5000/recipe/')
    .then((res) => {
      setRecipes(res.data);
      

      setLoading(false);
     
    }).catch((err)=>{
      console.log(err);
    }
    );    
  }, []);

  // For getting single recipe by id
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/recipe/${id}`)
      .then((res) => {
        setRecipe(res.data);
        console.log(res.data);
        var owner = res.data.userOwner;
        if (owner === userId){
          setOwner(true);
        } else{
          setOwner(false);
        }
       

      })
      .catch((err) => {
        console.error('Error fetching recipe:', err);
      })
      .finally(() => {
        setLoading(false);
        // setReload(prevReload => !prevReload);
      });
  }, [id]);

  const [rating, setRating] = useState(null);

  const handleRate = (newRating) => {
    setRating(newRating);
  };

 
  const handleRateLogic = () => {
    alert(`You rated the product: ${rating} stars`);
  };
  // Update only rate issue
  const handleRateUpdating = () => {
    setLoading(true);
    let raters = recipe.raters; 
    console.log("raters are " + raters);
    let previousRateScore = recipe.rate;
    console.log("rate previousRateScore " + previousRateScore);
    raters.push(userId);
    const rateScore = recipe.rate + rating;
    let CurrentRateScore = rateScore / raters.length;
    
    axios
      .put(`http://localhost:5000/recipe/${id}`, {
        rate: rateScore,
        raters: raters
      })
      .then((res) => {
        console.log("Yeah sallah is is sent to db!");
        // // Handle success
      })
      .catch((err) => {
        console.error('Error updating recipe rate:', err);
      })
      .finally(() => {
        // Relloading the data again
        // reloadAgain
        window.location.reload()
        alert(`Thanks for Rating us ${rating} Stars!`)
        setLoading(false)
        // console.log(recipe);
      });
  };

  const colures = ["text-sky-100","text-sky-200","text-sky-300","text-sky-400","text-sky-500","text-sky-600","text-sky-600","text-sky-500","text-sky-400","text-sky-300","text-sky-200"];
  return (
      <div className='flex max-w-screen flex-col items-center dark:text-slate-100 dark:bg-zinc-800'>
        <div>
          {loading ? (
            <Loading />
          ) : recipe && (
            <div className='max-w-[1300px] bg-stone-200 text-stone-800 border-slate-400 dark:border-slate-500 shadow-xl shadow-slate-400 my-28 border-[1px] p-2 md:p-10 rounded-xl dark:text-slate-100 dark:bg-zinc-700'>
            <div className="flex flex-col lg:flex-row ">
              <div className="w-full lg:w-1/2 flex flex-col gap-8 p-1 md:p-4 items-start text-start">
                <p className="text-3xl md:text-4xl  font-bold">{recipe.name}</p>
                <div className="flex flex-col gap-4 md:gap-2 justify-center">
                  <p className="text-lg md:text-xl font-semibold">Ingredients:</p>
                  {recipe.ingredients.map((ingr, index) => (
                    <div className={`flex gap-2 items-start md:items-center ${colures[index]}`}>
                      <IoRestaurantOutline className='mt-1 md:mt-0'/> <p key={index}>{ingr}</p>
                    </div>
                  ))}{" "}
                </div>
                <p className="text-lg md:text-xl font-semibold">Total Cooking Time: <span className="text-yellow-800 dark:text-yellow-600">{recipe.cookingTime} Mins</span></p>
                <div className="flex flex-col gap-2 justify-center">
                  <p className="text-lg md:text-xl font-semibold">Instructions:</p>
                  <div className="flex flex-col gap-9">
                    {recipe.instructions.map((instruct, index) => (
                      <div className={`flex gap-1  text-sm flex-col items-start`}>
                        <p className="text-lg md:text-xl font-semibold text-start">Step {index + 1}</p> <p className="text-justify" key={index}>{instruct}</p>
                      </div>
                    ))}{" "}
                  </div>
                </div>
                <div className='flex flex-col  items-start gap-5'>
                  {recipe.username && <p className="flex gap-1 items-center">Created by : <span className="text-green-500 font-bold flex gap-1 items-center"><RiVerifiedBadgeFill  size={21}/>{recipe.username}</span></p>}
                  <div className="flex flex-col gap-1 py-4">
                      <p className="text-2xl font-semibold">Did you love it?</p>
                      {recipe.rate > 0 && (<p className="text-[15px]">Based on {recipe.raters.length} users this recipe got {parseFloat(recipe.rate / recipe.raters.length)} Rate!</p>)}
                      <div className="flex gap-2 items-center ">
                          <Star onRate={handleRate} val={parseInt(recipe.rate / recipe.raters.length)}/>
                          <button disabled={doesRated} onClick={handleRateUpdating} className="h-8 px-5 rounded-md border-orange-500 bg-orange-700 text-white border-2">Rate</button>
                      </div>
                      {rating && (<p className='text-[15px]  text-orange-300'>{rating} stars selected!</p>)}
                  </div>
                </div>
                
              </div>
              <div className='w-full lg:w-1/2 flex flex-col gap-3'>
                <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className="rounded-3xl" />
                <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className="rounded-3xl" />
              </div>
            </div>
            {owner && (
                <div className="flex flex-col items-center justify-center lg:flex-row mt-2">
                  <button onClick={()=>{navigate(`/updaterecipe/${recipe._id}`)}} className='m-2 lg:m-10 h-10 w-full lg:w-1/2 bg-green-600 text-white dark:border-slate-400 font-bold rounded-full border-2'>Edit the recipe</button>
                  <button onClick={()=>{navigate(`/deleterecipe/${recipe._id}`)}} className='m-2 lg:m-10 h-10 w-full lg:w-1/2 bg-red-600 text-white dark:border-slate-400 font-bold rounded-full border-2'>Delete the recipe</button>
                </div>
              )}
              
              
            </div>
          )}
        </div>

        <p className="text-2xl text-slate-800 dark:text-slate-100 md:text-3xl text text-center py-10 font-semibold">Here Enjoy Our Recipes...</p>
        {loading && <Loading />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 justify-center">
          {recipes.map((recipe)=>{
            return (
              <div key={recipe._id} className="maindiv elem  max-w-[350px] border-[1px] text-slate-800 rounded-xl shadow-xl shadow-slate-400 bg-stone-200 dark:bg-stone-800 dark:border-stone-600 dark:text-white dark:shadow-stone-600">
                <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className='max-h-[300px] w-full rounded-ss-xl rounded-se-xl'/>
                <div className='flex flex-col gap-5 p-4'>
                  <p className="text-[19px]  font-semibold">{recipe.name}</p>
                  <button className='mainbtn w-5/6 h-10 text-slate-100 bg-stone-800  rounded-full border-2 border-slate-500 ' onClick={()=> {navigate(`/details/${recipe._id}`)}}>Preview the recipe</button>
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
