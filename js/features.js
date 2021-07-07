const main = () => {
  const URL = window.URL || window.webkitURL;
  document.querySelector("#previousFrameBtn").addEventListener(
    "click",
    function () {
      direction = -1;
      document.querySelectorAll("video").forEach((vid) => {
        vid.pause();
        vid.currentTime += direction / 120;//29.97;
      });
    },
    false
  );
  document.querySelector("#nextFrameBtn").addEventListener(
    "click",
    function () {
      direction = 1;
      document.querySelectorAll("video").forEach((vid) => {
        vid.pause();
        vid.currentTime += direction / 60//29.97;
      });
    },
    false
  );
  // document.querySelectorAll("button").forEach((btn) => {
  //   btn.addEventListener(
  //     "click",
  //     function () {
  //       direction = btn.id === "nextFrame" ? 1 : -1;
  //       document.querySelectorAll("video").forEach((vid) => {
  //         vid.pause();
  //         vid.currentTime += direction / 29.97;
  //       });
  //     },
  //     false
  //   );
  // });
  //   var video = document.getElementsByTagName("video")[0];
  // [...document.querySelector("#elements").children].forEach((div) => {
  //   video = div.querySelector("video");
  //   div.querySelector("input").addEventListener("input", function (event) {
  //     video = this.previousElementSibling;
  //     // console.log(video);
  //     var fileItem = this;
  //     var files = fileItem.files;
  //     var file = files[0];
  //     var url = URL.createObjectURL(file);
  //     video.src = url;
  //     video.load();
  //     video.onloadeddata = function () {
  //       video.play();
  //     };
  //   });
  // });
};

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  main();
} else {
  window.addEventListener("DOMContentLoaded", () => {
    main();
  });
}
