"use client"
import React, {useEffect,useState} from 'react'
import Button from '@/components/Button'
import { getRecipes } from '@/lib/db'

const TestPage = () => {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getRecipes("GKHiEonZO8T0BoANtlOUrjKIWXc2");
        setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []); // empty dependency array = run once on mount

  return (
    <>
        <Button title='Click Me'></Button>
        <p>{recipes?.[0]?.title ?? 'No recipe'}</p>
    </>
  )
}

export default TestPage
