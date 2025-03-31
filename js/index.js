'use strict'

/* Menu hamburguesa */

const hamburger = document.querySelector('.header__hamburger');
const nav = document.querySelector('.header__nav');

hamburger.addEventListener('pointerdown', function() {
    nav.classList.toggle('header__nav--active'); 
});

// Boton contacto

const botones = document.querySelectorAll('.boton');
const formulario = document.getElementById('formulario');
/*
    Cuando haga click en un boton de contacto
        hacer scroll hasta el formulario
*/

botones.forEach(boton => {
    boton.addEventListener('click', function() {
        
        /* uso de condicional por si el id no se encuentra y no arroje un error */
        if (formulario) {
            formulario.scrollIntoView({ behavior: 'smooth' });
        }
    });
});




//ZOOM LUPA IMAGEN ETAPAS

// Función para eliminar la lupa (opcional)
function eliminarLupa() {
    let glass = document.querySelector(".img-magnifier-glass");
    if (glass) {
        glass.remove();
    }
}


function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);

    if(img === null) {
        return;
    }
    /*eliminar lupa antes de crear una nueva */
    eliminarLupa()

    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
  
    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);
  
    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
  
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /* Prevent the magnifier glass from being positioned outside the image: */
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /* Set the position of the magnifier glass: */
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /* Display what the magnifier glass "sees": */
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
  
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
}
magnify("img__etapa-1", 2.8);


  /* tabs */

const tabs = document.querySelectorAll('.etapas__tab')
const etapas = document.querySelectorAll('.etapa')
const etapasImgs = document.querySelectorAll('.etapa__img')


  /*
    Cuando click en tabs
        TODOS los tabs quitar clase isActive
        TODOS los contenido quitar clase isActive
        .etapas__boton con la posicion se le añade clase isActive
        .etapas__contenido con la posicion se le añade calse isActive
*/

tabs.forEach( (cadaTab, i ) => {
    let etapaImgID = ''
    tabs[i].addEventListener('pointerdown', () => {

        tabs.forEach( (cadaTab, i)=>{
            tabs[i].classList.remove('tabActiva')
            etapas[i].classList.remove('contenidoActivo')
        })

        tabs[i].classList.add('tabActiva')
        etapas[i].classList.add('contenidoActivo')
        /*guarda el id de la imagen de la etapa activa */
        etapaImgID = etapasImgs[i].getAttribute('id')
        magnify(etapaImgID, 2.8)
    })
})

/*formulario */

/*
    cuando le den click en enviar
    detener el comportamiento normal del fomrulario para que no abra otra pagina
    mostrar mensaje de respuesta
    eliminar mensaje de respuesta
*/

const form = document.querySelector('.formulario__form')
const mensaje = document.querySelector('.mensaje')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    mensaje.classList.add('mensajeActivo');
    //para que el mesaje vuelva a desaparecer
    setTimeout(() => {
        mensaje.classList.remove('mensajeActivo');
      }, 3000);
  });