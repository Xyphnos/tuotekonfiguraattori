'use strict';

const addForm = document.getElementById('addForm');
const url = 'http://localhost:3000'; // change url when uploading to server
const input = document.getElementsByTagName('input');


addForm.addEventListener('submit', async (evt) => {

    evt.preventDefault();

    let inputs = {};

    for (let i = 0; i < input.length; i++){
        inputs[`${input[i].name}`] = `${input[i].value}`;
    }

    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputs)
    };

    console.log(fetchOptions);
    const response = await fetch(url + '/conf', fetchOptions);
    const json = await response.json();
    console.log('add response', json);
});
let x = document.getElementById("data");
let txt = "";
if ('files' in x) {
    if (x.files.length == 0) {
        txt = "Select one or more files.";
    } else {
        for (var i = 0; i < x.files.length; i++) {
            txt += "<br><strong>" + (i+1) + ". file</strong><br>";
            var file = x.files[i];
            if ('name' in file) {
                txt += "name: " + file.name + "<br>";
            }
            if ('size' in file) {
                txt += "size: " + file.size + " bytes <br>";
            }
        }
    }
}
