#ifndef TOKI_ILO_H
#define TOKI_ILO_H

#include <stdio.h>

typedef enum {
    NONE,
    ASCII,
    NUMBER
}type_nasinCurrent;

type_nasinCurrent var_nasinCurrent;

void print(int a, type_nasinCurrent var_nasinCurrent){
    switch(var_nasinCurrent){
        case NONE:
            return;
        case ASCII:
            printf("%c", a);
        case NUMBER:
            printf("%d", a);
        default:
            return;
    }
}

int nnpParserOld(char* string){
    int out=0;
    for(int i=0; string[i]!='\0'; i++){
        switch(string[i]){
            case 'W':
                out += 1;
                break;
            case 'T':
                out += 2;
                break;
            case 'L':
                out += 5;
                break;
            case 'M':
                out += 20;
                break;
            case 'A':
                out *= 100;
                break;
        }
    }
    return out;
}

int nnpSingleDigit(char* string){
    // NaN
    if(string[0] != -13)
        return -1;
    // -65=mute(LLLL), -79=anteale
    if(string[1] != -79 && string[1] != -65)
        return -1;
    
    if(string[2]==-92)
        switch (string[3]){
        case -126:
            return 0;
            break;
        case -83:
            return 5;
            break;
        case -68:
            return 20;
            break;
        case -124:
            return 100;
            break;
        default:
            return -1;
            break;
        }

    if(string[2]==-91)
        switch (string[3]){
            case -77:
                return 1;
                break;
            case -82:
                return 2;
                break;
            default:
                return -1;
                break;
        }

    if(string[2]==-75 && string[3]==-87) return 20;

    return -1;
}

int nnpParser(char* string){
    int out=0;
    int prov=0;
    for(int i=0; string[i]!='\0'; i+=4){
        prov = nnpSingleDigit(string+i);
        if(prov==0)
            return 0;
        if(prov==100)
            out *= prov;
        else
            out += prov;
    }
    return out;
}

#endif