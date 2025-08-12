document.addEventListener('DOMContentLoaded', () => {
    const cardDescription = document.getElementById('cardDescription');
    cardDescription.style.display = 'flex'; // Nascondo la descrizione della carta
  const sidebar = document.querySelector('.sidebar');

  const controlDiv = document.createElement('div');
  controlDiv.innerHTML = `
    <label for="numSections">Quante sezioni vuoi mettere? (1-6):</label>
    <input type="number" id="numSections" min="1" max="6" value="1" />
    <button id="applySections">Genera sezioni</button>
    
      <button class="remove-section" id="EliminaAbilita" style="margin-left:10px; color:red; cursor:pointer;">Elimina Abilità Continua</button>
   <div id="sectionsContainer"></div>
      <hr/>
  `;
    const removeAbilitaBtn = controlDiv.querySelector('#EliminaAbilita');
    removeAbilitaBtn.addEventListener('click', () => {
        const cardDescription = document.getElementById('cardDescription');
        cardDescription.style.display = 'none'; 
     
    }); 
  sidebar.insertBefore(controlDiv, sidebar.firstChild);

  const numSectionsInput = document.getElementById('numSections');
  const applyBtn = document.getElementById('applySections');
  const container = document.getElementById('sectionsContainer');

  const shapes = ['circle', 'star', 'diamond'];

  // Funzione per creare la parte sinistra visualizzata (preview)
    function renderLeftSide(sectionIndex) {
        const leftPart = document.querySelector(`#section${sectionIndex} .left-part`);
        if (!leftPart) return;

        leftPart.innerHTML = ''; // pulizia

        for (let slot = 1; slot <= 3; slot++) {
            const sym = document.getElementById(`symbol${sectionIndex}_${slot}`).value.trim();
            const shape = document.getElementById(`shape${sectionIndex}_${slot}`).value;
            const symColor = document.getElementById(`symbolColor${sectionIndex}_${slot}`).value;
            const shapeColor = document.getElementById(`formaColor${sectionIndex}_${slot}`).value;

            if (!sym) continue;

            const shapePolygons = {
                star: "50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35",
                diamond: "50,0 100,50 50,100 0,50"
            };

            let shapeElement = "";

            if (shape === "circle") {
                shapeElement = `<circle cx="50" cy="50" r="45" fill="${shapeColor}" />`;
            } else {
                const points = shapePolygons[shape] || shapePolygons.diamond;
                shapeElement = `<polygon points="${points}" fill="${shapeColor}" />`;
            }

            const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24" height="24">
  ${shapeElement}
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        fill="${symColor}" font-size="40" font-family="Noto Sans Symbols, Arial">
    ${sym}
  </text>
</svg>
`;

            const wrapper = document.createElement('span');
            wrapper.style.display = 'inline-block';
            wrapper.style.marginRight = '4px';
            wrapper.innerHTML = svg;

            leftPart.appendChild(wrapper);
        }
    }

  // Funzione per aggiornare la parte destra (descrizione)
  function renderRightSide(sectionIndex) {
    const desc = document.getElementById(`descInput${sectionIndex}`);
    const fontFamily = document.getElementById(`descFontFamily${sectionIndex}`);
    const fontSize = document.getElementById(`descFontSizeInput${sectionIndex}`);
    const fontColor = document.getElementById(`descFontColor${sectionIndex}`);
    const bgColor = document.getElementById(`descBgColor${sectionIndex}`);

    const rightPart = document.querySelector(`#section${sectionIndex} .right-part`);
    if (!rightPart) return;

    rightPart.textContent = desc.value;
    rightPart.style.fontFamily = fontFamily.value;
    rightPart.style.fontSize = fontSize.value + 'px';
    rightPart.style.color = fontColor.value;
    rightPart.style.backgroundColor = bgColor.value;
  }

  function createSectionControls(i) {
    const section = document.createElement('div');
    section.classList.add('section-block');
    section.style.marginBottom = '1em';
    section.dataset.section = i;

    section.innerHTML = `
      <h2>Sezione ${i} <button class="remove-section" style="margin-left:10px; color:red; cursor:pointer;">Elimina Sezione</button></h2>

      <div style="display:flex; gap: 1rem;">
        <div style="flex: 1;">
          <h3>Parte Sinistra (3 slot)</h3>
         ${[1, 2, 3].map(slot => `
  <fieldset style="margin-bottom: 1em; padding: 0.5em; border: 1px solid #ccc;">



  <label for="abilita${i}">Abilita ${i}:</label>
            <input type="text" id="abilita${i}Input" placeholder="abilita${i}" />
            <h3>Font abilita${i}</h3>
            
          
            <label for="abilita${i}FontSizeInput">Grandezza abilita${i}:</label>
            <input type="number" id="abilita${i}FontSizeInput" min="6" max="24" value="14" />



    <legend>Simbolo ${slot}</legend>
     <label>Simbolo:
      <select id="symbol${i}_${slot}">
      <option value="" selected>Nessuno</option>
          <option value="⇑">⇑</option>
  <option value="⇓">⇓</option>
  <option value="⇒">⇒</option>
  <option value="⇐">⇐</option>
  <option value="∞">∞</option>
  <option value="⚡">⚡</option>
  <option value="0">0</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
      </select>
    </label><br/>
    <label>Forma:
      <select id="shape${i}_${slot}">
        <option value="" selected>Nessuna</option>
        <option value="circle">Cerchio</option>
        <option value="star">Stella</option>
        <option value="diamond">Diamante</option>
      </select>
    </label><br/>

    <div>
      <label>Colore simbolo: 
        <input type="color" id="symbolColor${i}_${slot}" value="#ffffff" />
      </label>
      <div id="symbolColorSwatches${i}_${slot}" class="swatch-container"></div>
    </div>

    <div style="margin-top: 8px;">
      <label>Colore forma: 
        <input type="color" id="formaColor${i}_${slot}" value="#cccccc" />
      </label>
      <div id="formaColorSwatches${i}_${slot}" class="swatch-container"></div>
    </div>
  </fieldset>
`).join('')}
     

        <div style="flex: 1;">
          <h3>Parte Destra</h3>
          <label for="descInput${i}">Descrizione:</label><br/>
          <textarea id="descInput${i}" rows="6" style="width:100%;" placeholder="Descrizione della carta"></textarea><br/><br/>

          <label for="descFontFamily${i}">Font descrizione:</label><br/>
          <select id="descFontFamily${i}">
            <option value="Arial" selected>Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Courier New">Courier New</option>
            <option value="Lucida Console">Lucida Console</option>
          </select><br/><br/>

          <label for="descFontSizeInput${i}">Grandezza descrizione:</label>
      <input type="number" id="descFontSizeInput${i}" min="6" max="24" value="13" />

      <h3>Colore testo descrizione:</h3>
      <input type="color" id="descFontColor${i}" value="#000000" />
      <div id="descColorSwatches${i}" class="swatch-container"></div>

      <h3>Sfondo descrizione:</h3>
      <input type="color" id="descBgColor${i}" value="#ffffff" />
      <div id="descBgColorSwatches${i}" class="swatch-container"></div>
        </div>
      </div>
    `;
      const swatchesTextContainer = section.querySelector(`#descColorSwatches${i}`);
      swatchesTextContainer.appendChild(createSwatches(`descFontColor${i}`, 'text'));

      const swatchesBgContainer = section.querySelector(`#descBgColorSwatches${i}`);
      swatchesBgContainer.appendChild(createSwatches(`descBgColor${i}`, 'bg'));
      const testo = section.querySelector(`#abilita${i}Input`);
      const fontSize = section.querySelector(`#abilita${i}FontSizeInput`);
      testo.addEventListener('input', () => {
          const abilita = document.getElementById(`Sez${i}`);
          if (abilita) {
              abilita.textContent = testo.value;
              
          }
      });
      fontSize.addEventListener('input', () => {
          const abilita = document.getElementById(`Sez${i}`);
          if (abilita) {
              abilita.style.fontSize = fontSize.value + 'px';
          }
      });
      // Swatches per ogni slot simbolo colore, dentro ciclo slot
      for (let slot = 1; slot <= 3; slot++) {
          const symbolColorContainer = section.querySelector(`#symbolColorSwatches${i}_${slot}`);
          const formaColorContainer = section.querySelector(`#formaColorSwatches${i}_${slot}`);
      
          if (symbolColorContainer) {
              symbolColorContainer.appendChild(createSwatches(`symbolColor${i}_${slot}`, 'text'));
             
             
          }
          if (formaColorContainer) {
              formaColorContainer.appendChild(createSwatches(`formaColor${i}_${slot}`, 'bg'));


          }

      }

    // Pulsante elimina sezione
    const removeBtn = section.querySelector('.remove-section');
    removeBtn.addEventListener('click', () => {
      const sectionDiv = document.getElementById(`section${i}`);
      if (sectionDiv) sectionDiv.style.display = 'none';

      // Pulisce sinistra e destra
      const leftPart = document.querySelector(`#section${i} .left-part`);
      if(leftPart) leftPart.textContent = '';
      const rightPart = document.querySelector(`#section${i} .right-part`);
      if(rightPart) rightPart.textContent = '';

      section.remove();
    });

    // Collego gli eventi per parte sinistra
    for(let slot=1; slot <=3; slot++) {
      ['symbol', 'shape', 'symbolColor', 'shapeColor'].forEach(key => {
        const el = section.querySelector(`#${key}${i}_${slot}`);
        if(el) el.addEventListener('input', () => renderLeftSide(i));
      });
    }

    // Eventi parte destra
    ['descInput', 'descFontFamily', 'descFontSizeInput', 'descFontColor', 'descBgColor'].forEach(idBase => {
      const el = section.querySelector(`#${idBase}${i}`);
      if(el) el.addEventListener('input', () => renderRightSide(i));
    });

    return section;
  }

    applyBtn.addEventListener('click', () => {
        const cardDescription = document.getElementById('cardDescription'); 
        cardDescription.style.display = 'flex'; // Nascondo la descrizione della carta
    const n = parseInt(numSectionsInput.value);
    if (isNaN(n) || n < 1 || n > 6) {
      alert('Inserisci un numero da 1 a 6.');
        return;

      }
      
      for (let i = 1; i <= 6; i++) {
          const sectionDiv = document.getElementById(`section${i}`)
          if (i <= n) {
              sectionDiv.style.display = 'flex';
          } else {
              sectionDiv.style.display = 'none';
          }
      }

    // Pulisco tutto
        container.innerHTML = '';
    

    for(let i=1; i<=n; i++) {
      const sectionControls = createSectionControls(i);
      container.appendChild(sectionControls);

      // Creo anche la visualizzazione sinistra/destra della sezione
      let sectionVisual = document.getElementById(`section${i}`);
      if (!sectionVisual) {
        sectionVisual = document.createElement('div');
        sectionVisual.id = `section${i}`;
        sectionVisual.style.display = 'flex';
        sectionVisual.style.justifyContent = 'space-between';
        sectionVisual.style.border = '1px solid #ccc';
        sectionVisual.style.padding = '10px';
        sectionVisual.style.marginBottom = '15px';

        const leftDiv = document.createElement('div');
        leftDiv.className = 'left-part';
        leftDiv.style.flex = '0 0 45%';
        leftDiv.style.minHeight = '80px';
        leftDiv.style.border = '1px solid #ddd';
        leftDiv.style.padding = '10px';
        leftDiv.style.backgroundColor = '#f9f9f9';

        const rightDiv = document.createElement('div');
        rightDiv.className = 'right-part';
        rightDiv.style.flex = '0 0 45%';
        rightDiv.style.minHeight = '80px';
        rightDiv.style.border = '1px solid #ddd';
        rightDiv.style.padding = '10px';
        rightDiv.style.backgroundColor = '#fff';
        rightDiv.style.whiteSpace = 'pre-wrap';

        sectionVisual.appendChild(leftDiv);
        sectionVisual.appendChild(rightDiv);

        sidebar.appendChild(sectionVisual);
      }
    }
  });
});



const colorPalette = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#C0C0C0", "#808080"
];

