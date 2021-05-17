//global variable
let exp;
let operation = (a,b,op) => {
    switch(op){
        
        case '+': return a + b;

        case '-': return a - b;
        
        case '*': return a * b;

        case '/': return a / b;

        case '%': return a % b;

    }    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//conversion of infix expression to postfix expression 
class Conversion {
    constructor(capacity) {
        this.top = -1;
        this.capacity = capacity;
        this.array = [];
        this.output = [];
        this.precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '%': 2
        }
    }

    isEmpty() {
        return this.top == -1 ? true : false ;
    }

    peek() {
        return this.array[this.top];
    }

    pop() {
        if(!this.isEmpty()){
            this.top -= 1;
            return this.array.pop();
        }
    }

    append(op) {
        this.top += 1;
        this.array.push(op);
    }

    isNumber(op) {
        return !isNaN(op) || op === '.';
    }

    notGreater(i) {
        try {
            let a = this.precedence[i];
            let b = this.precedence[this.peek()];
            return b >= a ? true : false ;
        }
        catch(err) {
            return false;
        }
    }

    infixToPostfix(exp) {
        let i = 0;
        while(i<this.capacity) {
            
            if(this.isNumber(exp[i])){
                // this.output.push(i);
                while(i < this.capacity && this.isNumber(exp[i])){
                    this.output.push(exp[i]);
                    i++;
                }
                i--;
                this.output.push(' ');
            }
            else if(exp[i] === '('){
                this.append(exp[i]);
            }
            else if(exp[i] == ')'){
                while(!this.isEmpty() && this.peek() != '('){
                    let a = this.pop();
                    this.output.push(a);
                    this.output.push(' ');
                }
                if(!this.isEmpty() && this.peek() != '('){
                    return -1;
                }
                else{
                    this.pop();
                }
            }
            else{
                while(!this.isEmpty() && this.notGreater(exp[i])){
                    let x = this.pop();
                    this.output.push(x);
                    this.output.push(' ');
                }
                this.append(exp[i]);
            }
            i++;
        }
        while(!this.isEmpty()){
            let x = this.pop();
            this.output.push(x);
            this.output.push(' ');
        }

        this.output.pop();

        return this.output.join(''); 
    }
}

//evaluating the postfix expression and returng the result
class EvalPostfix {
    constructor() {
        this.stack = [];
        this.top = -1;
    }

    isEmpty() {
        return this.top == -1 ? true : false ;
    }

    pop() {
        if(!this.isEmpty()){
            this.top -= 1;
            return this.stack.pop();
        }
    }

    append(op) {
        this.top += 1;
        this.stack.push(op);
    }

    isNumber(op) {
        return !isNaN(op);
    }

