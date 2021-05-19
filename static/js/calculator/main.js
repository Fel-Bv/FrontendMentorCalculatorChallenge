import Calculator from './calculator.js'

document.addEventListener('DOMContentLoaded', () => {
    const keypad = document.getElementById('keypad')
    const entry = document.getElementById('entry')
    const calculator = new Calculator()
    const btns = {
        result: document.getElementById('btn-result'), 
        reset: document.getElementById('btn-reset'), 
        subs: document.getElementById('btn-subs'), 
        mult: document.getElementById('btn-mult'), 
        div: document.getElementById('btn-div'), 
        sum: document.getElementById('btn-sum'), 
        dot: document.getElementById('btn-dot'), 
        del: document.getElementById('btn-del'), 
        nums: [], 
    }
    const addNum = () => {
        try {
            calculator.addNum(parseFloat(entry.value))
        } catch {
            return
        }
    }
    const updateEntry = () => {
        if (entry.value != calculator.nums[0]) {
            entry.value = calculator.nums[0]
        } else {
            if (calculator.nums.length === 2) {
                entry.value = calculator.nums[0]
            } else {
                entry.value = ''
            }
        }
    }

    for (var layout of keypad.children) {
        for (var btn of layout.children) {
            if (parseInt(btn.innerText) || btn.innerText == 0) {
                /* Si el boton contiene un cero, el 'parseInt' retornara 0, y la condición va a retornar 0 (false), 
                por lo que no se ejecutaria el bloque de instrucciones, por eso agregue ' || btn.innerText == 0' */
                btns.nums.push(btn)
            }
        }
    }

    btns.reset.addEventListener('click', event => {
        calculator.clearNumsArray()
        cleanEntry(entry)
    })

    btns.del.addEventListener('click', event => {
        cleanEntry(entry)
    })

    btns.sum.addEventListener('click', event => {
        addNum()

        calculator.operation = calculator.sum
    
        updateEntry()
    })

    btns.subs.addEventListener('click', event => {
        addNum()

        calculator.operation = calculator.subs
        
        updateEntry()
    })

    btns.mult.addEventListener('click', event => {
        addNum()

        calculator.operation = calculator.mult
        
        updateEntry()
    })

    btns.div.addEventListener('click', event => {
        addNum()

        calculator.operation = calculator.div
        
        updateEntry()
    })

    btns.result.addEventListener('click', event => {
        try {
            calculator.addNum(parseFloat(entry.value))
        } catch {
            return
        }
        
        if (entry.value != calculator.nums[0]) {
            entry.value = calculator.nums[0]
        } else {
            if (calculator.nums.length === 2) {
                entry.value = calculator.nums[0]
            } else {
                entry.value = ''
            }
        }

        calculator.clearNumsArray()
    })

    btns.dot.addEventListener('click', event => {
        var value = entry.value.substring(entry.value.length - 3)
        if (value.indexOf('.') === -1) {
            entry.value += '.'
        }
    })
})

function cleanEntry(entry) {
    entry.value = ''
}