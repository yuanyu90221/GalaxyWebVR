$(document).ready(function(){
    
});

AFRAME.registerComponent('show-text',{
    schema: {
        text: {default:'no data'}
    },
    init: function(){
        var data = this.data;
        this.el.addEventListener('click', function(){
            console.log(data.text);
            location.href='./landing/landing.html';
        });
    }
})