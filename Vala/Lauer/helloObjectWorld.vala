class HelloWorld {
    private string name;

    public HelloWorld(string name) {
        this.name = name;
    }

    public void greet() {
        var fullGreeting = "Hello " + this.name + "!\n";
        stdout.printf(fullGreeting);
    }
}

int main(string[] args) {
    var helloWorldObject = new HelloWorld(args[1]);
    helloWorldObject.greet();
    return 0;
}

/*
Source:
Lauer, Michael. 2019. Introducing Vala Programming: A Language
and Techniques to Boost Productivity. New York, NY: Apress.

To execute this program you need to run the following command in Terminal:

./helloObjectWorld.vala --run-args Henrique
*/
