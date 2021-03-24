const items = ["♠", "♢", "♣", "♡"],
  xCount = 6,
  yCount = 7;

let mainGrid = document.getElementById("mainGrid");

mainGrid.style.gridTemplate = `repeat(${yCount}, auto) / repeat(${xCount}, auto)`;

for (let y = yCount; y > 0; y--)
  for (let x = xCount; x > 0; x--) {
    let cell = document.createElement("div");
    let randomElement = items[Math.floor(Math.random() * items.length)];
    let positionX = x - 1;
    let positionY = y - 1;
    cell.setAttribute("data-position-x", positionX);
    cell.setAttribute("data-position-y", positionY);
    cell.setAttribute("data-value", randomElement);
    cell.addEventListener("click", (event) => {
      closestCell(positionX, positionY, randomElement);
    });
    cell.innerText = randomElement;
    mainGrid.append(cell);
  }

function closestCell(x, y, value) {
  let hasLeftCell = x > 0;
  let hasRightCell = x < xCount - 1;
  let hasTopCell = y < yCount - 1;
  let hasBottomCell = y > 0;

  let result = [];

  result.push({ x, y });

  if (hasLeftCell) {
    result.push({ x: x - 1, y });
  }
  if (hasRightCell) {
    result.push({ x: x + 1, y });
  }
  if (hasTopCell) {
    result.push({ x, y: y + 1 });
  }
  if (hasBottomCell) {
    result.push({ x, y: y - 1 });
  }

  result.forEach((el) => {
    let element = document.querySelector(
      `[data-position-x="${el.x}"][data-position-y="${el.y}"][data-value="${value}"]:not(.active)`
    );

    if (element) {
      element.classList.add("active");
      closestCell(el.x, el.y, value);
    }
  });
}
