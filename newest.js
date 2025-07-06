/**
 * Read a line
 * Loop through all lineTypes
 *      Loop through all patterns
 *          If it matches, stop the loop, save the lineType in an object
 *          Replace the patterns[] with the single pattern
 * If no match was found, error and ignore the line, else
 * For each argument of the lineType
 *      Loop through all units that have the same tags as the argument
 *          If you find one whose pattern matches, store it and stop the loop
 * lineType.action(unit, ...)
 * The unit has an evaluate() and/or similar function that's used by the lineType's action
 * The lineType's action will be something like actions.declare(match[1], match[2])
 */

let vars = {}
let labels = {}
let pc = 0
let currentAssignedArray = ""
let output = document.getElementById("output")
let instructionCounter = 0
const maxInstructionCounter = 1000

function warning(message) {console.log("WARNING! - "+message)}
function error(message) {console.log("ERROR! - "+message)}
function log(message) {console.log(`${pc} (${instructionCounter}) : ` + message)}

let actions = {
    addLabel(params) {
        if (!params.labelName) {error("no label name"); return}
        if (labels[params.labelName] != undefined) {error("redefining label"); return}
        labels[params.labelName] = pc
    },
    goto() {},
    print() {},
    declare() {},
    assign() {},
    add() {},
    subtract() {},
    proportion() {},
    skipLine() {}
}

let lineTypes = {
    label : {
        patterns : [
            /^󱥫󱦐(.+)󱦑󱤡$/
        ],
        recognize(line) {
            return {
                labelName : line.match(this.pattern)[1]
            }
        },
        action : actions.addLabel
    },
    goto : {},
    print : {},
    declare : {},
    assign : {},
    declareAssign : {},
    addition : {},
    subtraction : {},
    proportion : {},
    equals : {},
    unequals : {},
    lessThan : {},
    greaterThan : {}
}

let units = {
    number : {},
    variable : {},
    array : {},
    matrix : {},
    arrayAtIndex : {},
    matrixAtIndex : {}
}

function action(lineType, line) {
    if(lineType.pattern.recognize) lineType.recognize = lineType.pattern.recognize
    lineType.action(lineType.recognize(line))
}

function parseLine(line) {
    let lineType = null
    done:
    for (let i in lineTypes)
        for (let j in lineTypes[i].patterns)
            if (line.match(lineTypes[i].patterns[j])) {
                lineType = lineTypes[i]
                lineType.pattern = lineTypes[i].patterns[j]
                lineType.patterns = null
                break done
            }

    if(lineType == null) {
        error("Invalid line")
        return
    }

    action(lineType, line)
}

function runCode(lines){
    vars = {}
    labels = {}
    pc = 0
    output.innerHTML = ""
    instructionCounter = 0
    log("==== START OF PROGRAM ====")
    for(pc = 0; pc < lines.length; pc++){
        parseLine(lines[pc]);
        instructionCounter++;
        if(instructionCounter >= maxInstructionCounter) return
    }
}