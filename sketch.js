let bgColor1 = "#2F2F2F";
let bgColor2 = "#202020";
let text1 = "#4F4F4F";
let text2 = "#8F8F8F";
let text3 = "#FFC300";
let text4 = "#FF2F2F";

let testScentence;
let completedText;

function preload() {
  f = loadFont("Inconsolata.ttf");
}

function setup() {
  noStroke();
  rectMode(CENTER); 
  textFont(f);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(bgColor1);
  fill(bgColor2)
  rect(width/2, height/2, width/1.1, 100, 7);
  fill(text1);
  textAlign(CENTER, CENTER);
  let test = new TextBox("I MADE IT WORK LETS FUCKING GO ! ! !", text1, width/2, height/2);
  test.words[3].chars[0].changeColor(text2);
  test.show();
  console.log("screen drawn");
}

class TextBox {
  constructor(text="testing", col="black", x=0, y=0) {
    this.x = x; this.y = y;
    text = text.split(" ");
    this.words = [];
    this.length = 0;
    
    for (const w of text) {
      const word = new Word(w+" ", col);
      this.length += word.length;
      this.words.push(word);
    }
    
    let x2 = this.x - (this.length / 2);
    for (const word of this.words) {
      word.x = x2;
      x2 += word.length;
    }
    
  }
  
  show() {
    for (let i=0; i<this.words.length; i++) {
      const word = this.words[i];
      word.show();
    }
  }
}

class Word {
  constructor(string="", col="#000000", x=width/2, y=height/2) {
    this.x = x; this.y = y;
    let sList = [];
    for (const c of string) {
      sList.push(new character(c, col, x, y));
    }
    this.chars = sList;
    this.length = this.chars.length*(textSize()/2);
  }
  
  show() {
    let x2 = this.x;
    const offset = textSize()/2;
    for (const c of this.chars) {
      c.show(x2, this.y);
      x2+=offset;
    }
  }
}

class character {
  constructor(char, col, x, y) {
    this.col = col;
    this.char = char;
    this.x = x; this.y = y;
  }
  
  show(x, y) {
    if (x != undefined) {
      this.x = x;
    }
    if (y != undefined) {
      this.y = y;
    }
    fill(this.col);
    text(this.char, this.x, this.y);
  }
  
  changeColor(col) {
    this.col = col;
  }
}

function keyPressed() {
  if (key == " ") {
    redraw();
  }
}