import Header from './Components/header.js';

const urlParams = new URLSearchParams(window.location.search);
const countryId = urlParams.get('id');
const MainElement = document.querySelector('main');

const apiURL = `http://127.0.0.1:8000/countries/${countryId}`;

fetch(apiURL)
    .then(response => response.json())
    .then(data => { 
        MainElement.innerHTML = `
            <section class="detail">
                <div class="detail__flag">
                    <img src="${data.url}" alt="Flag of ${data.nombre}">
                </div>
                <div class="detail__text">
                    <h2>${data.nombre}</h2>
                    <p>${data.descripcion}</p>
                    <a href="./countries.html">Go Back</a>
                </div>
            </section>`;

        // Template del Header
        const header_Element = document.querySelector('header');

        const header_data  = {
            text_1: "Welcome to the",
            text_2: `${data.nombre}`,
            text_3: " Detail",
            link_1: "../index.html",
            link_2: "../Pages/countries.html",
            link_3: "#",
        }
        header_Element.innerHTML = Header(header_data.text_1, header_data.text_2, header_data.text_3, header_data.link_1, header_data.link_2, header_data.link_3);

        // Crear el mapa

        var lat = data.latitud;
        var lng = data.longitud;
        var map = L.map('map').setView([lat, lng], 8);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map).bindPopup(`${data.nombre}`).openPopup();

        // Agregar el video
        const videoContainer = document.querySelector('.detail__map--video');
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${data.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

        // Cambiar imagen del Header
        const headerImage = document.querySelector(".header__hero--image")
        headerImage.innerHTML = `<img src="${data.url}" alt="Image of ${data.nombre}">`
    })
    .catch(error => console.error('Error fetching country data:', error));
