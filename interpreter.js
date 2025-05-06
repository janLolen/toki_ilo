let vars = {}
let labels = {}
let pc = 0
let output = document.getElementById("output")

const invalidDoubleCartouche = /(󱦐)(󱦐|󱦑)(󱦑)/
const labelRe = /^(󱥫󱦐)(.+)(󱦑󱤡)$/
const gotoRe = /^(󱥄󱥩󱥫󱦐)(.+)(󱦑)$/
const printTextRe = /^(󱥄󱥠󱤉󱥬󿬂)(.+)$/
const printNumberRe = /^(󱥄󱥠󱤉󱤽󿬂)(.+)$/
const printVariableRe = /^(󱥄󱥠󱤉󱥓󱦐)(.+)(󱦑)$/
const varDeclarationRe = /^(󱥓󱦐)(.+)(󱦑󱤧󱤬)$/
const varDeclarationAssignmentNumberRe = /^(󱥓󱦐)(.+)(󱦑󱤧󱤬󱤧󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)$/
const varDeclarationAssignmentVarRe = /^(󱥓󱦐)(.+)(󱦑󱤧󱤬󱥄󱥖󱥓󱦐)(.+)(󱦑)$/
const incrementRe = /^(󱥄󱥌󱤉󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥩󱥓󱦐)([^\n]+)(󱦑)$/
const decrementRe = /^(󱥄󱥶󱤉󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥧󱥓󱦐)([^\n]+)(󱦑)$/
const numberRe = /[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+/
const digitRe = /[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]/
const equalNumberRe = /^(󱥓󱦐)(.+)(󱦑󱤧󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱤡)$/
const varAssignmentNumberRe = /^(󱥓󱦐)(.+)(󱦑󱥄󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)$/
const varAssignmentVarRe = /^(󱥓󱦐)(.+)(󱦑󱥄󱥖󱥓󱦐)(.+)(󱦑)$/

// TODO: function int->nnp

function isInvalid(line) {
    let invalid = false
    if(line.match(invalidDoubleCartouche)) invalid = true
    if(invalid) error("invalid line")
    return invalid
}

function ositelen(text) {
    output.innerHTML += `<p>> ${text}</p>`
}

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

function warning(message) {
    console.log("WARNING! - "+message);
}

function error(message) {
    console.log("ERROR! - "+message)
}

function log(message) {
    console.log(message)
}

function is(regex, line) {
    return regex.test(line)
}

function addLabel(line, pc) {
    let name = line.match(labelRe)[2]
    if(labels[name] == undefined) {
        labels[name] = pc
        log(`adding label ${name} at line ${pc}`)
    }
    else if(labels[name] != pc) warning(`duplicate label ${name} at line ${labels[name]} and line ${pc}`)
}

function removeSpaces(line) {
    // 󱥠󱥍󱤂󱤮󱤧󱤬󱤡󱥠󱥳󱤧󱤬󱥶󱥍󱥠󱤆
    // 󱥁󱤧󱥶󱤉󱥠󱥍󱤂󱤮
    // 󱥉󱤽󱤧󱥷󱥠󱤉󱥂󱤡󱥆󱤧󱥶󱤂󱤉󱥠󱥍󱤂󱤮
    let split = line.match(/^(.*󿬂)(.*)$/)
    let text = ""
    if(split != null) {
        line = split[1]
        text = split[2]
    }
    line = line.replaceAll(/([ 　])/g, "").replace(/󱥬󱤑󱤡.*/, "").replace(/\/\/.*/, "")
    line = line+text
    return line
}

function runLine(lines) {
    log(`running line ${pc}`)

    if(isInvalid(lines[pc])) return

    let line = removeSpaces(lines[pc])

    if(is(labelRe, line)){
        addLabel(line, pc)
    }

    if(is(gotoRe, line)){
        let name = line.match(gotoRe)[2]
        let newpc
        if(labels[name] == undefined) {
            log("looking for label "+name)
            for(newpc = 0; newpc<lines.length && labels[name] == undefined; newpc++) 
                if(is(labelRe, lines[newpc])){
                    addLabel(lines[newpc], newpc)
                }}
        if(labels[name] != undefined) {
            log(`found label ${name} at line ${labels[name]}, jumping`)
            pc = labels[name]
        }
    }

    if(is(printTextRe, line)){
        let text = line.match(printTextRe)[2]
        ositelen(text)
        log(`printing text ${text}`)
    }

    if(is(printNumberRe, line)){
        let text = nnpParser(line.match(printNumberRe)[2])
        ositelen(text)
        log(`printing text ${text}`)
    }

    if(is(printVariableRe, line)){
        let name = line.match(printVariableRe)[2]
        if(vars[name]==undefined) {error("undefined variable"); return}
        ositelen(vars[name].value)
        log(`printing the value of variable ${name}`)
    }
    
    if(is(varDeclarationRe, line)) {
        let name = line.match(varDeclarationRe)[2]
        log(`creating variable ${name}`)
        vars[name] = {
            value: 0,
            constant: false
        }
    }

    if(is(varDeclarationAssignmentNumberRe, line)) {
        let split = line.match(varDeclarationAssignmentNumberRe)
        let name = split[2]
        let value = nnpParser(split[4])
        log(`creating variable ${name} with value ${value}`)
        vars[name] = {
            value: value,
            constant: false
        }
    }

    if(is(varDeclarationAssignmentVarRe, line)) {
        let split = line.match(varDeclarationAssignmentNumberRe)
        let name = split[2]
        let value = vars[split[4]].value
        log(`creating variable ${name} with value ${value} from variable ${split[4]}`)
        vars[name] = {
            value: value,
            constant: false
        }
    }

    if(is(incrementRe, line)) {
        let split = line.match(incrementRe)
        let name = split[4]
        let value = nnpParser(split[2])
        if(vars[name]==undefined) {error("undefined variable"); return}
        vars[name].value += value
        log(`incrementing ${name} by ${value}`)
    }

    if(is(decrementRe, line)) {
        let split = line.match(decrementRe)
        let name = split[4]
        let value = nnpParser(split[2])
        if(vars[name]==undefined) {error("undefined variable"); return}
        vars[name].value -= value
        log(`decrementing ${name} by ${value}`)
    }

    if(is(equalNumberRe, line)) {
        let split = line.match(equalNumberRe)
        let name = split[2]
        let value = nnpParser(split[4])
        if(vars[name]==undefined) {error("undefined variable"); return}
        if(vars[name].value != value) pc++
    }

    if(is(varAssignmentNumberRe, line)) {
        let split = line.match(varAssignmentNumberRe)
        let name = split[2]
        let value = nnpParser(split[4])
        if(vars[name].constant) error("attempting to reassign constant")
        else {
            vars[name].value = value
            log(`assigning value ${value} to variable ${name}`)
        }
    }
    if(is(varAssignmentVarRe, line)) {
        let split = line.match(varAssignmentVarRe)
        let name = split[2]
        let value = vars[split[4]].value
        if(vars[name].constant) error("attempting to reassign constant")
        else {
            vars[name].value = value
            log(`assigning value ${value} to variable ${name} from variable ${split[4]}`)
        }
    }
}

function runCode(lines){
    vars = {}
    labels = {}
    pc = 0
    output.innerHTML = ""
    log("==== START OF PROGRAM ====")
    for(pc = 0; pc < lines.length; pc++){
        runLine(lines);
    }
}