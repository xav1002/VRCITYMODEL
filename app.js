const scene = document.querySelector('a-scene');
const camera = document.querySelector('#camera');
const cursor = document.querySelector('a-cursor');

var cabin = document.createElement('a-entity');
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
scene.appendChild(cube);

var dancingPerson = document.createElement('a-entity');
dancingPerson.setAttribute('animation-mixer', {
    clip: '*'
});
dancingPerson.setAttribute('dancing', true);
dancingPerson.setAttribute('position', '5 0 -10');
scene.appendChild(dancingPerson);

var dancingPerson2 = document.querySelector('a-entity[dancing]');

/**
 * target certain objects with events dispatched from another object? 
 * bubbling: true? */

let cabinEvent = new Event('cabinevent');
let raycasterEvent = new Event('raycasterevent');

var raycaster = new THREE.Raycaster();
console.log(raycaster);

var playing = true;

cabin.addEventListener('click', function() {
    if(playing) {
        cabin.pause();
        dancingPerson.pause();
        dancingPerson2.pause();
        playing = false;
    } else {
        cabin.play();
        dancingPerson.play();
        dancingPerson2.play();
        playing = true;
    }
});

console.log(cursor);

// raycaster.intersects - if the object is intersected, then have that object dispatch a custom event (without bubbling) and have that same object listen for that event

// window.addEventListener('gamepadbuttondown', function(e) {
//     var index = e.detail.index;
//     if (index === 0) {
//         camera.setAttribute('position', '0 0 0');
//     } else if (index === 1) {
//         camera.setAttribute('position', '0 10 0');
//     } else if (index === 4) {
//         cabin.dispatchEvent(cabinEvent);
//         console.log('cabinevent works');
//     } else if (index === 10) {
//         cube.setAttribute('material', {
//             color: 'blue'
//         });
//     } else if (index=== 11) {
//         cube.setAttribute('material', {
//             color: 'red'
//         });
//     }
//     console.log(index);
// });

window.addEventListener('axismove', function() {
    console.log('change');
})

console.log(document.querySelector('a-entity[dancing]').object3DMap);
console.log(Gamepad);