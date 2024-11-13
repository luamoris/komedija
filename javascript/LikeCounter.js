/* =================================
   LikeCounter
==================================== */

class LikeCounter {
   constructor(namespace, key) {
      this.namespace = namespace;
      this.key = key;
      this.apiUrl = `https://api.countapi.xyz/hit/${this.namespace}/${this.key}`;
   }

   // Функция для получения текущего значения лайков
   async getLikes() {
      try {
         const response = await fetch(`https://api.countapi.xyz/get/${this.namespace}/${this.key}`);
         const data = await response.json();
         return data.value;
      } catch (error) {
         console.error("Error fetching like count:", error);
         return 0; // возвращаем 0 в случае ошибки
      }
   }

   // Функция для добавления лайков
   async addLikes(count = 1) {
      try {
         const response = await fetch(`${this.apiUrl}?amount=${count}`, { method: 'POST' });
         const data = await response.json();
         return data.value; // возвращаем новое значение
      } catch (error) {
         console.error("Error adding likes:", error);
         return null; // если произошла ошибка
      }
   }

   // Функция для создания нового счетчика (если не существует)
   // async createCounter() {
   //    try {
   //       const response = await fetch(`https://api.countapi.xyz/create?namespace=${this.namespace}&key=${this.key}`, { method: 'POST' });
   //       const data = await response.json();
   //       console.log("Counter created:", data);
   //    } catch (error) {
   //       console.error("Error creating counter:", error);
   //    }
   // }
}

export default LikeCounter;
