import React, { useState } from 'react';
import axios from 'axios';
import { PiBowlFoodFill } from "react-icons/pi";
import { PiPottedPlantFill } from "react-icons/pi";
import { FaImages } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import Loading from '../components/Loading';
import { useNavigate} from "react-router-dom"
import { useGetUserId } from '../hooks/useGetUserId.js';
import { useGetUsername } from '../hooks/useGetUsername.js';
import Alert from '../components/Alert.jsx';




const AddRecipe = () => {
    // Hooks for getting the username and userid
    const userId = useGetUserId();
    const username = useGetUsername();

    const [recipe, setRecipe] = useState({name: "", ingredients: [""], cookingTime: 0, imgUrl: "", userOwner: userId,  instructions: [""], username: username, rate: 0, raters: []});
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [showAddAlert, setShowAddAlert] = useState(false);
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
    const handleInstructionsChange = (e, ind)=>{
        const {value} = e.target;
        const instructions = recipe.instructions;
        instructions[ind] = value;
        setRecipe({...recipe, instructions})
    }
    

    const AddInstruction = ()=>{
        setRecipe({...recipe, instructions: [...recipe.instructions, ""]});
    };

    const handleAddRecipe = ()=>{
        setErr("");
        console.log(recipe);
        if (!recipe.name || !recipe.ingredients.length || !recipe.cookingTime || !recipe.imgUrl || !recipe.instructions.length) {
            setErr("Please Fill All Required Fields!");
            return;
       
        }else{
            // const AddRecipe = ()=>{
                setLoading(true)
                axios.post("http://localhost:5000/recipe", recipe)
                .then((res)=>{
                setShowAddAlert(true);
                setLoading(false)
                
            }).catch((err)=>{
                alert(`dude sallah ur server crash b/c made error, ${err.message}`)
            })
        }
    }


    const handleAddAlertConfirm = () => {
        setShowAddAlert(false);
        navigate("/");
        window.location.reload();
    }
    

    // }   
  return (
    <>
          {loading && <Loading />}
          {showAddAlert && (
           <Alert success={true} message="New Recipe added Successfully!" rating={false} action="Ohhh dude!" onConfirm={handleAddAlertConfirm}/>
          )}{" "}
      <div className='flex justify-center py-20 text-slate-900 dark:text-slate-100 dark:bg-zinc-800'>
      <div className="max-w-[900px] border-[1px] shadow-2xl drop-shadow-xl rounded-2xl shadow-slate-600 border-slate-600  dark:bg-zinc-700 flex flex-col items-center justify-center p-4 gap-7">
      <p className='text-2xl '>add nice😋 recipes to the system</p>
      {err && (
        <p className='text-[20px] text-rose-500'>{err}</p>
      )}
      <div  className='flex flex-col w-full gap-7 py-4 px-1 md:px-10'>
        <div className='flex items-center relative'>
            <PiBowlFoodFill  className='text-slate-800 absolute ml-3' size={23}/>
            <input required onChange={handleChange} name="name" type="text" placeholder='recipe name...' id="" className='shadow-md shadow-slate-600  outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        {recipe.ingredients.map((ingredient, idx) => (
            <div key={idx} className='flex items-center relative'>
                <PiPottedPlantFill  className='text-slate-800 absolute ml-3' size={23}/>
                <input required onChange={(e)=>handleIngredientsChange(e, idx)} name="ingredients" type="text" placeholder={`ingredient ${idx + 1}`} id="" className='shadow-md shadow-slate-600 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
            </div>
        ))}
        <div className='flex justify-center items-center '>
            <button onClick={AddIngredient} type='button' className='text-white h-10 bg-stone-700 dark:bg-stone-600 border-2 dark:border-slate-500 rounded-full w-2/3'>Add ingredient</button>
        </div>
        <div className='flex items-center relative'>
            <IoTimeSharp  className='text-slate-800 absolute ml-3' size={23}/>
            <input required name="cookingTime" onChange={handleChange} type="number" placeholder='how much time will it take (minutes)...' id="" className='shadow-md shadow-slate-600 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        <div className='flex items-center relative'>
            <FaImages  className='text-slate-800 absolute ml-3' size={23}/>
            <input required onChange={handleChange} name="imgUrl" type="text" placeholder='image link...' id="" className='shadow-md shadow-slate-600 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
        </div>
        <div className='flex items-start relative'>
        </div>


        {/* Instructions */}
        {recipe.instructions.map((instruction, ind) => (
            <div key={ind} className='flex items-start relative'>
                <PiPottedPlantFill  className='text-slate-800 absolute mt-5 ml-3' size={23}/>
                <textarea rows={5} cols={50} required  onChange={(e)=>handleInstructionsChange(e, ind)} name="instructions" type="textarea" placeholder={`write instruction ${ind + 1}`} id="" className='shadow-md shadow-slate-600 outline-0 border-[2px] rounded-lg border-slate-900 w-full py-4 min-h-28 px-9 text-black'/>
            </div>
        ))}
        <div className='flex justify-center items-center '>
            <button onClick={AddInstruction} type='button' className='text-white h-10 bg-stone-700 dark:bg-stone-600 border-2 dark:border-slate-500 rounded-full w-2/3'>Add instruction</button>
        </div>


        <button onClick={handleAddRecipe} className='bg-teal-600 dark:border-4 dark:shadow-xl border-slate-700 dark:border-slate-400 outline-0 border-[1.5px] shadow-lg shadow-slate-600 rounded-full  w-full h-10 px-10 text-white'>Add Recipe</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default AddRecipe
