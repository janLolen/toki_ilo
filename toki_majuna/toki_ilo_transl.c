#include "toki_ilo.h"
/*
    󱤎󱥁󱤧󱥌󱤉󱤽󱥜
    3141...
    󱥞󱥷󱤉󱤽󱥔󱤡󱥆󱤧󱤙󱥫󱥣
    󱥔󱤽󱥍nnpParser("󱥳󱤄󱤄󱤄")󱤡󱥆󱤧󱤙󱥫󱥜󱤭‍󱤭‍󱤭󱤬󱤎󱤴
    󱥫󱥤󱥳󱤧󱥫󿵩󱥮‍󱥮󱤡󱥔󱤽󱥍nnpParser("󱥳󱤄󱤄")󱤧󱥷󱤉󱥫󱤭‍󱤭‍󱤭‍󱥳
    󱥔󱤽󱥍nnpParser("󱥳󱤄󱤄")󱤡󱥆󱤧󱤙󱥫󱥜󱤭‍󱤭‍󱤭󱤬󱤎󱤴
*/

int main(){
    //󱥡󱤧󱥔󱥁
    //󱥁󱥄󱤿󱥁󱦝󱥠󱦐󱥳󱦑󱥍󱤼󱥳󱤊󱥠󱦐󱤄󱦑󱥍󱤼󱤼
    int var_UCSUR_F1904 = nnpParser("󱥳󱤄󱤄");
    //󱥁󱤧󱤽󱥷
    int var_UCSUR_F195C = nnpParser("󱤂");

    int var_UCSUR_F1904F1904 = nnpParser("󱥳");
    var_UCSUR_F1904F1904 = var_UCSUR_F1904 * var_UCSUR_F1904 / nnpParser("󱥳");

    int var_UCSUR_F1973 = nnpParser("󱤂");
    int var_UCSUR_F196E = nnpParser("󱤂");
    int var_UCSUR_F1973F1973 = nnpParser("󱥳");
    int var_UCSUR_F196EF196E = nnpParser("󱥳");
    int var_UCSUR_F196EF1973;

    label_UCSUR_F1973:
        var_UCSUR_F196E = nnpParser("󱤂");
        label_UCSUR_F196E:
            var_UCSUR_F196EF1973 = nnpParser("󱤂");
            var_UCSUR_F1973F1973 = var_UCSUR_F1973 * var_UCSUR_F1973 / nnpParser("󱥳");
            var_UCSUR_F196EF196E = var_UCSUR_F196E * var_UCSUR_F196E / nnpParser("󱥳");
            var_UCSUR_F196EF1973 += var_UCSUR_F1973F1973;
            var_UCSUR_F196EF1973 += var_UCSUR_F196EF196E;
            if(var_UCSUR_F196EF1973 < var_UCSUR_F1904F1904)
                var_UCSUR_F195C += nnpParser("󱥳");
            var_UCSUR_F196E += nnpParser("󱥳");
            if(var_UCSUR_F196E < var_UCSUR_F1904)
                goto label_UCSUR_F196E;
        // label_UCSUR_󱥮 end
        var_UCSUR_F1973 += nnpParser("󱥳");
        if(var_UCSUR_F1973 < var_UCSUR_F1904)
            goto label_UCSUR_F1973;
    // label_UCSUR_󱥳 end
    var_UCSUR_F195C = var_UCSUR_F195C * nnpParser("󱥮󱥮") / nnpParser("󱥳");
    var_nasinCurrent = nnpParser("󱥮");
        print(var_UCSUR_F195C, var_nasinCurrent);
    var_nasinCurrent = 0;
    return 0;
} // main end
