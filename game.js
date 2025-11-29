let scene, camera, renderer, controls;
let players = [];

function init() {
    // Scene and camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // PointerLockControls
    controls = new THREE.PointerLockControls(camera, document.body);
    scene.add(controls.getObject());

    document.addEventListener('click', () => controls.lock());

    // Floor
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshBasicMaterial({color: 0x228B22})
    );
    floor.rotation.x = -Math.PI/2;
    scene.add(floor);

    // Example red cube = player placeholder
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    );
    cube.position.set(0, 0.5, 0);
    scene.add(cube);
    players.push({mesh: cube, health:100});

    // Camera start position
    controls.getObject().position.set(0, 1.6, 5);

    window.addEventListener('resize', onWindowResize);

    animate();
}

function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
