<?php
include "conexao.php";
header('Content-Type: application/json');

$action = $_REQUEST['action'];

switch ($action) {
    case 'create':
        $nome = $_POST['nome'] ?? '';
        $cargo = $_POST['cargo'] ?? '';

        if ($nome && $cargo) {
            $sql = $conn->prepare('INSERT INTO funcionarios (nome, cargo) VALUES (?, ?)');
            $sql->bind_param("ss", $nome, $cargo);

            if ($sql->execute()) {
                echo "<br>Aluno cadastrado com sucesso";
            } else {
                echo "<br>Erro ao cadastrar aluno: " . $sql->error;
            }            
        } else {
            echo "Dados inválidos";
        }
        $sql->close();
        break;

    case 'read':
        // Implemente a lógica de listagem aqui
        break;
}
?>
