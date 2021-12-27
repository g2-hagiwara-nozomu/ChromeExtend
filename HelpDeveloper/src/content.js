window.onload = function () {
  let url = location.href;

  PageAction_Jenkins.OnExtend(url);
  PageAction_Admin.OnExtend(url);
  PageAction_RedMine.OnExtend(url);
  PageAction_EmLauncher.OnExtend(url);
};