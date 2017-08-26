$(document).ready(function(){
    
});

AFRAME.registerComponent('show-text',{
    schema: {
        text: {default:'no data'}
    },
    init: function(){
        var data = this.data;
        // var mainScene = document.querySelector('a-entity');
        this.el.addEventListener('click', function(){
            console.log(data.text);
            var earthText = document.querySelector('#showMessage');
            earthText.setAttribute('value',data.text);
            earthText.setAttribute('opacity',1);
            setTimeout( function(){
                var earthText = document.querySelector('#showMessage');
                earthText.setAttribute('value', '');
            },1000);
            // mainScene.pause();
            // $.get('./landing/landing.html', function(data){
            //     // console.log(data);
            //     // $(data).find('a-scene');
            //     // console.log(data);
            //     // $('html').html(data);
                // location.href= './landing/landing.html';

            // });
            // mainScene.setAttribute('template', 'src', '#scene2');
        });
    }
});

AFRAME.registerComponent('open-vr',{
    init: function(){
        console.log('openVR');
        var MainScene = document.querySelector('a-scene');
        MainScene.enterVR();
    }
});