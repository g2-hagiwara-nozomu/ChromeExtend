class PageAction_Confluence {
  // 有効になっているかのフラグ
  static cachedEnabled = false;

  static OnExtend(url) {
    if (
      url.startsWith("https://confluence.geechs.com/") == false &&
      url.startsWith("https://geechs.atlassian.net/") == false &&
      url.startsWith("https://daruma-g2-studios.atlassian.net/") == false
    ) {
      return;
    }

    const key = Define.getEnableKey(Define.page.confluence);
    chrome.storage.local.get([key], function (items) {
      const enabled = items[key];
      if (enabled === false) return;
      PageAction_Confluence.DoExtend(url);
    });
  }

  static async DoExtend(url) {
    // body
    $("body").addClass("ner-extend-confluence");

    // cover
    let cover = document.createElement("div");
    $(cover).addClass("screen-cover");
    $("body").append(cover);
    let coverOff = document.createElement("button");
    coverOff.innerText = "x";
    coverOff.onclick = function () {
      $(cover).remove();
      $(coverOff).remove();
    };
    $(coverOff).addClass("screen-cover-off");
    $("body").append(coverOff);

    // item
    let currentURL = url;
    const urlObserver = new MutationObserver(async function () {
      // URL変更に対応
      if (currentURL !== location.href) {
        if (currentURL.includes("edit")) {
          await CommonLib.delay(2);
        }
        currentURL = location.href;
        PageAction_Confluence.ItemSetting();
      }
    });
    urlObserver.observe(document, { childList: true, subtree: true });

    // list
    const listObserver = new MutationObserver(async function () {
      PageAction_Confluence.ItemSetting();
    });
    listObserver.observe($(".e4yppja0").get(0), { childList: true, subtree: true });
    PageAction_Confluence.ItemSetting();
  }

  static ItemSetting() {
    $(".e1wjl5rj4").each(function (index, value) {
      // current
      if (value.getAttribute("aria-current") === "page") {
        value.classList.add("item-current");
      }
      // indent
      var pl = $(value).css("padding-left");
      pl = parseInt(pl.replace("px", ""));
      if ((pl - 8) % 24 == 0) {
        pl /= 2;
      }
      $(value).css("padding-left", pl + "px");
    });
  }
}
