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

class User {
    constructor(name, last_name, email, password, date, gender, uid, image) {
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.date = date;
        this.gender = gender;
        this.uid = uid;
        this.image = image
    }
}

let global_uid = [];

let users = [];
let json_url =
    "http://practica2-iteso.mybluemix.net/users";
const initData = () => {
    loadJSON(json_url,
        //Callback_ok
        (datos) => {
            for (let user of datos) {
                while (global_uid.includes(user.uid)) {
                    user.uid = Math.floor(Math.random() * 10000);
                }
                users.push(new User(user.nombre, user.apellidos, user.email, user.password, user.fecha, user.sexo, user.uid, user.image));
                global_uid.push(user.uid);
            }
            // console.log(users);
            addUser("Daniel", "Barra", "daniel@correo.com", "estaesunacontra", "2020-10-03", "H", 2);
            addUser("Lore", "Gomez", "lore@correo.com", "estaesunacontra", "2020-10-03", "M", 2);
            userListToHTML(users);
        },
        //Callback_error
        () => {
            console.log("ERROR");
        });
};

function userToHTML(user) {
    let element = ""
    element += `<img src="${user.image}" >`;
    element += `<h1>${user.name} ${user.last_name}</h1>`;
    element += `<p>${user.gender}: ${user.email}</p>`;
    element += `<p>${user.date}</p>`;
    element += `<p>${user.uid}</p>`;
    console.log(element);
    return element;
}

function userListToHTML(userList) {
    for (let user of userList) {
        let userS = userToHTML(user);
        // add content to html
        document.getElementById('info').innerHTML += userS;
    }
}

function addUser(name, last_name, email, password, date, gender, uid) {
    while (global_uid.includes(uid)) {
        uid = Math.floor(Math.random() * 10000);
    }
    global_uid.push(uid);
    let image = (gender === "H") ?
        `https://randomuser.me/api/portraits/men/${users.length}.jpg` :
        `https://randomuser.me/api/portraits/women/${users.length}.jpg`;
    users.push(new User(name, last_name, email, password, date, gender, uid, image));
}


initData();