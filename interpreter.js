let vars = {}
let labels = {}
let pc = 0
let currentAssignedArray = ""
let output = document.getElementById("output")
let instructionCounter = 0
const maxInstructionCounter = 1000

// TODO: multi-line printing

// Invalid:
const invalidDoubleCartouche = /(󱦐)(󱦐|󱦑)(󱦑)/
// Label:
const labelRe = /^(󱥫󱦐)(.+)(󱦑󱤡)$/
const gotoRe = /^(󱥄󱥩󱥫󱦐)(.+)(󱦑)$/
// Print:
const printTextRe = /^(󱥄󱥠󱤉󱥬󿬂)(.+)$/
const printNumberRe = /^(󱥄󱥠󱤉󱤽󿬂)(.+)$/
const printVariableRe = /^(󱥄󱥠󱤉󱥓󱦐)(.+)(󱦑)$/
const printArrayIndexRe = /^(󱥄󱥠󱤉󱥓󱤽)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥍󱤟󱦐|󱥍󱤟󱥓󱦐)(.+)(󱦑)$/
const printWholeArrayRe = /^(󱥄󱥠󱤉󱤟󱥓󱦐)(.+)(󱦑)$/
// Declare:
const varDeclarationRe = /^(󱥓󱦐)(.+)(󱦑󱤧󱤬)$/
const varDeclarationAssignmentNumberRe = /^(󱥓󱦐)(.+)(󱦑󱤧󱤬󱤧󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)$/
const varDeclarationAssignmentVarRe = /^(󱥓󱦐)(.+)(󱦑󱤧󱤬󱥄󱥖󱥓󱦐)(.+)(󱦑)$/
const arrayDeclarationRe = /^(󱤟󱥓󱦐)(.+)(󱦑󱤧󱤬)$/
const arrayDeclarationAssignmentStartRe = /^(󱤟󱥓󱦐)(.+)(󱦑󱤧󱤬󱤧󱤓)$/
const arrayDeclarationAssignmentContinueNumberRe = /^(󱤉󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)$/
const arrayDeclarationAssignmentContinueVarRe = /^(󱤉󱥣󱥍󱥓󱦐)(.+)(󱦑)$/
const arrayDeclarationAssignmentEndRe = /^󱤉󱤌󱤆󱤂$/
// Arithmetic:
const incrementRe = /^(󱥄󱥌󱤉󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥩󱥓󱦐)([^\n]+)(󱦑)$/
const incrementVarRe = /^(󱥄󱥌󱤉󱥣󱥍󱥓󱦐)([^\n]+)(󱦑󱥩󱥓󱦐)([^\n]+)(󱦑)$/
const decrementRe = /^(󱥄󱥶󱤉󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥧󱥓󱦐)([^\n]+)(󱦑)$/
const equalNumberRe = /^(󱥓󱦐)(.+)(󱦑󱤧󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱤡)$/
const lessThanVarRe = /^(󱥓󱦐)(.+)(󱦑󱤧󱤨󱥩󱥓󱦐)(.+)(󱦑󱤡)$/
const comparisonArrIndexVarLessThanArrIndexVarRe = /^(󱥓󱤽󱦐)(󱤉)(󱦑󱥍󱤟󱥓󱦐)(󱤟)(󱦑󱤧󱤨󱥩󱥓󱤽󱦐)(󱤨)(󱦑󱥍󱤟󱥓󱦐)(󱤟)(󱦑󱤡)$/ // TODO: modular
// Assignment
const varAssignmentNumberRe = /^(󱥓󱦐)(.+)(󱦑󱥄󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)$/
const varAssignmentVarRe = /^(󱥓󱦐)(.+)(󱦑󱥄󱥖󱥓󱦐)(.+)(󱦑)$/
const varAssignmentFromArrayLength = /^(󱥓󱦐)(.+)(󱦑󱥄󱥣󱥖󱥣󱥍󱤟󱥓󱦐)(.+)(󱦑)$/
const varAssignmentFromArrayVarIndex = /^(󱥓󱦐)(.+)(󱦑󱥄󱥖󱥓󱦐)(.+)(󱦑󱤽󱦐)(.+)(󱦑)$/u
const assignArrayVarIndexToArrayVarIndex = /^(󱥓󱦐)([^󱦑]+)(󱦑󱤽󱦐)(.+)(󱦑󱥄󱥖󱥓󱦐)([^󱦑]+)(󱦑󱤽󱦐)([^󱦑]+)(󱦑)$/ // TODO: modular, indexing can change
// Other
const numberRe = /[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+/
const digitRe = /[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]/
const equalVarRe = /^(󱥓󱦐)(.+)(󱦑󱤧󱥖󱥓󱦐)(.+)(󱦑󱤡)$/
const arrayIndexingAssignmentNumberRe = /^(󱥓󱤽)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥍󱤟󱦐|󱥍󱤟󱥓󱦐)(.+)(󱦑󱥄󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)$/
const arrayIndexingAssignmentVarRe = /^(󱥓󱤽)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥍󱤟󱦐|󱥍󱤟󱥓󱦐)(.+)(󱦑󱥄󱥖󱥓󱦐)(.+)(󱦑)$/

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
    console.log(`${pc} (${instructionCounter}) : ` + message)
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
    line = line.replaceAll(/([ 　‍])/g, "").replace(/󱥬󱤑󱤡.*/, "").replace(/\/\/.*/, "")
    line = line+text
    return line
}

