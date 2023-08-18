const app = document.querySelector('#app') as HTMLDivElement;
const btnStart = document.querySelector("#init-button") as HTMLButtonElement;
const labelGagne = document.createElement("label") as HTMLLabelElement
const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];

let compteur = 0 ;
let i = 0;
let lastcolor: HTMLDivElement | null= null;
let secondColor : string;


btnStart.addEventListener("click", () => {
  labelGagne.remove();
  afficher_debut_jeu();
  
  
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
         
          compteur++;
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
          else{
            if(lastcolor.getAttribute('color') === element.getAttribute("color")){
                lastcolor = null;  
                i++;
                if (i === 8 ) {
                  divContainer.remove();
                  labelGagne.innerText = "Vous avez gagné en : " + compteur/2 + "coups";
                  app.appendChild(labelGagne);
                  app.appendChild(btnStart);

                }
            
            }
          } 
          }

          
        })
})


}

