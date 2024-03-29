class PageAction_Jenkins {
  // 間隔
  static width = 200;
  // 有効か？
  static cachedEnabled = false;

  static url_gnf = "http://10.253.64.83:8092/";
  static url_rabbit = "http://10.253.64.80:8082/";
  static url_daruma = "http://10.253.64.85:8093/";
  static url_current = "";

  static OnExtend(url) {
    // プロジェクトを判定
    let project = "";
    if (url.startsWith(PageAction_Jenkins.url_gnf)) {
      project = PageAction_Jenkins.url_gnf;
    } else if (url.startsWith(PageAction_Jenkins.url_rabbit)) {
      project = PageAction_Jenkins.url_rabbit;
    } else if (url.startsWith(PageAction_Jenkins.url_daruma)) {
      project = PageAction_Jenkins.url_daruma;
    }

    if (project === "") return;
    PageAction_Jenkins.url_current = project;

    const key = Define.getEnableKey(Define.page.jenkins);
    chrome.storage.local.get([key], function (items) {
      let enabled = items[key];

      PageAction_Jenkins.cachedEnabled = enabled;
      if (enabled === false) return;
      PageAction_Jenkins.DoExtend(url);
    });
  }

  static DoExtend(url) {
    let jobData = url.replace(PageAction_Jenkins.url_current, "");
    jobData = decodeURI(jobData);

    // トップページでも表示させる
    if (jobData == "" || jobData == "/") {
      jobData = "job/";
    }

    //パンくずリスト作成
    let jobDetailList = jobData.split("/");
    jobDetailList = jobDetailList.filter((name) => name != "");

    // 画面の半分, 全ボタンの半分、 削除ボタンの半分
    let position =
      document.body.clientWidth / 2 - (PageAction_Jenkins.width * jobDetailList.length) / 2.0 - 25;
    let targetUrl = PageAction_Jenkins.url_current;

    // 拡張のコンテナ作成
    const parent = document.createElement("div");
    parent.id = "ner-extend";
    document.body.appendChild(parent);

    // ボタンの追加
    jobDetailList.forEach((detail) => {
      targetUrl += detail + "/";
      PageAction_Jenkins.AddReturnButton(detail, position, targetUrl, parent);
      position += PageAction_Jenkins.width;
    });

    // 消去ボタンの作成
    const button = document.createElement("button");
    button.textContent = "X";
    button.className = "ner-return-delete-button";
    button.style.left = position + "px";
    button.onclick = PageAction_Jenkins.DiableExtend;
    parent.appendChild(button);

    // もともとのパンくずのヘッダーが存在していた場合、非表示
    let header = $("#breadcrumbBar");
    if (header !== null) {
      header.css("display", "none");
    }

    // リサイズされたときの処理登録
    $(window).resize(PageAction_Jenkins.OnResize);
  }

  static AddReturnButton(message, position, targetUrl, parent) {
    // 表示を整える
    message = message.replace("build_target=", "");
    message = message.replace("?delay=0sec", "");
    if (message.startsWith("login")) {
      message = message.substring(0, 5);
    }

    // URLを整える
    if (targetUrl.endsWith("job/")) {
      targetUrl = targetUrl.replace("job/", "");
    }
    if (targetUrl.endsWith("view/")) {
      targetUrl = targetUrl.replace("view/", "");
    }

    // ボタンの作成
    let button = document.createElement("button");
    button.textContent = message;
    button.classList = "ner-return-button";
    button.style.left = parseInt(position) + "px";
    button.onclick = function () {
      window.location.href = targetUrl;
    };
    parent.appendChild(button);
  }

  // windowのサイズ変更時に位置を修正する
  static OnResize() {
    if (PageAction_Jenkins.cachedEnabled === false) return;
    let buttonList = $(".ner-return-button");
    let position = document.body.clientWidth / 2 - (PageAction_Jenkins.width * buttonList.length) / 2.0 - 25;

    buttonList.each(function () {
      console.log($(this).text() + " : " + parseInt(position));
      $(this).css("left", parseInt(position) + "px");
      position += PageAction_Jenkins.width;
    });

    let button = $(".ner-return-delete-button");
    button.css("left", parseInt(position) + "px");
  }

  // Jenkinsでの拡張を無効にする
  static DiableExtend() {
    let buttonList = $("#ner-extend");
    buttonList.remove();

    // もともとのパンくずを再表示
    let header = $("#breadcrumbBar");
    if (header !== null) {
      header.css("display", "inline");
    }

    // 無効フラグを保存
    chrome.storage.local.set({ [Define.getEnableKey(Define.page.jenkins)]: false });
  }
}
