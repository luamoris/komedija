/* =================================
   MAIN 
==================================== */

import BG from "./javascript/Bg.js";
import SchemeColor from "./javascript/SchemeColor.js";
import LocalStorageManager from "./javascript/LocalStorageManager.js";
import Audio from "./javascript/Audio.js";

import Poster from "./javascript/Event.js";

import NETWORKS from "./database/networks.js";
import EVENTS from "./database/events.js";

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

// Networks
function setDataToNetworks(data) {
   data.forEach(net => {
      const netEl = document.querySelector(`._${net.name}`);
      netEl.href = net.link;
   });
}

setDataToNetworks(NETWORKS);

// Copy

function copyText(element) {
   const infoText = element.querySelector('[data-info="true"]').textContent;
   navigator.clipboard.writeText(infoText);
   element.classList.toggle('_copied');
   setTimeout(() => {
      element.classList.toggle('_copied');
   }, 500);
}

// Posters
const posterList = document.querySelector('.poster-list');
EVENTS.forEach(async (event) => {

   const date = new Date();
   const eventDate = new Date(event.date.iso);
   if (date > eventDate.setDate(eventDate.getDate() + 1)) return;

   const poster = new Poster(event);
   posterList.append(poster.getHtml());
   await poster.start();
});

