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

// Identificación de usuario (Login)
function applyRestrictions() {
    const status = localStorage.getItem("status");
    const formElement = document.getElementById("dataForm");
    const buttons = document.querySelectorAll(".countries__card--delete");
    const link = document.querySelectorAll(".countries__card--links");

    if (status === "0") {
        formElement.style.display = "none";
    
        buttons.forEach(btn => {
            btn.style.display = "none";
        });

        link.forEach(lnk => {
            lnk.style.padding = "7px 107px";
        });
    }
}

// Fetch a la API 
const url = "http://127.0.0.1:8000/countries"
fetch(url)
    .then(response => response.json())
    .then(url => {
        url.data.forEach(element => {
            document.querySelector('.countries').innerHTML += `
                <div class="countries__card" data-id="${element.id}">
                    <figure>
                        <img src="${element.URL}" alt="Colombia Flag">
                    </figure>
                    <div class="countries__card--info">
                        <a class="countries__card--links" href="../Pages/landing.html?id=${element.id}">${element.nombre}</a>
                        <button class="countries__card--delete">Eliminar</button>
                    </div>
                </div>
            `;

            applyRestrictions();
        });
    })
    .catch(error => console.error('Error:', error));


    // POST API
document.getElementById("dataForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries()); // Convierte a objeto

    try {
        const response = await fetch("http://127.0.0.1:8000/countries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("El pais fue agregado!");
        } else {
            alert("El pais no fue agregado");
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
});

// DELETE API
document.addEventListener("click", async function(e) {
    if (e.target.classList.contains("countries__card--delete")) {
        const card = e.target.closest(".countries__card");
        const id = card.dataset.id;

        if (confirm("¿Seguro que quieres eliminar este país?")) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/countries/${id}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    alert("País eliminado correctamente");
                    card.remove(); // Eliminar del DOM
                } else {
                    alert("Error al eliminar el país");
                }
            } catch (error) {
                console.error("Error en la conexión:", error);
            }
        }
    }
});

