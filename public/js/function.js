'use strict';

const dropDownDiv = document.getElementById('ddd');
const url = 'http://localhost:3000/conf'; // change url when uploading to server
const ddd = document.getElementById('ddd');
let stopper = true;
let currentlySelected;
let num = 0;
let lights;
let selections = [];

const fetchInit = async () =>{
    const response = await fetch(url + '/init');
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
      case 13:
          return ['data', object.data];
  }
};

window.addEventListener('load', async () =>{

    const data = await fetchInit();

    dropDownDiv.innerHTML += `<h4>one</h4><select id="s0" class="dropdown"></select>`;

    let selection = document.getElementById("s0");
    selection.innerHTML +=`<option id="o0" name="default" selected="true" disabled="disabled">please select one</option>`;

    for(let i = 0; i < data.length; i++){
        selection.innerHTML += `<option id="o${num}${+i}" class="option" value="${data[i]}">${data[i]}</option>`;
    }
});

ddd.onclick = (event) =>{
    console.log(event.target);
    if(event.target.className === 'dropdown'){
        currentlySelected = event.target;
    }
    else if( event.target.className === 'option'){
        dropDownFunction(num, currentlySelected);
        num+=1;
    }
};


//disables the default option and creates a new dropdown
const dropDownFunction = async (count, current) => {
    selections.push(current.value);

    if(count === 0){
        lights = await fetchField(current.value);
    }

    if (current.value !== "please select one" && stopper === true) {

        document.getElementById("s" + count).disabled = true;
        count += 1;
        if (count < 13){

            dropDownDiv.innerHTML += `<h4>${caseMap(count, lights[0])[0]}</h4><select id="s${+count}" class="dropdown"></select>`;

        let selection = document.getElementById("s" + count);

        selection.innerHTML += `<option id="o${+count}">please select one</option>`;

        for (let i = 0; i < lights.length; i++) {

            let currentCase;
            let counter = false;

            for (let j = 0; j < selections.length; j++) {

                if (caseMap(j, lights[i])[1] !== selections[j]) {
                    counter = false;
                    j = selections.length;
                } else {
                    counter = true;
                }
            }

            if (counter === true) {
                currentCase = caseMap(count, lights[i])[1];
                selection.innerHTML += `<option id="o${count}${+i}" class="option" value="${currentCase}">${currentCase}</option>`;
                counter = false;
            }

        }
    }
        else{
            stopper = false;
        }
    }

};
