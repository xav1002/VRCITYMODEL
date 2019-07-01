AFRAME.registerComponent('red-cube', {
    init: function() {
        this.el.setAttribute('geometry', {
            primitive: 'box',
            width: '10',
            height: '10',
            depth: '10'
        });
        this.el.setAttribute('material', {
            color: 'red'
        });
        this.el.emit('test');
    }
})

AFRAME.registerComponent('ground', {
    init: function() {
        this.el.setAttribute('geometry', {
            primitive: 'plane',
            width: '25000',
            height: '25000'
        })
        this.el.setAttribute('material', {
            src: '#grasstexture'
        })
        this.el.setAttribute('rotation', '-90 0 0')
        this.el.setAttribute('position', '0 -500 0')
    }
})

AFRAME.registerComponent('cabin', {
    init: function() {
        this.el.setAttribute('obj-model', {
            obj: '#woodencabinobj',
            mtl: '#woodencabinmtl'
        });
        this.el.setAttribute('animation', {
            property: 'rotation',
            to: '0 360 0',
            dur: '1500',
            easing: 'linear',
            loop: 'true'
        });
        this.el.addEventListener('test', function() {
            console.log('components');
        })
    }
})

AFRAME.registerComponent('dancing', {
    init: function() {
        this.el.setAttribute('gltf-model', '#dancing');
    }
})

AFRAME.registerComponent('change-color-on-hover', {
    schema: {
      color: {default: 'red'}
    },

    init: function () {
      var data = this.data;
      var el = this.el;  // <a-box>
      this.switch = true;
      var defaultColor = el.getAttribute('material').color;

      el.addEventListener('axismove', function () {
        el.setAttribute('color', data.color);
      });

      el.addEventListener('buttonup', function () {
        el.setAttribute('color', defaultColor);
      });
    }
  });

  AFRAME.registerComponent('iscontroller', {
      init: function() {
          console.log(this.el.object3D.position);
          console.log(this);

        //   console.log(this.getGamepad());

          var data = this.data;
          data.acceleration = 65;
          data.controller = 0;
          data.easing = 20;
          data.flyEnabled = false;
          data.lookEnabled = true;

          const game = this;
          
          var controller;

          window.addEventListener('gamepadconnected', function(e) {
            return controller = navigator.getGamepads()[0];
          });

          console.log(controller);

          window.addEventListener('keydown', function(e) {
            switch ( e.keyCode ) {

                case 38: // up
                case 87: // w
                        game.moveForward = true;
                        // console.log(game.moveForward);
                        break;
    
                case 37: // left
                case 65: // a
                        game.moveLeft = true;
                        break;
    
                case 40: // down
                case 83: // d
                        game.moveBackward = true;
                        break;
    
                case 39: // right
                case 68: // d
                        game.moveRight = true;
                        break;
    
                case 32: // up
                        game.moveUp = true;
                        break;
    
                case 16: // down
                        game.moveDown = true;
                        break;
                    }
        });

        window.addEventListener('keyup', function(e) {
            switch ( e.keyCode ) {
    
                case 38: // up
                case 87: // w
                        game.moveForward = false;
                        break;
    
                case 37: // left
                case 65: // a
                        game.moveLeft = false;
                        break;
    
                case 40: // down
                case 83: // d
                        game.moveBackward = false;
                        break;
    
                case 39: // right
                case 68: // d
                        game.moveRight = false;
                        break;
    
                case 32: // up
                        game.moveUp = false;
                        break;
    
                case 16: // down
                        game.moveDown = false;
                        break;
                    }
        });
      },
      tick: function() {
          const game = this;
        if(game.moveForward) {
            game.el.object3D.translateZ(-2);
        } else if(game.moveBackward) {
            game.el.object3D.translateZ(2);
        } else if(game.moveRight) {
            game.el.object3D.translateX(2);
        } else if(game.moveLeft) {
            game.el.object3D.translateX(-2);
        } else if(game.moveUp) {
            game.el.object3D.translateY(2);
        } else if(game.moveDown) {
            game.el.object3D.translateY(-2);
        }
      }
  });