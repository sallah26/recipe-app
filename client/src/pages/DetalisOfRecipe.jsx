import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

const DetailsOfRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/recipe/${id}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        console.error('Error fetching recipe:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : recipe ? (
        <div className="max-w-[400px] border-[2px] rounded-xl">
          <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className="w-full h-60" />
          <div className="flex flex-col gap-5 p-4">
            <p className="text-2xl text-green-600 font-semibold">{recipe.name}</p>
            <p>Ingredients:</p>
            <div className="flex flex-wrap gap-3">
              {recipe.ingredients.map((ingr, index) => (
                <p key={index}>{ingr}</p>
              ))}
            </div>
            <p>Total Cooking Time: {recipe.cookingTime}</p>
          </div>
        </div>
      ) : (
        <p>No recipe found</p>
      )}
      <button onClick={()=>{navigate(`/deleterecipe/${recipe._id}`)}}>Delete the recipe</button>
    </div>
  );
};

export default DetailsOfRecipe;
