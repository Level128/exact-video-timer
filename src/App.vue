<template>
    <div id="app">
        <div id="elements">
            <div v-if="!videoSrc">
                <p class="info">Choose Video to Analyze</p>
                <p>To get started, choose a video from your library to analyze</p>
                <svg class="bounce" viewBox="0 0 384 512">
                    <path
                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z" />
                </svg>
            </div>
            <div id="filePicker">
                <label for="file" v-if="!videoSrc">Choose a video</label>
                <label for="file" v-else>Choose a new video</label>
                <input @input="initVideo" type="file" name="file" id="fileItem" multiple>
            </div>
            <div v-if="isError">
                <div class="card">
                    <div class="card-header bg-error0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
                        </svg>
                        File Input Error
                    </div>
                    <div class="card-body bg-error0">
                        The file "{{ videoFilename ? videoFilename : 'null' }}" is not a video, please select a
                        different file!
                    </div>
                </div>
            </div>
            <video id="mainVideo" v-show="videoSrc" :src="videoSrc" controls muted width="720" height="480"></video>
        </div>
        <div id="videoControls" v-if="videoSrc">
            <button id="previousFrameBtn" @click="prevFrame" data-direction="-1">
                <svg viewBox="0 0 20 20">
                    <path
                        d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                </svg>
                Previous Frame
            </button>
            <button id="nextFrameBtn" @click="nextFrame" data-direction="1">
                Next Frame
                <svg viewBox="0 0 20 20">
                    <path
                        d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                </svg>
            </button>
        </div>
        <div id="intervals" v-show="videoSrc">
            <div class="startTimeControls">
                <button id="goToStartTimeBtn" @click="goToStartTime">
                    <svg viewBox="0 0 320 512">
                        <path
                            d="M31.1 64.03c-17.67 0-31.1 14.33-31.1 32v319.9c0 17.67 14.33 32 32 32C49.67 447.1 64 433.6 64 415.1V96.03C64 78.36 49.67 64.03 31.1 64.03zM267.5 71.41l-192 159.1C67.82 237.8 64 246.9 64 256c0 9.094 3.82 18.18 11.44 24.62l192 159.1c20.63 17.12 52.51 2.75 52.51-24.62v-319.9C319.1 68.66 288.1 54.28 267.5 71.41z" />
                    </svg>
                    Go To Start Time
                </button>
                <button id="setStartTimeBtn" @click="setStartTime" :style="getEndTimeButtonColor()">
                    <svg v-if="getCalcTimeStatus() == 'warn'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <!-- location-question-mark -->
                        <path
                            d="M12,.82C7.41,.82,3.69,4.54,3.69,9.12c0,3.61,5.14,10.98,7.33,13.6,.51,.61,1.44,.61,1.95,0,2.19-2.62,7.33-10,7.33-13.6C20.31,4.54,16.59,.82,12,.82Zm0,14.85c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1Zm1-5.27v1.69c0,.56-.45,1-1,1s-1-.44-1-1v-2.56c0-.55,.45-1,1-1,1.1,0,2-.9,2-2s-.9-2-2-2-2,.89-2,2c0,.55-.45,1-1,1s-1-.45-1-1c0-2.21,1.79-4,4-4s4,1.79,4,4c0,1.86-1.27,3.43-3,3.87Z" />
                    </svg>
                    <svg v-else-if="getCalcTimeStatus() == 'ok'" viewBox="0 0 24 24">
                        <!-- location-checkmark -->
                        <path
                            d="M12,.74C7.41,.74,3.69,4.46,3.7,9.04c0,3.6,5.14,10.98,7.33,13.6,.51,.61,1.44,.61,1.95,0,2.19-2.62,7.33-9.98,7.33-13.6,0-4.59-3.72-8.3-8.31-8.3Zm4.53,7.06l-4.62,4.62c-.2,.2-.45,.29-.71,.29s-.51-.1-.71-.29l-3.02-3.02c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l2.31,2.31,3.91-3.91c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41Z" />
                        <polygon points="20.31 9.04 20.31 9.05 20.31 9.05 20.31 9.04" />
                    </svg>
                    <svg v-else-if="getCalcTimeStatus() == 'error'" viewBox="0 0 24 24">
                        <path
                            d="M12,.82C7.41,.82,3.69,4.54,3.69,9.12c0,3.61,5.14,10.98,7.33,13.6,.51,.61,1.44,.61,1.95,0,2.19-2.62,7.33-10,7.33-13.6C20.31,4.54,16.59,.82,12,.82Zm0,15.43c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1Zm1-4.25c0,.55-.45,1-1,1s-1-.45-1-1V4.61c0-.55,.45-1,1-1s1,.45,1,1v7.39Z" />
                    </svg>
                    Set Start Time
                </button>
                <!-- <p>{{ startTime }}</p> -->
            </div>
            <div id="calculated-time">
                <p :style="calculatedTime == 'Error' ? { 'color': 'red' } : ''">Calculated Time: {{ calculatedTime }}
                </p>
            </div>
            <div class="startTimeControls">
                <button id="setEndTimeBtn" @click="setEndTime" :style="getEndTimeButtonColor()">
                    <svg v-if="getCalcTimeStatus() == 'warn'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <!-- location-question-mark -->
                        <path
                            d="M12,.82C7.41,.82,3.69,4.54,3.69,9.12c0,3.61,5.14,10.98,7.33,13.6,.51,.61,1.44,.61,1.95,0,2.19-2.62,7.33-10,7.33-13.6C20.31,4.54,16.59,.82,12,.82Zm0,14.85c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1Zm1-5.27v1.69c0,.56-.45,1-1,1s-1-.44-1-1v-2.56c0-.55,.45-1,1-1,1.1,0,2-.9,2-2s-.9-2-2-2-2,.89-2,2c0,.55-.45,1-1,1s-1-.45-1-1c0-2.21,1.79-4,4-4s4,1.79,4,4c0,1.86-1.27,3.43-3,3.87Z" />
                    </svg>
                    <svg v-else-if="getCalcTimeStatus() == 'ok'" viewBox="0 0 24 24">
                        <!-- location-checkmark -->
                        <path
                            d="M12,.74C7.41,.74,3.69,4.46,3.7,9.04c0,3.6,5.14,10.98,7.33,13.6,.51,.61,1.44,.61,1.95,0,2.19-2.62,7.33-9.98,7.33-13.6,0-4.59-3.72-8.3-8.31-8.3Zm4.53,7.06l-4.62,4.62c-.2,.2-.45,.29-.71,.29s-.51-.1-.71-.29l-3.02-3.02c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l2.31,2.31,3.91-3.91c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41Z" />
                        <polygon points="20.31 9.04 20.31 9.05 20.31 9.05 20.31 9.04" />
                    </svg>
                    <svg v-else-if="getCalcTimeStatus() == 'error'" viewBox="0 0 24 24">
                        <path
                            d="M12,.82C7.41,.82,3.69,4.54,3.69,9.12c0,3.61,5.14,10.98,7.33,13.6,.51,.61,1.44,.61,1.95,0,2.19-2.62,7.33-10,7.33-13.6C20.31,4.54,16.59,.82,12,.82Zm0,15.43c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1Zm1-4.25c0,.55-.45,1-1,1s-1-.45-1-1V4.61c0-.55,.45-1,1-1s1,.45,1,1v7.39Z" />
                    </svg>
                    Set End Time
                </button>
                <button id="goToEndTimeBtn" @click="goToEndTime">
                    Go To End Time
                    <svg viewBox="0 0 320 512">
                        <path
                            d="M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z" />
                    </svg></button>
                <!-- <p>{{ endTime }}</p> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
      count: 0,
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
      const temp = parseFloat(this.endTime) - parseFloat(this.startTime);
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
}
</script>
