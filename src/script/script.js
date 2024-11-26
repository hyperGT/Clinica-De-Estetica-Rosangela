/*
cadastrar um funcionario
*/

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("add-funcionario").addEventListener("click", (event) => {
        event.preventDefault();
        CadastrarFuncionario();
    });
});

function CadastrarFuncionario() {

    let nome = document.getElementById("nome-completo").value;
    let cargo = document.getElementById("cargo").value;
    let idade = document.getElementById("idade").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;
    let salario = document.getElementById("salario").value;
    let horario = document.getElementById("horario").value;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!nome || !cargo || !idade || !telefone || !email || !salario || !horario) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    let objForm = new FormData();
    objForm.append("nome", nome);
    objForm.append("cargo", cargo);
    objForm.append("idade", idade);
    objForm.append("telefone", telefone);
    objForm.append("email", email);
    objForm.append("salario", salario);
    objForm.append("horario", horario);

    console.log(objForm);

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("msg").innerHTML = xhttp.responseText;
            window.location.href = 'funcionarios.html'; // Redireciona após sucesso
        }
    };

    xhttp.open("POST", "../../php/crudFuncionarios.php?action=create", true);
    xhttp.send(objForm);
}


/* carregar TODOS os funcionarios */
function carregarFuncionarios() {

    const employeesContainer = document.getElementById("employees-container");

    fetch("../../php/crudFuncionarios.php?action=read")
        .then(response => response.json())
        .then(funcionarios => {
            // Adicionar os funcionários à tela
            funcionarios.forEach(funcionario => {
                const card = document.createElement("div");
                card.className = "employee-card";
                card.onclick = () => window.location.href = `perfilFuncionario.html?id=${funcionario.id}`

                card.innerHTML = `
                    <h3>${funcionario.nome}</h3>
                    <p>Cargo: ${funcionario.cargo}</p>
                `;
                employeesContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os funcionários:", error);
            employeesContainer.innerHTML = `
                <p>Erro ao carregar a lista de funcionários. Tente novamente mais tarde.</p>
            `;
        });
}

// deletar um funcionario
function deletarFuncionario() {

    console.log("Iniciando exclusão do funcionário...");
    const urlParams = new URLSearchParams(window.location.search);
    const funcionarioId = urlParams.get("id");

    console.log("ID do funcionário obtido:", funcionarioId);

    if (!funcionarioId) {
        console.error("ID do funcionário não fornecido na URL.");
        document.body.innerHTML = `<p>Erro: Funcionário não encontrado.</p>`;
        return;
    }

    fetch(`../../php/crudFuncionarios.php?action=delete&id=${funcionarioId}`)
        .then((response) => {
            console.log("Status da resposta:", response.status);
            return response.text();
        })
        .then((data) => {
            console.log("Dados retornados:", data);
            document.getElementById("msg").textContent = data;
            window.location.href = './funcionarios.html';
        })
        .catch((error) => {
            console.error("Erro ao deletar o funcionário:", error);
        });
}
