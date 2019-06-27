const scene = document.querySelector('a-scene');

const camera = document.querySelector('#camera');

var cabin = document.createElement('a-entity');
console.log(cabin);
cabin.setAttribute('cabin', true);
cabin.setAttribute('position', '0 -3 -18');
scene.appendChild(cabin);
cabin.play();

var ground = document.createElement('a-entity');
ground.setAttribute('ground', true);
scene.appendChild(ground);

var cube = document.createElement('a-entity');
cube.setAttribute('red-cube', true);
cube.setAttribute('position', '25 0 -30');
console.log(cube);
scene.appendChild(cube);

var dancingPerson = document.createElement('a-entity');
dancingPerson.setAttribute('animation-mixer', {
    clip: '*'
});
dancingPerson.setAttribute('dancing', true);
dancingPerson.setAttribute('position', '5 0 -10');
scene.appendChild(dancingPerson);

var dancingPerson2 = document.querySelector('a-entity[dancing]');
var animated = true;

cabin.addEventListener('click', function(e) {
    if(animated) {
        dancingPerson.pause();
        dancingPerson2.pause();
        cabin.pause()
        animated = false;
    } else {
        dancingPerson.play();
        dancingPerson2.play();
        cabin.play();
        animated = true;
    }

    console.log(e);
})
// window.addEventListener('click', function() {
//     cabin.setAttribute('animation', {
//         property: 'rotation',
//         to: '0 360 0',
//         dur: '1500',
//         easing: 'linear',
//         loop: 'true'
//     });
//     cube.setAttribute('animation', {
//         property: 'components.material.material.color',
//         type: 'color',
//         from: 'red',
//         to: 'green',
//         dur: '5000',
//     });
// });


const controller = document.querySelector('#controller');
console.log(controller);
controller.addEventListener('mousemove', function(e) {
    console.log(e);
});

console.log(document.querySelector('a-entity[dancing]').object3DMap);
console.log(Gamepad);