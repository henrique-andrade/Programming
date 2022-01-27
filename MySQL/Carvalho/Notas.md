# Introdução ao MySQL

[toc]

## Introdução

Ao finalizar a instalação, para você abrir o **MySQL** e começar a criar suas tabela, digite:

```bash
sudo MySQL -u root -p
```

## Iniciando o projeto

### Criação de usuários

```mysql
CREATE USER userMySQL@'%' IDENTIFIED BY 'cursoMySQL';
```

```mysql
GRANT ALL PRIVILEGES ON *.* TO userMySQL@'%' WITH GRANT OPTION;
```

Se aparecer o erro *Authentication plugin 'caching_sha2_password' cannot be loaded* em algum programa basta usar esse comendo:

```mysql
ALTER USER 'userMySQL'@'%' IDENTIFIED WITH MySQL_native_password BY 'cursoMySQL';
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

Ao contrário dos modelos conceituais, os lógicos são os modelos em que os objetos, suas características e seus relacionamentos têm suas representações de acordo com as regras de implementação e limitantes impostos por alguma tecnologia. Ele é utilizado já na fase de projeto mais independente de dispositivo físico, implementando conceitos de construção de um banco de dados.

#### Fase física

Elaborada a partir do modelo lógico, leva em consideração limites impostos por dispositivo físico e por requisitos não funcionais dos programas que acessam os dados. Um SGBD diferente poderá definir um modo diferente de implementação física das características e dos recursos necessários para o armazenamento e a manipulação das estruturas de dados.

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

A chave primária é o que torna a linha ou o registro de uma tabela únicos. Geralmente, é utilizada uma sequência automática para a geração dessa chave para que ela não venha a se repetir. Em nosso caso, o `n_numeclien` será único, isto é, nenhum par de linhas possuirá o mesmo valor na mesma coluna.

### Auto incremento

A cláusula `AUTO_INCREMENT` é utilizada para incrementar automaticamente o valor da chave primária da tabela. Você pode retornar o próximo valor do campo de outras maneiras, porém com o incremento automático fica mais simples e mais seguro. Por padrão, o `AUTO_INCREMENT` inicia-se do 1. Porém, se houver a necessidade de iniciar por outro valor você pode alterá-lo, fazendo:

```mysql
ALTER TABLE comclien AUTO_INCREMENT = 100;
```

### Chave estrangeira

A chave estrangeira (ou foreign key) define um relacionamento entre tabelas, comumente chamado de integridade referencial. Esta regra baseia-se no fato de que uma chave estrangeira em uma tabela é a chave primária em outra.

### Integridade do banco de dados

Quando criamos a tabela `comvenda`, nós incluímos colunas de outras tabelas, como `n_numeclien`, `n_numeforne` e `n_numeprodu`. Essas colunas estão referenciando um registro em sua tabela de origem. Porém, como apenas criamos o campo, mas nada que informe o banco sobre essa referência, devemos fazer isso, passando uma instrução ao nosso SGBD por meio das constraints.

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

Com a criação das constraints de chave estrangeira, demos mais segurança à integridade de nossos dados. Agora, se você tentar deletar algum registro da tabela de clientes que possui um registro referenciado na tabela de vendas, o banco de dados barrará a deleção, impedindo que a integridade se perca. Quando declaramos a chave primária em nossas tabelas, o SGBD criará as constraints automaticamente.

### Alteração de tabelas

Se você reparar em nossa tabela de clientes, não criamos campos para **cidade** ou para **estados**. Para não precisar excluí-la e criá-la novamente, fazemos uma alteração nela com o comando `ALTER TABLE`. Acrescentaremos um campo para informar a cidade no cadastro de clientes:

```mysql
ALTER TABLE comclien ADD COLUMN c_cidaclien varchar(50);
```

E um campo para informar o estado.:

```mysql
ALTER TABLE comclien ADD COLUMN c_estaclien varchar(50);
```

### Exclusão de tabelas

Quando criamos nossas tabelas, nós fizemos uma a mais por engano. Foi a tabela `comvendas`, sendo a `comvenda` a correta. Para deletarmos a indesejada, utilizaremos o `DROP TABLE`.

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

Da mesma maneira que conseguimos incluir registros no banco de dados, podemos alterá-los. Uma vez que temos um sistema em produção com pessoas utilizando-o, não podemos excluir os registros para inseri-los corretamente. Por isso, devemos alterá-lo usando o comando `UPDATE`. Você fez a inserção no registro de clientes e errou o nome fantasia. No exemplo que eu descrevi anteriormente, coloquei um incorretamente. Agora, quero corrigi-lo.

```mysql
UPDATE comclien SET c_nomeclien = 'AARONSON FURNITURE'
WHERE n_numeclien = 1;
COMMIT;  
```

- O `SET` informa qual campo será alterado;
- O `WHERE` indica a condição para fazer a alteração;
- O `COMMIT` informa ao SGBD que ele pode realmente salvar a alteração do registro.

Se, por engano, fizermos o `UPDATE` incorreto, antes do `COMMIT`, podemos reverter a situação usando a instrução `ROLLBACK`:

```mysql
UPDATE comclien SET c_nomeclien = 'AARONSON' WHERE n_numeclien = 1;
ROLLBACK;
```

### Excluindo registros

Incluímos e alteramos registros. Porém, e se quisermos deletar algum? Para isso, devemos utilizar uma outra instrução **MySQL**: o `DELETE`. Diferente do `DROP`, ele deleta os registros das colunas do banco de dados. O `DROP` é usado para excluir objetos do banco, como tabelas, colunas, views, procedures etc.), enquanto, o `DELETE` deletará os registros das tabelas, podendo excluir apenas uma linha ou todos os registros, como você desejar.

Desta maneira, vamos apagar o primeiro registro da tabela `comclien`:

```mysql
DELETE FROM comclien WHERE n_numeclien = 1; 
COMMIT;
```
Agora, vamos deletar todos os registros da tabela de clientes:

```mysql
DELETE FROM comclien;
COMMIT;
```

Observe que, ao empregar o `DELETE`, você também deve usar o `COMMIT` logo após a instrução. Da mesma maneira, podemos também utilizar o `ROLLBACK` para não efetivar uma deleção de dados incorretos.

> Lembre-se:
>
> Nunca se esqueça de criar as constraints de chave estrangeira das tabelas, pois ao tentar excluir um registro, se houver uma constraint nela e ele estiver sendo utilizado em outra tabela, o SGBD não deixará você excluí-lo com intuito de manter a integridade dos dados.

## Temos registros: vamos consultar?

### Estrutura básica das consultas

O comando **MySQL** utilizado para fazer consultas é o `SELECT`. Junto com o `SELECT`, devemos dizer ao SGBD de qual tabela queremos os registros. Por isso usamos o `FROM`. Com isso, temos a sintaxe básica para fazer a primeira consulta. Quando não queremos selecionar um ou vários campos específicos, utilizamos o asterisco (`*`):

```mysql
SELECT * FROM comclien;
```

Se quiséssemos selecionar apenas o código e a razão social do cliente, no lugar do `*`, colocaríamos os campos `n_numeclien`, `c_codiclien` e `c_razaclien`:

```mysql
SELECT n_numeclien, c_codiclien, c_razaclien FROM comclien;
```

Ainda podem surgir situações que necessitem selecionar apenas um registro. Neste caso, utilizamos o `WHERE`, da mesma maneira que o usamos no capítulo anterior:

```mysql
SELECT 
  n_numeclien, 
  c_codiclien, 
  c_razaclien 
