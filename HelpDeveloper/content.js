window.onload = function () {
  let url = location.href;

  PageAction_Admin.OnExtend(url);
  PageAction_Confluence.OnExtend(url);
  PageAction_EmLauncher.OnExtend(url);
  PageAction_Jenkins.OnExtend(url);
  PageAction_Movie.OnExtend(url);
  PageAction_RedMine.OnExtend(url);
};
