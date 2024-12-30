# Desenvolvendo Aplicações com JavaScript e GTK

[toc]

## 1. Introdução

Este guia foi criado para apresentar um caminho prático e bem estruturado para desenvolver aplicações gráficas utilizando **JavaScript** e o **GTK**. Nele, exploramos desde conceitos básicos até tópicos mais avançados, ajudando você a criar interfaces gráficas modernas, interativas e funcionais.

Embora JavaScript seja amplamente conhecido no contexto do desenvolvimento web, este guia foca no uso de **GJS** (GNOME JavaScript Bindings), uma ferramenta poderosa para criar aplicações desktop nativas, especialmente para ambientes Linux e macOS.

O guia é especialmente útil para programadores com experiência prévia em **R**, estabelecendo paralelos claros entre práticas do R e o paradigma de orientação a objetos (OO), central no desenvolvimento com GTK.

### Por que JavaScript e GTK?

- **JavaScript**:
  - Uma linguagem amplamente conhecida por seu uso no desenvolvimento web, mas que também pode ser usada fora dos navegadores para criar aplicações desktop graças ao **GJS** (GNOME JavaScript Bindings).
  - Oferece uma sintaxe acessível e moderna, ideal tanto para iniciantes quanto para programadores experientes.

- **GTK**:
  - Um dos frameworks mais populares para criar interfaces gráficas, amplamente usado no ecossistema Linux e compatível com macOS.
  - Com o GTK 4, é possível construir aplicações gráficas elegantes, eficientes e com suporte a animações e layouts modernos.

Ao combinar **JavaScript** e **GTK**, é possível criar aplicações desktop nativas, sem a necessidade de depender exclusivamente de ferramentas web. Este guia é especialmente útil para quem deseja explorar novos paradigmas de programação, como OO, aplicados à criação de interfaces gráficas.

### O que vamos aprender?

1. **Configuração do Ambiente**:
   - Instalação e configuração de ferramentas necessárias no macOS e Linux.
   - Testando se o ambiente está funcionando corretamente.

2. **Fundamentos de JavaScript com GJS**:
   - Como usar bibliotecas (Gtk e Gio).
   - Como criar janelas, botões e outros elementos gráficos.

3. **Aplicando Orientação a Objetos**:
   - Criação de classes e instâncias.
   - Uso de propriedades e métodos para manipular os elementos gráficos.

4. **Construindo Aplicações Práticas**:
   - Criar e personalizar interfaces gráficas interativas.
   - Gerenciar eventos (como cliques em botões) e adicionar lógica ao aplicativo.

### Compatibilidade com sistemas

Este guia foi pensado para funcionar tanto no **macOS** quanto no **Linux**, dois sistemas amplamente usados para desenvolvimento. Instruções detalhadas serão fornecidas para ambos os ambientes, garantindo que você consiga configurar seu sistema e seguir os exemplos apresentados.

Com este guia, você estará apto a criar aplicações desktop nativas utilizando o poder do JavaScript e a flexibilidade do GTK. Vamos começar nossa jornada no desenvolvimento de interfaces gráficas!

## 2. Introdução à Orientação a Objetos

**Orientação a objetos (OO)** é um paradigma de programação que organiza o código em torno de **objetos**, que são criados a partir de **classes**. Este modelo ajuda a manter o código modular, reutilizável e mais fácil de entender.

- **Classe**: O molde ou plano para criar objetos. Define as propriedades (atributos) e métodos (ações) que os objetos terão.
- **Objeto/Instância**: Um "objeto real" criado a partir de uma classe.
- **Propriedades**: Características que descrevem o estado de um objeto.
- **Métodos**: Comportamentos ou ações que um objeto pode realizar.

Exemplo prático:
- **Classe**: Um botão gráfico (`Gtk.Button`).
- **Instância**: O botão que aparece na janela do aplicativo.
- **Propriedade**: O texto exibido no botão (`label`).
- **Método**: A ação de alterar o texto do botão (`set_label`).

No decorrer deste guia, exploraremos como aplicar esses conceitos na prática para construir interfaces gráficas.

## 3. Configuração do ambiente de desenvolvimento

### Instalação das bibliotecas no macOS

Primeiro, instalamos as dependências necessárias usando o **Homebrew**:

1. Atualize o Homebrew:
   ```bash
   brew update
   ```

2. Instale o GTK 4 e GJS:
   ```bash
   brew install gtk4 gjs
   ```

3. Instale o introspection (para gerenciar as ligações do GJS com o GTK):
   ```bash
   brew install gobject-introspection
   ```

4. (Opcional) Instale o XQuartz para garantir a renderização das janelas GTK no macOS:
   ```bash
   brew install --cask xquartz
   ```

### Instalação das bibliotecas no Fedora

No Fedora, você pode usar o **DNF** para instalar as bibliotecas necessárias:

1. Atualize o sistema:
   ```bash
   sudo dnf update
   ```

2. Instale o GTK 4, GJS e as ferramentas de introspecção:
   ```bash
   sudo dnf install gtk4 gjs gobject-introspection
   ```

