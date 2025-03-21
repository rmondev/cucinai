import { db } from '@/lib/firebase'
import { collection, addDoc } from "firebase/firestore"; 

export const persistRecipe = async (recipe, uid) => {
    console.log(recipe)
    console.log(uid)

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