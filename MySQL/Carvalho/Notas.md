# Notas do livro "MySQL: Comece com o principal banco de dados open source do mercado"

## Banco de dados

Comercial

| Tabela       | Nome     |
|--------------|----------|
| Clientes     | COMCLIEN |
| Fornecedores |          |
| Vendedores   |          |
| Produtos     |          |
| Vendas       |          |

| Field       | Type         |
|-------------|--------------|
| n_numeclien | int          |
| c_codiclien | varchar(10)  |
| c_nomeclien | varchar(100) |
| c_razaclien | varchar(100) |
| d_dataclien | date         |
| c_cnpjclien | varchar(20)  |
| c_foneclien | varchar(20)  |

```mysql
CREATE TABLE comclien(
    n_numeclien int NOT NULL AUTO_INCREMENT,
    c_codiclien varchar(10),
    c_nomeclien varchar(100),
    c_razaclien varchar(100),
    d_dataclien date,
    c_cnpjclien varchar(20),
    c_foneclien varchar(20),
PRIMARY KEY (n_numeclien));
```
