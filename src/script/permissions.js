document.addEventListener("DOMContentLoaded", () => {
    // Dados de permissões (poderiam ser carregados do backend)
    const permissions = [
        { id: "cadastrar-clientes", label: "Cadastrar Clientes", checked: true },
        { id: "cadastrar-funcionarios", label: "Cadastrar Funcionários", checked: false },
        { id: "alterar-permissoes", label: "Alterar Permissões", checked: false },
        { id: "acesso-funcionarios", label: "Acesso à Pág. de Funcionários", checked: true },
        { id: "criar-pacotes", label: "Criar Pacotes", checked: false },
        { id: "administrar-servicos", label: "Administrar Serviços", checked: true },
        { id: "remover-funcionarios", label: "Remover Funcionários", checked: false },
        { id: "administrar-funcionarios", label: "Administrar Funcionários", checked: true },
        { id: "ver-clientes-agendados", label: "Ver Clientes Agendados", checked: true },
        { id: "alterar-horarios", label: "Alterar Horários", checked: false },
        { id: "modificar-servicos", label: "Modificar Serviços", checked: true },
        { id: "agendar-clientes", label: "Agendar Clientes", checked: true },
    ];

    // Renderiza permissões em duas colunas
    const leftColumn = document.getElementById("permissions-left");
    const rightColumn = document.getElementById("permissions-right");

    permissions.forEach((perm, index) => {
        const permissionHTML = `
            <div class="permission-item">
                <label for="${perm.id}">${perm.label}</label>
                <label class="switch">
                    <input type="checkbox" id="${perm.id}" ${perm.checked ? "checked" : ""}>
                    <span class="slider"></span>
                </label>
            </div>
        `;

        if (index < permissions.length / 2) {
            leftColumn.innerHTML += permissionHTML;
        } else {
            rightColumn.innerHTML += permissionHTML;
        }
    });

    // Salvar alterações
    document.querySelectorAll("input[type='checkbox']").forEach((input) => {
        input.addEventListener("change", (e) => {
            const id = e.target.id;
            const isChecked = e.target.checked;

            console.log(`Permissão ${id}: ${isChecked ? "Ativada" : "Desativada"}`);

            // Enviar os dados para o backend via Fetch API
            fetch("api/updatePermissoes.php", {
                method: "POST",
                body: JSON.stringify({ id, isChecked }),
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((response) => console.log("Resposta do servidor:", response))
                .catch((error) => console.error("Erro ao salvar permissão:", error));
        });
    });
});
