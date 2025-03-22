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
        console.log(error)
    }
}

export const getRecipes = async (uid)=> {

    let recipesData = [];

    try {
        const querySnapshot = await getDocs(collection(db,`/users/${uid}/recipes`));
        
        querySnapshot.forEach((doc) => {
            
            recipesData.push(doc.data())
        })


    } catch (error) {
        console.log(error)
    }

    console.log(recipesData.length)
    
    return recipesData

}

