const app = document.querySelector('#app') as HTMLDivElement;
const btnStart = document.querySelector("#init-button") as HTMLButtonElement;
const labelGagne = document.createElement("label") as HTMLLabelElement;
const notreImage = document.createElement("img") as HTMLImageElement;
//const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];


let compteur = 0 ;
let i = 0;
let lastcolor: HTMLImageElement | null= null;
let lastImage: string[] = [];

for (let index = 0; index < 8; index++) {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
       
        lastImage.push(data.message);       
        
    })
}

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
    const tileDiv = document.createElement("div")
    tileDiv.setAttribute("class", "tileDiv")

    const tile = document.createElement("img")
    tile.setAttribute("class", "tile")
    tile.style.width ="100px"
    tile.style.height = "100px"
    //tile.style.backgroundColor = colors[Math.floor(i/2)]
    tile.style.borderRadius = "5px";  
    tile.setAttribute('index', Math.floor(i/2).toString()) 
    tile.setAttribute("src",lastImage[0])
    tileDiv.appendChild(tile)
  
  return tileDiv
  })

  tiles.sort(() => Math.random() - 0.5);
  // Add the tiles to the app
  tiles.forEach( tileDiv => divContainer.appendChild(tileDiv))
  


let nodeList = document.querySelectorAll(".tile");
let elements = Array.from(nodeList) as HTMLImageElement[];
elements.forEach( (element) => {
        console.log(element);
               
        element.addEventListener("click", () => {
         
          compteur++;                 
          element.setAttribute("src",lastImage[parseInt(element.getAttribute("index") as string)])
         

          if(lastcolor === null){
            lastcolor = element
          }
          else {
            if(lastcolor.getAttribute('src') !== element.getAttribute("src")){
              setTimeout(() => {
                element.removeAttribute("src")

                lastcolor?.removeAttribute("src")
                lastcolor = null
              }, 1000)
            }
          else{
            if(lastcolor.getAttribute('src') === element.getAttribute("src")){
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

