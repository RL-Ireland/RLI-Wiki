// Checks if its the first time loading the site
var firstTime = localStorage.getItem("loadedBefore");

// Stores cookie of loadedBefore if its the first time
if (!firstTime) {
    localStorage.setItem("loadedBefore", "true")

    localStorage.setItem("lang", "en");
}

// Sets the language
let currentLang = () => {
    return localStorage.getItem("lang");
}

document.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem("lang") == "ga") {
        // change language
        currentLang = "ga";
        localStorage.setItem("lang", "ga");
        getJSON();
    }
})

function langChangeEN() {

    if (localStorage.getItem("lang") == "ga") {

        // change language
        currentLang = "en";
        localStorage.setItem("lang", "en");
        getJSON();

    } else {
        return console.log("ERROR: tried to change to current language selection (EN).")
    }

}

function langChangeGA() {

    if (localStorage.getItem("lang") == "en") {

        // change language
        currentLang = "ga";
        localStorage.setItem("lang", "ga");

        getJSON();

    } else {
        return console.log("ERROR: tried to change to current language selection (GA).")
    }

}

// Long ass way to get the name of the page but hey it works
let url = window.location.pathname;
let currentPage = url.substring(url.lastIndexOf("/") + 1);
currentPage = currentPage.split(".", 1);
currentPage = currentPage[0];

// Gets all elements in DOM that are translatable
var elements = document.querySelectorAll("[data-text]");
var headerElements = document.querySelectorAll("[data-header]");

var dict;

const getJSON = async function() {

    // gets the file of text based on current language selection
    return fetch("/text.json")
        // store text in "data"
        .then((response) => response.json())
        .then((data) => {
            // injects text based on current language selection
            fireInjection(data);
        });
}

function injectLanguage(key) {

    // construct the dataAttribute search term ie 'data-title'
    var dataAttribute = "data-" + key; // data=title

    // find the html element using the dataAttribute key
    var el = document.querySelectorAll('[' + dataAttribute + ']');

    // check if you have the element to work on?
    if (el.length > 0) {
        // set the text of the element to be the text found for current key and current lang
        el[0].innerText = dict[key][currentLang];
        console.log(el[0]);
    }
}

function fireInjection(res) {
    dict = res;
    // Iterate through each key in your dictionary
    Object.keys(dict).forEach(function(key) {
        injectLanguage(key);
    });
}