function createSwatches(idPrefix, type) {
    const swatchContainer = document.createElement('div');
    swatchContainer.classList.add('swatch-container');
    colorPalette.forEach(color => {
        const swatch = document.createElement('div');
        swatch.classList.add('swatch');
        swatch.style.backgroundColor = color;
        swatch.title = color;
        swatch.style.display = 'inline-block';
        swatch.style.width = '20px';
        swatch.style.height = '20px';
        swatch.style.margin = '2px';
        swatch.style.cursor = 'pointer';
        swatch.addEventListener('click', () => {
            const input = document.getElementById(idPrefix);
            if (input) {
                input.value = color;
                input.dispatchEvent(new Event('input'));
            }
        });
        swatchContainer.appendChild(swatch);
    });
    return swatchContainer;
}









// Funzione per creare le palette di colori swatch per titolo


function createSwatchestitle(idPrefix) {
    const container = document.getElementById(idPrefix + 'Swatches');
    if (!container) return;
    container.innerHTML = '';
    colorPalette.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'swatch';
        swatch.style.backgroundColor = color;
        swatch.title = color;
        swatch.style.display = 'inline-block';
        swatch.style.width = '20px';
        swatch.style.height = '20px';
        swatch.style.margin = '2px';
        swatch.style.cursor = 'pointer';
        swatch.addEventListener('click', () => {
            const input = document.getElementById(idPrefix);
            if (input) {
                input.value = color;
                input.dispatchEvent(new Event('input'));
            }
        });
        container.appendChild(swatch);
    });
}

