<?php
include "conexao.php";
header('Content-Type: application/json');

$action = $_REQUEST['action'];

switch ($action) {
    case 'create':
        $nome = $_POST['nome'] ?? '';
        $idade = $_POST['idade'] ?? 0;
        $cargo = $_POST['cargo'] ?? '';
        $telefone = $_POST['telefone'] ?? '';
        $email = $_POST['email'] ?? '';
        $salario = $_POST['salario'] ?? '';
        $horario = $_POST['horario'] ?? '';

        if ($nome && $idade && $cargo && $telefone && $email && $salario && $horario) {
            $sql = $conn->prepare('INSERT INTO funcionarios (nome, idade, cargo, telefone, email, salario, horario) VALUES (?, ?, ?, ?, ?, ?, ?)');
            $sql->bind_param("sisssss", $nome, $idade, $cargo, $telefone, $email, $salario, $horario);

            if ($sql->execute()) {
                echo json_encode(["status" => "success", "message" => "Funcionário cadastrado com sucesso"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Erro ao cadastrar funcionário: " . $sql->error]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Dados inválidos"]);
        }
        $sql->close();
        break;

    case 'read':
        // Retorna todos os funcionários
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

        if (!$id || !$data) {
            echo json_encode(["status" => "error", "message" => "ID ou dados inválidos"]);
            break;
        }

        $campo = $data['campo'];
        $valor = $data['valor'];

        // Prevenir SQL Injection no nome do campo
        $allowedFields = ['nome', 'idade', 'cargo', 'telefone', 'email', 'salario', 'horario'];
        if (!in_array($campo, $allowedFields)) {
            echo json_encode(["status" => "error", "message" => "Campo inválido"]);
            break;
        }

        $sql = $conn->prepare("UPDATE funcionarios SET $campo = ? WHERE id = ?");
        if ($campo === 'idade') {
            $sql->bind_param("ii", $valor, $id);
        } else {
            $sql->bind_param("si", $valor, $id);
        }

        if ($sql->execute()) {
            echo json_encode(["status" => "success", "message" => "Campo atualizado com sucesso!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erro ao atualizar o campo."]);
        }
        $sql->close();
        break;

    case 'delete':
        $id = $_GET['id'];
        $sql = $conn->prepare("DELETE FROM funcionarios WHERE id = ?");
        $sql->bind_param("i", $id);

        if ($sql->execute()) {
            echo json_encode(["status" => "success", "message" => "Funcionário deletado com sucesso"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erro ao deletar funcionário"]);
        }
        $sql->close();
        break;
}