3. Instale ferramentas adicionais de desenvolvimento (opcional):
   ```bash
   sudo dnf groupinstall "Development Tools" "GNOME Software Development"
   ```

Após esses passos, as bibliotecas estarão prontas para uso no Fedora.

### Testando se as bibliotecas estão funcionando

Após a instalação, teste o ambiente com um código mínimo:

1. Crie o arquivo `installation_test.js` com o seguinte conteúdo:
   ```javascript
   const Gtk = imports.gi.Gtk;
   const Gio = imports.gi.Gio;
   
   // Criando uma aplicação GTK
   const app = new Gtk.Application({
       application_id: "org.gtk.example.test",
       flags: Gio.ApplicationFlags.FLAGS_NONE,
   });
   
   // Conectando o evento "activate" para configurar a interface
   app.connect("activate", function () {
       // Criando uma janela
       const window = new Gtk.ApplicationWindow({
           application: app,        // Associando a janela à aplicação
           title: "Test GTK 4",     // Título da janela
           default_width: 400,      // Largura inicial
           default_height: 300,     // Altura inicial
       });
   
       // Mostrando a janela
       window.present();
   });
   
   // Executando a aplicação
   app.run([]);
   ```
   
2. Execute o script:
   ```bash
   gjs installation_test.js
   ```

Se uma janela intitulada **"Test GTK 4"** aparecer, o ambiente está funcionando.

## 4. Conceitos de Orientação a Objetos

Antes de prosseguir com mais exemplos, vamos reforçar como **orientação a objetos (OO)** aparece no GJS, comparando com o R.

### Classes e Objetos

- Uma **classe** é o molde ou plano que define como os objetos serão criados.
- Um **objeto** (ou instância) é criado a partir de uma classe.

**Comparação com R**:
- No R, quando você cria um data frame, está criando uma instância implicitamente:
  ```R
  df <- data.frame(x = 1:10, y = rnorm(10)) # Instância de um "molde" data.frame
  ```
- No GJS, isso é explícito:
  ```javascript
  const button = new Gtk.Button({ label: "Click me!" }); // Instância de Gtk.Button
  ```

### Propriedades e Métodos

- **Propriedades** são os atributos de um objeto (ex.: o texto de um botão).
- **Métodos** são ações ou comportamentos que o objeto pode executar (ex.: mudar o texto do botão).

**Comparação com R**:
- No R:
  ```R
  df <- data.frame(x = 1:10, y = rnorm(10)) # x e y são propriedades
  summary(df)                              # summary() é um método
  ```
- No GJS:
  ```javascript
  const button = new Gtk.Button({ label: "Click me!" }); // label é uma propriedade
  button.set_label("New Label");                         // set_label() é um método
  ```

## 5. Exemplo prático: primeiro aplicativo

Aqui está um exemplo prático de um aplicativo com **JavaScript e GJS**, incluindo comentários para facilitar o entendimento:

```javascript
// Importando as bibliotecas necessárias
imports.gi.versions.Gtk = "4.0"; // Especifica a versão do GTK
const Gtk = imports.gi.Gtk;      // Biblioteca para criar interfaces gráficas
const Gio = imports.gi.Gio;      // Biblioteca para gerenciar a aplicação

// Criando uma aplicação GTK
const app = new Gtk.Application({
    application_id: "org.gtk.example",
    flags: Gio.ApplicationFlags.FLAGS_NONE, // Sem configurações adicionais
});

// Conectando a função que será chamada ao iniciar a aplicação
app.connect("activate", function () {
    // Criando um botão com texto inicial
    const button = new Gtk.Button({ label: "Click me!" });

    // Adicionando comportamento ao botão
    let clicked = false; // Variável para rastrear o estado do botão
    button.connect("clicked", function () {
        if (!clicked) {
            button.set_label("Clicked!");
        } else {
            button.set_label("Click me again!");
        }
        clicked = !clicked; // Alterna o estado entre clicado e não clicado
    });

    // Criando a janela principal
    const window = new Gtk.ApplicationWindow({
        application: app,          // Associando a janela à aplicação
        title: "My First GTK App", // Título da janela
        default_width: 400,        // Largura inicial
        default_height: 300,       // Altura inicial
    });

    // Adicionando o botão à janela
    window.set_child(button);

    // Mostrando a janela
    window.present();
});

// Executando a aplicação
app.run([]);
```

### Como executar
1. Salve o código acima como `my_first_app.js`.
2. Execute:
   ```bash
   gjs my_first_app.js
   ```

### Explicação linha a linha

```javascript
// Importando as bibliotecas necessárias
const Gtk = imports.gi.Gtk; // Biblioteca para criar interfaces gráficas
const Gio = imports.gi.Gio; // Biblioteca para gerenciar a aplicação
```

- **`Gtk`**: Contém todas as classes e funções para criar interfaces gráficas.
- **`Gio`**: Gerencia aplicativos e oferece suporte para funcionalidades como integração com o sistema operacional.

```javascript
// Criando uma aplicação GTK
const app = new Gtk.Application({
    application_id: "org.gtk.example",
    flags: Gio.ApplicationFlags.FLAGS_NONE, // Sem configurações adicionais
});
```

