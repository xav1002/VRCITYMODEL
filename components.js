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