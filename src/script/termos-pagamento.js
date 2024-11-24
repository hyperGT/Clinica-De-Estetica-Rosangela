document.addEventListener("DOMContentLoaded", () => {
  const continueButton = document.querySelector("button:nth-child(2)");
  const backButton = document.querySelector("button:nth-child(1)");

  backButton.addEventListener("click", () => {
    window.history.back();
  });

  continueButton.addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentMethod = urlParams.get("method");

    if (paymentMethod) {
      window.location.href = `../../pages/cliente/${paymentMethod}.html`;
    } else {
      alert("Método de pagamento não encontrado.");
      window.history.back();
    }
  });
});
