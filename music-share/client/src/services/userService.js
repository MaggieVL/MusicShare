const USERS_API_BASE = 'http://localhost:8080/api/users';

class UserService {
    async getAllUsers() {
        const response = await fetch(USERS_API_BASE);
        return response.json();
    }

    async postUserCredentials(credentials) {
        const response = await fetch(
            `${USERS_API_BASE}/login`,
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            }
        );
            
        const user = await response.json();

        if(response.status >= 400 ){
            console.log(`Error logging in user: ${user.username}`);
            throw user.message;
        }
        console.log('User logged in successfully: ', user);
        localStorage.setItem("current-user", JSON.stringify(user));
    }

    async createUser(user) {
        const response = await fetch(
            USERS_API_BASE,
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
        );

        const createdUser = await response.json();
        if (response.status >= 400) {
            console.log('Error creating User: ', createdUser);
            throw createdUser.message;
        }
        console.log('User created successfully: ', createdUser);
        return createdUser;
    }

    async getUserById(id) {
        const response = await fetch(`${USERS_API_BASE}/${encodeURIComponent(id)}`);
        return response.json();
    }

    async updateUser(user) {
        const response = await fetch(
            `${USERS_API_BASE}/${encodeURIComponent(user.id)}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
        );

        const updatedUser = await response.json();
        if (response.status >= 400) {
            console.log('Error updating User: ', updatedUser);
            throw updatedUser.message;
        }
        console.log('User updated successfully: ', updatedUser);
        return updatedUser;
    }

    async deleteUserById(id) {
        const response = await fetch(
            `${USERS_API_BASE}/${encodeURIComponent(id)}`,
            {
                method: 'DELETE'
            }
        );

        const deletedUser = await response.json();
        if(response.status >= 400) {
            console.log('Error deleting User: ', deletedUser);
            throw deletedUser.message;
        }
        console.log('User deleted successfully: ', deletedUser);
        return deletedUser;
    }
}

const userService = new UserService();
export default userService;