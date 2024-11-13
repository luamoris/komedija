/* =================================
   MAIN 
==================================== */

import BG from "./javascript/Bg.js";
import SchemeColor from "./javascript/SchemeColor.js";
import LocalStorageManager from "./javascript/LocalStorageManager.js";

// ========== VALUES

const bg = new BG();
const scheme = new SchemeColor();
const schemeLS = new LocalStorageManager('scheme');

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

const LOGO = document.getElementById('logo');
scheme.init(LOGO, schemeNumber => schemeLS.set(schemeNumber));
