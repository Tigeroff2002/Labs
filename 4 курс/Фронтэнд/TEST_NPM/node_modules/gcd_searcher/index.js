module.exports = function gcd(a, b) {
    if (a < b){
        const temp = a;
        a = b;
        b = temp;
    }
    if (b === 0) {
      return a;
    } else {
      return gcd(b, a % b);
    }
  }