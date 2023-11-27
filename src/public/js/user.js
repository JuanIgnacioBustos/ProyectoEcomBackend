let modifyRoleBtn = document.getElementById("btn-modify-role")

modifyRoleBtn.addEventListener("click", () => {

    let userId = window.location.pathname.split("/").pop() // Se obtiene el id desde la url

    fetch(`/api/users/premium/${userId}`, {
        method: 'POST'
    })
    .then(result => {
        console.log(result)
        if (result.status === 200) {
        Swal.fire({
            icon: 'success',
            title: 'The user role has been modified (reloading the page)',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
        setTimeout(() => window.location.reload(), 3000) // Recargamos la pagina para mostrar los cambios
        }
        else {
        Swal.fire({
            icon: 'error',
            title: `The user role couldn't be modified (the user is lacking documentation)`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
        }
    })
})