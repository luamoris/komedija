/* =================================
   BG
==================================== */

class Audio {
   constructor(audioId) {
      this.audioEl = document.getElementById(audioId);
      this.isPlay = false;
      this.volume = 0;
      this.audioEl.volume = this.volume;
   }

   setVolume(volume = 0) {
      this.volume = volume;
      this.audioEl.volume = this.volume;
   }

   play() {
      this.isPlay = true;
      this.audioEl.muted = false;
      this.audioEl.play();
   }

   pause() {
      this.isPlay = false;
      this.audioEl.muted = true;
      this.audioEl.pause();
   }
}

export default Audio;