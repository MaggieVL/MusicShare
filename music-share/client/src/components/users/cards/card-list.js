import React from 'react';
import UserCard from './user-card.js';

export default function CardList(props) {
    return (
        <div>
            {props.items.map((item) => <UserCard key={item.id} {...item} onDelete={() => props.onDelete(item)} onEdit={() => props.onEdit(item)}/>)}
        </div>
    );
}