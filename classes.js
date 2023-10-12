class Paragraph {
  constructor(text="placeholder", col="black", x=0, y=0) {
    this.x = x; this.y = y;
    this.col = col;
    //loops through the characters in the paragraph and splits it whenever it
    //detects that the given string is going to be wider than the window width
    let l = 0;
    let prevIndex = 0;
    this.scentences = [];
    let pre = [];
    for (let i=0; i<text.length; i++) {
      l+=textSize()/2;
      if (l > width/1.2) {
        for (let j=i; j > 0; j--) {
          if (text[j] == " ") {
            pre.push(text.slice(prevIndex, j).substring(1));
            i = j;
            break;
          }
        }
        l=0;
        prevIndex = i;
      }
      if (i == text.length-1) {
        pre.push(text.slice(prevIndex, text.length).substring(1));
      }
    }
    console.log(pre);
    
    if (pre.length == 0) {
      pre.push(text);
    }
    
    let offset = this.y - (textSize()*pre.length)/2;
    for (let s of pre) {
      const scentence = new Scentence(s, this.col, this.x, offset);
      const b = scentence.words[0].chars.length-1;
      console.log(scentence.words[0].chars[0]);
      this.scentences.push(scentence);
      offset += textSize();
    }
  }
  
  show() {
    for (let s of this.scentences) {
      s.show();
    }
  }
}

class Scentence {
  constructor(text="placeholder", col="black", x=0, y=0) {
    this.x = x; this.y = y;
    text = text.split(" ");
    this.words = [];
    this.size = 0;
    this.length = 0;
    
    for (const w of text) {
      const word = new Word(w + " ", col);
      this.size += word.size;
      this.length += word.length;
      this.words.push(word);
    }
    
    let offset = this.x - (this.size / 2);
    for (const word of this.words) {
      word.x = offset+(textSize()/2);
      word.y = this.y;
      offset += word.size;
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
    this.size = this.chars.length*(textSize()/2);
    this.length = this.chars.length;
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
    this.val = char;
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
    text(this.val, this.x, this.y);
  }
  
  changeColor(col) {
    this.col = col;
  }
}