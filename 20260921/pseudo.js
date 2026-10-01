let code = "\
var x = 1;\n\
if x = 1 then\n\
print x\n\
x = 2\n\
if x=2:\n\
x=3\n\
print x\n\
fi"

let vars = {}

function tokenize(code) {
    let lines = code.split("\n");
    for (let i in lines) lines[i] = lines[i].replaceAll(/([;=:])/g, " $1 ");
    for (let i in lines)
        while (lines[i] != (lines[i] = lines[i].replaceAll(/  /g, " ").replaceAll(/^ /g, " ").replaceAll(/ $/g, " ")));
    let tokenized = [];
    for (let i in lines) tokenized[i] = lines[i].split(" ");
    return tokenized;
}

function fetch(tokenized, pc) {
    let line = tokenized[pc];
    let cur = 0;
    function next() {if (cur<line.length()) return line[cur++]; else return null}
    switch (next()) {
        case "var":
            if(vars[next()]==null) {
                if(next() == '=') vars[]
            }
    }
}

function decode(line) {

}

function execute(line) {

}

let line = "";
let pc = 0;
let tokenized = tokenize(code)
while((line = fetch(tokenized, pc++)) != null)
    execute(decode(line))