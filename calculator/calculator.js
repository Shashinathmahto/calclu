


let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {

        let btn = e.target.innerText.trim();  // THE IMPORTANT FIX

        if(btn === '='){
            string = eval(string);
            input.value = string;
        }
        else if(btn === 'AC'){
            string = "";
            input.value = string;
        }
        else if(btn === 'DEL'){
            string = string.slice(0, -1);
            input.value = string;
        }
        else if(btn === '%'){
            string += "/100";
            input.value = string;
        }
        else {
            string += btn;
            input.value = string;
        }
    })
});
