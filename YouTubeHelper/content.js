window.onload = function () {
  console.log($("ytd-grid-video-renderer"));

  // create button
  const button = document.createElement("button");
  button.textContent = "Mark";
  button.id = "ner-help-button";
  button.onclick = onClickYoutubeHelper;
  $("#primary #contents #title-container h2").first().after(button);
};

function onClickYoutubeHelper() {
  $("ytd-grid-video-renderer").each(function () {
    $(this).addClass("ner-new-video");
    let id = $(this).find("#thumbnail").attr("href").split("?v=")[1].split("&t=")[0];

    console.log(id);
  });
}
