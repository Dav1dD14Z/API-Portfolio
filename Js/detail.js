import Header from './Components/header.js';

// Template del Header
const header_Element = document.querySelector('header');

const header_data  = {
    text_1: "Welcome to",
    text_2: "Colombia",
    text_3: "Country Detail",
    link_1: "../index.html",
    link_2: "../Pages/countries.html",
    link_3: "#",
}

header_Element.innerHTML = Header(header_data.text_1, header_data.text_2, header_data.text_3, header_data.link_1, header_data.link_2, header_data.link_3);
