import React, { useState } from 'react';
import axios from 'axios';
import { PiBowlFoodFill } from "react-icons/pi";
import { PiPottedPlantFill } from "react-icons/pi";
import { FaImages } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import Loading from '../components/Loading';
import { useNavigate} from "react-router-dom"
import { useGetUserId } from '../hooks/useGetUserId.js';

const AddRecipe = () => {
    const userId = useGetUserId();
    console.log(userId);
    const [recipe, setRecipe] = useState({name: "", ingredients: [], cookingTime: 0, imgUrl: "", userOwner: userId,  instructions: ""});;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setRecipe({...recipe, [name]: value})
    };

    const handleIngridentsChange = (e, idx)=>{
        const {value} = e.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients})
    }
    

    const AddIngrident = ()=>{
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    };

    const handleAddRecipe = ()=>{
        console.log(recipe);
        // const AddRecipe = ()=>{
            setLoading(true)
            axios.post("http://localhost:5000/recipe", recipe)
            .then((res)=>{
                alert("New Recipe added Successfully!")
                setLoading(false)
                navigate("/")
            }).catch((err)=>{
                alert(`dude sallah u made error, ${err.message}`)
            })
    }
    // }   
  return (
      <div className='min-w-[700px]'>
          {loading && <Loading />}
      <div className="w-full border-[2px] rounded-2xl border-teal-400 flex flex-col items-center justify-center p-4 gap-7">
      <p className='text-3xl text-green-500 font-semibold'>Add Recipes to your page</p>
      <p className='text-[20px] text-rose-500'>error</p>
      <div  className='flex flex-col w-full gap-7 py-4 px-4 md:px-10'>
      <div className='flex items-center relative'>
            <PiBowlFoodFill  className='text-slate-800 absolute ml-3' size={23}/>
            <input required onChange={handleChange} name="name" type="text" placeholder='recipe name...' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        {recipe.ingredients.map((ingredient, idx) => (
            <div key={idx} className='flex items-center relative'>
                <PiPottedPlantFill  className='text-slate-800 absolute ml-3' size={23}/>
                <input required onChange={(e)=>handleIngridentsChange(e, idx)} name="ingredients" type="text" placeholder='ingredients' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
            </div>
        ))}
        <button onClick={AddIngrident} type='button'>Add ingredient</button>
        
        
        <div className='flex items-center relative'>
            <IoTimeSharp  className='text-slate-800 absolute ml-3' size={23}/>
            <input required name="cookingTime" onChange={handleChange} type="number" placeholder='how much time will it take (minutes)...' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        <div className='flex items-center relative'>
            <FaImages  className='text-slate-800 absolute ml-3' size={23}/>
            <input required onChange={handleChange} name="imgUrl" type="text" placeholder='image link...' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        <div className='flex items-start relative'>
            <textarea rows={5} cols={50} required  onChange={handleChange} name="instructions" type="textarea" placeholder='write the instructionss...' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full py-4 min-h-28 px-4 text-black'/>
        </div>
        <button onClick={handleAddRecipe} className='bg-teal-600 outline-0 border-[1.5px] shadow-lg shadow-teal-400 rounded-full border-slate-700 w-full h-10 px-10 text-white'>Add Recipe</button>
      </div>
    </div>
    </div>
  )
}

export default AddRecipe