FROM 
  comclien 
WHERE 
  c_codiclien = '0001';
```



```mysql
SELECT 
  n_numeclien, 
  c_codiclien, 
  c_razaclien 
FROM 
  comclien 
WHERE 
  c_codiclien <> '0001';
```

No **MySQL** temos os seguintes operadores de comparação:

| operador | descrição     |
| -------- | ------------- |
| `=`      | igual         |
| `<>`     | diferente     |
| `>`      | maior         |
| `<`      | menor         |
| `>=`     | maior e igual |
| `<=`     | menor e igual |

Em vez de utilizarmos o `=` para comparar uma string, também podemos utilizar o `LIKE`. Ele é usado quando queremos consultar uma string e só conhecemos uma parte dela:

```mysql
SELECT n_numeclien, c_codiclien, c_razaclien FROM comclien WHERE c_razaclien LIKE 'L%';
```

O símbolo de `%` é um curinga no **MySQL**. Quando não sabemos uma parte da string, podemos utilizá-lo no início, no meio ou no fim dela.

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

## Consultas com funções

## Deixar o banco processar - procedures e functions

## Criando gatilhos

## Obtendo performance e criando visões

## Criando, exportando e importando backups: ele poderá te salvar um dia

## **MySQL** avançado

## Extras

### Estilo do código

Some more or less strict rules:

- Try to have a good readable text flow. Lines with very different length are a pain.
- Avoid lines longer than ~ 100 characters unless there is no other choice.
  - Think about a comparison of the new and the old version of a test script within a graphical diff tool.
  - Having the difference frequent at the end of long lines is very uncomfortable.
- **MySQL**test only accepts comment lines starting with '#'.
- Use spaces, not tabs.
- Lines must have no trailing spaces.
- Write SQL statements in the style of the **MySQL** Reference Manual
  - SQL keywords and reserved words: uppercase
  - Identifiers (table names, column names, etc.): lowercase
- If an SQL statement is long, add line breaks to reformat it and make it easier to read.

Fonte: https://dev.**MySQL**.com/doc/internals/en/coding-style.html

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
