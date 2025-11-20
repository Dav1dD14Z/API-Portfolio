document.getElementById("registerForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const status = 0;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById("passwordConfirmation").value;

    if (password !== passwordConfirmation) {
        Swal.fire({
            icon: "error",
            title: "Lo sentimos!",
            text: "Las contraseñas no coinciden.",
            confirmButtonText: "Intentar de nuevo",
        });
        return;
    }

    if (password.length < 6) {
        Swal.fire({
            icon: "error",
            title: "Lo sentimos!",
            text: "La contraseña debe tener al menos 6 caracteres.",
            confirmButtonText: "Intentar de nuevo",
        });
        return
    } else if (username.length < 3) {
        Swal.fire({
            icon: "error",
            title: "Lo sentimos!",
            text: "El nombre de usuario debe tener al menos 3 caracteres.",
            confirmButtonText: "Intentar de nuevo",
        });
        return;
    } else if (username.length > 15) {
        Swal.fire({
            icon: "error",
            title: "Lo sentimos!",
            text: "El nombre de usuario no puede exceder los 15 caracteres.",
            confirmButtonText: "Intentar de nuevo",
        });
        return;
    }

    const response = await fetch("http://127.0.0.1:8000/adding/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password, status})
    });

    const data = await response.json();

    if (response.ok) {
        alert("Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.");
    }
});