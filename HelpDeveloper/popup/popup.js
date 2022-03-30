const getStorage = (key) =>
  new Promise((resolve) => {
    chrome.storage.local.get(key, resolve);
  });

// 全ページリスト
const pageEnableKeyArray = [
  Define.getEnableKey(Define.page.admin),
  Define.getEnableKey(Define.page.jenkins),
  Define.getEnableKey(Define.page.redmine),
  Define.getEnableKey(Define.page.emLauncher),
  Define.getEnableKey(Define.page.confluence),
];

async function OnChangeEnable(key) {
  let items = await getStorage();
  SetEnable(key, !items[key]);
}

function SetEnable(key, enable) {
  chrome.storage.local.set({ [key]: enable });
  location.reload();
}

async function InitializeText() {
  let enableCount = 0;

  for (let index = 0; index < pageEnableKeyArray.length; index++) {
    const key = pageEnableKeyArray[index];

    let enableButton = document.getElementById(key);
    enableButton.onclick = function () {
      OnChangeEnable(key);
    };

    let items = await getStorage();
    let enable = items[key];

    // set true if undefined
    if (enable === undefined) {
      enable = true;
      chrome.storage.local.set({ [key]: enable });
    }

    enableCount += enable ? 1 : 0;
    enableButton.textContent = enable === true ? "Enabled" : "Disabled";
  }

  return enableCount;
}

window.onload = async function () {
  //
  let pageDataArray = [];
  const enableText = "Enable";
  pageEnableKeyArray.forEach((key) => {
    pageDataArray.push({ page: key, enabled: enableText });
  });

  // each enable

  // all enable
  let enableCount = await InitializeText();
  let allEnableButton = document.getElementById("enable_all");
  if (enableCount === pageEnableKeyArray.length) {
    enableCount = 1;
  } else if (enableCount !== 0) {
    enableCount = 2;
  }

  allEnableButton.onclick = function () {
    pageEnableKeyArray.forEach((key) => {
      // 0>1 1,2>0
      SetEnable(key, enableCount === 0);
    });
  };

  // all enable button text
  let allEnableText = "";
  switch (enableCount) {
    case 0:
      allEnableText = "All Disabled";
      break;
    case 1:
      allEnableText = "All Enabled";
      break;
    case 2:
      allEnableText = "Mixed";
      break;
  }

  allEnableButton.textContent = allEnableText;
};
