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
        this.image = image;
    }

    static createUser(user) {
        return new User(user.nombre, user.apellidos, user.email, user.password, user.fecha, user.sexo, user.uid, user.image)
    }
}

let global_uid = [];
let global_email = [];

let users = [];
let json_url =
    "http://practica2-iteso.mybluemix.net/users";
const initData = () => {
    loadJSON(json_url,
        //Callback_ok
        (datos) => {
            for (let user of datos) {
                user.uid = getNewId(user.uid);
                user.email = verifyEmail(user.email);
                users.push(User.createUser(user));
            }
            addUser("Daniel", "Barra", "daniel@correo.com", "estaesunacontra", "2020-10-03", "H");
            addUser("Lore", "Gomez", "lore@correo.com", "estaesunacontra", "2019-10-03", "M");
            addUser("Juan", "Perez", "juan@correo.com", "estaesunacontra", "2018-10-03", "H");
            addUser("Ana", "Ochoa", "ana@correo.com", "estaesunacontra", "2017-10-03", "M");
            addUser("Rauuul", "Correa", "rauuuul@correo.com", "estaesunacontra", "2016-10-03", "H");
            addUser("Mimi", "Santorini", "mimi@correo.com", "estaesunacontra", "2015-10-03", "M");
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
    return element;
}

function userListToHTML(userList) {
    document.getElementById('info').innerHTML = "";
    for (let user of userList) {
        let userS = userToHTML(user);
        // add content to html
        document.getElementById('info').innerHTML += userS;
    }
}

function getNewId(uid) {
    let iteration = 0; //used to break infinite loop
    while (uid === undefined || uid > 100 || uid <= 0 || (global_uid.includes(uid) && iteration < 100)) {
        uid = Math.floor(Math.random() * 99) + 1;
        iteration++;
    }
    if (iteration >= 100) return undefined;
    global_uid.push(uid);
    return uid;
}

function verifyEmail(email) {
    if (global_email.includes(email))
        email = undefined;
    else
        global_email.push(email);
    return email;
}

function addUser(name, last_name, email, password, date, gender) {
    let uid = getNewId();
    let genderS = (gender === "H") ? "men" : "women";
    let image =
        `https://randomuser.me/api/portraits/${genderS}/${uid}.jpg`;

    email = verifyEmail(email);
    users.push(new User(name, last_name, email, password, date, gender, uid, image));
}

function updateUser(uid, newValue) {
    let index = users.findIndex((element) => element.uid === uid);
    if (index < 0) return;
    users[index].name = newValue.name;
    users[index].last_name = newValue.last_name;
    users[index].email = newValue.email;
    users[index].password = newValue.password;
    users[index].date = newValue.date;
    users[index].gender = newValue.gender;
    users[index].image = newValue.image;
    userListToHTML(users);
}

function deleteUser(uid) {
    let index = users.findIndex((element) => element.uid === uid);
    if (index < 0) return;
    users.splice(index, 1);
    userListToHTML(users);
}

function sortUsers(cb) {
    users.sort(cb);
    userListToHTML(users);
}

//function used to sort by user id
function compare(a, b) {
    if (a.uid < b.uid) {
        return -1;
    }
    if (a.uid > b.uid) {
        return 1;
    }
    return 0;
}

function validateDate(userDate, fechaIni, fechaFin) {
    userDate = Date.parse(userDate);
    let result = true;
    if (fechaIni !== undefined) {
        fechaIni = Date.parse(fechaIni);
        result &= (userDate >= fechaIni);
    }
    if (fechaFin !== undefined) {
        fechaFin = Date.parse(fechaFin);
        result &= (userDate <= fechaFin);
    }
    return result;
}

function findUsers(nombre, email, sexo, fechaIni, fechaFin) {
    let filteredUsers = users;
    filteredUsers = filteredUsers.filter((user) => {
        let result = true;
        if (nombre !== undefined) result &= (user.name.toUpperCase().includes(nombre.toUpperCase())) || (user.last_name.toUpperCase().includes(nombre.toUpperCase()));
        if (email !== undefined && user.email !== undefined) result &= (user.email.toUpperCase() === email.toUpperCase());
        if (sexo !== undefined) result &= (user.gender.toUpperCase() === sexo.toUpperCase());
        result &= validateDate(user.date, fechaIni, fechaFin);
        return result;
    });
    userListToHTML(filteredUsers);
}


initData();
// updateUser(users[2].uid, users[1]);
// deleteUser(users[2].uid);
// sortUsers(compare)
// findUsers(undefined, "rauuuul@correo.com", "H");
// findUsers(undefined, undefined, undefined, "2000-10-20", "2016-01-01");