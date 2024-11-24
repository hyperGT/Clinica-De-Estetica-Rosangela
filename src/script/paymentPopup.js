
const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();


  if (isFormValid()) {
    createPopup();
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
});

function isFormValid() {
  const cardNumber = document.getElementById("cardNumber").value;
  const cardName = document.getElementById("cardName").value;
  const expiryDate = document.getElementById("expiryDate").value;
  const cvv = document.getElementById("cvv").value;

  return cardNumber && cardName && expiryDate && cvv;
}

function createPopup() {

  const overlay = document.createElement("div");
  overlay.classList.add("popup-overlay");

  const popup = document.createElement("div");
  popup.classList.add("popup");

  const message = document.createElement("h2");
  message.innerText = "Pagamento Efetuado!";

  const returnButton = document.createElement("button");
  returnButton.innerText = "Voltar para o Início";
  returnButton.classList.add("return-button");

  returnButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  popup.appendChild(message);
  popup.appendChild(returnButton);
  overlay.appendChild(popup);

  document.body.appendChild(overlay);
}
