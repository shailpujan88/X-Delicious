import styled from 'styled-components';
import  {useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
 function Search(){
    const [searchTerm,setSearchTerm]= useState("");
    const navigate = useNavigate();    
    const submitHandler = (e) => {
      e.preventDefault();
      navigate(`/searched/${searchTerm}`);
    };
        return (
       <FormStyle onSubmit={submitHandler}>
    
        <div> 
        <FaSearch></FaSearch>
        <input onChange={(e) => setSearchTerm(e.target.value)}
        type ="text"
         value={searchTerm} 
         />
        </div>
        
        </FormStyle> 
    );
 };
const FormStyle = styled.form`
    margin: 0rem 10rem;
    div{
    position: relative;
    width: 100%;
    margin: 0 auto;
    margin-top: -190px;
    }
   input{
    border: none;
    background: linear-gradient(35deg, #494949,#313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 5rem;
    border: none;
    border-radius: 0.8rem;
    outline: none;
    width: 100%;
   }
   svg{
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%,-50%);
    color: white;
   }
`;
 export default Search;