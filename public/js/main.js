// player position listener
AFRAME.registerComponent('listener', {
    tick: function () {
      console.log(this.el.getAttribute('position'),'positon');
    }
});

AFRAME.registerComponent('open-vr',{
    init: function(){
        console.log('openVR');
        var MainScene = document.querySelector('a-scene');
        MainScene.enterVR();
    }
});