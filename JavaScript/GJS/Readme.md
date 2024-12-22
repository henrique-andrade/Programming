# Desenvolvendo Aplicações com JavaScript e GTK

## Introdução

Este documento foi criado para apresentar um guia prático sobre como desenvolver aplicações gráficas utilizando **JavaScript** e o **GTK**. O foco será explorar as ferramentas e conceitos fundamentais para construir interfaces gráficas modernas e interativas, tanto no **macOS** quanto no **Linux**.

O desenvolvimento será orientado pelo paradigma de **orientação a objetos (OO)**, um modelo de programação amplamente usado para organizar e estruturar código de maneira eficiente e modular. Este guia foi pensado especialmente para quem já possui experiência programando em R, com explicações que traçam paralelos entre conceitos de OO no GJS e elementos conhecidos do R.

Ao longo do texto, conceitos como classes, instâncias, propriedades e métodos serão apresentados, sempre trazendo comparações com práticas do R, como o uso de data frames e funções.

---

## Por que JavaScript e GTK?

- **JavaScript**:
  - Uma linguagem amplamente conhecida por seu uso no desenvolvimento web, mas que também pode ser usada fora dos navegadores para criar aplicações desktop graças ao **GJS** (GNOME JavaScript Bindings).
  - Oferece uma sintaxe acessível e moderna, ideal tanto para iniciantes quanto para programadores experientes.

- **GTK**:
  - Um dos frameworks mais populares para criar interfaces gráficas, amplamente usado no ecossistema Linux e compatível com macOS.
  - Com o GTK 4, é possível construir aplicações gráficas elegantes, eficientes e com suporte a animações e layouts modernos.

Ao combinar **JavaScript** e **GTK**, é possível criar aplicações desktop nativas, sem a necessidade de depender exclusivamente de ferramentas web. Este guia é especialmente útil para quem deseja explorar novos paradigmas de programação, como OO, aplicados à criação de interfaces gráficas.

---

## O que é Orientação a Objetos?

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

---

## O que vamos aprender?

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

---

## Compatibilidade com sistemas

Este guia foi pensado para funcionar tanto no **macOS** quanto no **Linux**, dois sistemas amplamente usados para desenvolvimento. Instruções detalhadas serão fornecidas para ambos os ambientes, garantindo que você consiga configurar seu sistema e seguir os exemplos apresentados.

Com este guia, você estará apto a criar aplicações desktop nativas utilizando o poder do JavaScript e a flexibilidade do GTK. Vamos começar nossa jornada no desenvolvimento de interfaces gráficas!

---

## Configuração do ambiente de desenvolvimento

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

---

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

---

## Conceitos de Orientação a Objetos (OO)

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

---

### Primeiro exemplo completo

Aqui está um exemplo prático de um aplicativo com **JavaScript e GJS**, incluindo comentários para facilitar o entendimento:

```javascript
// Importando as bibliotecas necessárias
const Gtk = imports.gi.Gtk; // Biblioteca para criar interfaces gráficas
const Gio = imports.gi.Gio; // Biblioteca para gerenciar a aplicação

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
        application: app,       // Associando a janela à aplicação
        title: "My First GTK App", // Título da janela
        default_width: 400,     // Largura inicial
        default_height: 300,    // Altura inicial
    });

    // Adicionando o botão à janela
    window.set_child(button);

    // Mostrando a janela
    window.present();
});

// Executando a aplicação
app.run([]);
```

#### **Como executar**
1. Salve o código acima como `my_first_app.js`.
2. Execute:
   ```bash
   gjs my_first_app.js
   ```

Vamos corrigir isso! Vou detalhar linha por linha o **"Primeiro Exemplo Completo"**, explicando cada parte do código para que você entenda exatamente o que está acontecendo.

#### Explicação Linha a Linha

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

#### Resumo do Código

1. **Configuração inicial**:
   - Importação das bibliotecas (`Gtk` e `Gio`).
   - Criação da aplicação com `Gtk.Application`.

2. **Construção da interface**:
   - Um botão é criado e configurado para alternar seu texto quando clicado.
   - Uma janela é criada e o botão é adicionado como seu conteúdo.

3. **Execução do aplicativo**:
   - A janela é exibida quando o aplicativo é ativado.
   - O aplicativo entra no loop principal até ser encerrado.

---

## O que aprendemos até agora

1. **Configurar o ambiente GJS com GTK no macOS**.
2. **Entender a orientação a objetos no contexto do GJS**:
   - Classes, instâncias, propriedades e métodos.
3. **Criar e executar um aplicativo básico com janela e botão**:
   - Eventos (`connect`) para adicionar lógica ao botão.
   - Widgets como `Gtk.Button` e `Gtk.ApplicationWindow`.

---

## Glossário

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
