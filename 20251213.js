function matchPattern(line) {
    return {opcode: "null", operands: [{regex: "", types: [""]}]}
}

function extractOperandFromLineUsingRegex(line, regex) {
    return ""
}

function useLine(line) {
    let pattern = matchPattern(line)
    let usable
    usable.opcode = pattern.opcode
    usable.operands = []
    for(let operand in pattern.operands) {
        let current = pattern.operands[operand]
        pattern.operands[operand].literal = extractOperandFromLineUsingRegex(line, current.regex)
    }
}