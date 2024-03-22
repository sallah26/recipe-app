import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const DeleteRecipe = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const DeleteRecipes = () =>{
        setLoading(true);
        axios.delete(`http://localhost:5000/recipe/${id}`)
         .then(()=> {
            setLoading(false);
            alert("the recipe is deleted succesfully!")
            navigate('/');
         })
         .catch((err)=> {
            setLoading(false);
            alert("An error is occured please go back and check!");
            console.log(err);
        })
    }
  return (
    <>
        {loading ? (
            <Loading />
            ) : (                
                <div className="flex flex-col items-start p-4 gap-4 border-[2px] border-red-400 rounded-xl">
            <p className='mx-auto text-center text-xl text-red-500'>Are you sure to delete this recipe</p>
        <button onClick={DeleteRecipes} className='text-center mt-5 mx-auto w-full bg-red-600'>Delete this book</button>
        </div>
        )}
    </>
  )
}
 
export default DeleteRecipe
