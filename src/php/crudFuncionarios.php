<?php

include "conexao.php";

header('Content-Type: application/json');

$action = $_REQUEST['action'];

switch ($action) {

    case 'create':
        $nome = $_POST['nome'] ?? '';
        $cargo = $_POST['cargo'] ?? '';

        if ($nome && $cargo) {
            $sql = $conn->prepare('INSERT INTO funcionarios (nome, cargo) 
            VALUES (?, ?)');
            $sql->bind_param("ss", $nome, $cargo);

            if ($sql->execute()) {
                echo json_encode(["message" => "Funcionário adicionado com sucesso!"]);
            } else {
                echo json_encode(["message" => "Erro ao adicionar funcionário."]);
            }
        }
        $sql->close();
        break;
    case 'read':
        break;
}
