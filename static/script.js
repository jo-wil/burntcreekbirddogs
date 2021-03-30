'use strict';

function getHTML(route) {
    return window.fetch(route + '.html')
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error, please refresh the page an try again.');
            }
        })
        .catch(e => {
            console.error(e);
            alert(e.toString());
            return '';
        });
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
