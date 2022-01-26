# Introdução ao MySQL

[toc]

## Modelagem dos dados

### Fase conceitual

Fase na qual temos um cenário da vida real, e, baseado nele, faremos o levantamento de requisitos que o projeto deve atender. Nesta etapa, devemos explorar todas as necessidades do problema que vamos resolver e, com essas informações, conseguiremos criar um modelo conceitual, que será independente da tecnologia que utilizaremos. Registraremos que dados podem aparecer no banco, mas não como estes dados estão armazenados. Por exemplo: cadastro de clientes (dados necessários: nome fantasia, razão social, endereço, CNPJ, cidade, estado, telefone etc.).

### Fase lógica

Ao contrário dos modelos conceituais, os lógicos são os modelos em que os objetos, suas características e seus relacionamentos têm suas representações de acordo com as regras de implementação e limitantes impostos por alguma tecnologia. Ele é utilizado já na fase de projeto mais independente de dispositivo físico, implementando conceitos de construção de um banco de dados. Por exemplo: a figura adiante.

### Fase física

Elaborada a partir do modelo lógico, leva em consideração limites impostos por dispositivo físico e por requisitos não funcionais dos programas que acessam os dados. Um SGBD diferente poderá definir um modo diferente de implementação física das características e dos recursos necessários para o armazenamento e a manipulação das estruturas de dados. Para exemplificar, apresento-o na figura Diagrama de Entidade e Relacionamento (mais adiante), que é o diagrama do nosso projeto.

## Inicialização do MySQL

```bash
sudo mysql -u root -p
```

## Criação de usuários

```mysql
create user usermysql@'%' identified by 'cursomysql';
```

```mysql
grant all privileges on *.* to usermysql@'%' with grant option;
```

Se aparecer o erro *Authentication plugin 'caching_sha2_password' cannot be loaded* em algum programa basta usar esse comendo:

```mysql
ALTER USER 'usermysql'@'%' IDENTIFIED WITH mysql_native_password BY 'cursomysql';
```

## Criação do banco de dados


```mysql
CREATE DATABASE comercial;
```

```mysql
SHOW DATABASES;
```

### Criação de tabelas

```mysql
USE comercial;
```

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
  PRIMARY KEY (n_numeforne)
);

CREATE TABLE comvende(
  n_numevende int NOT NULL AUTO_INCREMENT, 
  c_codivende varchar(10), 
  c_nomevende varchar(100), 
  c_razavende varchar(100), 
  c_fonevende varchar(20), 
  n_porcvende float(10, 2), 
  PRIMARY KEY (n_numevende)
);

CREATE TABLE comprodu(
  n_numeprodu int NOT NULL AUTO_INCREMENT, 
  c_codiprodu varchar(20), 
  c_descprodu varchar(100), 
  n_valoprodu float(10, 2), 
  c_situprodu varchar(1), 
  n_numeforne int, 
  PRIMARY KEY (n_numeprodu)
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
  PRIMARY KEY (n_numevenda)
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
  PRIMARY KEY (n_numevenda)
);

CREATE TABLE comivenda(
  n_numeivenda int NOT NULL AUTO_INCREMENT, 
  n_numevenda int NOT NULL, 
  n_numeprodu int NOT NULL, 
  n_valoivenda float(10, 2), 
  n_qtdeivenda int, 
  n_descivenda float(10, 2), 
  PRIMARY KEY (n_numeivenda)
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

