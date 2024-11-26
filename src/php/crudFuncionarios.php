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
                echo "<br>Funcionário cadastrado com sucesso";
            } else {
                echo "<br>Erro ao cadastrar funcionário: " . $sql->error;
            }
        } else {
            echo "Dados inválidos";
        }
        $sql->close();
        break;

    case 'read':

        // retorna a tabela
        $resultado = $conn->query("SELECT * FROM funcionarios");
        $funcionarios = [];

        while ($row = $resultado->fetch_assoc()) {
            $funcionarios[] = $row;
        }

        echo json_encode($funcionarios);
        break;

    case 'readOne':

        $id = $_GET['id'];
        $sql = $conn->prepare("SELECT * FROM funcionarios WHERE id = ?");
        $sql->bind_param("i", $id);
        $sql->execute();
        $resultado = $sql->get_result();

        if ($row = $resultado->fetch_assoc()) {
            echo json_encode($row);
        } else {
            echo json_encode(["status" => "error", "message" => "Funcionário não encontrado"]);
        }

        $sql->close();
        break;

    case 'update':

        $id = $_GET['id'];
        $data = json_decode(file_get_contents('php://input'), true);

        // Verificar o valor do ID
        error_log("ID recebido no update: " . $id);

        $campo = $data['campo'];
        $valor = $data['valor'];

        $sql = $conn->prepare("UPDATE funcionarios SET $campo = ? WHERE id = ?");
        $sql->bind_param("si", $valor, $id);

        if ($sql->execute()) {
            echo "Campo atualizado com sucesso!";
        } else {
            echo "Erro ao atualizar o campo.";
        }

        break;

    case 'delete':
        // exclui um funcionário pelo ID
        $id = $_GET['id'];
        $sql = $conn->prepare("DELETE FROM funcionarios WHERE id = ?");
        $sql->bind_param("i", $id);

        if ($sql->execute()) {
            echo json_encode(["status" => "success", "message" => "Funcionário deletado com sucesso"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erro ao deletar funcionario"]);
        }

        $sql->close();
        break;
}
