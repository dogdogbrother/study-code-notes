for(var i=1;i<=5;i++){
    (function(j){
        setTimeout(function timer(){
            console.log(j);
            
        },i*1000)
    })(i)
}

// for(var i=1;i<=5;i++){

//         setTimeout(function timer(){
//             console.log(i);
            
//         },i*1000)
    
// }