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

  useEffect(() => {
    const dbRef = ref(realtime);
    


    onValue(dbRef, (snapshot) => {
      const myData = snapshot.val();
      const entryArray = [];

      for (let propertyName in myData) {
        const journalObject= {
          key: propertyName,
          input: myData[propertyName]
        }
        entryArray.push(journalObject);
      }
      // userJournal(entryArray);
      setUserJournal(entryArray);
    });
  }, []);

  const handleDateChange = (e) => {
    setUserDate(e.target.value);
  }
  const handleTimeChange = (e) => {
    setUserTime(e.target.value);
  }
  const handleTextChange = (e) => {
    setUserAccomp(e.target.value);
  } 


  const handleSubmit = (e) => {
    e.preventDefault();

    

    
    const dbRef = ref(realtime);

    push(dbRef, userDate);
    push(dbRef, userTime);
    push(dbRef, userAccomp);
  }

  
  

  


  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <h1>Singing Journal</h1>
        </div>
      </header>
      <main>
        <div className="wrapper">
          <form 
          onSubmit={handleSubmit}
          >
            <div className="dateContainer">
                <label htmlFor="date">Date: </label>
                <input 
                type="date"
                id='date'
                onChange={handleDateChange}
                value={userDate}
                />
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
            id="accomplishment" cols="30" rows="10" placeholder='What I accomplished today...'></textarea>
            <button>Log Today's Practice</button>
        </form>
        <div className="inputContainer">
          <p>Date: {userDate}</p>
          <p>Time: {userTime}</p>
          <p>What I accomplished today: {userAccomp} </p>
        </div>
          
        
          {/* {
            userJournal.map((infoEntered) => {
                return (
                  <div key={} className="inputContainer">
                    <p>Date: {infoEntered.date}</p>
                    <p>Time: {infoEntered.time}</p>
                    <p>What I accomplished today: {infoEntered}</p>
                  </div>
                  <UserInput 
                  key={infoEntered.key}
                  date={infoEntered.userDate}
                  />
                  );
                })
              } */}
        </div>
      </main>
      <footer>
        <p>Created at <a href="https://junocollege.com/">Juno College</a> by Bree Horton</p>
      </footer>
    </div>
  );
}

export default App;
