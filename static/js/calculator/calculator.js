export default class Calculator {
    constructor() {
        this.operation = () => {
            console.log('operation')
        }
        this.nums = []
    }

    doOperation() {
        var newNum = this.operation(this.nums[0], this.nums[1])
        this.clearNumsArray()
        this.addNum(newNum)
    }

    addNum(num) {
        if (this.nums.length < 2) {
            this.nums.push(num)
            if (this.nums.length == 2) {
                this.doOperation()
            }
        } else {
            this.doOperation()
            this.addNum(num)
        }
    }

    clearNumsArray() {
        this.nums = []
    }

    sum = (n1, n2) => n1 + n2
    
    subs = (n1, n2) => n1 - n2
    
    mult = (n1, n2) => n1 * n2
    
    div = (n1, n2) => {
        try {
            var result = n1 / n2
            return result
        } catch {
            console.log('No se puede dividir entre 0, no sea idio...')
            window.close()
        }
    }
}