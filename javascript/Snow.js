/* =================================
   BG
==================================== */

class Snowfall {
   constructor(canvasId, maxSnowflakes = 200, snowfallSpeed = 500) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');

      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.snowflakes = [];
      this.maxSnowflakes = maxSnowflakes; // Максимум снежинок
      this.currentMaxSnowflakes = 10; // Начальное количество снежинок
      this.wind = 0; // Ветер
      this.snowfallSpeed = snowfallSpeed; // Скорость появления новых снежинок

      this.init();
   }

   init() {
      this.animate();
      this.startSnowfall();
      window.addEventListener('resize', () => this.resizeCanvas());
   }

   // Генерация снежинки
   createSnowflake() {
      const size = Math.random() * 3 + 1; // Размер снежинки
      this.snowflakes.push({
         x: Math.random() * this.canvas.width,
         y: -size, // Начальная позиция выше экрана
         radius: size,
         speed: Math.random() * 2 + 1, // Скорость падения
         drift: Math.random() * 2 - 1 // Горизонтальное смещение
      });
   }

   // Обновление снежинок
   updateSnowflakes() {
      // Увеличиваем количество снежинок постепенно
      while (this.snowflakes.length < this.currentMaxSnowflakes) {
         this.createSnowflake();
      }

      for (const snowflake of this.snowflakes) {
         snowflake.y += snowflake.speed;
         snowflake.x += snowflake.drift + this.wind; // Влияние ветра

         // Перемещение снежинки назад, если она выходит за экран
         if (snowflake.y > this.canvas.height || snowflake.x > this.canvas.width || snowflake.x < 0) {
            snowflake.y = -snowflake.radius;
            snowflake.x = Math.random() * this.canvas.width;
         }
      }
   }

   // Рисование снежинок
   drawSnowflakes() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Очистка канваса
      this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
      this.ctx.beginPath();
      for (const snowflake of this.snowflakes) {
         this.ctx.moveTo(snowflake.x, snowflake.y);
         this.ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
      }
      this.ctx.fill();
   }

   // Изменение ветра со временем
   updateWind() {
      this.wind += (Math.random() - 0.5) * 0.1; // Изменение ветра
      this.wind = Math.max(-1, Math.min(1, this.wind)); // Ограничение скорости ветра
   }

   // Увеличение количества снежинок
   increaseSnowflakes() {
      if (this.currentMaxSnowflakes < this.maxSnowflakes) {
         this.currentMaxSnowflakes += 1;
      }
   }

   // Основной цикл анимации
   animate() {
      this.updateSnowflakes();
      this.drawSnowflakes();
      this.updateWind();
      requestAnimationFrame(() => this.animate());
   }

   // Постепенное увеличение количества снежинок
   startSnowfall() {
      setInterval(() => this.increaseSnowflakes(), this.snowfallSpeed);
   }

   // Обновление размера канваса при изменении окна
   resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
   }

   // Раздувание снежинок от центра
   burstSnowflakes() {
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;

      for (const snowflake of this.snowflakes) {
         const dx = snowflake.x - centerX;
         const dy = snowflake.y - centerY;
         const distance = Math.sqrt(dx * dx + dy * dy);

         // Нормализуем направление и задаем ускорение
         const force = 10; // Сила разлета
         snowflake.vx = (dx / distance) * force; // Временное смещение по X
         snowflake.vy = (dy / distance) * force; // Временное смещение по Y
      }

      // Постепенно уменьшаем влияние разлета за 500 мс
      const duration = 1200; // Длительность эффекта 500
      const step = 10; // Частота обновления (в мс) 20
      let elapsed = 0;

      const interval = setInterval(() => {
         elapsed += step;
         const factor = 1 - elapsed / duration; // Уменьшающийся коэффициент

         for (const snowflake of this.snowflakes) {
            snowflake.x += snowflake.vx * factor;
            snowflake.y += snowflake.vy * factor;
         }

         if (elapsed >= duration) {
            clearInterval(interval); // Останавливаем интервал после 500 мс
         }
      }, step);
   }
}

export default Snowfall;