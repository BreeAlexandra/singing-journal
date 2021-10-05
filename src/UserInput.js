
function UserInput(props) {
    return(    
        <div className="input">
            <h2>My progress:</h2>
            <p>Date: {props.date}</p>
            <p>Time: {props.time} </p>
            <p>What I accomplished today: {props.text} </p>
        </div>
    )
}
export default UserInput;