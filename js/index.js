'use strict';

// CONSTANTES
const hamburger = document.querySelector('.header__hamburger');
const nav = document.querySelector('.header__nav');
const botones = document.querySelectorAll('.boton');
const formulario = document.getElementById('formulario');
const tabs = document.querySelectorAll('.etapas__tab');
const etapas = document.querySelectorAll('.etapa');
const etapasImgs = document.querySelectorAll('.etapa__img');
const form = document.querySelector('.formulario__form');
const mensaje = document.querySelector('.mensaje');

// Menu hamburguesa
hamburger.addEventListener('pointerdown', () => {
  nav.classList.toggle('header__nav--active');
});

// Boton contacto (Delegación de eventos)
if (formulario) {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('boton')) {
      formulario.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ZOOM LUPA IMAGEN ETAPAS
function eliminarLupa() {
  const glass = document.querySelector('.img-magnifier-glass');
  if (glass) {
    glass.remove();
  }
}

function magnify(imgID, zoom) {
  const img = document.getElementById(imgID);
  if (!img) return;

  eliminarLupa();

  const glass = document.createElement('div');
  glass.className = 'img-magnifier-glass';
  img.parentElement.insertBefore(glass, img);

  glass.style.backgroundImage = `url('${img.src}')`;
  glass.style.backgroundRepeat = 'no-repeat';
  glass.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;

  const bw = 3;
  const w = glass.offsetWidth / 2;
  const h = glass.offsetHeight / 2;

  const moveMagnifier = (e) => {
    e.preventDefault();
    const { x, y } = getCursorPos(e, img);
    const clampedX = Math.max(w / zoom, Math.min(x, img.width - w / zoom));
    const clampedY = Math.max(h / zoom, Math.min(y, img.height - h / zoom));

    glass.style.left = `${clampedX - w}px`;
    glass.style.top = `${clampedY - h}px`;
    glass.style.backgroundPosition = `-${(clampedX * zoom) - w + bw}px -${(clampedY * zoom) - h + bw}px`;
  };

  glass.addEventListener('mousemove', moveMagnifier);
  img.addEventListener('mousemove', moveMagnifier);
  glass.addEventListener('touchmove', moveMagnifier);
  img.addEventListener('touchmove', moveMagnifier);
}

function getCursorPos(e, img) {
  const rect = img.getBoundingClientRect();
  const x = e.pageX - rect.left - window.pageXOffset;
  const y = e.pageY - rect.top - window.pageYOffset;
  return { x, y };
}

magnify('img__etapa-1', 2.8);

// Tabs
tabs.forEach((tab, i) => {
  tab.addEventListener('pointerdown', () => {
    tabs.forEach((t, index) => {
      t.classList.remove('tabActiva');
      etapas[index].classList.remove('contenidoActivo');
    });

    tab.classList.add('tabActiva');
    etapas[i].classList.add('contenidoActivo');
    magnify(etapasImgs[i].id, 2.8);
  });
});

// Formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();
  mensaje.classList.add('mensajeActivo');
  setTimeout(() => mensaje.classList.remove('mensajeActivo'), 3000);
});