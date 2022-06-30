import { createApp } from 'vue'
import App from './App.vue'


const renderOptions = {
  data() {
    return {
      rawStartTime: null,
      startTime: null,
      rawEndTime: null,
      endTime: null,
      calculatedTime: "0.00",
      videoElement: null,
      videoSrc: null,
      videoFilename: null,
      isError: false,
    };
  },
  methods: {
    initVideo(event) {
      this.rawStartTime = 0;
      this.startTime = 0;
      this.rawEndTime = 0;
      this.endTime = 0;
      this.calculatedTime = "0.00";
      this.videoFile = event.target.files[0];
      this.videoFilename = this.videoFile.name;
      if (!this._checkIfVideoFileByExtension(this._getFileExtension(this.videoFilename))) {
        this.isError = true;
        this.videoSrc = null;
        return;
      } else {
        this.isError = false;
      }
      const url = URL.createObjectURL(this.videoFile);
      this.videoSrc = url;
      this.videoElement = document.querySelector("#mainVideo");
      this.videoElement.load();
      this.videoElement.onloadeddata = function () {
        this.play();
      };
    },
    _getFileExtension(filename) {
      const nameMatch = filename.match(/\.(\w+)$/);
      if (nameMatch === null) {
        return null;
      }
      return nameMatch?.[1];
    },
    _checkIfVideoFileByExtension(extension) {
      return ["mp4", "mov", "wmv", "avi", "flv", "mkv", "webm", "mpg", "mpeg", "ts", "h264", "264", "3gp"].indexOf(extension.toLowerCase()) > -1;
    },
    setStartTime() {
      if (
        this.videoElement.tagName === "VIDEO" &&
        this.videoElement.src !== ""
      ) {
        this.rawStartTime = this.videoElement.currentTime;
        this.startTime = this.videoElement.currentTime.toFixed(2);
        this.calcTimeDifference();
      }
    },
    setEndTime() {
      if (
        this.videoElement.tagName === "VIDEO" &&
        this.videoElement.src !== ""
      ) {
        this.rawEndTime = this.videoElement.currentTime;
        this.endTime = this.videoElement.currentTime.toFixed(2);
        this.calcTimeDifference();
      }
    },
    calcTimeDifference() {
      // this.calculatedTime = (parseFloat(this.endTime) - parseFloat(this.startTime)).toFixed(2);
      // return;
      temp = parseFloat(this.endTime) - parseFloat(this.startTime);
      if (temp < 0) {
        this.calculatedTime = "Error";
        return;
      }
      this.calculatedTime = temp.toFixed(2);
    },
    getCalcTimeStatus() {
      if (this.rawEndTime < this.rawStartTime) {
        return 'error';
      } else if (this.rawEndTime > this.rawStartTime) {
        return 'ok';
      } else {
        return 'warn';
      }
    },
    getEndTimeButtonColor() {
      let color = 'white';
      const status = this.getCalcTimeStatus();
      if (status == 'error') {
        color = 'red';
      } else if (status == 'ok') {
        color = 'green';
      } else if (status == 'warn') {
        color = 'orange';
      }
      return `background: ${color};`;
    },
    scrub() {
      this.videoElement.currentTime =
        this.videoElement.duration * (this.timeScrub / 100);
    },
    nextFrame() {
      const vid = this.videoElement;
      vid.pause();
      vid.currentTime += 1 / 60;
    },
    prevFrame() {
      const vid = this.videoElement;
      vid.pause();
      vid.currentTime += -1 / 60;
    },
    goToStartTime() {
      this.videoElement.pause();
      this.videoElement.currentTime = this.rawStartTime;
    },
    goToEndTime() {
      this.videoElement.pause();
      this.videoElement.currentTime = this.rawEndTime;
    },
  },
};

createApp(renderOptions).mount('#app')
