document.addEventListener("DOMContentLoaded", () => {
  const chooseButton = document.getElementById("chooseButton");
  const creditCardRadio = document.getElementById("creditCardRadio");
  const pixRadio = document.getElementById("pixRadio");

  // Desabilita o botão inicialmente
  chooseButton.disabled = true;

  // Habilita o botão "Escolher" quando um método de pagamento for selecionado
  const enableChooseButton = () => {
    if (creditCardRadio.checked || pixRadio.checked) {
      chooseButton.disabled = false;
    } else {
      chooseButton.disabled = true;
    }
  };

  // Adiciona ouvintes de evento para as opções de pagamento
  creditCardRadio.addEventListener("change", enableChooseButton);
  pixRadio.addEventListener("change", enableChooseButton);
});

document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.getElementById("backButton");
  const chooseButton = document.getElementById("chooseButton");
  const paymentOptions = document.querySelectorAll('input[name="payment"]');

  // Voltar para a página anterior
  backButton.addEventListener("click", () => {
    window.history.back(); // Retorna para a página anterior no histórico
  });

  // Redirecionar para os termos de pagamento
  chooseButton.addEventListener("click", () => {
    let selectedOption = null;

    // Verifica qual opção está selecionada
    paymentOptions.forEach((option) => {
      if (option.checked) {
        selectedOption = option.value;
      }
    });

    if (selectedOption) {
      // Redireciona para a página de termos
      window.location.href = `../../pages/cliente/termos-pagamento.html?method=${selectedOption}`;
    } else {
      alert("Por favor, escolha um método de pagamento.");
    }
  });
});
