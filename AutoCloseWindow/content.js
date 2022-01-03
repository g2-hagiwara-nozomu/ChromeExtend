chrome.storage.local.get(["list", "enable"], function (items) {
    if (items.enable == "OFF") return;
    var json = JSON.parse(items.list);
    json.forEach(element => {
        var re = new RegExp(element);
        if (re.test(location.href)) {
            try {
                window.close();
                return;
            } catch (error) {
                return;
            }
        }
    });
});