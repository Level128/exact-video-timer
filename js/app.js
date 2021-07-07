const renderOptions = {
  data() {
    return {
      rawstartTime: 0,
      startTime: 0,
      rawendTime: 0,
      endTime: 0,
      calculatedTime: "0.00",
      videoElement: null,
      videoSrc: null,
    };
  },
  methods: {
    initVideo(event) {
      this.rawstartTime = 0;
      this.startTime = 0;
      this.rawendTime = 0;
      this.endTime = 0;
      this.calculatedTime = "0.00";
      var file = event.target.files[0];
      var url = URL.createObjectURL(file);
      this.videoSrc = url;
      this.videoElement = document.querySelector("video#videoScreen");
      this.videoElement.load();
      this.videoElement.onloadeddata = function () {
        this.play();
      };
    },
    setStartTime() {
      if (
        this.videoElement.tagName === "VIDEO" &&
        this.videoElement.src !== ""
      ) {
        this.rawstartTime = this.videoElement.currentTime;
        this.startTime = this.videoElement.currentTime.toFixed(2);
        this.calcTimeDifference();
      }
    },
    setEndTime() {
      if (
        this.videoElement.tagName === "VIDEO" &&
        this.videoElement.src !== ""
      ) {
        this.rawendTime = this.videoElement.currentTime;
        this.endTime = this.videoElement.currentTime.toFixed(2);
        this.calcTimeDifference();
      }
    },
    calcTimeDifference() {
      temp = parseFloat(this.endTime) - parseFloat(this.startTime);
      if (temp >= 0) {
        this.calculatedTime = temp.toFixed(2);
      }
    },
    scrub() {
      this.videoElement.currentTime =
        this.videoElement.duration * (this.timescrub / 100);
    },
    nextFrame() {
      vid = this.videoElement;
      vid.pause();
      vid.currentTime += 1 / 120//29.97;
    },
    prevFrame() {
      vid = this.videoElement;
      vid.pause();
      vid.currentTime += -1 / 60//29.97;
    },
    goToStartTime() {
      this.videoElement.pause();
      this.videoElement.currentTime = this.rawstartTime;
    },
    goToEndTime() {
      this.videoElement.pause();
      this.videoElement.currentTime = this.rawendTime;
    },
  },
};
const app = Vue.createApp(renderOptions);
