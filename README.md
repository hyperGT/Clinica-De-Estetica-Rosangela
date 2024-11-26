# Clínica de Estética Rosângela

## Front-End

- Fluxo do cliente(escolher serviço, profissional, agendamentos, etc.)
- Fluxo do administrador(Cadastrar funcionario, cadastrar cliente, etc.)

## Back-End

- CRUD de funcionários

## Sobre:
Tudo começou com um trabalho realizado em dupla no primeiro período da faculdade(FAETERJ-Rio), onde foi desenvolvido o protótipo encontrado no link abaixo:

[Link do protótipo](https://www.figma.com/design/TnL5yGcOqyGmH6VSR5UfiP/IHM?node-id=0-1&node-type=canvas&t=8OKS2ktcB4JGxmBR-0)

Antes de ser definido o protótipo, foi feito um levantamento de requisitos para entender o que o cliente(professor) queria que fosse feito. Depois de tudo anotado, com as cores e inspirações de layout em mãos, o projeto começou e em 2 semanas foi finalizado, contando com o fluxo do cliente e administrador.

Dois períodos depois, já no curso de desenvolvimento de aplicações web(3DAW), o professor pede para que usemos o protótipo feito no primeiro período para construir uma aplicação web por completo, tanto o lado do cliente como uma parte do servidor(famoso back e front).

E assim foi feito.


# banco de dados

nome do database: ce_rosangela

código sql: CREATE TABLE ce_rosangela.funcionarios (id INT UNSIGNED NOT NULL AUTO_INCREMENT , nome VARCHAR(200) NOT NULL , idade INT NOT NULL , cargo VARCHAR(200) NOT NULL , telefone VARCHAR(20) NOT NULL , email VARCHAR(200) NOT NULL , salario VARCHAR(100) NOT NULL , horario VARCHAR(100) NOT NULL , PRIMARY KEY (id)) ENGINE = InnoDB;


injeção do adm: INSERT INTO funcionarios (nome, cargo, idade, telefone, email, salario, horario)
VALUES
('Admin', 'Administrador', 30, '999999999', 'admin@empresa.com', '0', '9:00 - 18:00');