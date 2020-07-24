import React, {useEffect, useState} from 'react';
import CardList from './card-list';
import { useHistory } from 'react-router-dom';
import userService from './../../services/userService';

export default function AllUsers() {
    const [users, setUsers] = useState([]);

    const history = useHistory();

    useEffect(() => {
        async function fetchUsers() {
            setUsers(await userService.getAllUsers());
        }
        fetchUsers();
    }, []);

    async function handleDelete(user) {
        await userService.deleteUserById(user.id);
        const newUsers = users.filter(({ id }) => id !== user.id);
        setUsers(newUsers);
    }

    function handleProfileVisit(user) {
        history.push(`users/${user.id}`);
    }

    function handleEdit(user) {
        history.push(`users/edit/${user.id}`);
    }

    return(
        <>
            <h1>All Users</h1>
            <CardList items={users} onDelete={handleDelete} onEdit={handleEdit} 
                    onProfileVisit={handleProfileVisit}/>
        </>
    );
}