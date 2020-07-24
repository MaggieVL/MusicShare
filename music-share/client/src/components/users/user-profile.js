import React, { useState, useEffect } from 'react';
import ScrollableTabs from './scrollable-tabs';
import ProfileBio from './profile-bio';
import UserService from '../../services/userService';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%",
        margin: "auto",
    },
}));

export default function UserProfile(props) {
    const userId = props.match.params.userId;
    console.log("id "+ userId);
    const [user, setUser] = useState(null);

    useEffect( () => {
        async function fetchUser() {
            setUser(await UserService.getUserById(userId));
        }
        fetchUser();
    }, []);
    
    const classes = useStyles();

    return (
    <div className={classes.root}>
        <ProfileBio {...user} />
        <ScrollableTabs userId={userId}/>
    </div>
    );
}