const c = document.querySelector("#myCanvas"); //Selectionne l'objet et le met dans une constante
const ctx = c.getContext("2d"); // Définit le contexte, ici 2dimensionnel car canvas
const r = 5; // draw radius|| Rayon du pinceau
ctx.lineWidth = r * 2; // *2 pour en faire le diamètre
ctx.lineCap = "round"; // CanvasRenderingContext2D -> forme du pinceau (butt, round, square)
ctx.fill = "blue" ; // Couleur du Pinceau en theorie (j'arrive pas a le faire marcher)
var draw = false; // Valeur bool clique ou pas clique
var lineStart = false; // Valeur bool coords compare
var lastX, lastY; // coords
document.addEventListener("mousemove",mouseMove); //mousemove -> souris qui se déplace renvoie les positions
document.addEventListener("mousedown",yesDraw); // mousedown -> souris "appuyée" en continu qui active le trait
document.addEventListener("mouseup",noDraw); // mouseup -> souris "levée" qui arrete de dessin
function yesDraw() { draw = true; lineStart = true } //récupere l'evenement yesDraw, passe var draw et linestart a vrai
function noDraw() { draw = false } //recuperer l'evenement noDraw, passe var draw a faux
function mouseMove(e) { //récupere l'evement mousemove,
   const bounds = c.getBoundingClientRect(); //recuperer la position et la taille du canvas
   const x = e.pageX - bounds.left - scrollX; //recupere la position X de la souris sur le canvas
   const y = e.pageY - bounds.top - scrollY; //recupere la position Y de la souris sur le canvas
   if(draw){ 
      drawing(x,y); //active la fonction drawing, qui va tracer le trait
   }
}
function drawing(x, y) { // fonction drawing qui va tracer le trait, prend en paramettre la position
  if(lineStart){ // tant que yesDraw alors on prend la position actuelle et la définir comme derniere position
     lastX = x;
     lastY = y; // Definit position avant
     lineStart = false; // actualise le linestart, permet d'avoir un trait continu
  }
  ctx.beginPath(); //vide les traits précedents et en commence un nouveau
  ctx.lineTo(lastX, lastY);
  ctx.lineTo(x, y); // permettent de définir le debut et la fin du trait entre les deux points définis
  ctx.stroke(); // permet de tracer le trait
  lastX = x;
  lastY = y; //Definit position apres
}

const btneff = document.querySelector("#myBoutonEffacer"); //Recupere le bouton effacer
btneff.addEventListener("click", beff); //regarde si cliqué, joue la fonction beff
function beff(){
   ctx.clearRect(0, 0, 800, 600); // Clear le contenu du contexte, de 0,0 à 800,600
}

