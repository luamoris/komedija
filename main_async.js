
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import LocalStorageManager from "./javascript/LocalStorageManager.js";
import Snowfall from "./javascript/Snow.js";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDp0XJgl-vZ1nU0vF8DL_PizhkFNeA5vDw",
   authDomain: "standup-open-mic-likes.firebaseapp.com",
   projectId: "standup-open-mic-likes",
   storageBucket: "standup-open-mic-likes.firebasestorage.app",
   messagingSenderId: "268280740592",
   appId: "1:268280740592:web:82af87636841eedfd92035"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class Counter {
   constructor(collection, document) {
      this.counterRef = doc(db, collection, document);
   }

   async getCurrentValue() {
      try {
         const docSnapshot = await getDoc(this.counterRef);
         if (docSnapshot.exists()) {
            return docSnapshot.data().value;
         } else {
            await setDoc(this.counterRef, { value: 0 });
            return 0;
         }
      } catch (error) {
         console.error("Ошибка при получении значения счётчика:", error);
         return null;
      }
   }

   async incrementValue(amount = 1) {
      try {
         const currentValue = await this.getCurrentValue();
         const newValue = currentValue + amount;
         await updateDoc(this.counterRef, { value: newValue });
         // console.log(`Счётчик увеличен на ${amount}. Новое значение: ${newValue}`);
         return newValue;
      } catch (error) {
         console.error("Ошибка при увеличении счётчика:", error);
         return null;
      }
   }
}

// ===============================

// Local Storage
const like1LS = new LocalStorageManager('like1');
const like2LS = new LocalStorageManager('like2');

// Counter
const counter1 = new Counter("counters", "like");
const counter2 = new Counter("counters", "like2");

// HTML Elements LIKE 1
const like1PressEl = document.getElementById('likePress_1');
const like1CounterEl = document.getElementById('likeCount_1');

// HTML Elements LIKE 2
const like2PressEl = document.getElementById('likePress_2');
const like2CounterEl = document.getElementById('likeCount_2');

// ANIMATION SNOW
// const snowfall = new Snowfall('snowCanvas', 50, 200);

async function counterStart() {

   // LIKE 1
   let LIKE1_COUNT = await counter1.getCurrentValue();
   like1CounterEl.textContent = LIKE1_COUNT;

   // LIKE 2
   let LIKE2_COUNT = await counter2.getCurrentValue();
   like2CounterEl.textContent = LIKE2_COUNT;

   like1PressEl.addEventListener('click', async () => {
      snowfall.burstSnowflakes();
      const newValue = await counter1.incrementValue();
      LIKE1_COUNT += 1;
      like1CounterEl.textContent = LIKE1_COUNT;
      like1PressEl.classList.add('_active');
      like1LS.set(true);
   });

   like2PressEl.addEventListener('click', async () => {
      snowfall.burstSnowflakes();
      const newValue = await counter2.incrementValue();
      LIKE2_COUNT += 1;
      like2CounterEl.textContent = LIKE2_COUNT;
      like2PressEl.classList.add('_active');
      like2LS.set(true);
   });
}

// START

function likeUpdate() {
   if (like1LS.has()) {
      like1PressEl.classList.add('_active');
   }
   if (like2LS.has()) {
      like2PressEl.classList.add('_active');
   }
}

likeUpdate();
await counterStart();
