$(document).ready(function(){
    
});
var earthText = null;
var checkArray = {
 "Earth":0,
 "Mercury":0,
 "Venus":0,
 "Mars":0,
 "Jupiter":0,
 "Saturn":0,
 "Uranus":0,
 "Neptune":0,
 "Sun":0
};
AFRAME.registerComponent('show-text',{
    schema: {
        text: {default:'no data'}
    },
    init: function(){
        var data = this.data;
        // var mainScene = document.querySelector('a-entity');
        this.el.addEventListener('click', function(){
            console.log(data.text);
            earthText = document.querySelector('#showMessage1');
            earthText.setAttribute('value',data.text);
            // earthText.setAttribute('opacity',1);
            setTimeout( function(){
                // var earthText = document.querySelector('#showMessage1');
                earthText.setAttribute('value', '');
            },1000);
            checkArray[`${data.text}`]++;
            if(checkArray['Earth']>= 2 && data.text=="Earth"){
                // document.querySelector('#galaxy-scene').setAttribute('visible',false);
                // document.querySelector('#landing').setAttribute('visible',true);
                location.href = './landing/landing.html';
            }
           
        });
    }
});

// AFRAME.registerComponent('open-vr',{
//     init: function(){
//         console.log('openVR');
//         var MainScene = document.querySelector('a-scene');
//         MainScene.enterVR();
//     }
// });