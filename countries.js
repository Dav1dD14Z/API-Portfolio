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
                    <a href="">${element.nombre}</a>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error:', error));