import React, {useEffect, useState} from 'react';
import CardList from './card-list';
import { useHistory } from 'react-router-dom';
import userService from './../../services/userService';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `0 ${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px`,
    },
}));

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

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <h1>All Users</h1>
            <CardList items={users} onDelete={handleDelete} onEdit={handleEdit} 
                    onProfileVisit={handleProfileVisit}/>
        </div>
    );
}