const app = document.querySelector('#app') as HTMLDivElement;
const btnStart = document.querySelector("#init-button") as HTMLButtonElement;
const labelGagne = document.createElement("label") as HTMLLabelElement;
const notreImage = document.createElement("img") as HTMLImageElement;
const timer = document.createElement('label') as HTMLLabelElement;
timer.setAttribute('id',"count_up_timer");
//const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown"];


const divResultat = document.createElement('div') as HTMLDivElement;
divResultat.setAttribute('id','divResultat');

const divContainer = document.createElement("div") as HTMLDivElement;
divContainer.setAttribute('id', 'divContainer');

const maCheckbox44 = document.createElement("input") as HTMLInputElement;
maCheckbox44.classList.add("checkbox");
maCheckbox44.setAttribute("type", "checkbox");
maCheckbox44.setAttribute("name", "4x4");

const monLabel44 = document.createElement("label") as HTMLLabelElement;
monLabel44.innerText = "4x4";

const monLabel66 = document.createElement("label") as HTMLLabelElement;
monLabel66.innerText = "6x6";

const maCheckbox66 = document.createElement("input") as HTMLInputElement;
maCheckbox66.classList.add("checkbox");
maCheckbox66.setAttribute("type", "checkbox");
maCheckbox66.setAttribute("name", "6x6");

divContainer.appendChild(maCheckbox44);
divContainer.appendChild(monLabel44);

divContainer.appendChild(maCheckbox66);
divContainer.appendChild(monLabel66);


let monNiveau = 0;
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
  afficher_debut_jeu(16);  
});

maCheckbox44.addEventListener("change", () => {
  if (maCheckbox44.checked) {
    monNiveau = 16;
    maCheckbox66.checked = false;
    supprimerImages();
    afficher_debut_jeu(monNiveau);
  }  

  
})

maCheckbox66.addEventListener("change", () => {
  if (maCheckbox66.checked) {
    monNiveau = 36;
    maCheckbox44.checked = false;
    supprimerImages();
    afficher_debut_jeu(monNiveau); 
  }  
  
  
  
})

function afficher_debut_jeu (niveau : number){
  btnStart.remove();

  let timerVariable = setInterval(countUpTimer, 1000);
  let totalSeconds = 0;
  
  function countUpTimer() {
    ++totalSeconds;
    let hour = Math.floor(totalSeconds / 3600);
    let minute = Math.floor((totalSeconds - hour * 3600) / 60);
    let seconds = totalSeconds - (hour * 3600 + minute * 60);
    timer.innerText = hour + ":" + minute + ":" + seconds;
   
  }

  app.appendChild(divContainer);
  app.appendChild(timer);

  const tiles = new Array(niveau).fill('').map( (_, i) => {
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
                  labelGagne.innerText = "Vous avez gagné en : "   + compteur/2 + "  coups et en    " + timer.innerText + "  temps";
                  clearTimeout(timerVariable);
                  app.removeChild(timer);
                  divResultat.appendChild(labelGagne);
                  divResultat.appendChild(btnStart);
                  app.appendChild(divResultat)

                }
            
            }
          } 
          }

          
        })
})

}

function supprimerImages()
{
  const myTiles = document.querySelectorAll(".tileDiv");
  let myImages = Array.from(myTiles) ;
  myImages.forEach((element) => {
    element.remove();
  })
  
}
