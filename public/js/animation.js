var earthText = null;
var ca = document.querySelector('#ca');
var beginMessage = document.querySelector('#beginMessage');
var launchMusic = document.querySelector('#launchMusic');
var showMessage2 = document.querySelector('#showMessage2');
var triggerTimer = null;
var checkArray = {
 "Lee":0,
 "DoFu":0,
 "Wang":0,
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
var prev = null;
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
            launchMusic = document.querySelector('#launchMusic');
            ca = document.querySelector('#ca');
            beginMessage = document.querySelector('#beginMessage');
            // earthText.setAttribute('opacity',1);
            setTimeout( function(){
                // var earthText = document.querySelector('#showMessage1');
                earthText.setAttribute('value', '');
            },1000);
            checkArray[`${data.text}`]++;
            prev = data.text;
            if(checkArray['Mars']>= 2 && data.text=="Mars"){
                // document.querySelector('#galaxy-scene').setAttribute('visible',false);
                // document.querySelector('#landing').setAttribute('visible',true);
                location.href = './landing/landing.html';
            }
            else {
                if((checkArray['Lee']>= 1 && data.text=="Lee") || (checkArray['DoFu']>= 1 && data.text=="DoFu") || (checkArray['Wang']>= 1 && data.text=="Wang")){
                    // beginMessage.setAttribute('visible',false);
                    // showMessage2 = document.querySelector('#showMessage2');
                    // showMessage2.setAttribute('value',data.text+' said go to Mars');
                    // earthText.setAttribute('value','');
                    // setTimeout( function(){
                    //     // var earthText = document.querySelector('#showMessage1');
                    //     showMessage2.setAttribute('value', '');
                    // },15000);
                    // ca.emit('fade');
                    
                    triggerTimer = setTimeout( function(){
                        if(prev == data.text){
                          moveIn();
                        }
                        clearTimeout(triggerTimer);
                    }, 2000);
                    // moveIn();
                    // launchMusic.setAttribute('autoplay',true);
                    // setTimeout( function(){
                        
                    //     launchMusic.setAttribute('autoplay',false);
                    // },25000);
                }
            }
           
        });
    }
});
function moveIn(){
    beginMessage.setAttribute('visible',false);
    showMessage2 = document.querySelector('#showMessage2');
    showMessage2.setAttribute('value',prev+' said go to Mars');
    earthText.setAttribute('value','');
    setTimeout( function(){
        // var earthText = document.querySelector('#showMessage1');
        showMessage2.setAttribute('value', '');
    },15000);
    ca.emit('fade');
}
// AFRAME.registerComponent('open-vr',{
//     init: function(){
//         console.log('openVR');
//         var MainScene = document.querySelector('a-scene');
//         MainScene.enterVR();
//     }
// });