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

let lineTypes = {}

/**
 * Read a line
 * lines: array of strings
 * pc: int program counter
 * return: current line
 */
function readOneLine(lines, pc) {
    return lines[pc]
}

/**
 * return: true if it matches, false if it doesn't
 */
function lineMatchesPattern(line, pattern) {

}

/**
 * Loop through all lineTypes
 * return: null if no match, type with pattern if match
 */
function findLineType(line) {
    for(let i in lineTypes) {
        // Loop through all patterns
        for(let j in lineTypes[i].patterns) {
            // If it matches, stop the loop, save the lineType in an object
            if(lineMatchesPattern(line, lineTypes[i].patterns[j])){
                let typeAndPattern = lineTypes[i]
                typeAndPattern.patterns = null
                typeAndPattern.pattern = lineTypes[i].patterns[j]
                return typeAndPattern
            }
        }
    }
    return null
}