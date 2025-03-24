import { db } from '@/lib/firebase'
import { collection, addDoc, query, where, getDocs, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 

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

export const listenToRecipes = (uid, onUpdate, onError) => {
  try {
    const recipesRef = collection(db, `users/${uid}/recipes`);

    const unsubscribe = onSnapshot(recipesRef, (snapshot) => {
      const updatedRecipes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      onUpdate(updatedRecipes); // Callback to update your UI state
    }, (error) => {
      if (onError) {
        onError(error);
      } else {
        console.error("Error listening to recipes: ", error);
      }
    });

    return unsubscribe; // You can call this later to clean up
  } catch (error) {
    console.error("Error setting up recipe listener:", error);
  }
};


export const deleteRecipe = async (uid, recipeId) => {
    try {
      await deleteDoc(doc(db, 'users', uid, 'recipes', recipeId));
      console.log(`Recipe ${recipeId} deleted successfully for user ${uid}`);
    } catch (error) {
      console.error(`Error deleting recipe: ${recipeId} for User: ${uid}:`, error);
    }
  };