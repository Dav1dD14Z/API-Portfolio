import data from '../Data/skills.js';
import Header from './Components/header.js';

// Template del Header
const header_Element = document.querySelector('header');

const header_data  = {
    text_1: "I'm David Diaz,",
    text_2: "FullStack",
    text_3: "Developer",
    link_1: "#",
    link_2: "../Pages/countries.html",
    link_3: "#"
}

header_Element.innerHTML = Header(header_data.text_1, header_data.text_2, header_data.text_3, header_data.link_1, header_data.link_2, header_data.link_3);

// Template de las tech cards
const container = document.querySelector('.card__container');
data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="card__link">
    <div class="card__background"></div>
    <div class="card__title">
    <h5>${item.name}</h5>
    <p>${item.experience}</p>
    </div>
    </div>
    `;
    container.appendChild(card);   
});