// Inizializza le palette di swatches per titolo
createSwatchestitle('titleFontColor');
createSwatchestitle('titleBgColor');
function updateCardCont() {
    const ContInput = document.getElementById('ContInput');
    const fontFamily = document.getElementById('ContFontFamily');
    const fontSize = document.getElementById('ContFontSizeInput');
    const fontColor = document.getElementById('ContFontColor');
    const bgColor = document.getElementById('ContBgColor');
    const cardDescription = document.getElementById('cardDescription'); 
 
    cardDescription.textContent = ContInput.value || 'Abilià Continua';
    cardDescription.style.fontFamily = fontFamily.value;
    cardDescription.style.fontSize = fontSize.value + 'px';
    cardDescription.style.textAlign = 'justify';
   
    cardDescription.style.color = fontColor.value;
    cardDescription.style.backgroundColor = bgColor.value;
   
}

['titleInput', 'titleFontFamily', 'titleFontSizeInput', 'titleFontColor', 'titleBgColor'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', updateCardTitle);
        el.addEventListener('change', updateCardTitle);
    }
});

updateCardTitle();





createSwatchestitle('ContFontColor');
createSwatchestitle('ContBgColor');
function updateCardTitle() {
    const titleInput = document.getElementById('titleInput');
    const fontFamily = document.getElementById('titleFontFamily');
    const fontSize = document.getElementById('titleFontSizeInput');
    const fontColor = document.getElementById('titleFontColor');
    const bgColor = document.getElementById('titleBgColor');
    const cardTitle = document.getElementById('cardTitle');
    const contTit = document.getElementById('contTit');
    const cardMini = document.getElementById('cardMini');
    cardTitle.textContent = titleInput.value || 'Titolo';
    cardTitle.style.fontFamily = fontFamily.value;
    cardTitle.style.fontSize = fontSize.value + 'px';
    cardMini.style.fontFamily = fontFamily.value;
    cardMini.style.fontSize = fontSize.value + 'px';
    cardTitle.style.color = fontColor.value;
    cardTitle.style.backgroundColor = bgColor.value;
    cardMini.style.color = fontColor.value;
    contTit.style.backgroundColor = bgColor.value;
}

