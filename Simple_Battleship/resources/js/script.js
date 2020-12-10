'use strict';

// Dimensione regolabile della griglia
const dim = 7;
// unità di misura per la griglia
let unit = '1fr ';
// array di lettere e numeri necessari alla definizione delle celle
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'Z'];

// Array contenente la lista delle barche
const listaBarche = [
  { nome: 'Jolly Roger', size: 2, symbol: 'x' },
  { nome: 'Black Pearl', size: 2, symbol: '-' },
  { nome: 'Royal Fortune', size: 3, symbol: 'I' },
  { nome: 'Bog Boat', size: 4, symbol: 'o' },
];

// array di lettere e numeri troncati in base alla dimensione della griglia scelta (dim)
const Xvals = numbers.slice(0, dim);
const Yvals = letters.slice(0, dim);

/* Fn : Ritorna una posizione randomica - ex: a1] */
const getRndPos = () => Yvals[Math.floor(Math.random() * Yvals.length)] + Xvals[Math.floor(Math.random() * Xvals.length)];

// oggetto genrico battlefield
const battlefield = {
  setBattlefieldSize() {
    document.querySelector(`.grid-${this.name}`).style.gridTemplateColumns = unit.repeat(dim + 1);
  },
  buildBattlefieldHtml() {
    /* Costruisce la griglia html */
    let html = `<div class='cell'></div>`;
    for (const x of Xvals) html += `<div class='cell'>${x}</div>`;
    for (const y of Yvals) {
      html += `<div class='cell'>${y}</div>`;
      for (const ix of Xvals) html += `<div id='${this.name}_${y}${ix}' class='cell'></div>`;
    }
    document.querySelector(`.grid-${this.name}`).innerHTML = html;
  },
  buildBattlefieldMap() {
    /* Crea la map ( data structure ) relativa alla griglia */
    for (const y of Yvals)
      for (const x of Xvals)
        this.mappa.set(y + x, { stato: 0, barca: '', link: document.querySelector(`#${this.name}_${y + x}`) });
  },
};

// Creazione degli oggetti specifici
const battlefieldP1 = { name: 'p1', mappa: new Map() };
const battlefieldP2 = { name: 'p2', mappa: new Map() };

// Gli oggetti specifici chiamano i metodi dell'oggetto generico battlefield passando il this di riferimento
battlefield.setBattlefieldSize.call(battlefieldP1);
battlefield.setBattlefieldSize.call(battlefieldP2);

battlefield.buildBattlefieldHtml.call(battlefieldP1);
battlefield.buildBattlefieldHtml.call(battlefieldP2);

battlefield.buildBattlefieldMap.call(battlefieldP1);
battlefield.buildBattlefieldMap.call(battlefieldP2);

// setting delle mappe associate agli oggetti battlefield
setMappa(battlefieldP1.mappa);
setMappa(battlefieldP2.mappa);

/* Fn : setta le barche sulla mappa */
function setMappa(mappa) {
  let confPosBoat = '';
  const tryBoatPosCurrMap = tryBoatPos.bind(null, mappa);
  const placeBoatCurrMap = placeBoat.bind(null, mappa);

  for (const barca of listaBarche) {
    while (confPosBoat === '') confPosBoat = tryBoatPosCurrMap(getRndPos(), barca.size);
    placeBoatCurrMap(barca, confPosBoat);
    //console.log(confirmedPositionBoat); // stampa le posizioni delle barche ( only debug )
    confPosBoat = '';
  }
}

/* Fn: tenta posizionamenti. ret ok : ["a1","a2"], ret ko : "" */
function tryBoatPos(mappa, startPosition, boatSize) {
  let currPos = '';
  const returnArray = [];

  for (const direction of mischiaArray(['top', 'right', 'bottom', 'left'])) {
    currPos = startPosition;
    for (let i = 0; i < boatSize; i++) {
      if (!currPos) {
        returnArray.length = 0;
        break;
      }
      if (mappa.get(currPos).stato !== 0) {
        returnArray.length = 0;
        break;
      }
      returnArray.push(currPos);
      currPos = changePositionByDirection(mappa, direction, currPos);
    }
    if (returnArray.length > 0) return returnArray;
  }
  if (returnArray.length > 0) return returnArray;
  else return '';
}