- **`Gtk.Application`**:
  - Classe que gerencia o ciclo de vida da aplicação.
  - O `application_id` identifica exclusivamente o aplicativo no sistema.
  - **`FLAGS_NONE`**: Nenhuma configuração especial é aplicada à aplicação.

```javascript
// Conectando a função que será chamada ao iniciar a aplicação
app.connect("activate", function () {
```

- **`app.connect("activate", ...)`**:
  - O evento `"activate"` é disparado automaticamente quando a aplicação é iniciada.
  - Aqui configuramos o que acontece quando o aplicativo começa (ex.: criar janelas e widgets).

```javascript
    // Criando um botão com texto inicial
    const button = new Gtk.Button({ label: "Click me!" });
```

- **`Gtk.Button`**:
  - Classe usada para criar botões.
  - A propriedade **`label`** define o texto exibido no botão.

```javascript
    // Adicionando comportamento ao botão
    let clicked = false; // Variável para rastrear o estado do botão
    button.connect("clicked", function () {
        if (!clicked) {
            button.set_label("Clicked!");
        } else {
            button.set_label("Click me again!");
        }
        clicked = !clicked; // Alterna o estado entre clicado e não clicado
    });
```

- **Variável `clicked`**:
  - Armazena o estado atual do botão (se foi clicado ou não).
- **`button.connect("clicked", ...)`**:
  - Adiciona um "ouvinte de eventos" ao botão.
  - Sempre que o botão for clicado, a função passada aqui será executada.
- **Lógica condicional**:
  - Se `clicked` for `false`, muda o texto do botão para `"Clicked!"`.
  - Caso contrário, redefine o texto para `"Click me again!"`.
  - A variável `clicked` é alternada entre `true` e `false` para rastrear o estado.

```javascript
    // Criando a janela principal
    const window = new Gtk.ApplicationWindow({
        application: app,       // Associando a janela à aplicação
        title: "My First GTK App", // Título da janela
        default_width: 400,     // Largura inicial
        default_height: 300,    // Altura inicial
    });
```

- **`Gtk.ApplicationWindow`**:
  - Uma janela associada à aplicação criada com `Gtk.Application`.
  - **Propriedades**:
    - `application`: Liga a janela à aplicação.
    - `title`: Define o título exibido na barra superior.
    - `default_width` e `default_height`: Dimensões iniciais da janela.

```javascript
    // Adicionando o botão à janela
    window.set_child(button);
```

- **`set_child(button)`**:
  - Define o botão como o conteúdo principal da janela.
  - No GTK 4, uma janela pode conter apenas um widget diretamente. Para organizar múltiplos widgets, usamos containers (ex.: `Gtk.Box`, que veremos mais adiante).

```javascript
    // Mostrando a janela
    window.present();
});

```
- **`present()`**:
  - Exibe a janela na tela.
  - Garante que a janela será mostrada ao usuário.

```javascript
// Executando a aplicação
app.run([]);
```

- **`app.run([])`**:
  - Inicia o loop principal da aplicação, permitindo que ela reaja a eventos (como cliques em botões).
  - O aplicativo continua em execução até que todas as janelas sejam fechadas.

### Resumo do Código

1. **Configuração inicial**:
   - Importação das bibliotecas (`Gtk` e `Gio`).
   - Criação da aplicação com `Gtk.Application`.

2. **Construção da interface**:
   - Um botão é criado e configurado para alternar seu texto quando clicado.
   - Uma janela é criada e o botão é adicionado como seu conteúdo.

3. **Execução do aplicativo**:
   - A janela é exibida quando o aplicativo é ativado.
   - O aplicativo entra no loop principal até ser encerrado.

## 6. O que aprendemos até agora

1. **Configurar o ambiente GJS com GTK no macOS**.
2. **Entender a orientação a objetos no contexto do GJS**:
   - Classes, instâncias, propriedades e métodos.
3. **Criar e executar um aplicativo básico com janela e botão**:
   - Eventos (`connect`) para adicionar lógica ao botão.
   - Widgets como `Gtk.Button` e `Gtk.ApplicationWindow`.

## 7. Containers e Layouts

### O que são Containers?

No GTK, **containers** são widgets especiais que podem conter outros widgets, como botões, rótulos ou campos de entrada. Eles ajudam a organizar a interface gráfica de forma flexível e escalável.

- Um container pode alinhar widgets horizontalmente, verticalmente ou em grades.
- Exemplos de containers:
    - **Gtk.Box**: Organiza widgets em uma única linha (horizontal) ou coluna (vertical).
    - **Gtk.Grid**: Organiza widgets em uma grade com linhas e colunas.
    - **Gtk.Stack**: Permite alternar entre diferentes widgets ou layouts em um espaço fixo.

### Por que usar Containers?

1. Organização:
    - Permitem agrupar widgets e organizá-los visualmente.

2. Escalabilidade:
    - Facilitam a adaptação de layouts conforme a interface cresce.

