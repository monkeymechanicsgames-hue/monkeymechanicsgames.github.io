class Player {
    constructor(name, model, position){
        this.name = name;
        this.mesh = model; // 3D model or placeholder cube
        this.mesh.position.copy(position);
        this.health = 100;
        this.isAttacker = false;
        this.isEliminated = false;
        this.cooldown = 0; // for spray gun
    }
}
