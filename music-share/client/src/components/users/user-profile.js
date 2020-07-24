import React, { useState, useEffect } from 'react';
import ScrollableTabs from './scrollable-tabs';
import ProfileBio from './profile-bio';
import UserService from '../../services/userService';
import SongService from '../../services/songService';

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
    
    return (
    <>
        <ProfileBio {...user} />
        <ScrollableTabs userId={userId}/>
    </>
    );
}