3. Flexibilidade:
    - Suportam alinhamento, espaçamento e expansão dos widgets.

### 7.1 Gtk.Box

O **Gtk.Box** é um dos containers mais simples e úteis:

- Ele organiza os widgets em uma **linha (horizontal)** ou **coluna (vertical)**.
- Propriedades importantes:
    - `orientation` : Define se os widgets serão organizados horizontalmente ou verticalmente.
        - `Gtk.Orientation.HORIZONTAL`
        - `Gtk.Orientation.VERTICAL`
    - **`spacing`**: Define o espaço entre os widgets dentro do container.

### Exemplo Prático: Gtk.Box

Neste exemplo, criaremos dois botões organizados horizontalmente dentro de um `Gtk.Box`.

```javascript
// Importando as bibliotecas necessárias
imports.gi.versions.Gtk = "4.0"; // Especifica a versão do GTK
const Gtk = imports.gi.Gtk;      // Biblioteca para criar interfaces gráficas
const Gio = imports.gi.Gio;      // Biblioteca para gerenciar a aplicação

// Criando uma aplicação GTK
const app = new Gtk.Application({
    application_id: "org.gtk.example.box",
    flags: Gio.ApplicationFlags.FLAGS_NONE, // Sem configurações adicionais
});

// Conectando a função que será chamada ao iniciar a aplicação
app.connect("activate", function () {
    // Criando a janela principal
    const window = new Gtk.ApplicationWindow({
        application: app,
        title: "Gtk.Box Example",
        default_width: 800,
        default_height: 400,
    });

    // Criando o container horizontal
    const box = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL, spacing: 10 });

    // Criando dois botões
    const button1 = new Gtk.Button({ label: "Button 1" });
    const button2 = new Gtk.Button({ label: "Button 2" });

    // Adicionando os botões ao container
    box.append(button1);
    box.append(button2);

    // Adicionando o container à janela
    window.set_child(box);

    // Mostrando a janela
    window.present();
});

// Executando a aplicação
app.run([]);
```

#### Como executar
1. Salve o código acima como `my_gtk_box.js`.
2. Execute:
   ```bash
   gjs my_gtk_box.js
   ```

#### Explicação linha a linha

Aqui está a explicação detalhada, linha por linha, do script **`my_gtk_box.js`**:

**Parte 1: Importando e Configurando Bibliotecas**

```javascript
imports.gi.versions.Gtk = "4.0";
```

- O que faz?
    - Informa ao GJS que você deseja usar a versão **4.0** do GTK.
    - Resolve o problema de múltiplas versões disponíveis.

```javascript
const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;
```

- O que faz?
    - Importa os módulos necessários:
        - `Gtk`: Contém classes e métodos para criar interfaces gráficas.
        - `Gio`: Gerencia aplicativos e fornece suporte para integração com o sistema operacional.

**Parte 2: Criando a Aplicação**

```javascript
const app = new Gtk.Application({
    application_id: "org.gtk.example.box",
    flags: Gio.ApplicationFlags.FLAGS_NONE,
});
```

- O que faz?
    - Cria uma nova aplicação GTK com:
        - **`application_id`**: Identificador único da aplicação.
        - **`flags`**: Define comportamentos adicionais (aqui, `FLAGS_NONE` significa "sem configurações especiais").

**Parte 3: Conectando a Função Principal**

```javascript
app.connect("activate", function () {
```

- O que faz?
    - Conecta uma função ao evento `"activate"`, que é disparado automaticamente quando a aplicação é iniciada.
    - A função configurará a interface gráfica.

**Parte 4: Criando a Janela**

```javascript
const window = new Gtk.ApplicationWindow({
    application: app,
    title: "Gtk.Box Example",
    default_width: 800,
    default_height: 400,
});
```

- O que faz?
    - Cria uma janela principal associada à aplicação.
    - Propriedades:
        - **`application`**: Liga a janela à aplicação `app`.
        - **`title`**: Define o título da janela.
        - **`default_width`** e **`default_height`**: Dimensões iniciais da janela.

**Parte 5: Criando o Container (Gtk.Box)**

```javascript
const box = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL, spacing: 10 });
```

- O que faz?
    - Cria um container `Gtk.Box` para organizar os widgets horizontalmente.
    - Propriedades:
        - **`orientation`**: Define a orientação do container (horizontal ou vertical).
        - **`spacing`**: Define o espaço entre os widgets dentro do container.

**Parte 6: Criando os Botões**

```javascript
const button1 = new Gtk.Button({ label: "Button 1" });
const button2 = new Gtk.Button({ label: "Button 2" });
```

- O que faz?
    - Cria dois botões com textos especificados pelas propriedades `label`.
    - **`Gtk.Button`** é uma classe para criar botões interativos.

**Parte 7: Adicionando Widgets ao Container**

```javascript
box.append(button1);
box.append(button2);
```

- O que faz?
    - Adiciona os botões ao container `box` na ordem em que foram chamados.
    - O `Gtk.Box` organiza os widgets horizontalmente, então os botões aparecerão lado a lado.

**Parte 8: Configurando o Layout na Janela**

