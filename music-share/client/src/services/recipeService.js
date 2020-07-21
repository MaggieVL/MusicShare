const USER_RECIPES_API_BASE = 'http://localhost:8080/api/users';

class RecipeService {
    async getAllUserRecipes(userId) {
        const response = await fetch(`${USER_RECIPES_API_BASE}/${encodeURIComponent(userId)}/recipes`);
        return response.json();
    }

    async createUserRecipe(userId, recipe) {
        const response = await fetch(
            `${USER_RECIPES_API_BASE}/${encodeURIComponent(userId)}/recipes`,
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe)
            }
        );

        const createdRecipe = await response.json();
        if (response.status >= 400) {
            console.log('Error creating Recipe: ', createdRecipe);
            throw createdRecipe.message;
        }
        console.log('Recipe created successfully: ', createdRecipe);
        return createdRecipe;
    }

    async getUserRecipeById(userId, recipeId) {
        const response = await fetch(`${USER_RECIPES_API_BASE}/${encodeURIComponent(userId)}/recipes/${encodeURIComponent(recipeId)}`);
        return response.json();
    }

    async updateUserRecipe(userId, recipe) {
        const response = await fetch(
            `${USER_RECIPES_API_BASE}/${encodeURIComponent(userId)}/recipes/${encodeURIComponent(recipeId)}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe)
            }
        );

        const updatedRecipe = await response.json();
        if (response.status >= 400) {
            console.log('Error updating Recipe: ', updatedRecipe);
            throw updatedRecipe.message;
        }
        console.log('Recipe updated successfully: ', updatedRecipe);
        return updatedRecipe;
    }

    async deleteUserRecipeById(userId, recipeId) {
        const response = await fetch(
            `${USER_RECIPES_API_BASE}/${encodeURIComponent(userId)}/recipes/${encodeURIComponent(recipeId)}`,
            {
                method: 'DELETE'
            }
        );

        const deletedRecipe = await response.json();
        if(response.status >= 400) {
            console.log('Error deleting Recipe: ', deletedRecipe);
            throw deletedRecipe.message;
        }
        console.log('Recipe deleted successfully: ', deletedRecipe);
        return deletedRecipe;
    }
}

const recipeService = new RecipeService();
export default recipeService;