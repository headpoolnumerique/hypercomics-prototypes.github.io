let update = document.querySelector("#update");

function px2screenSize(valueInPixel, orientation) {
  let screenValue;
  if (orientation == "left") {
    screenValue = window.innerWidth;
  } else if (orientation == "top") {
    screenValue = window.innerHeight;
  }

  valueInPixel = valueInPixel.replace("px", "");

  return (100 * (valueInPixel / screenValue)).toFixed(4);
}

function buildCSS(movedEl, update) {
  // let leftValue = `${px2screenSize(movedEl.style.left, "left")}vw`;
  // let topValue = `${px2screenSize(movedEl.style.top, "top")}vh`;

  let rules = `#${movedEl.id} {left: ${movedEl.style.left}; top: ${movedEl.style.top};}`;

  if (update.querySelector(`#rule-${movedEl.id}`)) {
    update.querySelector(`#rule-${movedEl.id}`).innerHTML = rules;
  } else {
    let rule = document.createElement("p");
    rule.id = `rule-${movedEl.id}`;
    rule.textContent = rules;
    update.insertAdjacentElement("beforeend", rule);
  }
}

function dragElement(elmnt, handlerElement) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (elmnt.querySelector(handlerElement)) {
    // if present, the handlerElement is where you move the DIV from:
    elmnt.querySelector(handlerElement).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;




    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    //using vw / vh
    elmnt.style.top = `${px2screenSize(elmnt.style.top, "top")}vh`;
    elmnt.style.left = `${px2screenSize(elmnt.style.left, "left")}vw`;
  }

  function closeDragElement() {
    buildCSS(elmnt, update);
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let moveAndRotate = `<section class="buttons"> <button id="mover">Move</button> <button id="mover">Move</button></div>`;

document
  .querySelectorAll(".moveable")
  .forEach((img) => dragElement(img, ".mover"));

document.querySelector("main").addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("moveable")) {
    console.log(e.target);
    select(e.target);
  } else {
    console.log("niet");
    if (document.querySelector(".active")) {
      document.querySelector(".active").classList.remove("active");
    }
  }
});

function select(img) {
  console.log(img);
  if (!document.querySelector(".active")) {
    img.classList.add("active");
    img.insertAdjacentHTML("beforeend", moveAndRotate);
  } else {
    document.querySelector(".active").classList.remove("active");
    img.classList.add("active");
  }
}

let keydown = "";
document.addEventListener("keydown", getPushedKey);

function getPushedKey() {
  document.addEventListener("keydown", function (e) {
    if (e.shiftKey) {
      console.log("shift down"); /*shift is down*/
      keydown = "shift";
    }
    if (e.altKey) {
      console.log("alt down"); /*alt is down*/
      keydown = "alt";
    }
    if (e.ctrlKey) {
      console.log("ctrl down"); /*ctrl is down*/
      keydown = "ctrl";
    }
    if (e.metaKey) {
      console.log("command down"); /*cmd is down*/
      keydown = "cmd";
    }
    return keydown;
  });
}
