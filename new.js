/x{f1991}/

let lines = []

let labels = {}
let vars = {}
let arrays = {}

const variableRe = /^(󱥓󱦐)([^x{f1991}]+)(󱦑)$/
const arrayRe = /^(󱤟󱥓󱦐)([^x{f1991}]+)(󱦑)$/
const numberRe = /[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+/
const digitRe = /[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]/

const declarationRe = /^(.+)(󱥄󱤬)$/
const declarationAssignmentRe = /^(.+)(󱥄󱤬󱥄󱥣)(.+)$/
const declarationMultipleAssignmentStartRe = /^(.+)(󱥄󱤬󱥄󱤓)$/
const declarationMultipleAssignmentContinueRe = /^(󱤉)(.+)$/

function nnpSingleDigit(digit) {
    if(!digitRe.test(digit)) return NaN
    switch(digit) {
        case "󱤂": return 0;
        case "󱥳": return 1;
        case "󱥮": return 2;
        case "󱤭": return 5;
        case "󱤼": case "󿵩": return 20;
        case "󱤄": return 100;
    }
}

function nnpParser(original) {
    let array = [...original]
    let out=0
    let prov=0
    for(let i=0; i<array.length; i++){
        prov = nnpSingleDigit(array[i])
        if(prov == 0) return 0
        if(prov == NaN) return NaN
        if(prov == 100) out *= prov
        else out += prov
    }
    return out
}

function getNumberValue(ijo) {
    if(ijo.match(numberRe)) return nnpParser(ijo)
    if(ijo.match)
}

function declare(declared) {
    if(declared.match(variableRe)) {
        let name = declared.match(variableRe)[2]
        vars[name] = {
            value: undefined
        }
    }
    if(declared.match(arrayRe)) {
        let name = declared.match(arrayRe)[2]
        arrays[name] = {
            value: [],
            size: this.value.length
        }
    }
}

function declareAssign(declared, assigned) {
    if(declared.match(variableRe)) {
        let name = declared.match(variableRe)[2]
        vars[name] = {
            value: getNumberValue(assigned)
        }
    }
    if(declared.match(arrayRe)) {
        let name = declared.match(arrayRe)[2]
        arrays[name] = {
            value: [],
            size: getNumberValue(assigned)
        }
    }
}

function runLine(line) {
    if(line.match(declarationRe)) {
        let split = line.match(declarationAssignmentRe)
        declare(split[1])
    }
    
}