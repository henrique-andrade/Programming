
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
        default_width: 800,        // Largura inicial
        default_height: 600,       // Altura inicial
    });

    // Adicionando o botão à janela
    window.set_child(button);

    // Mostrando a janela
    window.present();
});

// Executando a aplicação
app.run([]);