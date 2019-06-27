AFRAME.registerComponent('red-cube', {
    init: function() {
        this.el.setAttribute('geometry', {
            primitive: 'box',
            width: '10',
            height: '10',
            depth: '10'
        })
        // this.el.setAttribute('material', {
        //     color: 'red'
        // })
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
    }
})

AFRAME.registerComponent('dancing', {
    init: function() {
        this.el.setAttribute('gltf-model', '#dancing');
    }
})

