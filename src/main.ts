const app = document.querySelector('#app') as HTMLDivElement;
const btnStart = document.querySelector("#init-button") as HTMLButtonElement;

btnStart.addEventListener("click", () => {
  afficher_debut_jeu();
});

function afficher_debut_jeu (){
  btnStart.remove();
}