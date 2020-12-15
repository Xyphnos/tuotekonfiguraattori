'use strict';

const dropDownDiv = document.getElementById('ddd');
const url = 'http://localhost:3000/conf'; // change url when uploading to server
const but = document.getElementById('but');
let num = 0;
let lights;
let selections = [];
let runLength;

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
          return object.one;
      case 1:
          return object.two;
      case 2:
          return object.three;
      case 3:
          return object.four;
      case 4:
          return object.five;
      case 5:
          return object.six;
      case 6:
          return object.seven;
      case 7:
          return object.eight;
      case 8:
          return object.nine;
      case 9:
          return object.ten;
      case 10:
          return object.eleven;
      case 11:
          return object.twelve;
      case 12:
          return object.thirteen;
      case 13:
          return object.data;
  }
};

window.addEventListener('load', async () =>{

    const data = await fetchInit();

    dropDownDiv.innerHTML += `<select id="s0"></select>`;

    let selection = document.getElementById("s0");
    selection.innerHTML +=`<option id="o0" name="default" selected="true" disabled="disabled">please select one</option>`;

    for(let i = 0; i < data.length; i++){
        selection.innerHTML += `<option id="o'${num}''${i}'">${data[i]}</option>`;
    }
});

but.addEventListener('click', () => {
    dropDownFunction(num);
    num +=1;
});

//disables the default option and creates a new dropdown
const dropDownFunction = async (count) => {
    let current = document.getElementById("s" + count);
    let remover = document.getElementsByName('default');
    selections.push(current.value);

    if(count === 0){
        lights = await fetchField(current.value);
         runLength = lights.length;
    }

    if (current.value !== "please select one") {

        document.getElementById("s" + count).disabled = true;
        count += 1;
        dropDownDiv.innerHTML += `<select id="s${+count}"></select>`;
        let selection = document.getElementById("s" + count);
        selection.innerHTML += `<option id="o${+count}">please select one</option>`;

        for(let i = 0; i < runLength; i++) {
            let currentCase;

            let counter = false;

            for(let j = 0; j < selections.length; j++){

                if(caseMap(j, lights[i]) !== selections[j]){
                    counter = false;
                    j = selections.length;
                }
                else{
                    counter = true;
                }
            }

            if(counter === true){
                currentCase = caseMap(count, lights[i]);
                selection.innerHTML += `<option id="o'${count}''${i}'">${currentCase}</option>`;
                counter = false;
            }

        }
    }

};
