const main = () => {
  return;
  const URL = window.URL || window.webkitURL;
  function frameSeek(direction) {
    direction = direction || this.direction || 1;
    // document.querySelector("video").forEach((vid) => {
    //   vid.pause();
    //   vid.currentTime += direction / 60;
    // });
    const video = document.querySelector("#mainVideo");
    video.pause();
    video.currentTime += direction / 60;
  }
  ["previousFrameBtn", "nextFrameBtn"].forEach((frameBtnID) => {
    document.getElementById(frameBtnID).addEventListener(
      "click",
      frameSeek,
      false
    );
  })
};

if (["complete", "interactive"].indexOf(document.readyState) > -1) {
  main();
} else {
  window.addEventListener("DOMContentLoaded", () => {
    main();
  });
}