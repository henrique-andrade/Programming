/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 * SPDX-FileCopyrightText: 2022 Henrique Andrade <henrique.coelho@gmail.com>
 */

public class MyApp : Gtk.Application {
    public MyApp () {
        Object (
            application_id: "com.github.henrique-andrade.Vala-Gtk-learning",
            flags: ApplicationFlags.FLAGS_NONE
        );
    }

    protected override void activate () {

        var button = new Gtk.Button.with_label ("Click me!");
        var label = new Gtk.Label (null);

        var grid = new Gtk.Grid () {
            orientation = Gtk.Orientation.VERTICAL,
            row_spacing = 6
        };

        grid.add (button);
        grid.add (label);

        var main_window = new Gtk.ApplicationWindow (this) {
            default_height = 300,
            default_width = 300,
            title = "Hello World"
        };

        main_window.add (grid);

        button.clicked.connect (() => {
            label.label = "Hello World!";
            button.sensitive = false;
        });

        main_window.show_all ();
    }

    public static int main (string[] args) {
        return new MyApp ().run (args);
    }
}

/*
cd "/home/henrique/Projetos/Programming/Vala/elementaryOS/gtk-hello/src"
valac --pkg gtk+-3.0 Application.vala
./Application
*/
