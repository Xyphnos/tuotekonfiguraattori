'use strict';

const dropDownDiv = document.getElementById('ddd');
const url = 'http://localhost:3000/conf'; // change url when uploading to server
const but = document.getElementById('but');
let num = 0;

const fetchFunc = async() =>{
    const response = await fetch(url);
    const son = await response.json();
    console.log(son);
    return son;
};

fetchFunc();

but.addEventListener('click', () => {
    dropDownFunction(num);
    num +=1;
});

//disables the default option and creates a new dropdown
const dropDownFunction = async (count) => {
    let current = document.getElementById("s" + count);

    if (current.value !== "please select one"){

        document.getElementById("o" + count).disabled = true;
        count += 1;
        dropDownDiv.innerHTML += `<select id="s${+count}"></select>`;
        let asd = document.getElementById("s" + count);
        asd.innerHTML +=`<option id="o${+count}">please select one</option>`;
    }
};
