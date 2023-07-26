let routes = {};
let templates = {};

function view(url, title) {
    let appDiv = document.getElementById("main-content");

    fetch(url).then(function (page) {
        return page.text();
    }).then(function (html) {
        setInnerHTML(appDiv, html);
        setTitle(title);
    });
}

function route(path, template) {
    if (typeof template === 'function') {
        return routes[path] = template;
    }
    else if (typeof template === 'string') {
        return routes[path] = templates[template];
    } else {
        return;
    };
};

function template(name, templateFunction) {
    return templates[name] = templateFunction;
};

function resolveRoute(route) {
    try {
        return routes[route];
    } catch (e) {
        throw new Error(`Route ${route} not found`);
    };
};

function router(evt) {
    let url = window.location.hash.slice(1) || '/';
    let routeFunc = resolveRoute(url);

    console.log(url);

    routeFunc();
};

function initRoutes() {
    // Define templates here
    template('home', () => view("pages/home.htm"));
    template('projects', () => view("pages/projects.htm", "Projects"));
    template('contact', () => view("pages/contact.htm", "Contact"));
    template('projects-neodori-forever', () => view("pages/projects/neodori-forever.htm", "Neodori Forever"));
    template('projects-ermii-kart', () => view("pages/projects/ermii-kart.htm", "Ermii Kart DS"));

    // Define routes here
    route('/', 'home');
    route('/contact', 'contact');
    route('/projects', 'projects');
    route('/projects/neodori-forever', 'projects-neodori-forever');
    route('/projects/ermii-kart', 'projects-ermii-kart');
}

initRoutes();

// Add event listeners
window.addEventListener('load', router);
window.addEventListener('hashchange', router);