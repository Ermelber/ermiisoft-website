//Ready
window.onload = function () {

}

var setInnerHTML = function (elm, html) {
  elm.innerHTML = html;
  Array.from(elm.querySelectorAll("script")).forEach(oldScript => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes)
      .forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

function loadContent() {
  var mainContent = document.getElementById("main-content");
  var params = new URLSearchParams(window.location.search);

  var pageName = params.has("p") ? params.get("p") : "home";

  fetch("pages/" + pageName + ".htm").then(function (page) {
    return page.text();
  }).then(function (html) {
    setInnerHTML(mainContent, html);
  });
}

function loadProjectList(containerId, count) {
  if (!count)
    count = 1000;

  var mainContent = document.getElementById(containerId);

  var fetchTemplate = fetch("templates/project-entry.htm").then(function (templateFile) { return templateFile.text(); });
  var fetchProjectJson = fetch("assets/data/project-list.json").then(function (response) { return response.json(); });

  Promise.all([fetchTemplate, fetchProjectJson]).then(function (results) {
    var template = results[0];
    var projects = results[1];

    for (var i = 0; i < projects.length && i < count; i++) {
      var item = projects[i];
      var entry = template;

      var tagsHtml = "";
      var linksHtml = "";

      if (item.tags) {
        for (var t = 0; t < item.tags.length; t++) {
          tagsHtml += '<a href="#" class="pill">' + item.tags[t] + '</a>';
        }
      }
      if (item.links) {
        for (var l = 0; l < item.links.length; l++) {
          linksHtml += '<a target="_blank" href="' + item.links[l].url + '"><img class="svg-icon" src="' + item.links[l].icon + '"></a>';
        }
      }

      entry = entry.replace("{{name}}", item.name);
      entry = entry.replace("{{url}}", item.url);
      entry = entry.replace("{{icon}}", item.icon);
      entry = entry.replace("{{description}}", item.description);
      entry = entry.replace("{{tags}}", tagsHtml);
      entry = entry.replace("{{links}}", linksHtml);

      mainContent.innerHTML += entry;
    }

  });
}