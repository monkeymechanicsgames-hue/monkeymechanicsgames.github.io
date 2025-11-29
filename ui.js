function updateUI(players, score){
    document.getElementById('score').innerText = "Score: " + score;
    const msg = players.find(p => p.isAttacker)?.name;
    document.getElementById('message').innerText = msg ? "Attacker: " + msg : "";
}
