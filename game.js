let scene, camera, renderer, controls;
let players = [], score = 0;

init();
animate();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.PointerLockControls(camera, document.body);
    document.body.addEventListener('click', ()=> controls.lock());
    scene.add(controls.getObject());

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(50,50),
        new THREE.MeshBasicMaterial({color:0x228B22})
    );
    floor.rotation.x = -Math.PI/2;
    scene.add(floor);

    // Create placeholder players
    for(let i=0;i<8;i++){
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshBasicMaterial({color:0xff0000})
        );
        cube.position.set(Math.random()*20-10,0.5,Math.random()*20-10);
        scene.add(cube);
        players.push(new Player("Player"+i, cube, cube.position.clone()));
    }

    setInterval(()=> switchAttacker(), 15000); // 15 sec attacker switch
    window.addEventListener('resize', onWindowResize);
}

function switchAttacker(){
    const alive = players.filter(p => !p.isEliminated);
    alive.forEach(p => p.isAttacker=false);
    const rand = alive[Math.floor(Math.random()*alive.length)];
    rand.isAttacker = true;
    updateUI(players, score);
}

function animate(){
    requestAnimationFrame(animate);

    // Example player movement & cooldowns
    players.forEach(p => {
        if(p.cooldown>0) p.cooldown -= 0.016;
    });

    renderer.render(scene, camera);
}
