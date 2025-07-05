const cart = "[^󱦐󱦑]+"
const num = "[󱤂󱥳󱥮󱤼󿵩󱤭󱤄]+"

let unitRegexes = {
        variable: {
            pattern: new RegExp(`^󱥓󱦐(${cart})󱦑$`, "u"),
            dims(line) {return 0},
            name(line) {return line.match(this.pattern)[1]},
            declare(line) {
                let name = this.name(line)
                log(`creating variable ${name}`)
                vars[name] = {
                    type: "variable",
                    value: 0,
                    constant: false
                }
            },
            assign(line, value) {
                vars[this.name(line)].value = value
            },
            evaluate(line) {
                return vars[this.name(line)].value
            }
        },
        array: {
            pattern: new RegExp(`^󱤟󱥓󱦐(${cart})󱦑$`, "u"),
            dims(line) {return 1},
            name(line) {return line.match(this.pattern)[1]},
            declarable: true
        },
        matrix: {
            pattern: new RegExp(`^󱤟󱦐(${cart})󱦑(󱥍󱤟)+󱥓$`, "u"),
            dims(line) {return line.match(/󱤟/).length},
            name(line) {return line.match(this.pattern)[1]},
            declarable: true
        },
        arrayIndex: {
            pattern: new RegExp(`^󱥓󱤽(${num})󱤬󱤟(󱥓)?󱦐(${cart})󱦑$`, "u"),
            index(line) {return line.match(this.pattern)[1]},
            name(line) {return line.match(this.pattern)[3]},
            assignable: true
        },
        matrixIndex: {
            pattern: new RegExp(`^(󱥓󱤽${num})(󱤬󱤟󱤽${num}|󱥍󱤟󱤽${num})*(󱤬|󱥍)󱤟(󱥓)?󱦐(${cart})󱦑$`, "u"), // how the fuck
            indices(line) {return (line.match(this.pattern)[1]+line.match(this.pattern)[2]).match(num)},
            name(line) {return line.match(this.pattern)[5]},
            assignable: true
        }
    }

// THIS WORKS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function assign (destination, value) {
    let dType, vType
    for(let i in unitRegexes) {
        if(destination.match(unitRegexes[i].pattern)) dType=i
        if(value.match(unitRegexes[i].pattern)) vType=i
    }
    unitRegexes[dType].assign(destination, unitRegexes[vType].evaluate(value))
}

let assignment = {
    pattern: new RegExp(`^(.*)(󱥄󱥣)(.*)$`, "u"),
    action(line) {assign(line.match(this.pattern)[1], line.match(this.pattern)[2])}
}