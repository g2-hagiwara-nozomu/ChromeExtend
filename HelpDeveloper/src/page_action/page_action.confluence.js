class PageAction_Confluence {
  // 有効になっているかのフラグ
  static cachedEnabled = false;

  static OnExtend(url) {
    if (url.startsWith("https://confluence.geechs.com/") == false) return;

    const key = Define.getEnableKey(Define.page.confluence);
    chrome.storage.local.get([key], function (items) {
      const enabled = items[key];
      if (enabled === false) return;
      PageAction_Confluence.DoExtend(url);
    });
  }

  static DoExtend(url) {
    $("body").addClass("ner-extend");
  }
}
