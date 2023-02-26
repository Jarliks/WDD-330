let calculator = {
    sum() {
      return this.first + this.second;
    },
  
    mul() {
      return this.first * this.second;
    },

    sub() {
        return this.first - this.second;
      },
    
    div() {
        return this.first / this.second;
    },
  
    read() {
      this.first = +prompt('First value?', 0);
      this.second = +prompt('Second Value?', 0);
    }
  };
  
  calculator.read();
  alert( calculator.sum() );
  alert( calculator.mul() );