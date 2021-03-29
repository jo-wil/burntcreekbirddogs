'use strict';

function getHTML(route) {
    return window.fetch(route + '.html')
                 .then(x => x.text())
                 .catch(e => console.error(e) && alert('Error occured, please reload the page and try again.'));
}

function getRouteFromUrl() {
    return window.location.hash.replace('#', '');
}

function onHashChange(event) {
    var route = getRouteFromUrl() || 'home';
    getHTML(route).then(html => document.querySelector('main').innerHTML = html);
}

function main() {
    console.log('JavaScript loaded ...');
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
}

document.addEventListener('DOMContentLoaded', main);
