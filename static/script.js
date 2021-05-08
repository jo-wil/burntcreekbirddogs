"use strict";

var PICTURES = {
  general: ["general_1.jpg", "general_2.jpg", "general_3.jpg", "general_4.jpg", "general_5.jpg", "general_6.jpg", "general_7.jpg", "general_8.jpg", "general_9.jpg", "general_10.jpg", "general_11.jpg",],
  upland: ["upland_1.jpg", "upland_2.jpg", "upland_3.jpg", "upland_4.jpg", "upland_5.jpg", "upland_6.jpg", "upland_7.jpg", "upland_8.jpg"],
  waterfowl: ["waterfowl_1.jpg", "waterfowl_2.jpg", "waterfowl_3.jpg"],
};

function getCarouselIndicatorsHTML(_, index) {
  return `<button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="${index}" class="${
    index === 0 ? "active" : ""
  }"></button>`;
}

function getCarouselInnerHTML(link, index) {
  return `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="static/${link}" class="d-block w-100" alt="Picture of dogs">
      </div>`;
}

function getCategoryHTML(s) {
  if (s === 'general') {
    return '';
  } else {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

function getHTML(route) {
  return window
    .fetch(route + ".html")
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Error, please refresh the page an try again.");
      }
    })
    .catch((e) => {
      console.error(e);
      alert(e.toString());
      return "";
    });
}

function getRouteFromUrl() {
  return window.location.hash.replace("#", "");
}

function onHashChange(event) {
  var route = getRouteFromUrl() || "home";
  var route_ = route.includes("photosandvideos") ? "photosandvideos" : route;
  getHTML(route_).then((html) => {
    if (route_ === "photosandvideos") {
      var searchParams = new URLSearchParams(route.split("?")[1]);
      var category = searchParams.get("category") || "general";
      var pictures = PICTURES[category] || [];
      var carouselIndicatorsHTML = pictures
        .map(getCarouselIndicatorsHTML)
        .join("\n");
      var carouselInnerHTML = pictures.map(getCarouselInnerHTML).join("\n");
      document.querySelector("main").innerHTML = html
        .replace("category", getCategoryHTML(category))
        .replace("carousel-indicators-html", carouselIndicatorsHTML)
        .replace("carousel-inner-html", carouselInnerHTML);
    } else {
      document.querySelector("main").innerHTML = html;
    }
  });
}

function main() {
  console.log("JavaScript loaded ...");
  window.addEventListener("hashchange", onHashChange);
  onHashChange();
}

document.addEventListener("DOMContentLoaded", main);
