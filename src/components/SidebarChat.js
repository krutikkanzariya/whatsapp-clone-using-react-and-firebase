import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './sidebar.css'
import db from '../firebase'
import {Link, useParams} from 'react-router-dom'

function SidebarChat({id,name,addNewChat}) {
    const [seed,setSeed] = useState('');
    
    const createChat = () => {
        const roomName=prompt("Please enter name for chatroom");
        if(roomName){
            db.collection('rooms').add({
                name:roomName,
            })
            //database stff
        }
    }

    const [lastMessage,setLastMessage] = useState("");

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*10000));
        if(id){
            db.collection('rooms').doc(id).collection("messages").orderBy('timestamp','desc').onSnapshot((snapshot)=>
                setLastMessage(snapshot.docs.map((doc)=>doc.data()))
            )
        }
    },[id])


    return !addNewChat?(
        <Link to={`/rooms/${id}`}>
            <div className="sidebarchat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarchat__info">
                    <h2>{name}</h2>
                    <p>{lastMessage[0]?.message}</p>
                </div>
            </div>
        </Link>
    ):(
        <div className="sidebarchat" onClick={createChat}>
            <h2>Add Chat</h2>
        </div>
    )
}

export default SidebarChat
