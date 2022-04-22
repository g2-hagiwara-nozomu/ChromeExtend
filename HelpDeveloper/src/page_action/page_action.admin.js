class PageAction_Admin {
  static url_gnf = "https://gnf-dev-.*-admin.geechs-tech.com";
  static url_rabbit = "https://api.*.dev.rabbit.geechs-tech.com/";

  static OnExtend(url) {
    let type = 0;

    let regExp = new RegExp(PageAction_Admin.url_gnf);
    if (regExp.test(url)) type = 1;

    regExp = new RegExp(PageAction_Admin.url_rabbit);
    if (regExp.test(url)) type = 2;

    if (type === 0) return;

    let urlDomain = url.match(regExp.source);
    let urlTop = url.replace(regExp.source, "");

    const key = Define.getEnableKey(Define.page.admin);
    chrome.storage.local.get([key], function (items) {
      let enable = items[key];
      if (enable === false) return;

      switch (type) {
        case 1:
          PageAction_Admin.DoExtend_GNF(url);
          break;
        case 2:
          PageAction_Admin.DoExtend_Rabbit(url);
          break;
      }
    });
  }

  static DoExtend_GNF(url) {
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

  static DoExtend_Rabbit(url) {
    let page = "none";
    if (url.endsWith("admin/tool/sqlite/master")) {
      page = "master";
    }

    switch (page) {
      case "master":
        PageAction_Admin.DoExtend_Rabbit_Master();
        break;
    }
  }

  static DoExtend_Rabbit_Master() {
    const table = $("#tb1 tbody");

    table.children().each(function () {
      console.log(this);
    });

    const firstElement = table.children().get(0);

    let input = document.createElement("input");
    input.oninput = function () {
      const inputValue = this.value;
      table
        .children()
        .slice(1)
        .each(function () {
          console.log($(this).children().get(1).innerText);
          let name = $(this).children().get(1).innerText;
          if (name.includes(inputValue)) {
            $(this).css("display", "table-row");
          } else {
            $(this).css("display", "none");
          }
        });
    };
    table.get(0).insertBefore(input, firstElement);
  }
}
