var rockWrapTop = document.querySelector('#rockWrapTop');
var rockWrapLeft = document.querySelector('#rockWrapLeft');
var rockWrapRight = document.querySelector('#rockWrapRight');
var player = document.querySelector('#player');
var maze = document.querySelector('#maze');
var opening = document.querySelector('#opening');
var rockCorner;
var rockwall;
var corner = 0;
var hoverCheck = false;
var MAP_SIZE = 10,
PLATFORM_SIZE = 5,
NUM_PLATFORMS = 100;
var v, rock;
var currntposZ;
var currntposX;
var currntposY;
var treasureXPos = 0;
var treasureZPos = 35;
document.querySelector('a-scene').addEventListener('render-target-loaded',function(){

  loadrockWall(rockWrapTop);
  loadrockWall(rockWrapLeft);
  loadrockWall(rockWrapRight);
  loadMaze();


});

function loadrockWall(side){

  for(var i=0;i<15;i++){
      rockwall = document.createElement('a-dodecahedron');
      side.appendChild(rockwall);
      rockwall.setAttribute('src','#stone');
      rockwall.setAttribute('radius','5.5');
      rockwall.setAttribute('static-body','');
      rockwall.setAttribute('position','0 2 '+(i*5)+' ');
  }
}

function loadMaze(){
  for (var i = 0;  i < NUM_PLATFORMS; i++) {
      // y: 0 is ground
      v = {
          x: (Math.floor(Math.random() * MAP_SIZE) - PLATFORM_SIZE) * PLATFORM_SIZE,
          y: 1,
          z: (Math.floor(Math.random() * MAP_SIZE) - PLATFORM_SIZE) * PLATFORM_SIZE
      };
      rock = document.createElement('a-dodecahedron');
      maze.appendChild(rock);
      rock.setAttribute('src','#stone');
      rock.setAttribute('radius','3');
      rock.setAttribute('position', v.x + ' ' + v.y + ' ' + v.z);
      rock.setAttribute('static-body', '');
  }
}



// treasure point

function addtreasure(x,z){

  if(x<=treasureXPos && z>=treasureZPos){
    alert('找到絕世詩集了');
  }

}

// fuing function
AFRAME.registerComponent('check', {
  init:function(){
    var element = this.el;
    console.log('ok');
    
    this.el.addEventListener('click',function(){
          hoverCheck = true;
          console.log(element,'check');
    });
  }
});
//effect

AFRAME.registerComponent('effect',{
  init:function(){
    var effectBox = document.querySelector('#effect');
    effectBox.addEventListener('animationstart',function(){
      hoverCheck = false;
      console.log('animationstart');
      
    });
    effectBox.addEventListener('animationend',function(){
        setTimeout(function(){
          hoverCheck = true;
        },1500);
        console.log('effect end');
        
      });
  }
});
// auto move
AFRAME.registerComponent('automove-controls', {
  init: function () {
      this.speed = 0.2;
      this.isMoving = false;
      this.velocityDelta = new THREE.Vector3();
  },
  tick:function(){
    if(hoverCheck == true){
      this.isMoving = true;
    }else{
      this.isMoving = false;
    }
  },
  isVelocityActive: function () {
      return this.isMoving;
  },
  getVelocityDelta: function () {
      this.velocityDelta.z = this.isMoving ? -this.speed : 0;
      return this.velocityDelta.clone();
  }
});

//message show and hide
AFRAME.registerComponent('megshowandhide',{
    init:function(){
       var showMessage = document.querySelector('#showMessage');
       opening.addEventListener('animationend',function(){
          setTimeout(function(){
            showMessage.setAttribute('visible',false);
            hoverCheck = true;
          },1000);
       });
    }

});

// player position listener
AFRAME.registerComponent('listener', {
    init:function(){
      console.log(this.el.getAttribute('position').z,'currentZ');
    },
    tick: function () {
      currntposZ = this.el.getAttribute('position').z;
      currntposX = this.el.getAttribute('position').x;
      currntposY = this.el.getAttribute('position').y;
      addtreasure(currntposX,currntposZ);
      // console.log(this.el.getAttribute('position'),'positon');
      
    }
  });