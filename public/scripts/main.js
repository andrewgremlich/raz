/*******************FUNCTIONS******************/
import spawn from './spawn.js';
import spawnEnemy from './spawnEnemy.js';
import everyOneElseSpawn from './everyOneElseSpawn.js';
import enemyspawn from './enemyspawn.js';
import database from './firebaseConfig.js';

let renderingObject = {
  players: {}
};

/*
Start game by spawning the client player first,
then the enemy, then everyone else.
*/
spawn(renderingObject)
  .then(everyOneElseSpawn)
  .then(enemyspawn);

window.onbeforeunload = () => {
  database.ref(`users/${localStorage['razSessionToken']}`).set(null);
  localStorage.removeItem('razSessionToken');
};

function reload() {
  location.reload();
}

/*

TO-DO

1. Animation draw from position to position on client side?
   Add another method on player's objects to show animation
   on the canvas.
2. Add Enemy client side.  People will be fighting their own
   ghost. Or add zones where not to go.
4. Utilize for mobile.
5. Make movements for players render for client side rather
   that through over firebase.
6. Collisions with other players?  If I don't do this then
   It'd be just a social gae.


OR
Just use the play game that I already made.
*/
