# Introdução ao MySQL

[toc]

## Introdução

Ao finalizar a instalação, para você abrir o MySQL e começar a criar suas tabela, digite:

```bash
sudo mysql -u root -p
```

## Iniciando o projeto

### Criação de usuários

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

### Criação do banco de dados


```mysql
CREATE DATABASE comercial;
```

```mysql
SHOW DATABASES;
```

```mysql
USE comercial;
```

### Modelando o projeto

#### Fase conceitual

Fase na qual temos um cenário da vida real, e, baseado nele, faremos o levantamento de requisitos que o projeto deve atender. Nesta etapa, devemos explorar todas as necessidades do problema que vamos resolver e, com essas informações, conseguiremos criar um modelo conceitual, que será independente da tecnologia que utilizaremos. Registraremos que dados podem aparecer no banco, mas não como estes dados estão armazenados. Por exemplo: cadastro de clientes (dados necessários: nome fantasia, razão social, endereço, CNPJ, cidade, estado, telefone etc.).

#### Fase lógica

Ao contrário dos modelos conceituais, os lógicos são os modelos em que os objetos, suas características e seus relacionamentos têm suas representações de acordo com as regras de implementação e limitantes impostos por alguma tecnologia. Ele é utilizado já na fase de projeto mais independente de dispositivo físico, implementando conceitos de construção de um banco de dados. Por exemplo: a figura adiante.

#### Fase física

Elaborada a partir do modelo lógico, leva em consideração limites impostos por dispositivo físico e por requisitos não funcionais dos programas que acessam os dados. Um SGBD diferente poderá definir um modo diferente de implementação física das características e dos recursos necessários para o armazenamento e a manipulação das estruturas de dados. Para exemplificar, apresento-o na figura Diagrama de Entidade e Relacionamento (mais adiante), que é o diagrama do nosso projeto.

## Mão na massa: criando nossos códigos

### Criação de tabelas

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
### Chave primária

A chave primária é o que torna a linha ou o registro de uma tabela únicos. Geralmente, é utilizada uma sequência automática para a geração dessa chave para que ela não venha a se repetir. Em nosso caso, o n_numeclien será único, isto é, nenhum par de linhas possuirá o mesmo valor na mesma coluna.

### Auto incremento

A cláusula `auto_increment` é utilizada para incrementar automaticamente o valor da chave primária da tabela. Você pode retornar o próximo valor do campo de outras maneiras, porém com o incremento automático fica mais simples e mais seguro. Por padrão, o auto_increment inicia-se do 1. Porém, se houver a necessidade de iniciar por outro valor você pode alterá-lo, fazendo:

```mysql
ALTER TABLE comclien AUTO_INCREMENT=100;
```

### Chave estrangeira

A chave estrangeira (ou foreign key) define um relacionamento entre tabelas, comumente chamado de integridade referencial. Esta regra baseia-se no fato de que uma chave estrangeira em uma tabela é a chave primária em outra.

### Integridade do banco de dados

Quando criamos a tabela `comvenda`, nós incluímos colunas de outras tabelas, como `n_numeclien`, `n_numeforne` e `n_numeprodu`. Essas colunas estão referenciando um registro em sua tabela de origem. Porém, como apenas criamos o campo, mas nada que informe o banco sobre essa referência, devemos fazer isso, passando uma instrução ao nosso SGBD por meio das `constraints`.

```mysql
ALTER TABLE comvenda
  ADD CONSTRAINT fk_comprodu_comforne FOREIGN KEY(n_numeforne) REFERENCES
  comforne(n_numeforne) ON DELETE no action ON UPDATE no action;

ALTER TABLE comvenda
  ADD CONSTRAINT fk_comprodu_comvende FOREIGN KEY(n_numevende) REFERENCES
  comvende(n_numevende) ON DELETE no action ON UPDATE no action;

ALTER TABLE comvenda
  ADD CONSTRAINT fk_comvenda_comclien FOREIGN KEY(n_numeclien) REFERENCES
  comclien(n_numeclien) ON DELETE no action ON UPDATE no action;

ALTER TABLE comivenda
  ADD CONSTRAINT fk_comivenda_comprodu FOREIGN KEY(n_numeprodu) REFERENCES
  comprodu (n_numeprodu) ON DELETE no action ON UPDATE no action;

ALTER TABLE comivenda
  ADD CONSTRAINT fk_comivenda_comvenda FOREIGN KEY(n_numevenda) REFERENCES
  comvenda (n_numevenda) ON DELETE no action ON UPDATE no action;  
```

