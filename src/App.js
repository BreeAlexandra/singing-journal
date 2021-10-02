import { useState, useEffect } from 'react';
import realtime from './firebase.js'
import { ref, onValue } from 'firebase/database';
import './App.css';


function App() {
  // put in own component
  const [userDate, setUserDate] = useState('');
  const [userTime, setUserTime] = useState('');
  const [userAccomp, setUserAccomp] = useState(''); 

  useEffect(() => {
    const dbRef = ref(realtime);

    onValue(dbRef, (snapshot) => {
      console.log(snapshot.val());
    });
  }, []);

  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <h1>Singing Journal</h1>
        </div>
      </header>
      <main>
        <div className="wrapper">
          <form action="">
            <div className="dateContainer">
              <label htmlFor="date">Date: </label>
              <input type="date" />
            </div>
            <div className="timeContainer">
              <label htmlFor="time">Time: </label>
              <input type="time" />
            </div>

            <label className='sr-only' htmlFor="accomplishment">What I accomplished today: </label>
            <textarea name="accomplishment" id="accomplishment" cols="30" rows="10" placeholder='What I accomplished today...'></textarea>
          </form>
        </div>
      </main>
      <footer>
        <p>Created at <a href="https://junocollege.com/">Juno College</a> by Bree Horton</p>
      </footer>
    </div>
  );
}

export default App;
