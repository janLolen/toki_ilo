#include "toki_ilo.h"
/*
    󱤎󱥁󱤧󱥌󱤉󱥂󱦐󱥬󱦝󱦑󱤙󱥠󱦐󱤧󱤂󱥙󱤍󱥁󱤂󱦑
*/

int main(){
    int var_UCSUR_F196C[nnpParser("󱥮󱥮")];
    int var_UCSUR_F195D;
    //󱥁󱤧󱤙󱤿󱦐Ａ󱦒Ｓ󱦒Ｃ󱦒Ｉ󱦒Ｉ󱦒󱦑
    var_UCSUR_F196C[nnpParser("󱥳")-1] = nnpParser("󱥳󱤄󱤭󱤭󱤭󱥳");
    var_UCSUR_F196C[nnpParser("󱥮")-1] = nnpParser("󱥳󱤄󱤭󱤭󱥳");
    var_UCSUR_F196C[nnpParser("󱥮󱥳")-1] = nnpParser("󱥳󱤄󱤭󱥮");
    var_UCSUR_F196C[nnpParser("󱥮󱥮")-1] = nnpParser("󱥳󱤄󱤭");
    var_UCSUR_F195D = nnpParser("󱥳");
    label_UCSUR_F195D:
        var_nasinCurrent = ASCII;
            print(var_UCSUR_F196C[var_UCSUR_F195D-1], var_nasinCurrent);
        var_nasinCurrent = 0;
        var_UCSUR_F195D += nnpParser("󱥳");
        if(var_UCSUR_F195D <= nnpParser("󱥮󱥮"))
            goto label_UCSUR_F195D;
    // label_UCSUR_󱥝 end
    return 0;
} // main end