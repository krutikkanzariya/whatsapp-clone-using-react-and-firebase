import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import './chat.css'
import firebase from 'firebase';

function Chat() {
    const [input,setInput] = useState('');
    const [seed,setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] = useState([]);
    const [state,dispatch] = useStateValue();
    
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
        
        if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
            setRoomName(snapshot.data().name);
        });

        db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot(snapshot=> setMessages(snapshot.docs.map(doc=>doc.data()))
        );
        }

    },[roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            name:state.user.displayName,
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    }
    const handleChange = (e) =>{
        setInput(e.target.value);
    }

    return (
        <div className="chat">
            <div className="chat__header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>{new Date(
                        messages[messages.length-1]?.timestamp?.toDate()
                    ).toUTCString()}
                    </p>

                </div>
                <div className="chat__header--right">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            
            <div className="chat__body">
                {messages.map((message)=>(
                    <p className={`chat__message && ${message.name===state.user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                            {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
                
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input type="text" placeholder="Enter message here" value={input} onChange={handleChange}  />
                    <button type="submit" onClick={sendMessage}>
                        Send a Message
                    </button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
