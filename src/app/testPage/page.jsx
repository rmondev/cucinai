"use client"
import React, {useEffect,useState} from 'react'
import Button from '@/components/NavButton'
import { getRecipes } from '@/lib/db'
import BSNavBar from '@/components/BSNavBar'

const TestPage = () => {

  // const [recipes, setRecipes] = useState([])

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     try {
  //       const recipesData = await getRecipes("GKHiEonZO8T0BoANtlOUrjKIWXc2");
  //       setRecipes(recipesData);
  //     } catch (error) {
  //       console.error("Error fetching recipes:", error);
  //     }
  //   };

  //   fetchRecipes();
  // }, []);

  // const listRecipes = () => (
  //     recipes?.map((recipe) => (
  //       <div key={recipe?.id}>
  //         <p>Recipe Id: {recipe?.id ?? ''}</p>
  //         <p>Recipe Title: {recipe?.title ?? ''}</p>
  //       </div>
  //     ))
  // )


  return (
    <BSNavBar/>
  )
}

export default TestPage
