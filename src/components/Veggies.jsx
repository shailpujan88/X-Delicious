import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

function Veggies() {
  const [veggies, setVeggies] = useState([]);
  
  const getVeggies = async () => {
    const getData = localStorage.getItem("veggies");

    if (getData && getData !== "undefined") {
      setVeggies(JSON.parse(getData));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tags=vegetarian&number=10`
      );
      const data = await api.json();
      setVeggies(data.recipes);
      localStorage.setItem("veggies",JSON.stringify(data.recipes));
      console.log(data.recipes);
    }
  };
  useEffect(() => {
    getVeggies();
  },[]);
  
  return (
    <div>
         <Wrapper>
                    <h1>Vegetrain picks</h1>
                    <Splide
                    options={{
                        perPage: 3,
                        arrows: false,
                        pagination: false,
                        drag: "free",
                        gap: "4rem",
                        breakpoints: {
                          767: {
                            perPage: 2,
                          },
                          640: {
                            perPage: 1,
                          },
                        },
                       
                 }}
                    >
                        {veggies.map((recipe) => {
                            return (
                                <SplideSlide key={recipe.id}>
                                    <Card>
                                      <Link to={"/recipe/" +recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title}/>
                                        <Gradient/>
                                        </Link>
                                    </Card>
                                </SplideSlide>
                            );
                        })}
                    </Splide>
                </Wrapper>
        </div>
        );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
  margin-top: 150px;
`;

const Card = styled.div`
  min-height: 25rem;
  min-width: 21rem;
  border-radius:5rem;
  overflow: hidden;
  position: relative;
  margin-bottom: 100px;

  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 90%;
    object-fit: cover;
    border-radius: 1rem;
    
  }

  p {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    text-align: center;
    color: #fff;
    width: 100%;
    height: 30%;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  z-index: 3;
  border-radius: 2rem;
  margin-bottom: 100px;
`;

export default Veggies;
