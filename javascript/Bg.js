/* =================================
   BG
==================================== */

class BG {
   constructor() {
      this.SIZE = [
         [425, 50],
         [768, 60],
         [1024, 70],
         [1440, 80],
         [1920, 100],
      ];

      this.ID = 0;
      this.bgEl = document.getElementById('bg');

      this.init();
   }

   init() {
      this.paintGrid();
      setInterval(() => this.triggerHoverSquare(this.ID, this.bgEl), 100);
      window.addEventListener('resize', () => {
         this.paintGrid();
      });
   }

   // Grid

   paintGrid() {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const sideLength = this.getSideLength(winWidth)[1];
      const [rows, cols, length] = this.getGridSize(winWidth, winHeight, sideLength);
      if (rows * cols !== this.ID) {
         this.balanceGrid(rows, cols)
         this.updateGridCss(rows, cols, length)
      }
   }

   getSideLength(width) {
      return this.SIZE.find((item) => width < item[0]) || this.SIZE[4];
   }

   getGridSize(width, height, side) {
      let rows = Math.floor(height / side);
      rows += (height % side) === 0 ? 0 : 1;
      let column = Math.floor(width / side);
      column += (width % side) === 0 ? 0 : 1;
      return [rows, column, side];
   }

   balanceGrid(rows, cols) {
      const count = rows * cols;
      while (this.ID !== count) {
         if (this.ID < count) {
            this.ID += 1;
            const squareEl = this.createSquare(this.ID);
            this.bgEl.appendChild(squareEl);
         }
         else {
            const squareElDel = this.bgEl.querySelector(`[data-id="${this.ID}"]`);
            if (squareElDel) {
               squareElDel.remove();
            }
            this.ID -= 1;
         }
      }
   }

   updateGridCss(rows, cols, length) {
      this.bgEl.style.gridTemplateRows = `repeat(${rows}, ${length}px)`;
      this.bgEl.style.gridTemplateColumns = `repeat(${cols}, ${length}px)`;
   }

   // HTML Elements create

   createSquare(id) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.setAttribute('data-id', id);
      return square;
   }

   // Animation

   triggerHoverSquare(currentId, bgEl) {
      if (currentId > 0) {
         const id = Math.floor(Math.random() * currentId) + 1;
         const hoverEl = bgEl.querySelector(`[data-id="${id}"]`);
         if (!hoverEl.classList.contains('_effect')) {
            hoverEl && hoverEl.classList.add('_effect');
            setTimeout(() => {
               hoverEl && hoverEl.classList.remove('_effect');
            }, 1000);
         }
      }
   }
}

export default BG;