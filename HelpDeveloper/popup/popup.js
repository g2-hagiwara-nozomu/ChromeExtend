function OnChangeEnable(key) {
  chrome.storage.local.get([key], function (items) {
    let enable = items[key];

    enable = !enable;

    chrome.storage.local.set({ [key]: enable });
    location.reload();
  });
}

window.onload = function () {
  const pageEnableKeyArray = [
    Define.getEnableKey(Define.page.admin),
    Define.getEnableKey(Define.page.jenkins),
    Define.getEnableKey(Define.page.redmine),
    Define.getEnableKey(Define.page.emLauncher),
  ];

  let pageDataArray = [];
  const enableText = "Enable";
  pageEnableKeyArray.forEach((key) => {
    pageDataArray.push({ page: key, enabled: enableText });
  });

  var app = new Vue({
    el: "#app",
    data: {
      pageData: pageDataArray,
    },
  });

  pageEnableKeyArray.forEach((key) => {
    let enableButton = document.getElementById(key);
    enableButton.onclick = function () {
      OnChangeEnable(key);
    };

    chrome.storage.local.get([key], function (items) {
      let enable = items[key];

      // undefinedならtrueに
      if (enable === undefined) {
        enable = true;
        chrome.storage.local.set({ [key]: enable });
      }
      enableButton.textContent = enable === true ? "Enabled" : "Disabled";
    });
  });
};
