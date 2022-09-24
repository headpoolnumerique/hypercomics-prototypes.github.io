import interact from "https://cdn.interactjs.io/v1.10.11/interactjs/index.js";

let update = document.querySelector("#update");

function buildCSS(movedEl, update) {
  // let leftValue = `${px2screenSize(movedEl.style.left, "left")}vw`;
  // let topValue = `${px2screenSize(movedEl.style.top, "top")}vh`;

  if (!movedEl.style.width) {
    console.log('empty');
  } 
  
  let width = movedEl.style.width ? `width:${movedEl.style.width};` : '';
  let height = movedEl.style.height ? `height:${movedEl.style.height};` : '';
  let bottom = movedEl.style.bottom ? `bottom:${movedEl.style.bottom};` : '';
  let left = movedEl.style.left ? `left:${movedEl.style.left};` : '';

  let rules = `#${movedEl.id} {${height} ${width} ${left} ${bottom} }`;

  if (update.querySelector(`#rule-${movedEl.id}`)) {
    update.querySelector(`#rule-${movedEl.id}`).innerHTML = rules;
  } else {
    let rule = document.createElement("p");
    rule.id = `rule-${movedEl.id}`;
    rule.textContent = rules;
    update.insertAdjacentElement("beforeend", rule);
  }
}

interact(".moveable")
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move(event) {
        var target = event.target;
        // create empty value to find it’s previous location
        var x = parseFloat(target.getAttribute("data-x")) || 0;
        // var y = parseFloat(target.getAttribute("data-y")) || 0;

        // update the element's style
        target.style.width = `${px2screenSize(event.rect.width + "px", 'left')}vw`;
        // target.style.height = `${px2screenSize(event.rect.height + "px", 'top')}vw`;

       // height: auto;
        // target.style.height = event.rect.height + "px";

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        // y += event.deltaRect.top;



        // target.style.transform = "translate(" + x + "px," + y + "px)";
        target.setAttribute("data-x", x);
        // target.setAttribute("data-y", y);
        target.textContent =
          Math.round(event.rect.width) +
          "\u00D7" +
          Math.round(event.rect.height);
      },
      end(event) {
        buildCSS(event.target, update);
      },
    },
    modifiers: [
      interact.modifiers.aspectRatio({
        ratio: "preserve",
      }),
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        // outer: "parent
      }),

      // keep ratio size
    ],

    inertia: true,
  })
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        // restriction: "parent",
        endOnly: true,
      }),
    ],
    listeners: {
      move(event) {
        let target = event.target;
        var x = parseFloat(target.getAttribute("data-x")) || 0;
        var y = parseFloat(target.getAttribute("data-y")) || 0;

        console.log(event.rect)
        target.style.bottom = `${px2screenSize(window.innerHeight - event.rect.bottom + "px", "top")}vh`;
        target.style.left = `${px2screenSize(event.rect.left + "px", "left")}vw`;
      },
      end(event) {
        buildCSS(event.target, update);
      },
    },
  });

function px2screenSize(valueInPixel, orientation) {
  let screenValue;
  if (orientation == "left") {
    screenValue = window.innerWidth;
  } else if (orientation == "top") {
    screenValue = window.innerHeight;
  }

  valueInPixel = valueInPixel.replace("px", "");
  return (100 * (valueInPixel / screenValue));
}
