let campoAtual = ''; // Para rastrear qual campo está sendo editado
let funcionarioId = null; // ID do funcionário, obtido da URL


/*retorna o funcionario ao iniciar a pagina*/
document.addEventListener("DOMContentLoaded", () => {
    retornaUmFuncionario();
});

function retornaUmFuncionario() {

    const urlParams = new URLSearchParams(window.location.search);
    const funcionarioId = urlParams.get("id");

    if (!funcionarioId) {
        console.error("ID do funcionário não fornecido na URL.");
        document.body.innerHTML = `<p>Erro: Funcionário não encontrado.</p>`;
        return;
    }

    fetch(`../../php/crudFuncionarios.php?action=readOne&id=${funcionarioId}`)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("nome").textContent = data.nome;
            document.getElementById("cargo").textContent = data.cargo;
            document.getElementById("idade").textContent = data.idade;
            document.getElementById("telefone").textContent = data.telefone;
            document.getElementById("email").textContent = data.email;
            document.getElementById("salario").textContent = data.salario;
            document.getElementById("horario").textContent = data.horario;
        })
        .catch((error) => {
            console.error("Erro ao carregar os dados do funcionário:", error);
        });
}

function editarCampo(campo) {

    campoAtual = campo;
    const valorAtual = document.getElementById(campo).textContent;

    // Mostra o pop-up com o valor atual
    document.getElementById("edit-title").textContent = `Editar ${campo}`;
    document.getElementById("edit-input").value = valorAtual;
    document.getElementById("edit-modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("edit-modal").style.display = "none";
}

/* salvar edicao novos dados da edição escolhid */
function salvarEdicao() {

    resp = confirm('Tem certeza que deseja alterar?');
    
    if (!resp) return;

    const novoValor = document.getElementById("edit-input").value;
    const urlParams = new URLSearchParams(window.location.search);
    funcionarioId = urlParams.get("id"); 

    console.log("ID do funcionário:", funcionarioId);

    if (!novoValor) {
        alert("O valor não pode estar vazio.");
        return;
    }

    // Envia a atualização para o back-end
    fetch(`../../php/crudFuncionarios.php?action=update&id=${funcionarioId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            campo: campoAtual,
            valor: novoValor
        })
    })
        .then((response) => response.text())
        .then((data) => {
            console.log("Resposta do servidor:", data);

            // Atualiza o campo na interface
            document.getElementById(campoAtual).textContent = novoValor;

            fecharModal();
        })
        .catch((error) => {
            console.error("Erro ao atualizar o funcionário:", error);
        });
}