/* Fn : sposta il cursore della cella data una direzione */
function changePositionByDirection(mappa, direction, currPos) {
  let [currY, currX] = [...currPos];
  direction == 'right' ? (currPos = currY + (Number(currX) + 1)) : '';
  direction == 'left' ? (currPos = currY + (Number(currX) - 1)) : '';
  direction == 'top' ? (currPos = Yvals[Yvals.indexOf(currY) - 1] + currX) : '';
  direction == 'bottom' ? (currPos = Yvals[Yvals.indexOf(currY) + 1] + currX) : '';

  return mappa.has(currPos) ? currPos : false;
}

/* Fn: scrive barca ["a1","a2"] su struttura dati Map */
function placeBoat(mappa, barca, confirmedPositionBoat) {
  for (const p of confirmedPositionBoat) {
    mappa.get(p).stato = 0;
    mappa.get(p).barca = barca.nome;
    //mappa.get(p).link.innerHTML = barca.symbol; // (only debug)
  }
}

/* Fn: mischia un array in input e lo torna in output */
function mischiaArray(array) {
  var j, x, index;
  for (index = array.length - 1; index > 0; index--) {
    j = Math.floor(Math.random() * (index + 1));
    x = array[index];
    array[index] = array[j];
    array[j] = x;
  }
  return array;
}

/* Gestione dei messaggi */
function gestioneEvento(element, type) {
  let message = '';
  if (type === 'NN') message = 'Cell not Found !';
  if (type === 'GU') message = 'Cell Already Choosed !';
  if (type === 'CO') message = 'BooM !';
  alert(message);
  element.value = '';
}

/* Verifica se una barca è affondata e stampa messaggio */
function checkAffondato(mappa, cella) {
  let n = 0;
  const barca = mappa.get(cella).barca;
  const sizeBarca = listaBarche.find((b) => b.nome === barca).size;

  mappa.forEach((value) => {
    if (value.barca === barca && value.stato === 1) n++;
  });

  if (sizeBarca === n) alert(`Ship ${barca} sunk !`);
}

/* Verifica se tutte le barche del giocatore attivo sono state affondate e definisce la vittoria */
function checkVittoria(mappa, player) {
  const v = [...mappa.values()].find((o) => o.stato === 0 && o.barca !== '') == null ? alert(`${player} You Win !`) : '';

  document.querySelector('.input-p1').disabled = true;
  document.querySelector('.input-p2').disabled = true;
}

/* Aggiorna graficamente la griglia con colpo andato a segno o a vuoto */
function updateGraficaCella(mappa, tenta, campo, stato, classe, contenuto) {
  mappa.get(tenta).stato = stato;
  mappa.get(tenta).link.classList.add(`cell-${classe}`);
  mappa.get(tenta).link.textContent = contenuto;
  campo.value = '';
}

/* Gestione del turno del giocatore attivo */
function lancio(player) {
  const campo = document.querySelector(`.input-${player}`);
  const tenta = document.querySelector(`.input-${player}`).value.toUpperCase();
  const [letter, number] = [...tenta];

  if (Yvals.indexOf(letter) === -1 || Xvals.indexOf(Number(number)) === -1) {
    gestioneEvento(campo, 'NN');
    return;
  }

  const mappa = player == 'p1' ? battlefieldP1.mappa : battlefieldP2.mappa;

  if (mappa.get(tenta).stato !== 0) {
    gestioneEvento(campo, 'GU');
    return;
  }

  if (mappa.get(tenta).stato === 0) {
    if (mappa.get(tenta).barca.length > 0) {
      gestioneEvento(campo, 'CO');
      updateGraficaCella(mappa, tenta, campo, 1, 'colpito', '💥');
      checkAffondato(mappa, tenta);
      checkVittoria(mappa, player);
    } else {
      updateGraficaCella(mappa, tenta, campo, 2, 'acqua', '🌊');
    }
  }
  document.querySelector('input:disabled').disabled = false;
  document.querySelector(`.input-${player}`).disabled = true;
}

/* Disabilita P2 all'avvio dell'applicazione */
function init() {
  document.querySelector('.input-p2').disabled = true;
}

document.querySelector('.btn-p1').addEventListener('click', lancio.bind(null, 'p1'));
document.querySelector('.btn-p2').addEventListener('click', lancio.bind(null, 'p2'));

init();
