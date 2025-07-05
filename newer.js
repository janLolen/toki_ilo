function parseline(line) {
    const cart = "[^󱦐󱦑]+"
    const num = "[󱤂󱥳󱥮󱤼󿵩󱤭󱤄]+"
    //const num = "[u{f1902}u{f1973}u{f196e}u{f193c}u{ffd69}u{f192d}u{f1904}]+"
    let unitRegexes = {
        variable: {
            pattern: new RegExp(`^󱥓󱦐(${cart})󱦑$`, "u"),
            dims(line) {return 0},
            name(line) {return line.match(this.pattern)[1]},
            declarable: true,
            assignable: true
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
    let unit = null
    let type = undefined
    for(let i in unitRegexes) if(line.match(unitRegexes[i].pattern)) type=i
    unit = unitRegexes[type]

    /**
     * line -> match OPERATOR
     * OPERATOR : (esempio) "ASSIGNABLE o kama EVALUABLE"
     * ASSIGNABLE = concatenateAlternating(unitRegexes.filter(assignable=true).pattern, "|")
     * EVALUABLE = stessa cosa
     * Quindi line ha due campi: ASSIGNABLE=$1, EVALUABLE=$2
     * E poi fai la cosa usando unitRegexes
     */
}