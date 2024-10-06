document.getElementById('create-league').onclick = function() {
    const name = prompt("Enter league name:");
    if (name) {
        fetch('http://localhost:3000/leagues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            alert('League created: ' + data.name);
            loadLeagues();
        });
    }
};

document.getElementById('view-leagues').onclick = loadLeagues;

function loadLeagues() {
    fetch('http://localhost:3000/leagues')
    .then(response => response.json())
    .then(data => {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '<h2>Leagues</h2>';
        data.forEach(league => {
            const leagueDiv = document.createElement('div');
            leagueDiv.innerHTML = `<h3>${league.name}</h3>
                                   <a href="#" onclick="viewTeams(${league.id})">View Teams</a>`;
            mainContent.appendChild(leagueDiv);
        });
    });
}

function viewTeams(leagueId) {
    fetch(`http://localhost:3000/leagues/${leagueId}/teams`)
    .then(response => response.json())
    .then(data => {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '<h2>Teams</h2>';
        data.forEach(team => {
            const teamDiv = document.createElement('div');
            teamDiv.innerHTML = `<h3>${team.name}</h3>
                                 <a href="#" onclick="viewPlayers(${team.id})">View Players</a>`;
            mainContent.appendChild(teamDiv);
        });
    });
}

function viewPlayers(teamId) {
    fetch(`http://localhost:3000/teams/${teamId}/players`)
    .then(response => response.json())
    .then(data => {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '<h2>Players</h2>';
        data.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.innerHTML = `<h3>${player.name}</h3>`;
            mainContent.appendChild(playerDiv);
        });
    });
}