function runLine(lines) {
    let line = removeSpaces(lines[pc])
    while(removeSpaces(lines[pc]) == "") pc++
    line = removeSpaces(lines[pc])
    //log(`${pc} (${instructionCounter}):`)

    if(isInvalid(lines[pc])) return


    // Labels
    {
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
                log(`GOTO ${name}`)
                pc = labels[name]
            }
        }
    }

    // Print
    {
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
            log(`print(${name})`)
        }

        if(is(printArrayIndexRe, line)){
            let split = line.match(printArrayIndexRe)
            let name = split[4]
            let index = nnpParser(split[2])
            ositelen(vars[name].value[index-1])
            log(`print(${name}[${index}])`)
        }

        if(is(printWholeArrayRe, line)){
            let name = line.match(printWholeArrayRe)[2]
            // TODO: better - requires intToNnp()
            ositelen(vars[name].value)
            log(`printArray(${name})`)
        }
    }

    // Declaration
    {
        // Variable
        {
            if(is(varDeclarationRe, line)) {
                let name = line.match(varDeclarationRe)[2]
                log(`creating variable ${name}`)
                vars[name] = {
                    type: "variable",
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
                    type: "variable",
                    value: value,
                    constant: false
                }
            }
        
            if(is(varDeclarationAssignmentVarRe, line)) {
                let split = line.match(varDeclarationAssignmentVarRe)
                let name = split[2]
                let value = vars[split[4]].value
                log(`creating variable ${name} with value ${value} from variable ${split[4]}`)
                vars[name] = {
                    type: "variable",
                    value: value,
                    constant: false
                }
            }
        }
        // Array
        {
            if(is(arrayDeclarationRe, line)){
                let name = line.match(arrayDeclarationRe)[2]
                log(`declared array ${name}`)
                vars[name] = {
                    type: "array",
                    value: [],
                    constant: false
                }
            }
            if(is(arrayDeclarationAssignmentStartRe, line)){
                let name = line.match(arrayDeclarationAssignmentStartRe)[2]
                log(`declared array ${name}, filling`)
                vars[name] = {
                    type: "array",
                    value: [],
                    constant: false
                }
                currentAssignedArray = name
            }
            if(is(arrayDeclarationAssignmentContinueNumberRe, line)){
                // TODO: exceptions
                let value = nnpParser(line.match(arrayDeclarationAssignmentContinueNumberRe)[2])
                vars[currentAssignedArray].value.push(value)
                log(`pushing value ${value} to array ${currentAssignedArray}`)
            }
            if(is(arrayDeclarationAssignmentContinueVarRe, line)){
                let value = vars[line.match(arrayDeclarationAssignmentContinueVarRe)[2]].value
                vars[currentAssignedArray].value[vars[currentAssignedArray].length] = value
                log(`pushing value ${value} from variable ${line.match(arrayDeclarationAssignmentContinueVarRe)[2]} to array ${currentAssignedArray}`)
            }
            if(is(arrayDeclarationAssignmentEndRe, line)){
                log(`ending assignments to array ${currentAssignedArray}`)
                currentAssignedArray = ""
            }
        }
    }
    
    // Assignment
    {
        // Variable
        {
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
            if(is(varAssignmentFromArrayLength, line)) {
                let split = line.match(varAssignmentFromArrayLength)
                let varname = split[2]
                let arrname = split[4]
                // todo: proper array length
                // todo: handle type error
                vars[varname].value = vars[arrname].value.length;
                log(`assigning value ${vars[arrname].value.length} to variable ${varname} from length of array ${arrname}`)
            }
            if(is(varAssignmentFromArrayVarIndex, line)) {
                let split = line.match(varAssignmentFromArrayVarIndex)
                let varname = split[2]
                let arrname = split[4]
                let index = split[6]
                log(`${varname} = ${arrname}[${index}]`)
                vars[varname].value = vars[arrname].value[vars[index].value]
            }
        }
        // Array
        {
            if(is(arrayIndexingAssignmentNumberRe, line)){
                let split = line.match(arrayIndexingAssignmentNumberRe);
                let index = nnpParser(split[2])
                let name = split[4]
                let value = nnpParser(split[6])
                vars[name].value[index] = value
                log(`assigning value ${value} to array ${name} at index ${index}`)
            }
            if(is(arrayIndexingAssignmentVarRe, line)){
                let split = line.match(arrayIndexingAssignmentVarRe);
                let index = nnpParser(split[2])
                let name = split[4]
                let value = vars[split[6]].value
                vars[name].value[index] = value
                log(`assigning value ${value} from variable ${split[6]} to array ${name} at index ${index}`)
            }
            if(is(assignArrayVarIndexToArrayVarIndex, line)) {
                let split = line.match(assignArrayVarIndexToArrayVarIndex)
                let index = split[4]
                let jndex = split[8]
                let array = split[2]
                let brray = split[6]
                log("assigning from array to array")
                vars[array].value[vars[index].value] = vars[brray].value[vars[jndex].value]
            }
        }
    }

    // Arithmetic
    {
        // Variable
        {
            if(is(incrementRe, line)) {
                let split = line.match(incrementRe)
                let name = split[4]
                let value = nnpParser(split[2])
                if(vars[name]==undefined) {error("undefined variable"); return}
                vars[name].value += value
                log(`${name} += ${value}`)
            }

            if(is(incrementVarRe, line)) {
                let split = line.match(incrementVarRe)
                let name = split[4]
                let value = vars[split[2]].value
                if(vars[name]==undefined) {error("undefined variable"); return}
                vars[name].value += value
                log(`${name} += ${value}`)
            }
        
            if(is(decrementRe, line)) {
                let split = line.match(decrementRe)
                let name = split[4]
                let value = nnpParser(split[2])
                if(vars[name]==undefined) {error("undefined variable"); return}
                vars[name].value -= value
                log(`decrementing ${name} by ${value}`)
            }
        }
        // Array
        {

        }
    }

    // Comparison
    {
        // Variable
        {
            if(is(equalNumberRe, line)) {
                let split = line.match(equalNumberRe)
                let name = split[2]
                let value = nnpParser(split[4])
                if(vars[name]==undefined) {error("undefined variable"); return}
                log(`${name}==${value} - ${vars[name].value == value} `)
                if(vars[name].value != value){
                    pc++
                    while(lines[pc] == "") {pc++; while(removeSpaces(lines[pc]) == "") pc++}
                }
            }
            if(is(equalVarRe, line)) {
                let split = line.match(equalVarRe)
                let name = split[2]
                let value = vars[split[4]].value
                if(vars[name]==undefined) {error("undefined variable"); return}
                log(`${name}==${split[4]} - ${vars[name].value == value}`)
                if(vars[name].value != value) {pc++; while(removeSpaces(lines[pc]) == "") pc++}
            }
            if(is(lessThanVarRe, line)) {
                let split = line.match(lessThanVarRe)
                let less = split[2]
                let than = split[4]
                if(vars[less]==undefined||vars[than]==undefined) {error("undefined variable"); return}
                log(`${less}<${than} - ${vars[less].value<vars[than].value}`)
                if(vars[less].value>=vars[than].value) {pc++; while(removeSpaces(lines[pc]) == "") pc++; console.log("skipping line")}
            }
        }
        // Array
        {
            if(is(comparisonArrIndexVarLessThanArrIndexVarRe, line)) {
                let split = line.match(comparisonArrIndexVarLessThanArrIndexVarRe)
                let index = split[2]
                let jndex = split[6]
                let array = split[4]
                let brray = split[8]
                log(`${array}[${index}] < ${brray}[${jndex}] - ${vars[array].value[vars[index].value] < vars[brray].value[vars[jndex].value]}`)
                if(vars[array].value[vars[index].value] >= vars[brray].value[vars[jndex].value]) {pc++; while(removeSpaces(lines[pc]) == "") pc++}
            }
        }
    }
}

function runCode(lines){
    vars = {}
    labels = {}
    pc = 0
    output.innerHTML = ""
    instructionCounter = 0
    log("==== START OF PROGRAM ====")
    for(pc = 0; pc < lines.length; pc++){
        runLine(lines);
        instructionCounter++;
        if(instructionCounter >= maxInstructionCounter) return
    }
}