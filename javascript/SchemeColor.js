/* =================================
   SchemeColor
==================================== */

class SchemeColor {
   constructor() {
      this.schemes = "_scheme_color_";
      this.active = 1;
   }

   switch() {
      this.active = this.active === 1 ? 2 : 1;
      return this.schemes + this.active;
   }

   set(number) {
      this.active = number;
      document.body.className = this.schemes + this.active;
   }

   init(element, fun) {
      element.addEventListener('click', event => {
         event.preventDefault();
         document.body.className = this.switch();
         fun(this.active);
      });
   }
}

export default SchemeColor;