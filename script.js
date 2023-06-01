const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
const clearButtons = document.querySelectorAll(".clear-button");
const clearAllButton = document.getElementById("clear-all");
const resultElement = document.getElementById("result");

draggableElements.forEach((element) => {
  element.addEventListener("dragstart", dragStart);
  element.addEventListener("dragend", dragEnd);
});

droppableElements.forEach((element) => {
  element.addEventListener("dragenter", dragEnter);
  element.addEventListener("dragover", dragOver);
  element.addEventListener("dragleave", dragLeave);
  element.addEventListener("drop", drop);
});

clearButtons.forEach((button) => {
  button.addEventListener("click", clearContainer);
});

clearAllButton.addEventListener("click", clearAllContainers);

let draggedElement = null;

function dragStart(event) {
  draggedElement = event.target;
  event.dataTransfer.setData("text/plain", event.target.id);
  event.currentTarget.style.opacity = "0.5";
}

function dragEnd(event) {
  event.currentTarget.style.opacity = "1";
}

function dragEnter(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.style.background = "#00a8e1";
  }
}

function dragOver(event) {
  event.preventDefault();
}

function dragLeave(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.style.background = "";
  }
}

function drop(event) {
  event.preventDefault();
  const draggableElementId = event.dataTransfer.getData("text/plain");
  const droppableElement = event.target;

  if (!droppableElement.classList.contains("dropped")) {
    droppableElement.style.background = "";
    droppableElement.classList.add("dropped");
    const clonedElement = draggedElement.cloneNode(true);
    clonedElement.draggable = false;
    draggedElement.style.opacity = "1";
    droppableElement.appendChild(clonedElement);
    calculateResult();
  }
}

function clearContainer(containerId) {
  const container = document.getElementById(`container${containerId}`);
  const droppedElement = container.querySelector(".draggable");

  if (droppedElement) {
    container.removeChild(droppedElement);
    container.classList.remove("dropped");
  }

  calculateResult();
}

function clearAllContainers() {
  droppableElements.forEach((element) => {
    element.innerHTML = "";
    element.classList.remove("dropped");
  });

  calculateResult();
}

function calculateResult() {
  const container1 = document.getElementById("container1");
  const container2 = document.getElementById("container2");

  const value1 = container1.querySelector(".draggable")?.id || "";
  const value2 = container2.querySelector(".draggable")?.id || "";

  const result = value1 && value2 ? value1 * value2 : "";

  resultElement.textContent = `El resultado es: ${result}`;

  showExplanation(value1, value2);
}

function showExplanation(value1, value2) {
  const explanation = document.createElement("p");
  explanation.textContent = `Para obtener ${value1} x ${value2}, se debe sumar el número ${value1} la siguiente cantidad de veces: ${value2}.`;

  resultElement.appendChild(explanation);
}