['ContInput', 'ContFontFamily', 'ContFontSizeInput', 'ContFontColor', 'ContBgColor'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', updateCardCont);
        el.addEventListener('change', updateCardCont);
    }
});

updateCardCont();

const NCartaTesto = document.getElementById("NCartaTesto")
const NCartaTestoSwatches = document.getElementById("NCartaTestoSwatches")
NCartaTestoSwatches.appendChild(createSwatches("NCartaTesto","text"))
NCartaTesto.addEventListener("input", () => {
    const NumeroCarta = document.getElementById("NumeroCarta")
    NumeroCarta.style.color = NCartaTesto.value;    

})


const NCartaSfondo = document.getElementById("NCartaSfondo")
const NCartaSfondoSwatches = document.getElementById("NCartaSfondoSwatches")
NCartaSfondoSwatches.appendChild(createSwatches("NCartaSfondo", "text"))
NCartaSfondo.addEventListener("input", () => {
    const NumeroCarta = document.getElementById("NumeroCarta")
    NumeroCarta.style.backgroundColor = NCartaSfondo.value;

})


const CartaSfondo = document.getElementById("CartaSfondo")
const CartaSfondoSwatches = document.getElementById("CartaSfondoSwatches")
CartaSfondoSwatches.appendChild(createSwatches("CartaSfondo", "text"))
CartaSfondo.addEventListener("input", () => {
    const Carta = document.getElementById("cardPreview")
    Carta.style.backgroundColor = CartaSfondo.value;

})


const Raritaselect = document.getElementById("Raritaselect")
Raritaselect.addEventListener("change", () => {
    const Rarita = document.getElementById("Rarita");
    Rarita.textContent = Raritaselect.value;
});






const RaritaTesto = document.getElementById("RaritaTesto")
const RaritaTestoSwatches = document.getElementById("RaritaTestoSwatches")
RaritaTestoSwatches.appendChild(createSwatches("RaritaTesto", "text"))
RaritaTesto.addEventListener("input", () => {
    const Rarita = document.getElementById("Rarita")
    Rarita.style.color =RaritaTesto.value;

})


