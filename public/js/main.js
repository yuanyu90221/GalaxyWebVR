var rockWrapTop = document.querySelector('#rockWrapTop');
var rockWrapLeft = document.querySelector('#rockWrapLeft');
var rockWrapRight = document.querySelector('#rockWrapRight');
var rockWrapBottom = document.querySelector('#rockWrapBottom');
var player = document.querySelector('#player');
var maze = document.querySelector('#maze');
var mazeWall1 = document.querySelector('#wall1');
var mazeWall2 = document.querySelector('#wall2');
var mazeWall3 = document.querySelector('#wall3');
var mazeWall4 = document.querySelector('#wall4');
var opening = document.querySelector('#opening');
var rockCorner;
var rockwall;
var corner = 0;
var hoverCheck = false;
var treasureCheck = false;
var MAP_SIZE = 10,
PLATFORM_SIZE = 5,
NUM_PLATFORMS = 35;
var v, rock;
var currntposZ;
var currntposX;
var currntposY;
var frontAndleft = Math.floor(Math.random() * 2)
var treasureXPos;
var treasureZPos;

if(frontAndleft > 1){
  treasureXPos = Math.floor(Math.random() * 10);
  treasureZPos = Math.floor(Math.random() * 20);
}else{
  treasureXPos = Math.floor(Math.random() * 10)*-1;
  treasureZPos = Math.floor(Math.random() * 20)*-1;
}
document.querySelector('a-scene').addEventListener('render-target-loaded',function(){

  loadrockWall(rockWrapTop);
  loadrockWall(rockWrapLeft);
  loadrockWall(rockWrapRight);
  loadrockWall(rockWrapBottom);
  loadMaze();


});

function loadrockWall(side){

  for(var i=0;i<15;i++){
      rockwall = document.createElement('a-dodecahedron');
      // rockwall =  document.createElement('a-entity');
      side.appendChild(rockwall);
      // rockwall.setAttribute('obj-model','obj: #rockObj; mtl: #rockMtl');
      // rockwall.setAttribute('scale','0.08 0.08 0.08');
      rockwall.setAttribute('src','#stone');
      rockwall.setAttribute('radius','5.5');
      rockwall.setAttribute('static-body','');
      rockwall.setAttribute('position','0 2 '+(i*5)+' ');
  }
}

function loadMaze(){
  for (var i = 0;  i < 20; i++) {
      // y: 0 is ground
      var wallnumber = Math.floor(Math.random() * 4);
      v = {
          x: (Math.floor(Math.random() * MAP_SIZE) - PLATFORM_SIZE) * PLATFORM_SIZE+1,
          y: Math.floor(Math.random() * 2),
          z: (Math.floor(Math.random() * MAP_SIZE) - PLATFORM_SIZE) * PLATFORM_SIZE+1
      };

      if(wallnumber == 1){
        createrockwall(mazeWall1,v.x,v.y,v.z);
      }else if(wallnumber == 2){
        createrockwall(mazeWall2,v.x,v.y,v.z);
      }else if(wallnumber == 3){
        createrockwall(mazeWall3,v.x,v.y,v.z);
      }else{
        createrockwall(mazeWall4,v.x,v.y,v.z);
      }

      rock = document.createElement('a-dodecahedron');
      maze.appendChild(rock);
      rock.setAttribute('src','#stone');
      rock.setAttribute('radius','0.5');
      rock.setAttribute('position', v.x + ' ' + 0 + ' ' + v.z);
      rock.setAttribute('dynamic-body', '');
  }
  // var treasureBox = document.createElement('a-box');
  // maze.appendChild(treasureBox);
  // treasureBox.setAttribute('check','');
  var treasureBox1 = document.querySelector('#treasureBox1');
  treasureBox1.setAttribute('position', ''+treasureXPos + ' ' + 2.5 + ' ' + treasureZPos + '');
}

function createrockwall(wall,x,y,z){
     var wallrock = document.createElement('a-dodecahedron');
     wall.appendChild(wallrock);
     wallrock.setAttribute('src','#stone');
     wallrock.setAttribute('radius','3');
     wallrock.setAttribute('position', x + ' ' + y + ' ' + z);
     wallrock.setAttribute('static-body', '');
}

// treasure point

function addtreasure(x,z){
  var showMessage = document.querySelector('#showMessage');
  var treasureAlert = document.querySelector('#treasureAlert');
  if(x<=treasureXPos && z>=treasureZPos){
    // console.log('絕世詩集在附近');
    treasureCheck = true;
    treasureAlert.setAttribute('visible',true);
  }else{
    treasureCheck = false;
    treasureAlert.setAttribute('visible',false);
    // showMessage.setAttribute('visible',false);
  }
  

}

// fuing function
AFRAME.registerComponent('check', {
  init:function(){
    var element = this.el;
    var showMessage = document.querySelector('#showMessage');
    var message = document.querySelector('#message');
    this.el.addEventListener('click',function(){
          hoverCheck = true;
          showMessage.setAttribute('visible',true);
          message.setAttribute('value','GET TREASURE !!!');
          location.href="/GalaxyWebVR/public/";
    });
  }
});


//discover effect function
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

//reland
AFRAME.registerComponent('reland',{
  init:function(){
    this.el.addEventListener('click',function(){
      showMessage.setAttribute('visible',true);
      message.setAttribute('value','reload?!');
      setTimeout(function(){
        location.reload();
      },1000);
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
  // tick:function(){
  //   if(hoverCheck == true){
  //     this.isMoving = true;
  //   }else{
  //     this.isMoving = false;
  //   }
  // },
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
      console.log(treasureXPos,'posx');
      console.log(treasureZPos,'posZ');
      //console.log(this.el.getAttribute('position'),'positon');
      
    }
  });

AFRAME.registerComponent('open-vr',{
    init: function(){
        console.log('openVR');
        var MainScene = document.querySelector('a-scene');
        MainScene.enterVR();
    }
});