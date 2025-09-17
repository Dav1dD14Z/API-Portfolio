import Header from "./Components/header.js";

// Template del Header
const header_Element = document.querySelector('header');
const header_data  = {
    text_1: "Welcome to",
    text_2: "Countries",
    text_3: "API",
    link_1: "../index.html",
    link_2: "#",
    link_3: "#",
}
header_Element.innerHTML = Header(header_data.text_1, header_data.text_2, header_data.text_3, header_data.link_1, header_data.link_2, header_data.link_3);

// Fetch a la API 

const url = "http://127.0.0.1:8000/countries"
fetch(url)
    .then(response => response.json())
    .then(url => {
        url.data.forEach(element => {
            console.log(element);
            document.querySelector('.countries').innerHTML += `
                <div class="countries__card">
                    <figure>
                        <img src="${element.URL}" alt="Colombia Flag">
                    </figure>
                    <a href="../Pages/detail.html?=${element.id}">${element.nombre}</a>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error:', error));