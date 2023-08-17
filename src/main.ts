const app = document.querySelector('#app') as HTMLDivElement;
const btnStart = document.querySelector("#init-button") as HTMLButtonElement;
const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];

let compteur = 0 ;

btnStart.addEventListener("click", () => {
  afficher_debut_jeu();
  compteur++;
});

function afficher_debut_jeu (){
  btnStart.remove();

  const divContainer = document.createElement("div") as HTMLDivElement
  divContainer.setAttribute('id', 'divContainer')

  app.appendChild(divContainer);

  const tiles = new Array(16).fill('').map( (_, i) => {
    const tile = document.createElement("div")
    tile.setAttribute("class", "tile")
    tile.style.width ="100px"
    tile.style.height = "100px"
    tile.style.backgroundColor = colors[Math.floor(i/2)]
    tile.style.borderRadius = "5px";
    return tile
})

tiles.sort(() => Math.random() - 0.5);
// Add the tiles to the app
tiles.forEach( tile => divContainer.appendChild(tile))


}

