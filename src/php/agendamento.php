<?php
include "conexao.php";
header('Content-Type: application/json');

$action = $_REQUEST['action'];

switch ($action) {
    case 'create':
        // Obtém os parâmetros do POST e define valores nulos caso não estejam presentes
        $pacote = $_POST['pacote'] ?? null;
        $servico = $_POST['servico'] ?? null;
        $diasSelecionados = $_POST['diasSelecionados'] ?? null;
        $mes = $_POST['mes'] ?? null;
        $horarioAtendimento = $_POST['horario_atendimento'] ?? null;
        $observacoes = $_POST['observacoes'] ?? null;
        $dataCriacao = date('Y-m-d'); // Define a data atual como padrão
        $usuarioId = $_POST['usuario_id'] ?? null;

        // Preparação da consulta SQL com valores nulos
        $sql = $conn->prepare('INSERT INTO agendamentos 
            (pacote, servico, dias_selecionados, mes, horario_atendimento, observacoes, data_criacao, usuario_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        $sql->bind_param(
            "sssssssi", 
            $pacote, 
            $servico, 
            $diasSelecionados, 
            $mes, 
            $horarioAtendimento, 
            $observacoes, 
            $dataCriacao, 
            $usuarioId
        );

        // Execução e resposta
        if ($sql->execute()) {
            echo json_encode(["status" => "success", "message" => "Agendamento criado com sucesso"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erro ao criar agendamento: " . $sql->error]);
        }
        $sql->close();
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Ação inválida"]);
        break;
}

$conn->close();
