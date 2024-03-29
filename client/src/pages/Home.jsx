import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import hero_img from "../images/hero-img.png";


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  
  const BACKEND_URL = "https://recipe-app-2-7haw.onrender.com";

  useEffect(() => {
    setLoading(true)
    axios.get(`${BACKEND_URL}/recipe`)
    .then((res) => {
      setRecipes(res.data)
      setLoading(false);
    }).catch((err)=>{
      console.log(err);
    }
    );    
  }, []);

  let ke = -1;

  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1500;
    this.txt = '';
    this.tick();
    this.isDeleting = true;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #444444}";
    document.body.appendChild(css);
};
  return (
    <div className=" py-20 flex flex-col items-center px-4 md:px-16 text-slate-900 dark:text-slate-100 dark:bg-zinc-800 ">
    <div className="flex flex-col md:flex-row justify-between items-center md:pb-20">
      <div className='flex flex-col items-center justify-center'>
             
        <p className='text-3xl md:text-[62px] font-bold py-1 leading-relaxed'><a href="/" className="typewrite" data-period="2000" data-type='[ "Wanna Crave Something New?", "Cook Up Inspiration Together.", "One Recipe at a Time.", "Make Nice Recipes With Us", "Simple to Spectacular.", " Explore Delicious Flavors." ]'>
            <span className="wrap"></span>
          </a></p>
        <p className='text-md md:text-lg pb-7 md:pb-20 max-w-[900px] '>"Discover new recipes effortlessly with our user-friendly app. Cook up a storm with easy-to-follow instructions. Enjoy delicious meals tailored to your taste buds."</p>
      </div>
      <img src={hero_img} className="w-[500px]" alt="chefe img" />
    </div>
    <p className="text-2xl text-slate-800 dark:text-slate-100 md:text-3xl text text-center py-10 font-semibold">Here Enjoy Our Recipes...</p>
    {loading && <Loading />}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 justify-center">
      {recipes.map((recipe)=>{
        return (
          <div key={recipe._id} className="maindiv elem flex flex-col  max-w-[350px] border-[1px] text-slate-800 rounded-xl shadow-xl shadow-slate-300 bg-stone-100 dark:bg-stone-800 dark:border-stone-600 dark:text-white dark:shadow-stone-600">
                <img src={recipe.imgUrl} alt={`${recipe.name} icon`} className='max-h-[300px] w-full rounded-ss-xl rounded-se-xl'/>
                <div className='flex flex-col gap-5 p-4 items-center justify-center  h-full'>
                  <p className="text-[19px]  font-semibold">{recipe.name}</p>
                  <button className='mainbtn w-5/6 h-10 text-slate-100 bg-stone-800  rounded-full border-2 border-slate-500 ' onClick={()=> {navigate(`/details/${recipe._id}`)}}>Preview the recipe</button>
                  <div className='overl'></div>
                </div>
              </div>
        )
      })}
      
    </div>
    </div>
  )
}

export default Home
