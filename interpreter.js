let vars = {}
let labels = {}
let pc = 0
let output = document.getElementById("output")

function warning(message) {
    console.log("WARNING! - "+message);
}

function log(message) {
    console.log(message)
}

function isLabel(line) {
    return (/󱥫󱦐[^\n]+󱦑󱤡/).test(line);
}

function isGoto(line) {
    return (/󱥄󱥩󱥫󱦐[^\n]+󱦑/).test(line);
}

function isPrint(line) {
    return (/󱥄󱥠󱤉󱥬󿬂[^\n]+/).test(line);
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
    let line = lines[pc]

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

    if(isPrint(line)){
        let text = line.replace(/(󱥄󱥠󱤉󱥬󿬂)([^\n]+)/, "$2")
        output.innerHTML += `<p>${text}</p>`
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