class PageAction_RedMine {

  static OnExtend(url) {
    if (url.startsWith("https://gnf-redmine.geechs-tech.com/") === false) return;

    chrome.storage.local.get(["enableRedmine"], function (items) {
      let enable = items.enableRedmine;
      if (enable === false) return;
      PageAction_RedMine.DoExtend(url);
    });
  }

  static DoExtend(url) {

  }
}