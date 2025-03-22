import { db } from '@/lib/firebase'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 

export const persistRecipe = async (recipe, uid) => {
    try {
        await addDoc(collection(db,  `/users/${uid}/recipes` ),{
            title: recipe.title,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            createdAt: new Date().toISOString()
        });

        console.log('Recipe persisted to Firestore DB!')
    } catch (error) {
        console.error('Error persisting Recipe to db:', error)
    }
}

export const getRecipes = async (uid)=> {
    let recipesData = [];
    try {
        const querySnapshot = await getDocs(collection(db,`users/${uid}/recipes`));
        
        querySnapshot.forEach((doc) => {
            recipesData.push({ id: doc.id, ...doc.data() });
        });
        return recipesData

    } catch (error) {
        console.error('Error fetching user Recipes from db: ', error)
        return [];
    }
}

