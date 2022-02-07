class PageAction_Jenkins {
  // 間隔
  static width = 170;
  // 有効か？
  static cachedEnabled = false;

  static OnExtend(url) {
    if (url.startsWith("http://10.253.64.83:8092/") === false) return;

    const key = Define.getEnableKey(Define.page.jenkins);
    chrome.storage.local.get([key], function (items) {
      let enabled = items[key];
      PageAction_Jenkins.cachedEnabled = enabled;
      if (enabled === false) return;
      PageAction_Jenkins.DoExtend(url);
    });
  }

  static DoExtend(url) {
    let jobData = url.replace("http://10.253.64.83:8092/", "");

    // トップページでも表示させる
    if (jobData == "" || jobData == "/") {
      jobData = "job/";
    }

    //パンくずリスト作成
    let jobDetailList = jobData.split("/");
    jobDetailList = jobDetailList.filter((name) => name != "");
    // 画面の半分, 全ボタンの半分、 削除ボタンの半分
    let position =
      document.body.clientWidth / 2 - (PageAction_Jenkins.width * jobDetailList.length) / 2.0 - 15;
    let targetUrl = "http://10.253.64.83:8092/";

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
    let position = document.body.clientWidth / 2 - (155 * buttonList.length) / 2.0 - 25;

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
