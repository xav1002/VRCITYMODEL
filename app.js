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

var raycaster = new THREE.Raycaster();
console.log(raycaster);

var playing = true;

bottomPointer = (e) => {
    console.log(e);
}

topPointer = (e) => {
    console.log(e);
}

functionC = (e) => {
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
}

functionB = (e) => {
    console.log(e);
}
functionA = (e) => {
    console.log(e);
}

window.addEventListener('0event', bottomPointer);
window.addEventListener('1event', topPointer);
window.addEventListener('4event', functionC);
window.addEventListener('10event', functionB);
window.addEventListener('11event', functionA);

// raycaster.intersects - if the object is intersected, then have that object dispatch a custom event (without bubbling) and have that same object listen for that event

console.log(document.querySelector('a-entity[dancing]').object3DMap);
console.log(Gamepad);