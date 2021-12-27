function OnChangeEnable() {
    chrome.storage.local.get(["enableJenkins"], function (items) {
        let enable = items.enableJenkins;

        enable = !enable;

        chrome.storage.local.set({ "enableJenkins": enable });
        location.reload();
    });
}

window.onload = function () {

    var app = new Vue({
        el: '#app',
        data: {
            pageData: [
                { page: 'enableJenkins', enabled: 'Enabled' },
                { page: 'enableRedmine', enabled: 'Enabled' },
                { page: 'enableAdmin', enabled: 'Enabled' },
            ]
        }
    });

    // let extensionName = PageDefine.Jenkins.toString();
    let enableButton = document.getElementById("enableJenkins");
    enableButton.onclick = OnChangeEnable;
    chrome.storage.local.get(["enableJenkins"], function (items) {
        let enable = items.enableJenkins;

        // undefinedならtrueに
        if (enable === undefined) {
            enable = true;
            chrome.storage.local.set({ "enableJenkins": enable });
        }
        enableButton.textContent = (enable === true ? "Enabled" : "Disabled");
    });
}