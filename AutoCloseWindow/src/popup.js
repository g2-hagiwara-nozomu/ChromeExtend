function OnAdd() {
    chrome.storage.local.get(["list"], function (items) {
        var json = JSON.parse(items.list);
        const name = document.getElementById("name").value
        json.push(name);
        chrome.storage.local.set({ "list": JSON.stringify(json) });
        location.reload();
    });
}
function OnInit() {
    chrome.storage.local.set({ "list": "[]" });
    chrome.storage.local.set({ "enable": "ON" });
    location.reload();
}
function OnChangeEnable() {
    chrome.storage.local.get(["enable"], function (items) {
        var enable = items.enable;
        if (enable == "ON") {
            enable = "OFF";
        } else {
            enable = "ON";
        }
        chrome.storage.local.set({ "enable": enable });
        location.reload();
    });
}
function OnCurrent() {

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        document.getElementById("name").value = tabs[0].url;
    });
}
function OnRemove(string) {
    chrome.storage.local.get(["list"], function (items) {
        var json = JSON.parse(items.list);
        json = json.filter(function (item, index) {
            return item != string;
        });
        chrome.storage.local.set({ "list": JSON.stringify(json) });
        location.reload();
    });
}
function OnCheck() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        var url = tabs[0].url;
        const name = document.getElementById("name").value;
        var re = new RegExp(name);
        if (re.test(url)) {
            document.getElementById("check").textContent = "Check:YES";
        }else{
            document.getElementById("check").textContent = "Check:NO";
        }
    });
}

window.onload = function () {
    chrome.storage.local.get(["list", "enable"], function (items) {
        try {
            var json = JSON.parse(items.list);
        } catch (error) {
            var json = JSON.parse("[]");
        }
        // 一覧と削除ボタン
        json.forEach(element => {
            const list = document.getElementById("list");
            var newE = document.createElement("l");
            var newC = document.createTextNode(element + " ")
            newE.appendChild(newC);
            list.appendChild(newE);

            var button = document.createElement("Input");
            button.setAttribute("type", "button");
            button.setAttribute("id", element);
            button.setAttribute("value", "remove");
            list.appendChild(button);

            var br = document.createElement("br");
            list.appendChild(br);

            button.onclick = () => { OnRemove(element); };
        });

        // 有効無効ボタン
        if (items.enable != null) {
            document.getElementById("enable").textContent = items.enable;
        } else {
            chrome.storage.local.set({ "enable": "ON" });
            document.getElementById("enable").textContent = "ON";
        }
    });

    document.getElementById("add").onclick = OnAdd;
    document.getElementById("check").onclick = OnCheck;
    document.getElementById("current").onclick = OnCurrent;
    document.getElementById("init").onclick = OnInit;
    document.getElementById("enable").onclick = OnChangeEnable;
}