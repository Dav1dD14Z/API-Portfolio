import data from './Data/skills.js';
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