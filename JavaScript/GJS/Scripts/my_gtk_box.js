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

    // Expande os botões de forma a ocupar toda a janela
    button1.set_hexpand(true);
    button2.set_hexpand(true);

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