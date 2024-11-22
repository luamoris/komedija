/* =================================
   MAIN 
==================================== */

import BG from "./javascript/Bg.js";
import SchemeColor from "./javascript/SchemeColor.js";
import LocalStorageManager from "./javascript/LocalStorageManager.js";
import Audio from "./javascript/Audio.js";

// ========== VALUES

const bg = new BG();
const scheme = new SchemeColor();
const schemeLS = new LocalStorageManager('scheme');
const bgAudio = new Audio('bgMusic');

// ========== MAIN

function schemeUpdate() {
   if (!schemeLS.has()) {
      schemeLS.set(scheme.active);
   } else {
      const schemeNumber = parseInt(schemeLS.get());
      scheme.set(schemeNumber);
   }
}

schemeUpdate();

const btnSwitchEl = document.getElementById('btnSwitch');
scheme.init(btnSwitchEl, schemeNumber => schemeLS.set(schemeNumber));

const btnMusic = document.getElementById('audioMusic');
btnMusic.addEventListener('click', () => {
   if (!bgAudio.isPlay) {
      bgAudio.play();

   } else {
      bgAudio.pause();
   }

   const newVolume = bgAudio.volume === 0 ? 0.2 : 0;
   bgAudio.setVolume(newVolume);
   btnMusic.classList.toggle('_on');
});

// Copy

function copyText(element) {
   const infoText = element.querySelector('[data-info="true"]').textContent;
   navigator.clipboard.writeText(infoText);
   element.classList.toggle('_copied');
   setTimeout(() => {
      element.classList.toggle('_copied');
   }, 500);
}

const info1BtnEl = document.getElementById('infoCopyBtn_1');
const info2BtnEl = document.getElementById('infoCopyBtn_2');
info1BtnEl.addEventListener('click', () => copyText(info1BtnEl));
info2BtnEl.addEventListener('click', () => copyText(info2BtnEl));
