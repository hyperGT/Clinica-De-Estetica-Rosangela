document.addEventListener("DOMContentLoaded", ()=>{

    document.getElementById("add-funcionario").addEventListener("click", (event) =>{
        event.preventDefault();
        CadastrarFuncionario();
    });
});


function CadastrarFuncionario(){        

    let nome = document.getElementById("nome-completo").value;
    let cargo = document.getElementById("cargo").value;

    if (!nome || !cargo) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    let objForm = new FormData();
    objForm.append("nome", nome);
    objForm.append("cargo", cargo);

    console.log(objForm);

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("msg").innerHTML = xhttp.responseText;
        }
    };

    xhttp.open("POST", "../../php/crudFuncionarios.php?action=create", true);
    xhttp.send(objForm);    
}
