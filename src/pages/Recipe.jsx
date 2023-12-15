import { useEffect,useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from 'react'

 function Recipe() {
    let params =useParams();
    const [details,setDetails]= useState({});
    const [activeTab, setActiveTab] = useState("instructions");
    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData =await data.json();
        setDetails(detailData);
        console.log(detailData);

    };
     useEffect(() => {
        fetchDetails();
     },[params.name]);

  return (
    <Wrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt=""/>
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instruction
        </Button>
        <Button
           className={activeTab === "ingredients" ? "active" : ""}
           onClick={() => setActiveTab("ingredients")}
           >
          Ingredient
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h4 dangerouslySetInnerHTML={{ __html: details.summary }}></h4>
            <h4 dangerouslySetInnerHTML={{ __html: details.instructions }}></h4>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details?.extendedIngredients.map(({ id, original }) => (
               
              <li key={id}>{original}</li>
           
              
            ))}
          </ul>
        )}
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10rem; 
  margin-bottom: 5rem;
  display: flex;

 

  .active {
    background: linear-gradient(35deg, #bf3a3a, #8fd907);
    color: #fff;
  }

  h2 {
    margin-bottom: 2rem;
  }

  ul {
    margin-top: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 3rem;

 
`;
export default Recipe;
