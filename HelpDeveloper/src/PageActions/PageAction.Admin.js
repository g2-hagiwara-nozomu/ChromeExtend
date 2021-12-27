class PageAction_Admin {

  static OnExtend(url) {
    let regExp = new RegExp("https://gnf-dev-.*-admin.geechs-tech.com");
    if (regExp.test(url) === false) return;

    let urlDomain = url.match(regExp.source);
    let urlTop = url.replace(regExp.source, "");

    chrome.storage.local.get(["enableRedmine"], function (items) {
      let enable = items.enableRedmine;
      if (enable === false) return;
      PageAction_Admin.DoExtend(url);
    });
  }

  static DoExtend(url) {
    // エラーならトップに戻す
    let isError = document.getElementById("totop") === null;
    let isLogin = url.endsWith("admin/auth/login");

    // エラーでかつログイン画面以外
    if (isError && !isLogin) {
      let topUrl = "";
      let directories = url.split("/");

      // adminに戻す
      let isContainsAdmin = false;
      for (let i = 0; i < directories.length; i++) {
        let name = directories[i];
        topUrl += name + "/";
        if (name == "admin") {
          isContainsAdmin = true;
          break;
        }
      }

      // adminがURLになければ追加
      if (isContainsAdmin == false) {
        topUrl += "admin/";
      }

      // 遷移の実行
      location.href = topUrl;
      return;
    }
  }

}