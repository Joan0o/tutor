const exampleObject = {
    name: "joan",
    version: "1.0",
    arrowFunction: () => {
      console.log("This is an arrow function!");
    },
    normalFunction: function() {
      console.log("This is a normal function!");
  
      const innerArrowFunction = () => {
        console.log("This is an arrow function inside a normal function!");
      };
  
      function innerNormalFunction() {
        console.log("This is a normal function inside a normal function!");
      }
  
      innerArrowFunction();
      innerNormalFunction();
    }
  };
  
  exampleObject.arrowFunction(); // Output: This is an arrow function!
  exampleObject.normalFunction();
  // Output: This is a normal function!
// Output: This is an arrow function inside a normal function!
// Output: This is a normal function inside a normal function!