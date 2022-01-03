class PageAction_EmLauncher {
  // 有効になっているかのフラグ
  static cachedEnabled = false;

  static OnExtend(url) {
    if (
      url.startsWith("https://emlauncher.geechs-tech.com/") == false &&
      url.startsWith("http://emlauncher.geechs-tech.com/") == false
    )
      return;

    const key = Define.getEnableKey(Define.page.emLauncher);
    chrome.storage.local.get([key], function (items) {
      const enabled = items[key];
      if (enabled === false) return;
      PageAction_EmLauncher.DoExtend(url);
    });
  }

  static DoExtend(url) {
    let urlWithoutParamator = url.split("?")[0];
    if (urlWithoutParamator.endsWith("app") === false) return;

    $(".package-list-item-info .title").each(function () {
      let destUrl = $(this).attr("href");
      let destUrlPaths = destUrl.split("?");
      destUrlPaths[0] += "/create_token";
      destUrl = destUrlPaths[0] + "?" + destUrlPaths[1];
      $(this).after(' >>> <a class="title title-qr" href="' + destUrl + '">QR</a>');
    });
  }
}
