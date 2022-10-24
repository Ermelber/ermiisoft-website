//Ready
window.onload = function() {
    
}

var setInnerHTML = function(elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes)
        .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

function loadContent() {
    var mainContent = document.getElementById("main-content");
    var params = new URLSearchParams(window.location.search);

    var pageName = params.has("p") ? params.get("p") : "home";

    fetch("pages/"+pageName+".htm").then(function(page){
        return page.text();
    }).then(function(html){
        setInnerHTML(mainContent, html);
    });
}

function loadProjectList(containerId, count) {
    console.log(containerId);
}