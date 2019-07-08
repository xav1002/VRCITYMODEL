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

/**
 * Heavily copied from Don McCurdy's aframe-gamepad-controls
 * 
 * scene.isIOS?
 */

AFRAME.registerComponent('android-controller', {
    init: function() {
        console.log(this);

        this.buttons;

        var data = this.data;
        data.acceleration = 65;
        data.controller = 0;
        data.easing = 20;
        data.flyEnabled = false;
        data.lookEnabled = true;

        const game = this;
        
        this.controllerReady = false;

        prepController = () => {
            console.log(navigator.getGamepads()[0]);
            console.log(navigator.getGamepads()[0].axes);
            console.log(navigator.getGamepads()[0].buttons);
            return this.controller = navigator.getGamepads()[0], this.controllerReady = true;
        }

        window.addEventListener('gamepadconnected', prepController);

        console.log(this.controllerReady);

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

        if(game.controllerReady) {
            game.updateButtons();
            game.updateJoystick();
            game.updateMovement();
        }
    },
    updateJoystick: function() {
        this.axes = navigator.getGamepads()[0].axes;
        return new THREE.Vector2(this.axes[0], this.axes[1]);
    },
    updateButtons: function() {
        const game = this;
        this.buttons = navigator.getGamepads()[0].buttons;
        for(var i = 0; i < 14; i += 1) {
        if(this.buttons[i].pressed) {
            game.newEvent = new Event(`${i}event`, {bubbles: true, cancelable: true});
            this.el.dispatchEvent(game.newEvent);
            }
        }
    },
    updateMovement: function() {
        const game = this;
        this.buttons = navigator.getGamepads()[0].buttons;
        game.el.object3D.translateX(this.updateJoystick().x);

        if(!this.buttons[0].pressed) {
        game.el.object3D.translateZ(this.updateJoystick().y);
        } else if(this.buttons[0].pressed) {
            game.el.object3D.translateY(-this.updateJoystick().y);
        }

    }
});

AFRAME.registerComponent('ios-controller', {
    init: function() {
        console.log(this);

        this.container = document.querySelector('#container');

        const game = this;

        this.directionVector = new THREE.Vector3();

        window.addEventListener('keydown', function(e) {
            switch ( e.keyCode ) {
    
                case 65: // a, joystick forward
                        game.moveForward = true;
                        break;
    
                case 88: // x, joystick left
                        game.moveLeft = true;
                        break;
    
                case 68: // d, joystick backward
                        game.moveBackward = true;
                        break;
    
                case 87: // w, joystick right
                        game.moveRight = true;
                        break;
    
                case 79: // o, topbutton
                        game.moveUp = true;
                        break;
    
                case 76: // l, bottombutton
                        game.moveDown = true;
                        break;

                case 81: // q, joystick forward release
                        game.moveForward = false;
                        break;

                case 90: // z, joystick left release
                        game.moveLeft = false;
                        break;

                case 67: // c, joystick backward release
                        game.moveBackward = false;
                        break;

                case 69: // e, joystick right release
                        game.moveRight = false;
                        break;

                case 71: // topbutton release
                        game.moveUp = false;
                        break;

                case 86: // bottombutton release
                        game.moveDown = false;
                        break;

                        /**
                         * Can also emit event on release
                         */

                case 89: // C button push
                        var newEvent4 = new Event('4event', {bubbles: true, cancelable: true});
                        game.el.dispatchEvent(newEvent4);

                case 72: // B button push
                        var newEvent10 = new Event('10event', {bubbles: true, cancelable: true});
                        game.el.dispatchEvent(newEvent10);

                case 89: // A button push
                        var newEvent11 = new Event('11event', {bubbles: true, cancelable: true});
                        game.el.dispatchEvent(newEvent11);
                    }
            });

            window.addEventListener('4event', function() {
                console.log(game.el);
            })
    },
    tick: function() {
        this.updatePosition();
    },
    updatePosition: function() {
        const game = this;
        this.el.object3D.getWorldDirection(game.directionVector);
        this.el.object3D.children[1].position.x = this.el.object3D.position.x;
        this.el.object3D.children[1].position.y = this.el.object3D.position.y;
        this.el.object3D.children[1].position.z = this.el.object3D.position.z;
        // console.log(this.el.object3D.children[1].rotation, this.el.object3D.rotation);
        // console.log(this.el.object3D.children[1]);
        if(game.moveForward) {
            // this.el.object3D.children[1].translateZ(-1);
            this.el.object3D.translateZ(-1);
        } else if(game.moveBackward) {
            // this.el.object3D.parent.translateZ(1);
            this.el.object3D.translateZ(1);
        } else if(game.moveRight) {
            // this.el.object3D.parent.translateX(1);
            this.el.object3D.translateX(1);
        } else if(game.moveLeft) {
            // this.el.object3D.parent.translateX(-1);
            this.el.object3D.translateX(-1);
        } else if(game.moveUp) {
            // this.el.object3D.parent.translateY(1);
            this.el.object3D.translateY(1);
        } else if(game.moveDown) {
            // this.el.object3D.parent.translateY(-1);
            this.el.object3D.translateY(-1);    
        }
    }
})