    evalFunc(exp) {
        let i = 0;
        while(i<exp.length){
            if(this.isNumber(exp[i])){
                this.append(exp[i]);
            }
            else{
                let a = +this.pop();
                let b = +this.pop();
                
                this.append(operation(a,b,exp[i]));
            }
            i++;
        }

        return this.pop();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function to create new tags
function createTag(tagName,cont,classes) {
    const tag = document.createElement(tagName);
    tag.innerText = cont;
    let classStr = classes.reduce((sum,item) => sum + item + ' ','');
    tag.setAttribute('class',classStr);

    if(classes[0] == 'keys'){
        tag.onclick = click;
    }
    else if(tagName == 'input'){
        tag.setAttribute('type','text');
        tag.setAttribute('placeholder','0');
        tag.setAttribute('readonly','');
    }

    return tag; 
}

//creating the required tags in html
const container = createTag('div','',['container']);
const display = createTag('div','',['display']);
const display1 = createTag('input','',['display-1','bg-lightgrey']);
const display2 = createTag('input','',['display-1','bg-lightgrey']);
const keyPad = createTag('div','',['key-pad','bg-grey']);
const row1 = createTag('div','',['row']);
const row2 = createTag('div','',['row']);
const row3 = createTag('div','',['row']);
const row4 = createTag('div','',['row']);
const row5 = createTag('div','',['row']);
const row6 = createTag('div','',['row']);
const keyac = createTag('span','AC',['keys','bg-red','flex-2']);
const keyc = createTag('span','c',['keys','bg-red']);
const keymodulus = createTag('span','%',['keys','bg-lightgrey']);
const keyseven = createTag('span','7',['keys','bg-lightgrey']);
const keyeight = createTag('span','8',['keys','bg-lightgrey']);
const keynine = createTag('span','9',['keys','bg-lightgrey']);
const keydivide = createTag('span','÷',['keys','bg-lightgrey']);
const keyfour = createTag('span','4',['keys','bg-lightgrey']);
const keyfive = createTag('span','5',['keys','bg-lightgrey']);
const keysix = createTag('span','6',['keys','bg-lightgrey']);
const keymultiply = createTag('span','×',['keys','bg-lightgrey']);
const keyone = createTag('span','1',['keys','bg-lightgrey']);
const keytwo = createTag('span','2',['keys','bg-lightgrey']);
const keythree = createTag('span','3',['keys','bg-lightgrey']);
const keyminus = createTag('span','-',['keys','bg-lightgrey']);
const keydoublezero = createTag('span','00',['keys','bg-lightgrey']);
const keyzero = createTag('span','0',['keys','bg-lightgrey']);
const keydecimal = createTag('span','.',['keys','bg-lightgrey']);
const keyplus = createTag('span','+',['keys','bg-lightgrey']);
const keyopbrac = createTag('span','(',['keys','bg-lightgrey']);
const keyclbrac = createTag('span',')',['keys','bg-lightgrey']);
const keyequal = createTag('span','=',['keys','bg-green','flex-2']);

//adding the html tags to the body
document.body.append(container);
container.append(display,keyPad);
display.append(display1,display2);
keyPad.append(row1,row2,row3,row4,row5,row6);
row1.append(keyac,keyc,keymodulus);
row2.append(keyseven,keyeight,keynine,keydivide);
row3.append(keyfour,keyfive,keysix,keymultiply);
row4.append(keyone,keytwo,keythree,keyminus);
row5.append(keydoublezero,keyzero,keydecimal,keyplus);
row6.append(keyopbrac,keyclbrac,keyequal);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//keys onclick function for keypad
function click(){
    switch(this){
        case keydivide: display1.value += '/'; break;

        case keymultiply: display1.value += '*'; break;

        case keyac: allclear(); break;

        case keyc: display1.value = backspace(display1.value); break;

        case keyequal: submit(); break;

        default: display1.value += this.innerText;
    }
}

//event listener to input keys using keyboard
document.addEventListener('keyup',(event) => {
    if(event.location === event.DOM_KEY_LOCATION_NUMPAD || event.key === 'Backspace' || event.key === 'Enter' || event.key === '(' || event.key === ')' || event.key === 'Shift' || !isNaN(event.key) || event.key === '.'){

        switch(event.key){
            case 'Backspace': display1.value = backspace(display1.value); break;

            case 'Enter': submit(); break;

            case 'Shift': break;

            default: display1.value += event.key;
        }
    }
    else{
        alert('Only numbers are allowed !!');
        display1.value = '';
    }
},false);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function for all clear functionality
function allclear(){
    display1.value = '';
    display2.value = '';
}

//function for backspace functionality
function backspace(value){
    let arr = value.split('');
    arr.pop();
    value = arr.join('');
    return value;
}

//function for the sumbit button
function submit(){
    exp = display1.value;
    display1.value = '';
    calculate();
}

//evaluating the given infix expression
function calculate() {

    //creating variable for given classes
    let conversion = new Conversion(exp.length);
    let evalPostfix = new EvalPostfix();

    //converting the given infix expression to postfix expression
    let postfix = conversion.infixToPostfix(exp);

    //evaluating the output postfix expresion
    let result = evalPostfix.evalFunc(postfix.split(' '));

    //updating the result in the html
    display2.value = result;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