Com a criação das `constraints` de chave estrangeira, demos mais segurança à integridade de nossos dados. Agora, se você tentar deletar algum registro da tabela de clientes que possui um registro referenciado na tabela de vendas, o banco de dados barrará a deleção, impedindo que a integridade se perca. Quando declaramos a chave primária em nossas tabelas, o SGBD criará as `constraints` automaticamente.

### Alteração de tabelas

Se você reparar em nossa tabela de clientes, não criamos campos para **cidade** ou para **estados**. Para não precisar excluí-la e criá-la novamente, fazemos uma alteração nela com o comando `alter table`. Acrescentaremos um campo para informar a cidade no cadastro de clientes:

```mysql
ALTER TABLE comclien ADD COLUMN c_cidaclien varchar(50);
```

E um campo para informar o estado.:

```mysql
ALTER TABLE comclien ADD COLUMN c_estaclien varchar(50);
```

### Exclusão de tabelas

Quando criamos nossas tabelas, nós fizemos uma a mais por engano. Foi a tabela `comvendas`, sendo a `comvenda` a correta. Para deletarmos a indesejada, utilizaremos o `drop table`.

```mysql
DROP TABLE comvendas;
```

## Manipulando registros

### Inserindo registros

```mysql
INSERT INTO comclien(
  n_numeclien,
  c_codiclien,
  c_nomeclien,
  c_razaclien,
  d_dataclien,
  c_cnpjclien,
  c_foneclien,
  c_cidaclien,
  c_estaclien)
VALUES (
  1,
  '0001',
  'AARONSON',
  'AARONSON FURNITURE LTDA',
  '2015-02-17',
  '17.807.928/0001-85',
  '(21) 8167-6584',
  'QUEIMADOS',
  'RJ');
```

### Alterando registros

Da mesma maneira que conseguimos incluir registros no banco de dados, podemos alterá-los. Uma vez que temos um sistema em produção com pessoas utilizando-o, não podemos excluir os registros para inseri-los corretamente. Por isso, devemos alterá-lo usando o comando `update`. Você fez a inserção no registro de clientes e errou o nome fantasia. No exemplo que eu descrevi anteriormente, coloquei um incorretamente. Agora, quero corrigi-lo.

```mysql
UPDATE comclien SET c_nomeclien = 'AARONSON FURNITURE' WHERE n_numeclien = 1;
commit;  
```

- O `set` informa qual campo será alterado;
- O `where` indica a condição para fazer a alteração;
- O `commit` informa ao SGBD que ele pode realmente salvar a alteração do registro.

Se, por engano, fizermos o update incorreto, antes do commit, podemos reverter a situação usando a instrução SQL `rollback`:

```mysql
UPDATE comclien SET c_nomeclien = 'AARONSON' WHERE n_numeclien = 1;
rollback;
```

### Excluindo registros

Incluímos e alteramos registros. Porém, e se quisermos deletar algum? Para isso, devemos utilizar uma outra instrução SQL: o `delete`. Diferente do `drop`, ele deleta os registros das colunas do banco de dados. O `drop` é usado para excluir objetos do banco, como tabelas, colunas, views, procedures etc.), enquanto, o `delete` deletará os registros das tabelas, podendo excluir apenas uma linha ou todos os registros, como você desejar.

Desta maneira, vamos apagar o primeiro registro da tabela `comclien`:

```mysql
DELETE FROM comclien WHERE n_numeclien = 1; 
commit;
```
Agora, vamos deletar todos os registros da tabela de clientes:

```mysql
DELETE FROM comclien;
commit;
```

Observe que, ao empregar o `delete`, você também deve usar o `commit` logo após a instrução. Da mesma maneira, podemos também utilizar o `rollback` para não efetivar uma deleção de dados incorretos.

> Lembre-se:
>
> Nunca se esqueça de criar as constraints de chave estrangeira das tabelas, pois ao tentar excluir um registro, se houver uma constraint nela e ele estiver sendo utilizado em outra tabela, o SGBD não deixará você excluí-lo com intuito de manter a integridade dos dados.

## Temos registros: vamos consultar?

### Estrutura básica das consultas

#### Distinct()

### Subquery ou subconsulta

#### Cláusulas in e not in

#### Criação de alias (apelidos das tabelas)

### Traga informação de várias tabelas com Joins

### Select em: create table, insert, update e delete

#### Criando tabelas por meio de select

#### Inserindo registros por meio de select

#### Alterando registros por meio de select

#### Deletando registros por meio de select



## Extras

### Obtenção da última data de uma dada série

```mysql
SELECT
    a.codigo,
    b.data,
    b.valor
FROM
    metadados AS a
    INNER JOIN dados AS b
        ON a.idserie = b.idserie
WHERE
    codigo IN ("IPCA_FGV_media_1101002", "IPCA_FGV_media_1101053") AND data = max(data);
```
