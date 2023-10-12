let bgColor1 = "#2F2F2F";
let bgColor2 = "#202020";
let text1 = "#4F4F4F";
let text2 = "#8F8F8F";
let text3 = "#FFC300";
let text4 = "#bf2121";

let paragraph;
let charsTyped=0;
let completed = [];

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
  
  textSize(20);
  const tS = " This is a test scentence i cant think of too much ";
  paragraph = new Paragraph(tS, text1, width/2, height/2);
  console.log(paragraph)
}

let framerate=0;

function draw() {
  background(bgColor1);
  
  fill(bgColor2)
  rect(width/2, height/2, width/1.1, 300, 7);
  
  fill(text1);
  textAlign(CENTER, CENTER);
  
  paragraph.show();
}

function keyPressed() {
  if (keyCode === BACKSPACE && completed.length >= 1) {
    completed.pop();
  } else if (key != "Backspace" && key != "Shift") {
    completed.push(key);
  }
  
  for (let scentence of paragraph.scentences) {
    for (let word of scentence.words) {
      for (let char of word.chars) {
        char.col = text1;
      }
    }
  }
  
  let x = 0; let y = 0; let z = 0;
  for (let i=0; i<completed.length; i++) {
    if (y >= paragraph.scentences[z].words.length-1 && x > paragraph.scentences[z].words[y].length-1) {
      y=0;
      x=0;
      z++;
    }
    
    if (x > paragraph.scentences[z].words[y].length-1) {
      x=0;
      y++;
    }
    
    const char = completed[i];
    const char2 = paragraph.scentences[z].words[y].chars[x].val;
    
    if (char == char2) {
      paragraph.scentences[z].words[y].chars[x].col = text2;
    } else {
      paragraph.scentences[z].words[y].chars[x].col = text4;
    }
    x++;
  }
  charsTyped++;
}