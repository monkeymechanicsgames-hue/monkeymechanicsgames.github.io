function shootSpray(attacker, target){
    if(attacker.cooldown <= 0 && !attacker.isEliminated){
        target.health -= 5;
        attacker.cooldown = 4; // 4 sec cooldown
        if(target.health <= 0) target.isEliminated = true;
    }
}

function shootTranquilizer(attacker, target){
    if(attacker.isAttacker && !target.isEliminated){
        setTimeout(()=>{
            target.health = 0;
            target.isEliminated = true;
        }, 3000); // 3 second delay
    }
}
