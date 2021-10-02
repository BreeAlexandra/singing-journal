import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZy_Z7lloDeaEbiJY5FMnsxqQJvsnB-qI",
    authDomain: "singing-journal.firebaseapp.com",
    projectId: "singing-journal",
    storageBucket: "singing-journal.appspot.com",
    messagingSenderId: "648474140102",
    appId: "1:648474140102:web:c1b9abb38f4702f120a6c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const realtime = getDatabase(app);

export default realtime;