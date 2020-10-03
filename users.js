"use strict";

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

let users = [];
let json_url =
    "http://practica2-iteso.mybluemix.net/users";
const initData = () => {
    loadJSON(json_url,
        //Callback_ok
        (datos) => {
            for (let user of datos) {
                users.push(new User(user.nombre, user.apellidos, user.email, user.password, user.fecha, user.sexo, user.uid, user.image));
            }
            console.log(users);
        },
        //Callback_error
        () => {
            console.log("ERROR");
        });
};

initData();