import re
import unicodedata

def utf8_to_codepoint_replacement(char):
    # Convert a single UTF-8 character to its Unicode codepoint in hexadecimal
    return ''.join(f'{ord(c):X}' for c in char)

def replace_utf8_in_identifiers(code):
    in_string = False
    escaped = False
    in_single_line_comment = False
    in_multi_line_comment = False
    output = []
    i = 0

    while i < len(code):
        char = code[i]
        
        # Handle string literals
        if in_string:
            if escaped:
                output.append(char)
                escaped = False
            elif char == '\\':
                output.append(char)
                escaped = True
            elif char == '"':
                output.append(char)
                in_string = False
            else:
                output.append(char)

        # Handle single-line comments
        elif in_single_line_comment:
            if char == '\n':
                output.append(char)
                in_single_line_comment = False
            else:
                output.append(char)

        # Handle multi-line comments
        elif in_multi_line_comment:
            if char == '*' and i + 1 < len(code) and code[i + 1] == '/':
                output.append(char)
                output.append('/')
                in_multi_line_comment = False
                i += 1  # Skip '/'
            else:
                output.append(char)

        else:
            # Detect start of a string
            if char == '"':
                output.append(char)
                in_string = True
            # Detect single-line comment
            elif char == '/' and i + 1 < len(code) and code[i + 1] == '/':
                output.append(char)
                output.append('/')
                in_single_line_comment = True
                i += 1  # Skip the second '/'
            # Detect multi-line comment
            elif char == '/' and i + 1 < len(code) and code[i + 1] == '*':
                output.append(char)
                output.append('*')
                in_multi_line_comment = True
                i += 1  # Skip the '*'
            else:
                # Check if the character is non-ASCII and part of an identifier
                if ord(char) > 127:
                    output.append(utf8_to_codepoint_replacement(char))
                else:
                    output.append(char)

        i += 1

    return ''.join(output)

with open('C:\\Users\\eic17\\Desktop\\traduz\\toki_ilo.tok', encoding='UTF-8') as file:
    array = []
    string = ''
    for line in file:
        array.append(line)
    with open('C:\\Users\\eic17\\Desktop\\traduz\\toki_ilo_transl.c', 'w', encoding='UTF-8') as out:
    # variables
        for i in range(len(array)): array[i] = (re.sub("([󱥓󱤽]󱦐)(.*)(󱦑󱤧󱤬󱤧󱥣)([󱤂󱥳󱥮󱤼󿵩󱤭󱤄]+)", "int var_\\2 = nnpParser(\"\\4\");", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(󱤽󱦐)(.*)(󱦑󱤽)([󱤂󱥳󱥮󱤼󿵩󱤭󱤄]+)", "var_\\2[nnpParser(\"\\4\")-1]", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(󱤽󱦐)(.*)(󱦑󱤽󱦐)(.*)(󱦑)", "var_\\2[var_\\4-1]", array[i]))
        for i in range(len(array)): array[i] = (re.sub("([󱥓󱤽]󱦐)(.*)(󱦑󱤧󱤬)", "int var_\\2;", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(󱥓)([󱤂󱥳󱥮󱤼󿵩󱤭󱤄]+)(󱤧󱤬󱤟󱥓󱦐)(󱥬)(󱦑)", "int var_\\4[nnpParser(\"\\2\")];", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(󱤽󱦐)([^󱦑]*)(󱦑)", "var_\\2", array[i]))
    # comparisons
        for i in range(len(array)): array[i] = (re.sub("([^ ]*)(󱤧󱤨󱥩)(.*)(󱤡\n)", "if(\\1 < \\3)\n", array[i]))
        for i in range(len(array)): array[i] = (re.sub("([^ ]*)(󱤧󱥣󱤂󱥩)(.*)(󱤡\n)", "if(\\1 <= \\3)\n", array[i]))
        for i in range(len(array)): array[i] = (re.sub("([^ ]*)(󱤧󱥖󱥩)(.*)(󱤡\n)", "if(\\1 = \\3)\n", array[i]))
        for i in range(len(array)): array[i] = (re.sub("([^ ]*)(󱤧󱥣󱥩)(.*)(󱤡\n)", "if(\\1 > \\3)\n", array[i]))
        for i in range(len(array)): array[i] = (re.sub("([^ ]*)(󱤧󱤨󱤂󱥩)(.*)(󱤡\n)", "if(\\1 >= \\3)\n", array[i]))
    # operations
        for i in range(len(array)): array[i] = (re.sub("(󱥄󱥌󱤉)(.*)(󱥩)(.*)(\n)", "\\4 += \\2;\n", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(󱥄󱥶󱤉)(.*)(󱥧)(.*)(\n)", "\\4 -= \\2;\n", array[i]))
        for i in range(len(array)): array[i] = (re.sub("([^ ].*)(󱤧)(.*)(󱤡)(.*)(󱥄)(.*)(\n)", "\\5 = \\1 * \\7 / \\3;\n", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(var_)(.*)(󱥄)(.*)", "\\1\\2 = \\4;", array[i]))
    # comments
        for i in range(len(array)): array[i] = (re.sub("󱥬󱤑󱤡\n", "/*\n", array[i]))
        for i in range(len(array)): array[i] = (re.sub("󱥬󱤑󱤧󱥐", "*/", array[i]))
        for i in range(len(array)): array[i] = (re.sub("󱥬󱤑󱤡", "//", array[i]))
    # else
        for i in range(len(array)): array[i] = (re.sub("󱤆󱤡", "else", array[i]))
    # numerals
        for i in range(len(array)): array[i] = (re.sub("(󱥣)([󱤂󱥳󱥮󱤼󿵩󱤭󱤄]+)", "nnpParser(\"\\2\")", array[i]))
    # labels
        for i in range(len(array)): array[i] = (re.sub("󱥉󱦐󱥇󱦝󱦑󱤡", "int main(){", array[i]))
        for i in range(len(array)): array[i] = (re.sub("󱥉󱦐󱥇󱦝󱦑󱤧󱥐", "    return 0;\n} // main end", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(󱥫󱦐)(.*)(󱦑󱤡)", "label_\\2:", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(󱥫󱦐)(.*)(󱦑󱤧󱥐)", "// label_\\2 end", array[i]))
    # nasinCurrent
        for i in range(len(array)): array[i] = (re.sub("󱤙󱤿󱦐Ａ󱦒Ｓ󱦒Ｃ󱦒Ｉ󱦒Ｉ󱦒󱦑󱤡", "var_nasinCurrent = ASCII;", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(󱤙󱤿󱤽)([󱤂󱥳󱥮󱤼󿵩󱤭󱤄]+)(󱤡)", "var_nasinCurrent = nnpParser(\"\\2\");", array[i]))
        for i in range(len(array)): array[i] = (re.sub("󱥄󱥐󱤙󱤿.*\n", "var_nasinCurrent = 0;\n", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(󱥄󱤮󱤉)(.*)(\n)", "print(\\2, var_nasinCurrent);\n", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(󱥄󱥩󱥫󱦐)(.*)(󱦑)", "goto label_\\2;", array[i]))
        for i in range(len(array)): array[i] = (re.sub("(_)([󱤀-󿯭])", "_UCSUR_\\2", array[i]))
    # library and nasinCurrent
        out.write("#include \"toki_ilo.h\"\n")
    # illegal characters in identifiers
        for i in range(len(array)): string += array[i]
        string = replace_utf8_in_identifiers(string)
    # output
        out.write(string)