window.selectedDays = []; // Inicializa o array de dias selecionados no escopo global

const daysTag = document.querySelector(".dias"),
  currentDate = document.querySelector(".data-atual"),
  prevNextIcon = document.querySelectorAll(".icons span");

// Armazena os dias selecionados pelo cliente
let selectedDays = [];

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  let liTag = "";

  // Dias do mês anterior (cinza)
  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="prev disabled">${lastDateofLastMonth - i + 1}</li>`;
  }

  // Dias do mês atual
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  // Dias do próximo mês (cinza)
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="next disabled">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  // Adicionar evento de clique para selecionar os dias do mês atual
  daysTag.addEventListener("click", (e) => {
    const dayElement = e.target;

    // Ignorar cliques fora dos dias válidos
    if (!dayElement.matches("li:not(.disabled)")) return;

    const day = parseInt(dayElement.textContent);

    // Alternar estado de seleção
    if (dayElement.classList.contains("selected")) {
      dayElement.classList.remove("selected");
      selectedDays = selectedDays.filter((selected) => selected !== day); // Remove do array
    } else {
      dayElement.classList.add("selected");
      window.selectedDays.push(day); // Adiciona ao array
    }

    // Mostrar no console para debug
    console.log("Dias Selecionados:", selectedDays);
  });
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }

    renderCalendar();
  });
});