```javascript
window.set_child(box);
```

- O que faz?
    - Define o `Gtk.Box` como o widget principal da janela.
    - No GTK 4, cada janela pode conter apenas um widget diretamente, então usamos um container para adicionar múltiplos widgets.

**Parte 9: Exibindo a Janela**

```javascript
window.present();
```

- O que faz?
    - Exibe a janela na tela.

**Parte 10: Executando a Aplicação**

```javascript
app.run([]);
```

- O que faz?
    - Inicia o loop principal da aplicação, permitindo que ela responda a eventos como cliques ou fechamentos.
    - O loop continua até que todas as janelas sejam fechadas.


#### Resumo do Código

1. Configuração:
    - Especificamos a versão do GTK e importamos os módulos necessários.
    - Criamos uma aplicação GTK com `Gtk.Application`.

2. Interface Gráfica:
    - Criamos uma janela (`Gtk.ApplicationWindow`) e um container (`Gtk.Box`).
    - Adicionamos dois botões ao container.
    - Configuramos o container como o conteúdo da janela.

3. Execução:
    - Conectamos a função ao evento `"activate"`.
    - Iniciamos o loop principal da aplicação com `app.run([])`.

### Conceito: Expansão e Preenchimento

Os widgets no GTK podem ser configurados para expandir ou preencher o espaço dentro de um container:

- Expansão (`set_hexpand` e `set_vexpand`):
    - Faz com que o widget ocupe todo o espaço disponível no container.
- Preenchimento (`spacing`):
    - Controla o espaço entre os widgets.

**Exemplo: Expansão Horizontal**

Modifique o exemplo anterior para que os botões ocupem toda a largura disponível:

```javascript
button1.set_hexpand(true);
button2.set_hexpand(true);
```

### 7.2 Gtk.Grid

O **Gtk.Grid** é um container que organiza widgets em uma **grade**, com linhas e colunas. Ele é útil para layouts mais complexos, como formulários.

- Propriedades importantes:
    - `attach(widget, left, top, width, height)`: Adiciona um widget em uma posição específica da grade.
        - `left` e `top`: Posição inicial (coluna e linha).
        - `width` e `height`: Quantidade de colunas e linhas que o widget ocupa.

### Exemplo Prático: Gtk.Grid

Neste exemplo, criaremos um formulário com dois rótulos e dois campos de entrada organizados em uma grade.

```javascript
// Importando as bibliotecas necessárias
imports.gi.versions.Gtk = "4.0"; // Especifica a versão do GTK
const Gtk = imports.gi.Gtk;      // Biblioteca para criar interfaces gráficas
const Gio = imports.gi.Gio;      // Biblioteca para gerenciar a aplicação

// Criando uma aplicação GTK
const app = new Gtk.Application({
    application_id: "org.gtk.example.box",
    flags: Gio.ApplicationFlags.FLAGS_NONE, // Sem configurações adicionais
});

// Conectando a função que será chamada ao iniciar a aplicação
app.connect("activate", function () {
    const window = new Gtk.ApplicationWindow({
        application: app,
        title: "Gtk.Grid Example",
        default_width: 800,
        default_height: 400,
    });

    // Criando a grade
    const grid = new Gtk.Grid({ column_spacing: 10, row_spacing: 10 });

    // Criando os widgets
    const label1 = new Gtk.Label({ label: "First Name:" });
    const entry1 = new Gtk.Entry();
    const label2 = new Gtk.Label({ label: "Last Name:" });
    const entry2 = new Gtk.Entry();

    // Adicionando os widgets à grade
    grid.attach(label1, 0, 0, 1, 1); // Coluna 0, Linha 0
    grid.attach(entry1, 1, 0, 1, 1); // Coluna 1, Linha 0
    grid.attach(label2, 0, 1, 1, 1); // Coluna 0, Linha 1
    grid.attach(entry2, 1, 1, 1, 1); // Coluna 1, Linha 1

    // Adicionando a grade à janela
    window.set_child(grid);

    // Mostrando a janela
    window.present();
});

// Executando a aplicação
app.run([]);
```

#### Como executar

1. Salve o código acima como `my_gtk_grid.js`.

2. Execute:

    ```bash
    gjs my_gtk_grid.js
    ```

#### Explicação linha a linha

**Parte 1: Importando e Configurando Bibliotecas**

```javascript
imports.gi.versions.Gtk = "4.0"; // Especifica a versão do GTK
```

- O que faz?
    - Define explicitamente que a versão do GTK usada será a 4.0.
    - Isso resolve problemas de compatibilidade caso várias versões do GTK estejam instaladas.

```javascript
const Gtk = imports.gi.Gtk;      // Biblioteca para criar interfaces gráficas
const Gio = imports.gi.Gio;      // Biblioteca para gerenciar a aplicação
```

- O que faz?
    - Importa as bibliotecas:
        - **`Gtk`**: Fornece classes e funções para criar interfaces gráficas.
        - **`Gio`**: Fornece funcionalidades para gerenciar aplicações GTK.

**Parte 2: Criando a Aplicação**

