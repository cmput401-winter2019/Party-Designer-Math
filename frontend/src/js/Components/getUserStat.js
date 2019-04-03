export function GetUserStat(data){
    var addition_correct      = [];
    var addition_wrong        = [];
    var subtraction_correct   = [];
    var subtraction_wrong     = [];
    var mult_correct          = [];
    var mult_wrong            = [];
    var div_correct           = [];
    var div_wrong             = [];
    var mixed_correct         = [];
    var mixed_wrong           = [];

    for(var i=0; i<data.length; i++){
    if(data[i].arithmeticType == "addition"){
      if(data[i].correct == true){
        addition_correct.push(data[i]);
      }else if(data[i].correct == false || data[i].correct == null){
        addition_wrong.push(data[i]);
      }
    }

    if(data[i].arithmeticType == "subtraction"){
      if(data[i].correct == true){
        subtraction_correct.push(data[i]);
      }else if(data[i].correct == false || data[i].correct == null){
        subtraction_wrong.push(data[i]);
      }
    }

    if(data[i].arithmeticType == "multiplication"){
      if(data[i].correct == true){
        mult_correct.push(data[i]);
      }else if(data[i].correct == false || data[i].correct == null){
        mult_wrong.push(data[i]);
      }
    }

    if(data[i].arithmeticType == "divison"){
      if(data[i].correct == true){
        div_correct.push(data[i]);
      }else if(data[i].correct == false || data[i].correct == null){
        div_wrong.push(data[i]);
      }
    }

    if(data[i].arithmeticType == "mixed"){
      if(data[i].correct == true){
        mixed_correct.push(data[i]);
      }else if(data[i].correct == false || data[i].correct == null){
        mixed_wrong.push(data[i]);
      }
    }
  }
  return {  add_cor: addition_correct,
            add_wrn: addition_wrong,
            sub_cor: subtraction_correct,
            sub_wrn: subtraction_wrong,
            mul_cor: mult_correct,
            mul_wrn: mult_wrong,
            div_cor: div_correct,
            div_wrn: div_wrong,
            mix_cor: mixed_correct,
            mix_wrn: mixed_wrong }
}
