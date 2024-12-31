
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

    const box = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL, spacing: 10 });
    const grid = new Gtk.Grid({ column_spacing: 10, row_spacing: 10 });

    // Criando botões
    const button1 = new Gtk.Button({ label: "Button 1" });
    const button2 = new Gtk.Button({ label: "Button 2" });
    const button3 = new Gtk.Button({ label: "Click me!" });

    // Adicionando comportamento ao botão
    let clicked = false; // Variável para rastrear o estado do botão
    button3.connect("clicked", function () {
        if (!clicked) {
            button3.set_label("Clicked!");
        } else {
            button3.set_label("Click me again!");
        }
        clicked = !clicked; // Alterna o estado entre clicado e não clicado
    });

    // Criando a janela principal
    const window = new Gtk.ApplicationWindow({
        application: app,          // Associando a janela à aplicação
        title: "Testes variados", // Título da janela
        default_width: 800,        // Largura inicial
        default_height: 600,       // Altura inicial
    });

    button1.set_hexpand(true);
    button2.set_hexpand(true);
    button3.set_hexpand(true);

    const label1 = new Gtk.Label({ label: "First Name:" });

    // Adicionando os botões ao container
    box.append(label1);
    box.append(button1);
    box.append(button2);
    box.append(button3);
    
    window.set_child(box);

    // Mostrando a janela
    window.present();
});

// Executando a aplicação
app.run([]);