```javascript
const app = new Gtk.Application({
    application_id: "org.gtk.example.box",
    flags: Gio.ApplicationFlags.FLAGS_NONE, // Sem configurações adicionais
});
```

- O que faz?
    - Cria uma aplicação GTK.
    - Propriedades:
        - **`application_id`**: Um identificador único para o aplicativo.
        - **`flags`**: Define comportamentos adicionais (aqui, nenhum é configurado).

**Parte 3: Conectando a Função Principal**

```javascript
app.connect("activate", function () {
```

- O que faz?
    - Conecta uma função ao evento `"activate"`, que é chamado quando a aplicação é iniciada.
    - Essa função configura a interface gráfica.

**Parte 4: Criando a Janela**

```javascript
const window = new Gtk.ApplicationWindow({
    application: app,
    title: "Gtk.Grid Example",
    default_width: 800,
    default_height: 400,
});
```

- O que faz?
    - Cria a janela principal da aplicação.
    - Propriedades:
        - **`application`**: Associa a janela à aplicação criada.
        - **`title`**: Define o título da janela.
        - **`default_width`** e **`default_height`**: Define as dimensões iniciais da janela.

**Parte 5: Criando a Grade (Gtk.Grid)**

```javascript
const grid = new Gtk.Grid({ column_spacing: 10, row_spacing: 10 });
```

- O que faz?
    - Cria um widget `Gtk.Grid` que organiza outros widgets em uma grade.
    - Propriedades:
        - **`column_spacing`**: Define o espaço entre colunas.
        - **`row_spacing`**: Define o espaço entre linhas.

**Parte 6: Criando os Widgets**

```javascript
const label1 = new Gtk.Label({ label: "First Name:" });
const entry1 = new Gtk.Entry();
const label2 = new Gtk.Label({ label: "Last Name:" });
const entry2 = new Gtk.Entry();
```

- O que faz?
    - Cria widgets para o formulário:
        - **`Gtk.Label`**: Um rótulo de texto.
        - **`Gtk.Entry`**: Um campo de entrada de texto.

**Parte 7: Adicionando Widgets à Grade**

```javascript
grid.attach(label1, 0, 0, 1, 1); // Coluna 0, Linha 0
grid.attach(entry1, 1, 0, 1, 1); // Coluna 1, Linha 0
grid.attach(label2, 0, 1, 1, 1); // Coluna 0, Linha 1
grid.attach(entry2, 1, 1, 1, 1); // Coluna 1, Linha 1
```

- O que faz?
    - Adiciona os widgets à grade em posições específicas.
    - Parâmetros de `grid.attach()`:
        - **`widget`**: O widget a ser adicionado.
        - **`left`**: Coluna inicial.
        - **`top`**: Linha inicial.
        - **`width`**: Quantidade de colunas que o widget ocupará.
        - **`height`**: Quantidade de linhas que o widget ocupará.

    - Exemplo:
        - **`label1`** é adicionado na coluna 0, linha 0.
        - **`entry1`** é adicionado na coluna 1, linha 0.

**Parte 8: Adicionando a Grade à Janela**

```javascript
window.set_child(grid);
```

- O que faz?
    - Define o `Gtk.Grid` como o widget principal da janela.
    - No GTK 4, uma janela pode conter apenas um widget diretamente.

**Parte 9: Exibindo a Janela**

```javascript
window.present();
```

- O que faz?
    - Exibe a janela na tela.

**Parte 10: Executando a Aplicação**

```javascript
app.run([]);
```

- O que faz?
    - Inicia o loop principal da aplicação, permitindo que ela responda a eventos (como entrada de texto ou fechamento da janela).

#### Resumo do código

1. **Configuração**:
    - Define a versão do GTK e importa as bibliotecas necessárias.
    - Cria uma aplicação GTK.
2. **Interface Gráfica**:
    - Cria uma janela principal.
    - Usa `Gtk.Grid` para organizar widgets (rótulos e campos de entrada) em uma grade.
    - Adiciona os widgets às posições apropriadas na grade.
3. **Execução**:
    - Conecta a função principal ao evento `"activate"`.
    - Exibe a janela e inicia o loop principal da aplicação.

### 7.3 Gtk.Stack

`Gtk.Stack` é um container que permite alternar entre diferentes widgets ou layouts dentro de um mesmo espaço.

### Exemplo Prático: Gtk.Stack

Aqui está um exemplo:

```javascript
imports.gi.versions.Gtk = "4.0";
const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;

const app = new Gtk.Application({
    application_id: "org.gtk.example.stack",
    flags: Gio.ApplicationFlags.FLAGS_NONE,
});

app.connect("activate", () => {
    const window = new Gtk.ApplicationWindow({
        application: app,
        title: "Gtk.Stack Example",
        default_width: 600,
        default_height: 400,
    });

    const stack = new Gtk.Stack();

    // Criando duas páginas
    const label1 = new Gtk.Label({ label: "This is Page 1" });
    const label2 = new Gtk.Label({ label: "This is Page 2" });

    stack.add_named(label1, "page1");
    stack.add_named(label2, "page2");

    const stackSwitcher = new Gtk.StackSwitcher({ stack });

    // Criando um layout com stackSwitcher e stack
    const box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 10 });
    box.append(stackSwitcher);
    box.append(stack);

    window.set_child(box);
    window.present();
});

app.run([]);
```

