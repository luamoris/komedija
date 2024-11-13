/* =================================
   LocalStorageManager
==================================== */

class LocalStorageManager {
   constructor(key) {
      this.key = key;
   }

   set(value) {
      try {
         localStorage.setItem(this.key, JSON.stringify(value));
      } catch (e) {
         console.error('Error setting item to localStorage:', e);
      }
   }


   get() {
      try {
         const value = localStorage.getItem(this.key);
         if (value) {
            return JSON.parse(value);
         }
         return null;
      } catch (e) {
         console.error('Error getting item from localStorage:', e);
         return null;
      }
   }

   has() {
      return localStorage.getItem(this.key) !== null;
   }

   remove() {
      try {
         localStorage.removeItem(this.key);
      } catch (e) {
         console.error('Error removing item from localStorage:', e);
      }
   }
}

export default LocalStorageManager;
