// script.js

// Selecionar o formulário
const form = document.getElementById("form");

// Evento de submissão do formulário
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita o recarregamento da página
  createPopup(); // Chama a função para criar o pop-up
});

// Função para criar dinamicamente o pop-up
function createPopup() {
  // Criar elementos do pop-up
  const overlay = document.createElement("div");
  overlay.classList.add("popup-overlay");

  const popup = document.createElement("div");
  popup.classList.add("popup");

  const message = document.createElement("h2");
  message.innerText = "Pacote Criado Com Sucesso";

  const returnButton = document.createElement("button");
  returnButton.innerText = "Retornar";
  returnButton.classList.add("return-button");

  // Fechar o pop-up ao clicar no botão "Retornar"
  returnButton.addEventListener("click", function () {
    window.history.back();
  });

  // Adicionar elementos ao pop-up
  popup.appendChild(message);
  popup.appendChild(returnButton);
  overlay.appendChild(popup);

  // Adicionar o pop-up ao corpo da página
  document.body.appendChild(overlay);
}