`Gtk.Stack` é um container que permite alternar entre diferentes widgets ou layouts dentro de um mesmo espaço. Aqui está um exemplo:

```javascript
imports.gi.versions.Gtk = "4.0";
const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;

const app = new Gtk.Application({
    application_id: "org.gtk.example.stack",
    flags: Gio.ApplicationFlags.FLAGS_NONE,
});

app.connect("activate", () => {
    const window = new Gtk.ApplicationWindow({
        application: app,
        title: "Gtk.Stack Example",
        default_width: 600,
        default_height: 400,
    });

    const stack = new Gtk.Stack();

    // Criando duas páginas
    const label1 = new Gtk.Label({ label: "This is Page 1" });
    const label2 = new Gtk.Label({ label: "This is Page 2" });

    stack.add_named(label1, "page1");
    stack.add_named(label2, "page2");

    const stackSwitcher = new Gtk.StackSwitcher({ stack });

    // Criando um layout com stackSwitcher e stack
    const box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 10 });
    box.append(stackSwitcher);
    box.append(stack);

    window.set_child(box);
    window.present();
});

app.run([]);
```

#### Como Executar

1. Salve o código acima em um arquivo chamado `stack_example.js`.

2. Execute:
   ```bash
   gjs stack_example.js
   ```

#### Explicação linha a Linha

1. **`imports.gi.versions.Gtk = "4.0";`**:
   - Especifica a versão do GTK que será utilizada.

2. **`const Gtk = imports.gi.Gtk;` e `const Gio = imports.gi.Gio;`**:
   - Importa os módulos necessários para criar a interface gráfica e gerenciar a aplicação.

3. **Criação da aplicação**:
   ```javascript
   const app = new Gtk.Application({
       application_id: "org.gtk.example.stack",
       flags: Gio.ApplicationFlags.FLAGS_NONE,
   });
   ```
   - Cria a aplicação GTK, identificada por um ID único.

4. **Conexão do evento "activate"**:
   ```javascript
   app.connect("activate", () => { ... });
   ```
   - Conecta a função que configura e exibe a interface ao evento "activate" da aplicação.

5. **Criação do Gtk.ApplicationWindow**:
   ```javascript
   const window = new Gtk.ApplicationWindow({
       application: app,
       title: "Gtk.Stack Example",
       default_width: 600,
       default_height: 400,
   });
   ```
   - Define a janela principal, associando-a à aplicação.

6. **Criação do Gtk.Stack**:
   ```javascript
   const stack = new Gtk.Stack();
   ```
   - Um container que organiza widgets em "pilhas" alternáveis.

7. **Adicionando widgets ao Gtk.Stack**:
   ```javascript
   stack.add_named(label1, "page1");
   stack.add_named(label2, "page2");
   ```
   - Adiciona dois widgets (`label1` e `label2`) à pilha, identificados por nomes únicos.

8. **Criação do Gtk.StackSwitcher**:
   ```javascript
   const stackSwitcher = new Gtk.StackSwitcher({ stack });
   ```
   - Um widget que permite alternar entre os itens da pilha.

9. **Organização Vertical com Gtk.Box**:
   ```javascript
   const box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 10 });
   box.append(stackSwitcher);
   box.append(stack);
   ```
   - Organiza o `Gtk.StackSwitcher` e o `Gtk.Stack` verticalmente.

10. **Exibição da janela**:
    ```javascript
    window.set_child(box);
    window.present();
    ```
    - Define o `Gtk.Box` como o widget principal da janela e exibe a janela na tela.

11. **Início do loop principal**:
    ```javascript
    app.run([]);
    ```
    - Inicia a aplicação, permitindo que ela responda a eventos do usuário.

#### Resumo do Código

- **Objetivo**: Demonstrar o uso de `Gtk.Stack` para alternar entre diferentes widgets.
- **Widgets Principais**:
  - `Gtk.Stack`: Contém as páginas alternáveis.
  - `Gtk.StackSwitcher`: Permite alternar entre as páginas da pilha.
  - `Gtk.Box`: Organiza os widgets verticalmente.
- **Destaques**:
  - Uso de `add_named` para identificar cada página.
  - Combinação de `Gtk.Stack` com `Gtk.StackSwitcher` para criar uma interface interativa.

## 8. Widgets Avançados

5.1. Labels e Entry (Rótulos e Campos de Entrada)  

5.2. CheckButtons, Switches e RadioButtons  

5.3. ListView e TreeView para exibir listas e tabelas  

5.4. Dialogs: Criando caixas de diálogo para salvar, abrir e alertar  



## 9. Gerenciando Estilos com CSS

6.1. Introdução ao Sistema de Estilo do GTK  

6.2. Criando e Aplicando Arquivos CSS  

6.3. Alterando Cores, Fontes e Tamanhos com CSS  