const RaritaSfondo = document.getElementById("RaritaSfondo")
const RaritaSfondoSwatches = document.getElementById("RaritaSfondoSwatches")
RaritaSfondoSwatches.appendChild(createSwatches("RaritaSfondo", "text"))
RaritaSfondo.addEventListener("input", () => {
    const Rarita = document.getElementById("Rarita")
    Rarita.style.backgroundColor = RaritaSfondo.value;

})



const Eselect = document.getElementById("Eselect")
Eselect.addEventListener("change", () => {
    const Esp = document.getElementById("Casella1");
    Esp.textContent = Eselect.value;
});


const ETesto = document.getElementById("ETesto")
const ETestoSwatches = document.getElementById("ETestoSwatches")
ETestoSwatches.appendChild(createSwatches("ETesto", "text"))
ETesto.addEventListener("input", () => {
    const Esp = document.getElementById("Casella1")
    Esp.style.color = ETesto.value;

})


const ESfondo = document.getElementById("ESfondo")
const ESfondoSwatches = document.getElementById("ESfondoSwatches")
ESfondoSwatches.appendChild(createSwatches("ESfondo", "text"))
ESfondo.addEventListener("input", () => {
    const Esp = document.getElementById("Casella1")
    Esp.style.backgroundColor = ESfondo.value;

})

const abilitaFontFamily = document.getElementById('abilitaFontFamily'); 
abilitaFontFamily.addEventListener('change', () => {
    for (let i = 1; i <= 6; i++) {
        const abilita = document.getElementById(`Sez${i}`);
        if (abilita) {
            abilita.style.fontFamily = abilitaFontFamily.value;
        }
    }
    const cardDescription = document.getElementById('cardDescription'); 
    cardDescription.style.fontFamily = abilitaFontFamily.value;
});
const abilitaFontColor = document.getElementById('abilitaFontColor');
const abilitaFontColorSwatches = document.getElementById('abilitaFontColorSwatches');
abilitaFontColorSwatches.appendChild(createSwatches('abilitaFontColor', 'text'));
abilitaFontColor.addEventListener('input', () => {
    for (let i = 1; i <= 6; i++) {
        const abilita = document.getElementById(`Sez${i}`);
        if (abilita) {
            abilita.style.color = abilitaFontColor.value;
        }
    }
    const cardDescription = document.getElementById('cardDescription'); 
    cardDescription.style.color = abilitaFontColor.value;

});

const abilitaBgColor = document.getElementById('abilitaBgColor');
const abilitaBgColorSwatches = document.getElementById('abilitaBgColorSwatches');
abilitaBgColorSwatches.appendChild(createSwatches('abilitaBgColor', 'text'));
abilitaBgColor.addEventListener('input', () => {
    for (let i = 1; i <= 6; i++) {
        const abilita = document.getElementById(`Sez${i}`);
        if (abilita) {
            abilita.style.backgroundColor = abilitaBgColor.value;
        }
    }
    const cardDescription = document.getElementById('cardDescription');
    cardDescription.style.backgroundColor = abilitaBgColor.value;

});

const abilitaleftBgColor = document.getElementById('abilitaleftBgColor');
const abilitaleftBgColorSwatches = document.getElementById('abilitaleftBgColorSwatches');
abilitaleftBgColorSwatches.appendChild(createSwatches('abilitaleftBgColor', 'text'));
abilitaleftBgColor.addEventListener('input', () => {
    for (let i = 1; i <= 6; i++) {
        const leftPart = document.getElementById(`L${i}`);
        if (leftPart) {
            leftPart.style.backgroundColor = abilitaleftBgColor.value;
        }
    }
   

});
const titleDInput = document.getElementById('titleDInput');
titleDInput.addEventListener('input', () => {
    const cardMini = document.getElementById('cardMini');
    cardMini.textContent = titleDInput.value 
   
});


const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", () => {
    const imageContainer = document.getElementById('cardPreview');

    // Aggiunge la classe che rimuove resize, overflow e bordi
    imageContainer.classList.add('export-cleanup');

    html2canvas(cardPreview, { scale: 3.213 }).then(canvas => {
        const link = document.createElement("a");
        link.download = `carta_${cardTitle.textContent}.png`;
        link.href = canvas.toDataURL();
        link.click();

        // Ripristina lo stile dopo il download
        imageContainer.classList.remove('export-cleanup');
    });
});
