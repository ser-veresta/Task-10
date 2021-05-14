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
        return !isNaN(op);
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
    tag.innerHTML = cont;
    let classStr = classes.reduce((sum,item) => sum + item + ' ','');
    tag.setAttribute('class',classStr);

    return tag; 
}

//creating the required tags in html
const container = createTag('div','',['container']);
const instruction = createTag('div','<p>Type to enter the expression in the first box and press enter for output</p>',['inst']);
const display = createTag('div','',['display']); 
const flex = createTag('div','',['flex']);
const display1 = createTag('input','',['display-1','bg-lightgrey']);
display1.setAttribute('placeholder','Expression'); 
display1.setAttribute('readonly','');
const enter = createTag('button','Enter',['bg-green']); 
enter.setAttribute('type','button');
const display2 = createTag('input','',['display-2','bg-lightgrey']);
display2.setAttribute('placeholder','Output');
display2.setAttribute('readonly','');

//appending the tags to html
document.body.append(container);
container.append(instruction,display);
display.append(flex,display2);
flex.append(display1,enter);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//creating a onclick event
enter.onclick = submit;

//event listener to input keys using keyboard
document.addEventListener('keyup',(event) => {
    if(event.location === event.DOM_KEY_LOCATION_NUMPAD || event.key === 'Backspace' || event.key === 'Enter' || event.key === '(' || event.key === ')' || event.key === 'Shift'){

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
