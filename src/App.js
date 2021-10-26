// Make a React App!
// Get user input and store using Firebase
    // On page load connect to Firebase
    // Form with Date/Time/Outcome (Stretch - WEEKLY GOAL - How you're feeling and technique to focus on)
    // On form submit send user input to Firebase

// Display user input


// api key: 6463fe78257840c6a588cfc0134f47a1

import { useState, useEffect } from 'react';
import realtime from './firebase.js'
import { ref, onValue, push } from 'firebase/database';
import './App.css';
import UserInput from './UserInput.js';


function App() {

const [userDate, setUserDate] = useState('');
const [userTime, setUserTime] = useState('');
const [userAccomp, setUserAccomp] = useState(''); 
const [userJournal, setUserJournal] = useState([]);
const [style, setStyle] = useState('flexWrapper');


// use useEffect with an empty dependency array so the call function is only called once
  useEffect(() => {

    // make a const to reference the realtime database
    const dbRef = ref(realtime);
  
  // make a 'snapshot' of the database when there is new data in firebase
  onValue(dbRef, (snapshot) => {
      const myData = snapshot.val();
      
      // make an empty array to hold the user entry
      const entryArray = [];

      // loop through myData and save user entries into an object
      for (let key in myData) {
        const journalObject= {
          key: key,
          date: myData[key].date,
          time: myData[key].time,
          text: myData[key].text,
        }
        
        // push the new objects into an array
        entryArray.push(journalObject);
      }

      // set the entryArray into state
      setUserJournal(entryArray);
    });
  }, []);

  // store user input in state as they enter it
  const handleDateChange = (e) => {
    setUserDate(e.target.value);
  }
  const handleTimeChange = (e) => {
    setUserTime(e.target.value);
  }
  const handleTextChange = (e) => {
    setUserAccomp(e.target.value);
  } 

  // push user input to firebase on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // error handling for if the user doesn't input anything
    if (userDate && userTime && userAccomp) {
      const dbRef = ref(realtime);
  
      push(dbRef, {date:userDate, time:userTime, text:userAccomp});
  
      setUserDate('');
      setUserTime('');
      setUserAccomp('');
    } else {
        alert('Please enter some information to log your progress! Happy Singing!') 
    }
  }

  const changeStyle = () => {
    setStyle('flexWrapper2');
  }

  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <h1>Singing Journal</h1>
        </div>
      </header>
      <main>
        <div className={style}>
          
          <form 
          onSubmit={handleSubmit}
          >
            <div className="dateContainer">
                <label htmlFor="date">Date: </label>
                <span className="hover">
                  <input 
                  type="date"
                  id='date'
                  onChange={handleDateChange}
                  value={userDate}
                  />
                </span>
            </div>
            <div className="timeContainer">
                <label htmlFor="time">Time: </label>
                <input 
                type="time"
                id='time'
                onChange={handleTimeChange}
                value={userTime}
                />
            </div>

            <label className='sr-only' htmlFor="accomplishment">What I accomplished today: </label>
            <textarea 
            onChange={handleTextChange}
            value={userAccomp}
            name="accomplishment" 
            id="accomplishment" placeholder='What I accomplished today...'></textarea>
            <button className='log' onClick={changeStyle}>Log Today's Practice</button>
        </form>
        <div className="inputContainer">
          {
            userJournal.map((infoEntered) => {              
                return (  
                    <UserInput 
                    key={infoEntered.key}
                    removeKey={infoEntered.key}
                    date={infoEntered.date}
                    time={infoEntered.time}
                    text={infoEntered.text}
                    />
                  );
                })
              }        
        </div>
        </div>
      </main>
      <footer>
        <p>Created at <a href="https://junocollege.com/">Juno College</a> by Bree Horton</p>
      </footer>
    </div>
  );
}

export default App;
