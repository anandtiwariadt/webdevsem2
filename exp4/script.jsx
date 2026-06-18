function calculateresult(){
    let n=document.getElementById("subjects").value;
    let total=0;
    let marks;
    for(let i=1;i<=n;i++){
        marks=parseFloat(prompt("enter the marks of subjects"+i));
        total=total+marks;
    }
    let average=total/n;
    let grade;
    let result;
    if(average>=90&&average<=100){
       grade="grade A";
    }
    else if(average>=80&&average<=90){
        grade="grade B";
    }
    else if(average>=70&&average<80){
        grade="grade c";
    }
    else if(average>=60&&average<70){
       grade="grade d";
    }
    else if(average>=50&&average<60){
        grade="grade e";
    }
    else{
        grade="grade f";
    }
    if(average>=40){
        result="pass";
    }
    else{
        result="fail";
    }
    document.getElementById("result").innerHTML=
    "total marks: " + total+ 
    "<br>"+"average marks:" + average.toFixed(2)+
    "<br>"+"grade:"+grade +
    "<br>"+"result:" +result;
    }
    
    

