

// obtem todos os links da barra de navegação
const navItens = document.querySelectorAll(".nav-item");

// adiciona a classe "active" ao link correspondente à página atual
navItens.forEach(item => {
    if (item.href === window.location.href) {
        item.classList.add("active");
    }
});