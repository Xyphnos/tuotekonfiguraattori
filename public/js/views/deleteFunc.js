'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server
const display = document.getElementById('dataDisplay');

const fetchData = async () =>{
    const response = await fetch(url + '/conf/all');
    const son = await response.json();
    console.log(son);
    return son;
};

const deleteSelected = async (id) =>{

    const data = {id: `${id}`};

    const fetchOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    };
    const response = await fetch(url + '/conf/delete', fetchOptions);
    location.reload();
};


window.addEventListener('load', async () =>{
    const entries = await fetchData();
    for(let i = 0; i < entries.length; i++){
        display.innerHTML +=
            `<details> 
<summary>${entries[i].productName}</summary> 
<li>${entries[i].one}</li>
<li>${entries[i].two}</li>
<li>${entries[i].three}</li>
<li>${entries[i].four}</li>
<li>${entries[i].five}</li>
<li>${entries[i].six}</li>
<li>${entries[i].seven}</li>
<li>${entries[i].eight}</li>
<li>${entries[i].nine}</li>
<li>${entries[i].ten}</li>
<li>${entries[i].eleven}</li>
<li>${entries[i].twelve}</li>
<li>${entries[i].thirteen}</li>
<button id="deleteButton" value="${entries[i].id}">delete</button>
</details>`
    }
});

display.addEventListener('click',(event) =>{
    if(event.target.id === 'deleteButton'){
        deleteSelected(event.target.value)
    }
});
