public class Test : Gtk.Application {

    public Test () {
        Object (
            application_id: "com.github.henrique-andrade.test",
            flags: ApplicationFlags.FLAGS_NONE
        );
    }

    protected override void activate () {
        build_window ();
    }

    private void build_window () {
        var window = new Gtk.ApplicationWindow (this);
        window.title = "Vala Test (aula 2)";
        window.window_position = Gtk.WindowPosition.CENTER;
        window.set_default_size (550, 180);
        window.show_all ();
    }

    public static int main (string[] args) {
        var test = new Test ();
        return test.run (args);
    }

}

