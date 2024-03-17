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
    const [recipe, setRecipe] = useState({name: "", ingredients: [""], cookingTime: 0, imgUrl: "", userOwner: userId,  instructions: [""]});;
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
   
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setRecipe({...recipe, [name]: value})
    };

    const handleIngredientsChange = (e, idx)=>{
        const {value} = e.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients})
    }
    

    const AddIngredient = ()=>{
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    };



    // instructions change track
    const handleInstructionsChange = (e, index)=>{
        const {val} = e.target;
        const instructions = recipe.instructions;
        instructions[index] = val;
        setRecipe({...recipe, instructions})
    }
    

    const AddInstruction = ()=>{
        setRecipe({...recipe, instructions: [...recipe.instructions, ""]});
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
      <div className='flex justify-center py-20 text-slate-800'>
          {loading && <Loading />}
      <div className="max-w-[700px] border-[2px] rounded-2xl border-slate-300 flex flex-col items-center justify-center p-4 gap-7">
      <p className='text-2xl '>add nice😋 recipes to the system</p>
      {err && (
        <p className='text-[20px] text-rose-500'>{err}</p>
      )}
      <div  className='flex flex-col w-full gap-7 py-4 px-4 md:px-10'>
        <div className='flex items-center relative'>
            <PiBowlFoodFill  className='text-slate-800 absolute ml-3' size={23}/>
            <input required onChange={handleChange} name="name" type="text" placeholder='recipe name...' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        {recipe.ingredients.map((ingredient, idx) => (
            <div key={idx} className='flex items-center relative'>
                <PiPottedPlantFill  className='text-slate-800 absolute ml-3' size={23}/>
                <input required onChange={(e)=>handleIngredientsChange(e, idx)} name="ingredients" type="text" placeholder='ingredients' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
            </div>
        ))}
        <div className='flex justify-center items-center '>
            <button onClick={AddIngredient} type='button' className='text-white h-10 bg-stone-700 rounded-full w-2/3'>Add ingredient</button>
        </div>
        
        
        <div className='flex items-center relative'>
            <IoTimeSharp  className='text-slate-800 absolute ml-3' size={23}/>
            <input required name="cookingTime" onChange={handleChange} type="number" placeholder='how much time will it take (minutes)...' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        <div className='flex items-center relative'>
            <FaImages  className='text-slate-800 absolute ml-3' size={23}/>
            <input required onChange={handleChange} name="imgUrl" type="text" placeholder='image link...' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        <div className='flex items-start relative'>
        </div>


        {/* Instructions */}
        {recipe.instructions.map((instruction, index) => (
            <div key={index} className='flex items-center relative'>
                <PiPottedPlantFill  className='text-slate-800 absolute ml-3' size={23}/>
                <textarea rows={5} cols={50} required  onChange={(e)=>handleInstructionsChange(e, index)} name="instructions" type="textarea" placeholder='write the instructionss...' id="" className='shadow-md shadow-teal-400 bg-teal-500 outline-0 border-[2px] rounded-lg border-slate-900 w-full py-4 min-h-28 px-4 text-black'/>
            </div>
        ))}
        <div className='flex justify-center items-center '>
            <button onClick={AddInstruction} type='button' className='text-white h-10 bg-stone-700 rounded-full w-2/3'>Add instruction</button>
        </div>


        <button onClick={handleAddRecipe} className='bg-teal-600 outline-0 border-[1.5px] shadow-lg shadow-teal-400 rounded-full border-slate-700 w-full h-10 px-10 text-white'>Add Recipe</button>
      </div>
    </div>
    </div>
  )
}

export default AddRecipe
