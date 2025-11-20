document.getElementById("loginForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        window.location.href = "../Pages/countries.html";
        localStorage.setItem("status", data.status);
    } else {
        Swal.fire({
            icon: "error",
            title: "Lo sentimos!",
            text: "El usuario o la contraseña son incorrectos.",
            confirmButtonText: "Intentar de nuevo",
            confirmButtonColor: "#3085d6",
            timer: 3000,
        });
    }
});