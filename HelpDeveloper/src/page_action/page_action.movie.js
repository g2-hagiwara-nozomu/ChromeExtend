class PageAction_Movie {
  static speed = 2.0;
  static spdContent;

  static IsAnimePage(url) {
    return (
      false ||
      url.startsWith("https://anime.dmkt-sp.jp/animestore/sc_d_pc?partId=") ||
      url.startsWith("https://animestore.docomo.ne.jp/animestore/sc_d_pc?partId=") ||
      url.startsWith("https://www.amazon.co.jp/gp/video/detail/") ||
      url.startsWith("https://fod.fujitv.co.jp/title/") ||
      false
    );
  }

  static OnExtend(url) {
    let valid = false;

    if (PageAction_Movie.IsAnimePage(url)) valid = true;

    if (url.startsWith("https://www.nicovideo.jp/watch/")) valid = true;

    if (valid == false) return;

    //if (url.startsWith("http") == false) return;

    const key = Define.getEnableKey(Define.page.anime);
    chrome.storage.local.get([key], function (items) {
      const enabled = items[key];
      if (enabled === false) return;
      PageAction_Movie.DoExtend(url);
    });
  }

  static DoExtend(url) {
    let container = document.createElement("div");
    container.className = "ner-button-anime-container";
    document.body.appendChild(container);

    let mis = document.createElement("button");
    mis.innerHTML = "-";
    mis.id = "ner-button-mis";
    mis.className = "ner-button-anime";
    container.appendChild(mis);

    PageAction_Movie.spdContent = document.createElement("div");
    let spd = PageAction_Movie.spdContent;
    spd.innerHTML = PageAction_Movie.speed.toFixed(2);
    spd.id = "ner-button-spd";
    spd.className = "ner-button-anime";
    container.appendChild(spd);

    let pls = document.createElement("button");
    pls.innerHTML = "+";
    pls.id = "ner-button-pls";
    pls.className = "ner-button-anime";
    container.appendChild(pls);

    let del = document.createElement("button");
    del.innerHTML = "x";
    del.id = "ner-button-del";
    del.className = "ner-button-anime";
    container.appendChild(del);

    mis.onclick = function () {
      PageAction_Movie.setSpeed(PageAction_Movie.speed - 0.25);
    };

    spd.onclick = function () {
      PageAction_Movie.setSpeed(1);
    };

    pls.onclick = function () {
      PageAction_Movie.setSpeed(PageAction_Movie.speed + 0.25);
    };

    del.onclick = function () {
      document.body.removeChild(container);
    };

    document.addEventListener("keypress", PageAction_Movie.onKeyPress);
    PageAction_Movie.Initialize(1);

    let currentURL = url;
    const urlObserver = new MutationObserver(async function () {
      // URL変更に対応
      if (currentURL !== location.href) {
        currentURL = location.href;
        PageAction_Movie.Initialize(1);
      }
    });
    urlObserver.observe(document, { childList: true, subtree: true });
  }

  static async Initialize(delay) {
    await CommonLib.delay(delay);
    PageAction_Movie.setSpeed(PageAction_Movie.speed);
  }

  static setSpeed(speed) {
    PageAction_Movie.speed = speed;
    PageAction_Movie.spdContent.innerHTML = PageAction_Movie.speed.toFixed(2);
    document.querySelectorAll("video").forEach((v) => {
      v.playbackRate = PageAction_Movie.speed;
    });
  }

  static addTime(second) {
    document.querySelectorAll("video").forEach((v) => {
      v.currentTime += second;
    });
  }

  static onKeyPress(e) {
    switch (e.code) {
      case "KeyA":
        PageAction_Movie.setSpeed(PageAction_Movie.speed - 0.25);
        break;
      case "KeyS":
        PageAction_Movie.setSpeed(1);
        break;
      case "KeyD":
        PageAction_Movie.setSpeed(PageAction_Movie.speed + 0.25);
        break;
      case "KeyJ":
        PageAction_Movie.addTime(-2);
        break;
      case "KeyL":
        PageAction_Movie.addTime(2);
        break;
    }
  }
}
