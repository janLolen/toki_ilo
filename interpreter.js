let vars = {}
let labels = {}
let pc = 0
let output = document.getElementById("output")

// TODO: function int->nnp

function ositelen(text) {
    output.innerHTML += `<p>> ${text}</p>`
}

function nnpSingleDigit(digit) {
    if(!/[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]/.test(digit)) return NaN
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

function log(message) {
    console.log(message)
}

function isLabel(line) {
    return (/^󱥫󱦐[^\n]+󱦑󱤡$/).test(line);
}

function isGoto(line) {
    return (/^󱥄󱥩󱥫󱦐[^\n]+󱦑$/).test(line);
}

function isPrintText(line) {
    return (/^󱥄󱥠󱤉󱥬󿬂[^\n]+$/).test(line);
}

function isPrintNumber(line) {
    return (/^󱥄󱥠󱤉󱤽󿬂[^\n]+$/).test(line);
}

function isPrintVariable(line) {
    return (/^󱥄󱥠󱤉󱥓󱦐[^\n]+󱦑$/).test(line);
}

function isVarDeclaration(line) {
    return (/^󱥓󱦐[^\n]+󱦑󱤧󱤬$/).test(line)
}

function isVarDeclarationWithAssignment(line) {
    return (/^󱥓󱦐[^\n]+󱦑󱤧󱤬󱤧󱥣[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+$/).test(line)
}

function isIncrement(line) {
    return (/^󱥄󱥌󱤉󱥣[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+󱥩󱥓󱦐[^\n]+󱦑$/).test(line)
}

function isDecrement(line) {
    return (/^󱥄󱥶󱤉󱥣[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+󱥧󱥓󱦐[^\n]+󱦑$/).test(line)
}

function isEqual(line) {
    return (/^󱥓󱦐[^\n]+󱦑󱤧󱥣[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+󱤡$/).test(line)
}

function addLabel(line, pc) {
    let name = line.replace(/(󱥫󱦐)([^\n]+)(󱦑󱤡)/,"$2")
    if(labels[name] == undefined) {
        labels[name] = pc
        log(`adding label ${name} at line ${pc}`)
    }
    else if(labels[name] != pc) warning(`duplicate label ${name} at line ${labels[name]} and line ${pc}`)
}

function runLine(lines) {
    log(`running line ${pc}`)
    let line = lines[pc].replaceAll(/[ 　]/g, "").replace(/󱥬󱤑󱤡.*/, "").replace(/\/\/.*/, "")

    if(isLabel(line)){
        addLabel(line)
    }

    if(isGoto(line)){
        let name = line.replace(/(󱥄󱥩󱥫󱦐)([^\n]+)(󱦑)/,"$2")
        let newpc
        if(labels[name] == undefined) {
            log("looking for label "+name)
            for(newpc = 0; newpc<lines.length && labels[name] == undefined; newpc++) 
                if(isLabel(lines[newpc])){
                    addLabel(lines[newpc], newpc)
                }}
        if(labels[name] != undefined) {
            log(`found label ${name} at line ${labels[name]}, jumping`)
            pc = labels[name]
        }
    }

    if(isPrintText(line)){
        let text = line.replace(/(󱥄󱥠󱤉󱥬󿬂)([^\n]+)/, "$2")
        ositelen(text)
    }

    if(isPrintNumber(line)){
        let text = nnpParser(line.replace(/(󱥄󱥠󱤉󱤽󿬂)([^\n]+)/, "$2"))
        ositelen(text)
    }

    if(isPrintVariable(line)){
        let name = line.replace(/^(󱥄󱥠󱤉󱥓󱦐)([^\n]+)(󱦑)$/, "$2")
        ositelen(vars[name].value)
    }
    
    if(isVarDeclaration(line)) {
        let name = line.replace(/(󱥓󱦐)([^\n]+)(󱦑󱤧󱤬)/,"$2")
        log(`creating variable ${name}`)
        vars[name] = {
            value: 0,
            constant: false
        }
    }

    if(isVarDeclarationWithAssignment(line)) {
        let name = line.replace(/(󱥓󱦐)([^\n]+)(󱦑󱤧󱤬󱤧󱥣[󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)/,"$2")
        let value = nnpParser(line.replace(/(󱥓󱦐)([^\n]+)(󱦑󱤧󱤬󱤧󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)/,"$4"))
        log(`creating variable ${name} with value ${value}`)
        vars[name] = {
            value: value,
            constant: false
        }
    }

    if(isIncrement(line)) {
        let name = line.replace(/^(󱥄󱥌󱤉󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥩󱥓󱦐)([^\n]+)(󱦑)$/,"$4")
        let value = nnpParser(line.replace(/^(󱥄󱥌󱤉󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥩󱥓󱦐)([^\n]+)(󱦑)$/,"$2"))
        vars[name].value += value
    }

    if(isDecrement(line)) {
        let name = line.replace(/^(󱥄󱥶󱤉󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥧󱥓󱦐)([^\n]+)(󱦑)$/,"$4")
        let value = nnpParser(line.replace(/^(󱥄󱥶󱤉󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱥧󱥓󱦐)([^\n]+)(󱦑)$/,"$2"))
        vars[name].value -= value
    }

    if(isEqual(line)) {
        let name = line.replace(/^(󱥓󱦐)([^\n]+)(󱦑󱤧󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱤡)$/,"$2")
        let value = nnpParser(line.replace(/^(󱥓󱦐)([^\n]+)(󱦑󱤧󱥣)([󱤂󱥳󱥮󱤭󱤼󿵩󱤄]+)(󱤡)$/,"$4"))
        if(vars[name].value != value) pc++
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