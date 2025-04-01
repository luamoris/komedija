import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
};

export default Counter;