const app = document.querySelector('#app') as HTMLDivElement;
const btnStart = document.querySelector("#init-button") as HTMLButtonElement;
const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];

let compteur = 0 ;
let lastcolor: HTMLDivElement | null= null

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
    //tile.style.backgroundColor = colors[Math.floor(i/2)]
    tile.style.borderRadius = "5px";
    tile.classList.add(colors[Math.floor(i/2)])
    tile.setAttribute("color",colors[Math.floor(i/2)])
    return tile
})

tiles.sort(() => Math.random() - 0.5);
// Add the tiles to the app
tiles.forEach( tile => divContainer.appendChild(tile))


let nodeList = document.querySelectorAll(".tile");
let elements = Array.from(nodeList) as HTMLDivElement[];
elements.forEach( (element) => {
        element.classList.add("not-revealed")
        element.addEventListener("click", () => {
          element.classList.remove("not-revealed")

          if(lastcolor === null){
            lastcolor = element
          }
          else {
            if(lastcolor.getAttribute('color') !== element.getAttribute("color")){
              setTimeout(() => {
                element.classList.add("not-revealed")
                lastcolor?.classList.add("not-revealed")
                lastcolor = null
              }, 1000)
            }
          }
        })
})

}

