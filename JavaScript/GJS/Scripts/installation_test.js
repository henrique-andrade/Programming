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
