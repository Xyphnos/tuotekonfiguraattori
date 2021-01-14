'use strict';

const addForm = document.getElementById('addForm');
const url = 'http://localhost:3000'; // change url when uploading to server
const input = document.getElementsByTagName('input');
const names = document.getElementsByClassName('NField');
const links = document.getElementsByClassName('LField');
const newLink = document.getElementById('newLink');
const linkDiv = document.getElementById('linkDiv');
const errorMessage = document.getElementById('errorMessage');
let num = 1;

addForm.addEventListener('submit', async (evt) => {

    evt.preventDefault();

    console.log(links.length);

    let inputs = {};

    for (let i = 0; i < 14; i++){
        inputs[`${input[i].name}`] = `${input[i].value}`;
    }

    inputs['data'] = {};

    for (let i = 0; i < links.length; i++){
        inputs.data[i] = {name: `${names[i].value}`, address: `${links[i].value}`};

    }

    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputs)
    };

    const response = await fetch(url + '/conf', fetchOptions);
    const json = await response.json();
    console.log('add response', json);
    if(json[0].id === 'duplicate entry'){
        errorMessage.innerText = 'An item with this name already exists!'
    }
    else if(json[0].id === 'null value'){
        errorMessage.innerText = 'Product needs a name!'
    }
});

newLink.addEventListener('click', (evt) =>{

    evt.preventDefault();

    linkDiv.innerHTML += `<input type="text" name="${'name' + num}" class="NField" placeholder="Displayed name for the link..."><br>
<input type="text" name="${'data' + num}" class="LField" placeholder="Link to the file URL..."><br><br>`;
    num++;
});

