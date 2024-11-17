/* =================================
   MAIN 
==================================== */

import BG from "./javascript/Bg.js";
import SchemeColor from "./javascript/SchemeColor.js";
import LocalStorageManager from "./javascript/LocalStorageManager.js";
import Snowfall from "./javascript/Snow.js";

// ========== VALUES

const bg = new BG();
const scheme = new SchemeColor();
const schemeLS = new LocalStorageManager('scheme');
const snowfall = new Snowfall('snowCanvas', 100, 200);

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

// Copy

const infoBtnEl = document.getElementById('infoCopyBtn');
infoBtnEl.addEventListener('click', () => {
   const infoText = infoBtnEl.querySelector('[data-info="true"]').textContent;
   navigator.clipboard.writeText(infoText);
   infoBtnEl.classList.toggle('_copied');
   setTimeout(() => {
      infoBtnEl.classList.toggle('_copied');
   }, 500);
});
