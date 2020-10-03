"use strict";

let users_example = [{
    "nombre": "Juan",
    "apellidos": "Perez",
    "email": "perez@gmail.com",
    "password": "hoola",
    "fecha": "2000-10-28",
    "sexo": "H",
    "uid": 10001,
    "image": "https://randomuser.me/api/portraits/men/0.jpg",
}, ];

function loadJSON(urlJSON, cbOK, cbERROR) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', urlJSON);

    // 4. Enviar solicitud
    xhr.send();

    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {

        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            // ejecutar algo si error
            cbERROR();
        } else {
            let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
            // Ejecutar algo si todo está correcto
            // console.log(datos); // Significa que fue exitoso
            cbOK(datos);
        }
    };
}

// let url =
//     "http://practica2-iteso.mybluemix.net/users";
// loadJSON(url);

// // add content to html
// document.getElementById('info').innerHTML = "<h1>Holaaa</h1>"