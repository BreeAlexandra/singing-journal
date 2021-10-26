import { ref, remove } from 'firebase/database';
import realtime from './firebase.js'

function UserInput(props) { 
// target the key so user can delete input from firebase (aka from the page) on button click
const handleRemove = (removeKey) => {
    const nodeRef = ref(realtime, removeKey);

    remove(nodeRef);
}

    return(    
        <div className="input">
            <h2>My progress:</h2>
            <p>Date: {props.date}</p>
            <p>Time: {props.time} </p>
            <p>What I accomplished today: {props.text} </p>
            <button onClick={() => 
                handleRemove(props.removeKey)}>Remove Entry</button>
        </div>
    )
}
export default UserInput;