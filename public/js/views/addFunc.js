'use strict';

const addForm = document.getElementById('addForm');
const url = 'http://localhost:3000'; // change url when uploading to server
const input = document.getElementsByTagName('input');
const newLink = document.getElementById('newLink');
const linkDiv = document.getElementById('linkDiv');
let num = 1;


addForm.addEventListener('submit', async (evt) => {

    evt.preventDefault();

    let inputs = {};

    for (let i = 0; i < 14; i++){
        inputs[`${input[i].name}`] = `${input[i].value}`;
    }

    inputs['data'] = {};

    for (let i = 0; i + 14 < input.length; i++){
        inputs.data[i] = `${input[i + 14].value}`;
    }

    console.log(inputs);
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputs)
    };

    console.log(inputs);
    const response = await fetch(url + '/conf', fetchOptions);
    const json = await response.json();
    console.log('add response', json);
});

newLink.addEventListener('click', (evt) =>{

    evt.preventDefault();

    linkDiv.innerHTML += `<input type="text" name="${'data' + num}" class="Ifield"><br><br>`;
    num++;
});
