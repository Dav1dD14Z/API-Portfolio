const urlParams = new URLSearchParams(window.location.search);
const countryId = urlParams.get('id');
const MainElement = document.querySelector('main');

const apiURL = `http://127.0.0.1:8000/countries/${countryId}`;

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 3,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

fetch(apiURL)
    .then(response => response.json())
    .then(data => { 
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

        // Agregar el nombre del país
        const landingName = document.querySelector('.landing__header--hero')
        landingName.innerHTML = `<h1>${data.nombre}</h1>`;

        // Agregar descripción y bandera
        const descriptionContainer = document.querySelector('.landing__info--text');
        const flagContainer = document.querySelector('.landing__info--image');
        descriptionContainer.innerHTML = `
            <p>${data.descripcion}</p>
            <br>
            <p>${data.descripcion}</p>
        `;
        flagContainer.innerHTML = `<img src="${data.url}" alt="Bandera de ${data.nombre}">`;

    })
    .catch(error => console.error('Error fetching country data:', error));
