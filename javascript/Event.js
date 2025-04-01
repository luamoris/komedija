import Counter from "./Counter.js";
import Snowfall from "./Snow.js";
import LocalStorageManager from "./LocalStorageManager.js";


class Poster {
   constructor(event) {
      this.event = event;

      // this.snowfall = new Snowfall('snowCanvas', 50, 200);
      this.lsManager = new LocalStorageManager(event.like.counters);
      this.counter = new Counter(event.like.collection, event.like.counters);

      this.likeCount = null;
      this.likeBox = null;
   }

   getHtml() {
      // Poster
      const poster = document.createElement('div');
      poster.classList.add('poster');
      poster.dataset.premiere = this.event.isPremiere;

      // Poster - Img
      const posterBox = document.createElement('div');
      posterBox.classList.add('poster-box');
      const posterPic = document.createElement('img');
      posterPic.classList.add('poster-pic', '_unselect');
      posterPic.title = 'source: imgur.com';
      posterPic.src = this.event.poster.src;
      posterPic.alt = this.event.poster.alt;
      posterBox.append(posterPic);

      // Poster - Text
      const posterText = document.createElement('div');
      posterText.classList.add('poster-text');

      const posterTop = document.createElement('div');
      posterTop.classList.add('poster-top');
      const posterTitle = document.createElement('h2');
      posterTitle.classList.add('poster__title');
      posterTitle.textContent = this.event.title;
      posterTop.append(posterTitle);

      const posterInfo = document.createElement('div');
      posterInfo.classList.add('poster-info');
      const posterIconBox = document.createElement('div');
      posterIconBox.classList.add('poster-icon-box');
      posterIconBox.innerHTML = `
         <svg class="poster-icon" width="13" height="13" viewBox="0 0 13 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
               d="M0 6.5C0 2.91005 2.91005 0 6.5 0C10.0899 0 13 2.91005 13 6.5C13 10.0899 10.0899 13 6.5 13C2.91005 13 0 10.0899 0 6.5ZM7.15 3.9C7.15 3.72761 7.08152 3.56228 6.95962 3.44038C6.83772 3.31848 6.67239 3.25 6.5 3.25C6.32761 3.25 6.16228 3.31848 6.04038 3.44038C5.91848 3.56228 5.85 3.72761 5.85 3.9V6.5C5.85004 6.67238 5.91854 6.83768 6.04045 6.95955L7.99045 8.90955C8.11304 9.02795 8.27723 9.09347 8.44766 9.09199C8.61809 9.09051 8.78112 9.02215 8.90163 8.90163C9.02215 8.78112 9.09051 8.61809 9.09199 8.44766C9.09347 8.27723 9.02795 8.11304 8.90955 7.99045L7.15 6.2309V3.9Z"
               fill="#666666" />
         </svg>`;
      const posterDate = document.createElement('p');
      posterDate.classList.add('poster__date');
      posterDate.textContent = this.event.date.normal;
      posterInfo.append(posterIconBox, posterDate);

      const posterInfo2 = document.createElement('div');
      posterInfo2.classList.add('poster-info', '_info_copy');
      const posterIconBox2 = document.createElement('div');
      posterIconBox2.classList.add('poster-icon-box');
      posterIconBox2.innerHTML = `
         <svg class="poster-icon" width="11" height="13" viewBox="0 0 11 13" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
               d="M5.13561 0.000398202C5.847 -0.00840458 6.55263 0.128826 7.20887 0.403603C7.86511 0.678381 8.45801 1.08486 8.95089 1.59791C9.44377 2.11096 9.82617 2.71967 10.0744 3.3864C10.3227 4.05312 10.4315 4.76369 10.3942 5.47416C10.3453 6.39094 10.0544 7.2784 9.55114 8.04626C9.52786 8.09383 9.49882 8.13836 9.46469 8.17886L9.39449 8.26271C9.27879 8.42067 9.15399 8.57277 9.02203 8.71707L5.69917 12.7628C5.63819 12.8369 5.56153 12.8967 5.47471 12.9377C5.38789 12.9787 5.29306 13 5.19703 13C5.10101 13 5.00617 12.9787 4.91935 12.9377C4.83253 12.8967 4.75587 12.8369 4.6949 12.7628L1.28493 8.62347L1.28363 8.62217C1.21557 8.54074 1.14861 8.4584 1.08277 8.37517L0.996323 8.26921C0.962977 8.229 0.934605 8.18492 0.911821 8.13791C0.379213 7.36174 0.0674281 6.45547 0.00976192 5.5159C-0.0479042 4.57633 0.150715 3.63874 0.584407 2.80325C1.0181 1.96777 1.67058 1.26578 2.47216 0.772235C3.27375 0.278693 4.19433 0.0121428 5.13561 0.00104825V0.000398202ZM7.14675 5.20245C7.15148 5.46149 7.10454 5.71887 7.00868 5.95956C6.91282 6.20026 6.76996 6.41943 6.58845 6.60429C6.40693 6.78916 6.1904 6.93599 5.95149 7.03623C5.71259 7.13647 5.45611 7.18809 5.19703 7.18809C4.93795 7.18809 4.68147 7.13647 4.44257 7.03623C4.20367 6.93599 3.98713 6.78916 3.80562 6.60429C3.6241 6.41943 3.48124 6.20026 3.38538 5.95956C3.28952 5.71887 3.24259 5.46149 3.24732 5.20245C3.25665 4.69152 3.46616 4.20467 3.83079 3.84664C4.19542 3.48861 4.68602 3.28801 5.19703 3.28801C5.70805 3.28801 6.19865 3.48861 6.56327 3.84664C6.9279 4.20467 7.13742 4.69152 7.14675 5.20245Z"
               fill="#666666" />
         </svg>
      `;
      const posterMap = document.createElement('a');
      posterMap.classList.add('poster__map');
      posterMap.textContent = this.event.location.name;
      posterMap.href = this.event.location.link;
      posterMap.target = '_blank';
      posterInfo2.append(posterIconBox2, posterMap);

      posterText.append(posterTop, posterInfo, posterInfo2);
      this.event.description.forEach(desc => {
         const posterDesc = document.createElement('p');
         posterDesc.classList.add('poster__desc');
         posterDesc.textContent = desc;
         posterText.append(posterDesc);
      });

      // Poster - Like
      const like = document.createElement('div');
      like.classList.add('like');

      this.likeCount = document.createElement('span');
      this.likeCount.classList.add('like-count');
      this.likeCount.textContent = 0;

      this.likeBox = document.createElement('div');
      this.likeBox.classList.add('like-box');
      this.likeBox.innerHTML = `
         <svg class="like-pic _unselect" width="88" height="81"
            viewBox="0 0 88 81" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M77.0769 48.032C72.2831 54.9884 65.9417 61.3453 59.7865 66.8913C55.9633 70.3301 52.6845 73.0966 49.8868 74.9971C47.0013 76.9574 45.0304 77.7083 43.75 77.7083C42.4639 77.7083 40.4485 76.9466 37.5451 74.9856C34.7337 73.0866 31.4578 70.3234 27.731 66.9071L27.7307 66.9069C21.6672 61.3504 15.3212 54.9898 10.4978 48.0269C5.67112 41.0593 2.5 33.6754 2.5 26.0417C2.5 12.7025 11.9301 2.5 25 2.5C30.6642 2.5 34.8773 4.38118 37.6757 6.24679C39.0798 7.18281 40.1257 8.11437 40.8104 8.79902C41.1521 9.14072 41.4017 9.41884 41.5589 9.60224C41.6374 9.69386 41.6927 9.76159 41.7246 9.80148C41.7405 9.82142 41.7506 9.83438 41.7549 9.83986C41.757 9.8426 41.7577 9.84347 41.7568 9.8424L43.75 12.5L45.7432 9.8424C45.7423 9.84347 45.743 9.8426 45.7451 9.83986C45.7494 9.83438 45.7595 9.82142 45.7754 9.80148C45.8073 9.76159 45.8626 9.69386 45.9411 9.60224C46.0983 9.41884 46.3479 9.14072 46.6896 8.79902C47.3743 8.11437 48.4202 7.18281 49.8242 6.24679C52.6227 4.38118 56.8358 2.5 62.5 2.5C75.5699 2.5 85 12.7025 85 26.0417C85 33.6845 81.8735 41.0712 77.0769 48.032Z"
               stroke="rgba(45, 45, 45, 0.5)" stroke-width="5" />
         </svg>
      `;

      like.append(this.likeCount, this.likeBox);

      // Return
      poster.append(posterBox, posterText, like);
      return poster;
   }

   async start() {

      if (!this.likeCount || !this.likeBox) return;

      const likeBtn = this.likeBox.querySelector('.like-pic');
      let value = await this.counter.getCurrentValue();
      this.likeCount.textContent = value;

      if (this.lsManager.has()) likeBtn.classList.add('_active');

      likeBtn.addEventListener('click', async () => {
         // this.snowfall.burstSnowflakes();
         await this.counter.incrementValue();
         value += 1;
         this.likeCount.textContent = value;
         likeBtn.classList.add('_active');
         this.lsManager.set(true);
      });
   }
};

export default Poster;