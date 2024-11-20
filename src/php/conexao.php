<?php
$server = "localhost";
$username = "root";
$password = "";
$database = "ce_rosangela";

$conn = new mysqli($server, $username, $password, $database);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