6.4. Trabalhando com Classes Personalizadas  



## 10. Manipulando Arquivos e Dados

7.1. Criando Diálogos para Seleção de Arquivos (`Gtk.FileChooserDialog`)  

7.2. Abrindo e Lendo Arquivos de Texto  

7.3. Trabalhando com Arquivos CSV  

7.4. Salvando Dados em Arquivos  



## 11. Estrutura de Projetos

8.1. Como Estruturar o Código de uma Aplicação Complexa  

8.2. Modularizando o Código com Classes e Módulos  

8.3. Criando Funções Reutilizáveis  



## 12. Funcionalidades Avançadas

9.1. Trabalhando com `Gtk.Stack` e `Gtk.Notebook` para Alternar Layouts  

9.2. Adicionando Menus e Barras de Ferramentas  

9.3. Trabalhando com Icones e Recursos Visuais  

9.4. Lidando com Assíncronismo (Timers e Funções Assíncronas)  



## 13. Publicação e Distribuição

10.1. Empacotando a Aplicação para Linux e macOS  

10.2. Criando um Instalador com Flatpak  

10.3. Dicas para Manutenção e Atualização de Aplicativos  



## 14. Comparação com R

11.1. Diferenças de Abordagem entre GJS e Shiny  

11.2. Paralelos entre Widgets do GTK e Funções do R  

11.3. Como Reaproveitar Conhecimentos do R no GJS  



## 15. Conclusão

12.1. Revisão dos Conceitos Abordados  

12.2. Próximos Passos: Expandindo o Conhecimento  

12.3. Recursos Adicionais: Documentação, Fóruns e Comunidades  

## Glossário

### Orientação a Objetos (OO)

Orientação a objetos (OO) é um paradigma de programação que organiza o código em torno de **objetos**. Objetos encapsulam dados (**propriedades**) e comportamentos (**métodos**) e são criados a partir de **classes**.

- **Classe**: Um "molde" que define as propriedades e métodos de um objeto. No GTK, por exemplo, `Gtk.Button` é uma classe.
- **Objeto (ou instância)**: Um item criado a partir de uma classe. No código, uma variável como `const button = new Gtk.Button()` representa um objeto.
- **Método**: Uma função associada a um objeto ou classe. Exemplo: `button.set_label()`.
- **Propriedade**: Um atributo que define o estado ou característica do objeto. Exemplo: `label` em `Gtk.Button`.

### Containers
Containers são widgets especiais usados para organizar outros widgets. Exemplos incluem:
- **Gtk.Box**: Organiza widgets horizontal ou verticalmente.
- **Gtk.Grid**: Organiza widgets em uma grade com linhas e colunas.
- **Gtk.Stack**: Alterna entre diferentes widgets ou layouts.

### Eventos e Sinais
Sinais são eventos emitidos por widgets para notificar que algo aconteceu. Por exemplo, o sinal "`clicked`" é emitido quando um botão é clicado.
- **Método `connect`**: Conecta uma função a um sinal. Exemplo:
  ```javascript
  button.connect("clicked", () => {
      print("Button clicked!");
  });
  ```

### Introspecção

**Introspecção** é a capacidade de um programa **examinar suas próprias estruturas ou metadados** em tempo de execução. No contexto do GJS e do GTK, a introspecção permite que o JavaScript "descubra" e utilize funcionalidades definidas em bibliotecas escritas em outras linguagens, como C.

#### Introspecção no GJS e GTK

O GJS usa um sistema chamado **GObject Introspection (GI)**, que é uma tecnologia que expõe APIs de bibliotecas GTK e GNOME para linguagens dinâmicas como JavaScript (e Python).

#### Como funciona o GObject Introspection?

1. **Definição das APIs no C**:
    - As bibliotecas GTK e GNOME são escritas em C.
    - Cada classe, sinal, método e propriedade é definida no código C.
2. **Metadados gerados automaticamente**:
    - O sistema GI cria arquivos chamados **typelibs** que descrevem as classes, métodos e sinais dessas bibliotecas.
    - Esses arquivos contêm informações sobre:
        - Nomes das classes e métodos.
        - Tipos de dados dos parâmetros e retornos.
        - Eventos (sinais) disponíveis.
3. **Ligações para linguagens dinâmicas**:
    - No GJS, o módulo `imports.gi` usa esses metadados para "traduzir" as APIs em C para JavaScript.
    - Isso significa que você pode acessar bibliotecas escritas em C diretamente em JavaScript sem precisar escrever código em C.

#### Por que isso é útil no GJS?

Graças à introspecção:

- Você não precisa criar bindings manualmente:

    - Antes da GI, era necessário escrever códigos específicos para cada linguagem que desejava usar o GTK (bindings). Agora, o GJS faz isso automaticamente.

- Facilidade para linguagens dinâmicas:

    - Linguagens como JavaScript e Python podem acessar bibliotecas GTK de forma nativa.

- Consistência entre linguagens:

    - O comportamento e a sintaxe do GTK são consistentes entre JavaScript e Python porque ambas usam GI.
