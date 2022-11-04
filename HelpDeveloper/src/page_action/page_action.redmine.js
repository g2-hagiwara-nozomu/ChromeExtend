class PageAction_RedMine {
  static OnExtend(url) {
    if (
      url.startsWith("https://gnf-redmine.geechs-tech.com/") === false &&
      url.startsWith("https://daruma-redmine.geechs-tech.com/") === false
    )
      return;

    const key = Define.getEnableKey(Define.page.redmine);
    chrome.storage.local.get([key], function (items) {
      let enable = items[key];
      if (enable === false) return;
      PageAction_RedMine.DoExtend(url);
    });
  }

  static DoExtend(url) {
    PageAction_RedMine.CopyButton(url);
    PageAction_RedMine.Movie(url);
  }

  static CopyButton(url) {
    let parent = $(".subject h3").parent().get(0);
    if (parent == undefined) return;

    // url copy button
    let copyUrlButton = document.createElement("button");
    copyUrlButton.innerText = "Copy URL";
    copyUrlButton.classList = "ner-button-undefined";
    copyUrlButton.onclick = function () {
      var url = window.location.href;
      let index = url.indexOf("?");
      if (index != -1) {
        url = url.substring(0, index);
      }
      navigator.clipboard.writeText(url);
      copyUrlButton.innerText = "url copied!";
    };
    parent.appendChild(copyUrlButton);

    // title copy button
    let copyTitleButton = document.createElement("button");
    copyTitleButton.innerText = "Copy Title";
    copyTitleButton.classList = "ner-button-undefined";
    copyTitleButton.onclick = function () {
      navigator.clipboard.writeText($(".subject h3").get(0).innerText);
      copyTitleButton.innerText = "title copied!";
    };
    parent.appendChild(copyTitleButton);
  }

  static Movie(url) {
    if (!url.match(/attachments/)) return;

    // get
    let movieContainer = $(".filecontent-container");
    if (movieContainer.length <= 0) return;

    // data
    let movie = movieContainer.find("video");
    if (movie.length <= 0) return;
    let movieUrl = movie.attr("src");

    // remove
    movieContainer.remove();

    // add new video
    console.log($("#content").get(0));
    let content = $("#content").get(0);
    let newVideo = document.createElement("video");
    newVideo.src = movieUrl;
    newVideo.setAttribute("controls", "");
    newVideo.muted = true;
    newVideo.autoplay = true;
    $(newVideo).css({
      "max-width": "80vw",
      "max-height": "60vh",
    });
    content.appendChild(newVideo);

    document.addEventListener("keypress", (e) => {
      if (e.code === "KeyA") {
        newVideo.playbackRate -= 0.25;
      } else if (e.code === "KeyS") {
        newVideo.playbackRate = 1;
      } else if (e.code === "KeyD") {
        newVideo.playbackRate += 0.25;
      }
    });
  }
}
