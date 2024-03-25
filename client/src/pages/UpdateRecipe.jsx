import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PiBowlFoodFill } from "react-icons/pi";
import { PiPottedPlantFill } from "react-icons/pi";
import { FaChevronLeft, FaImages } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import Loading from '../components/Loading';
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserId } from '../hooks/useGetUserId';

const UpdateRecipe = () => {
    const userId = useGetUserId();
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: [],
        cookingTime: '',
        imgUrl: '',
        userOwner: userId,
        instructions: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [err, setErr] = useState("");


    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/recipe/${id}`)
            .then((res) => {
                const { name, ingredients, cookingTime, imgUrl, instructions } = res.data;
                setRecipe({
                    name: name || '',
                    ingredients: ingredients || [],
                    cookingTime: cookingTime || '',
                    imgUrl: imgUrl || '',
                    userOwner: userId,
                    instructions: instructions || ''
                });
            })
            .catch((err) => {
                console.error('Error fetching recipe:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({...recipe, [name]: value});
    };

    const handleIngredientsChange = (e, idx) => {
        const { value } = e.target;
        const ingredients = [...recipe.ingredients];
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients});
    };

    const handleAddIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    };

    const handleAddRecipe = () => {
        // check all  fields are filled in before sending request to server
        if (!recipe.name || !recipe.ingredients.length || !recipe.cookingTime || !recipe.imgUrl || !recipe.instructions) {
            setErr("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        axios.put(`http://localhost:5000/recipe/${id}`, recipe)
      
        // axios.put("http://localhost:5000/recipe", recipe)
            .then((res) => {
                alert("Recipe edited Successfully!");
                setLoading(false);
                navigate("/");
            })
            .catch((err) => {
                alert(`Error occurred: ${err.message}`);
                setLoading(false);
            });
    };

    return (
      <section className='flex justify-center py-20 text-slate-900 dark:text-slate-100 dark:bg-zinc-800 min-w-full min-h-[100vh] bg-slate-50  '>
        <div className='min-w-[700px] my-20'>
            {loading && <Loading />}
            <div className="w-full border-[2px] rounded-2xl border-slate-400 flex flex-col items-center justify-center p-4 gap-7">
                <p className='text-3xl  font-semibold'>Update the Recipe</p>
                {err && (
                    <p className='text-[20px] text-rose-500'>{err}</p>
                )}
                <div className='flex flex-col w-full gap-7 py-4 px-4 md:px-10'>
                    <div className='flex items-center relative'>
                        <PiBowlFoodFill  className='text-slate-800 absolute ml-3' size={23}/>
                        <input required onChange={handleChange} name="name" value={recipe.name} type="text" placeholder='recipe name...' id="recipe-name" className='shadow-md shadow-slate-400 bg-slate-100 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
                    </div>
                    {recipe.ingredients.map((ingredient, idx) => (
                        <div key={idx} className='flex items-center relative'>
                            <PiPottedPlantFill  className='text-slate-800 absolute ml-3' size={23}/>
                            <input required onChange={(e) => handleIngredientsChange(e, idx)} name={`ingredient-${idx}`} value={ingredient} type="text" placeholder={`ingredient ${idx+1}`} id={`ingredient-${idx}`} className='shadow-md shadow-slate-400 bg-slate-100 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
                        </div>
                    ))}
                    <div className='flex justify-center'>
                      <button onClick={handleAddIngredient} className='w-2/3 bg-green-900 rounded-full h-10' type='button'>Add ingredient</button>
                    </div>
                    <div className='flex items-center relative'>
                        <IoTimeSharp  className='text-slate-800 absolute ml-3' size={23}/>
                        <input required name="cookingTime" onChange={handleChange} value={recipe.cookingTime} type="number" placeholder='how much time will it take (minutes)...' id="cooking-time" className='shadow-md shadow-slate-400 bg-slate-100 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
                    </div>
                    <div className='flex items-center relative'>
                        <FaImages  className='text-slate-800 absolute ml-3' size={23}/>
                        <input required onChange={handleChange} name="imgUrl" value={recipe.imgUrl} type="text" placeholder='image link...' id="image-link" className='shadow-md shadow-slate-400 bg-slate-100 outline-0 border-[2px] rounded-lg border-slate-900 w-full h-10 px-10 text-black'/>
                    </div>
                    <div className='flex items-start relative'>
                        <textarea rows={15} cols={50} required  onChange={handleChange} name="instructions" value={recipe.instructions} type="textarea" placeholder='write the instructions...' id="instructions" className='shadow-md shadow-slate-400 bg-slate-100 outline-0 border-[2px] rounded-lg border-slate-900 w-full py-4 min-h-28 px-4 text-black'/>
                    </div>
                    <button onClick={handleAddRecipe} className='bg-teal-600 dark:border-4 dark:shadow-xl border-slate-700 dark:border-slate-400 outline-0 border-[1.5px] shadow-lg shadow-slate-600 rounded-full  w-full h-10 px-10 text-white'>Update the Recipe</button>

                </div>
            </div>
        </div>
      </section>
    )
}

export default UpdateRecipe;
