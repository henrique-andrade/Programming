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