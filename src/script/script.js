function cadastrarFuncionario(){        

    const nome = document.getElementById("nome-completo").value;
    const cargo = document.getElementById("cargo").value;

    if (!nome || !cargo) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    let objForm = new FormData();
    objForm.append("nome", nome);
    objForm.append("cargo", cargo);

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("resultado").innerHTML = xhttp.responseText;
        }
    };

    xhttp.open("POST", "../php/crudFuncionarios.php?action=create", true);
    xhttp.send(objForm);
    
}
