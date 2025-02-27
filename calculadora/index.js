const input = document.getElementById('display');   // creamos dos variables, en una seleccionamos el valor display y en la otra el button
const buttons  = document.querySelectorAll('button');

let calculateInput = '';     // creamos una variable let con un string vacio que va ir cambiando 

buttons.forEach(button => {  // recorremos la variable buttons y añadimos un evento click a todos los botones
    button.addEventListener('click', () => {
        const value = button.textContent;    // creamos una variable en la que accedemos al etxtcontent del boton

        if (value === '=') {

            if (calculateInput === '') {
                return
                
            } else {
                try {
                    calculateInput = eval(calculateInput);  // es una función de JavaScript que toma una cadena de texto y la ejecuta como código JavaScript, asi podemos sumar, restar, etc 
                }
                catch {
                    calculateInput = 'error';
                }
            } 
        }

        else if (value === 'C') {   // si el valor es C, limpia el imput
            calculateInput = '';
        }

        else if (value === '<') {
            calculateInput = calculateInput.slice(0, -1);   // con el slice empieza en la posicion 0 y elimina la ultima posición con el -1
        }

        else {
            calculateInput += value;  // concatenamos los valores para que aparezcan en el imput
        }
        
        input.value = calculateInput;  // acctualizamos el input enpantalla 
    });
});