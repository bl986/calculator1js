class Calculator {
    /* set variables in the constructor for operands text elements */
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() //this is important to initiate the app otherwise won't work
    }

    /* this function will remove everything */
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        //convert the current operand to string and removes the last character
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    /* this function adds the one number justed pressed to the end of current operand on screen */
    appendNumber(number) {
        /* if want to add . , and if already got . , then stop it (i.e. only allow user to add 1 . )*/
        if (number === '.' && this.currentOperand.includes('.')) return
        /* current display to string and add the number as a string to the end */
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
         // if there is nothing input for current operand, do nothing (checking & making sure we input something)
        if (this.currentOperand === '') return
        // making sure the previous operand is not empty
        if (this.previousOperand !== '') {
            //this to compute using the previous result automatically
            this.compute()
        }
        //set the operation
        this.operation = operation
        // set the operand to be this current input
        this.previousOperand = this.currentOperand
        //clear the current operand for new input
        this.currentOperand = ''
    }

    compute() {
        let computation
        //convert string to float - parseFloat
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // if the previous or the current input is null, do nothing
        if (isNaN(prev) || isNaN(current)) return
        //swith is like a bunch of if statements, swithing 1 from another
        switch (this.operation) {
            //if the operation is +, just add, then break and stop there, do not consider any other cases
            case '+':
                computation = prev + current
                //leave the switch statement
                break

            case '-':
                computation = prev - current
                break

            case '*':
                computation = prev * current
                break

            case '÷':
                computation = prev / current
                break
            //if none of the above operations was input, then do nothing
            default:
                return
        }

        //update the current operand
        this.currentOperand = computation
        // clear the operation after done
        this.operation = undefined
        //clear the previous operand
        this.previousOperand = ''
    }

    // display the number to have comma every 3 digits and nice looking etc.
    getDisplayNumber(number) {
        //first conver to string
        const stringNumber = number.toString()
        //then we want to split into integer and decimal parts:
        //split by the . , then take the 1st part (with index 0)
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        //and then ofcoure the 2nd part are the digits (with index 1)
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            // if the maximum digits reached, treat this as 0 (too small)
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        // if there are digits, display both parts with a . between
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            //if there are no digits, display just the integer part
            return integerDisplay
        }


        //this float has limitation regarding decimals and 0s
        //save the number to a variable by converting it from string to a float
        //const floatNumber = parseFloat(number)
        //check if the current number (operand) is not empty, if null, do nothing
        //if(isNaN(floatNumber)) return
        //return floatNumber.toLocalString('en')
    }

    updateDisplay() {
        //display the lower line (current opperand)
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

        //display the upper line (previous operand)
        if (this.operation != null) {
            //btw, use the key on the left of number 1 to type this symbol `
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

/* get us all  elements that matches this string */
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


// first, create a calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    /* whenever we click on it, it will do things in this function */
    button.addEventListener('click', () => {
        //add the inner text of the button and append it to the end
        calculator.appendNumber(button.innerText)
        //then we update the displayed number
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})