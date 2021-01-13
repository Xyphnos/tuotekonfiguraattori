'use strict';

const url = 'http://localhost:3000/conf'; // change url when uploading to server
const dropdownParent = document.getElementById('dropdownParent');
const dataParent = document.getElementById('dataParent');
const clearButton = document.getElementById('clearSelect');
let stopper = true;
let currentlySelected = null;
let num = 0;
let lights;
let selections = [];
let inputs = [];

const fetchInit = async () =>{
    const response = await fetch(url + '/init');
    const son = await response.json();
    return son;
};

const fetchLinks = async (id, name) =>{
    const response = await fetch(url + '/links/' + '?id=' + id);
    const son = await response.json();
    const itemize = [name, son];
    return itemize
};

const fetchFinal = async (array) =>{
    const response = await fetch(url + '/final/'+ '?one=' + array[0]+ '&two=' + array[1]+ '&three=' + array[2]+ '&four=' + array[3]+ '&five=' + array[4]+ '&six=' + array[5]+ '&seven=' + array[6]+ '&eight=' + array[7]+ '&nine=' + array[8]+ '&ten=' + array[9]+ '&eleven=' + array[10]+ '&twelve=' + array[11]+ '&thirteen=' + array[12]);
    const son = await response.json();
    return son;
};

const fetchField = async (field) =>{
    const response = await fetch(url + '?one=' + field.toString());
    const son = await response.json();
    return son;

};


const caseMap = (selection, object) => {
    switch (selection) {
        case 0:
            return ['one', object.one];
        case 1:
            return ['two', object.two];
        case 2:
            return ['three', object.three];
        case 3:
            return ['four', object.four];
        case 4:
            return ['five', object.five];
        case 5:
            return ['six', object.six];
        case 6:
            return ['seven', object.seven];
        case 7:
            return ['eight', object.eight];
        case 8:
            return ['nine', object.nine];
        case 9:
            return ['ten', object.ten];
        case 10:
            return ['eleven', object.eleven];
        case 11:
            return ['twelve', object.twelve];
        case 12:
            return ['thirteen', object.thirteen];
    }
};

const initialLoad = async () =>{
    const data = await fetchInit();

    dropdownParent.innerHTML += `<p>one</p><select id="selection0" class="dropdown"></select>`;

    let selection = document.getElementById("selection0");
    selection.innerHTML +=`<option id="default0" name="default" selected="true" disabled="disabled">please select one</option>`;

    for(let i = 0; i < data.length; i++){
        selection.innerHTML += `<option id="option${num}${+i}" class="option" value="${data[i].one}">${data[i].one}</option>`;
    }
    num = 0;
    stopper = true;
    selections = [];
    inputs = [];
    lights = '';
};

//disables the default option and creates a new dropdown
const dropDownFunction = async (count, current) => {
    selections.push(current.value);

    if(count === 0){
        lights = await fetchField(current.value);
    }

    if (current.value !== "please select one" && stopper === true) {

        document.getElementById("selection" + count).disabled = true;
        count += 1;
        if (count < 13){

            dropdownParent.innerHTML += `<p>${caseMap(count, lights[0])[0]}</p><select id="selection${+count}" class="dropdown"></select>`;

            let selection = document.getElementById("selection" + count);

            selection.innerHTML += `<option id="default${+count}" selected="true" disabled="disabled">please select one</option>`;

            for (let i = 0; i < lights.length; i++) {

                let currentCase;
                let counter = false;

                for (let j = 0; j < selections.length; j++) {

                    if (caseMap(j, lights[i])[1] !== selections[j]) {
                        counter = false;
                        j = selections.length;
                    }
                    else {
                        counter = true;
                    }
                }

                if (counter === true) {
                    currentCase = await caseMap(count, lights[i]);
                    selection.innerHTML += `<option id="option${count}${+i}" class="option" value="${currentCase[1]}">${currentCase[1]}</option>`;
                    counter = false;
                }
            }
            for(let i = 1; i < selection.childElementCount; i++){
                for(let j = 2; j < selection.childElementCount; j++) {
                    if (selection.children[i].value === selection.children[j].value) {
                        selection.removeChild(selection.childNodes[j]);
                    }
                }
            }
        }
        else{
            const fetchData = await fetchFinal(inputs);
            const dataItems = await fetchLinks(fetchData[0].id, fetchData[0].productName);
            dataParent.innerHTML = `<h1 class="productName">${dataItems[0]}</h1>`;
            for(let i = 0; i < dataItems[1].length; i++){
                dataParent.innerHTML += `<br><link href="${dataItems[1][i].link} class='productInfo'">${dataItems[1][i].link}</link><br>`;
            }
            stopper = false;
        }
    }

};

window.addEventListener('load', async () =>{
    await initialLoad();
});

dropdownParent.onclick = (event) =>{
    if(event.target.className === 'dropdown'){
        currentlySelected = event.target;
    }
    else if( event.target.className === 'option'){
        document.getElementById('default' + num).innerText = event.target.value;
        inputs.push(event.target.value);
        dropDownFunction(num, currentlySelected);
        num+=1;
    }
};
clearButton.addEventListener('click', async () => {
    dropdownParent.innerHTML = '';
    dataParent.innerHTML = '';
    initialLoad();
});
