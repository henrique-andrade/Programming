# Notas do livro "MySQL: Comece com o principal banco de dados open source do mercado"

## Inicialização do MySQL

sudo mysql -u root -p

## Criação do banco de dados

### Usuários

create user usermysql@'%' identified by 'cursomysql';
grant all privileges on *.* to usermysql@'%' with grant option;

Se aparecer o erro *Authentication plugin 'caching_sha2_password' cannot be loaded* em algum programa basta usar esse comendo:

ALTER USER 'usermysql'@'%' IDENTIFIED WITH mysql_native_password BY 'cursomysql';

### Tabelas

create database comercial;
show databases;
use comercial;

```mysql
CREATE TABLE comclien(
  n_numeclien int NOT NULL AUTO_INCREMENT,
  c_codiclien varchar(10),
  c_nomeclien varchar(100),
  c_razaclien varchar(100),
  d_dataclien date,
  c_cnpjclien varchar(20),
  c_foneclien varchar(20),
PRIMARY KEY (n_numeclien)
);

CREATE TABLE comforne(
  n_numeforne int NOT NULL AUTO_INCREMENT, 
  c_codiforne varchar(10), 
  c_nomeforne varchar(100), 
  c_razaforne varchar(100), 
  c_foneforne varchar(20), 
  PRIMARY key(n_numeforne)
);

CREATE TABLE comvende(
  n_numevende int NOT NULL AUTO_INCREMENT, 
  c_codivende varchar(10), 
  c_nomevende varchar(100), 
  c_razavende varchar(100), 
  c_fonevende varchar(20), 
  n_porcvende float(10, 2), 
  PRIMARY key(n_numevende)
);

CREATE TABLE comprodu(
  n_numeprodu int NOT NULL AUTO_INCREMENT, 
  c_codiprodu varchar(20), 
  c_descprodu varchar(100), 
  n_valoprodu float(10, 2), 
  c_situprodu varchar(1), 
  n_numeforne int, 
  PRIMARY key(n_numeprodu)
);

CREATE TABLE comvenda(
  n_numevenda int NOT NULL AUTO_INCREMENT, 
  c_codivenda varchar(10), 
  n_numeclien int NOT NULL, 
  n_numeforne int NOT NULL, 
  n_numevende int NOT NULL, 
  n_valovenda float(10, 2), 
  n_descvenda float(10, 2), 
  n_totavenda float(10, 2), 
  d_datavenda date, 
  PRIMARY key(n_numevenda)
);

CREATE TABLE comvendas(
  n_numevenda int NOT NULL AUTO_INCREMENT, 
  c_codivenda varchar(10), 
  n_numeclien int NOT NULL, 
  n_numeforne int NOT NULL, 
  n_numevende int NOT NULL, 
  n_valovenda float(10, 2), 
  n_descvenda float(10, 2), 
  n_totavenda float(10, 2), 
  d_datavenda date, 
  PRIMARY key(n_numevenda)
);
CREATE TABLE comivenda(
  n_numeivenda int NOT NULL AUTO_INCREMENT, 
  n_numevenda int NOT NULL, 
  n_numeprodu int NOT NULL, 
  n_valoivenda float(10, 2), 
  n_qtdeivenda int, 
  n_descivenda float(10, 2), 
  PRIMARY key(n_numeivenda)
);

```


desc comclien;

Comercial

| Tabela       | Nome      |
|--------------|-----------|
| Clientes     | comclien  |
| Fornecedores | comforne  |
| Vendedores   | comvende  |
| Produtos     | comprodu  |
| Vendas       | comvenda  |
|              | comvendas |
|              | comivenda |

| Field       | Type         |
|-------------|--------------|
| n_numeclien | int          |
| c_codiclien | varchar(10)  |
| c_nomeclien | varchar(100) |
| c_razaclien | varchar(100) |
| d_dataclien | date         |
| c_cnpjclien | varchar(20)  |
| c_foneclien | varchar(20)  |


