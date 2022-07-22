class PageAction_Confluence {
  // 有効になっているかのフラグ
  static cachedEnabled = false;

  static OnExtend(url) {
    if (
      url.startsWith("https://confluence.geechs.com/") == false &&
      url.startsWith("https://geechs.atlassian.net/") == false
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

  static DoExtend(url) {
    $("body").addClass("ner-extend-confluence");

    $(".e1wjl5rj4").each(function (index, value) {
      // current
      if (value.getAttribute("aria-current") === "page") {
        value.classList.add("item-current");
      }
      // indent
      var pl = $(value).css("padding-left");
      pl = parseInt(pl.replace("px", "")) / 2;
      $(value).css("padding-left", pl);
    });

    var attr = $(".e1wjl5rj4").get(0).getAttribute("aria-current");
    attr === "page";
  }
}
