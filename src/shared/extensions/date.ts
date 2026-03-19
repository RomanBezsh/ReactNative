import "";

declare global {
    interface Date {
        toDotted(): string;
    }
}

Date.prototype.toDotted = function():string {
    let d = this.getDate().toString();
    if (d.length < 2) {
        d = "0" + d;
    }
}

// git config --global user.email "you@example.com"
//   git config --global user.name "Your Name