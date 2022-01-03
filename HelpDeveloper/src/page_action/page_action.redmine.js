class PageAction_RedMine {
  static OnExtend(url) {
    if (url.startsWith("https://gnf-redmine.geechs-tech.com/") === false) return;

    const key = Define.getEnableKey(Define.page.redmine);
    chrome.storage.local.get([key], function (items) {
      let enable = items[key];
      if (enable === false) return;
      PageAction_RedMine.DoExtend(url);
    });
  }

  static DoExtend(url) {}
}
