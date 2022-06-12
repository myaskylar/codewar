function getInstructionsMatrix(code) {
  return code.split("\n").map(function (elem) {
    return elem.split("");
  });
}

function interpret(code) {
  var instructions = getInstructionsMatrix(code);
  var xPointer = 0;
  var yPointer = 0;
  var currentInstruction;
  var stack = [];
  var direction = ">";
  var output = "";

  var moveToNext = function () {
    if (direction === ">") {
      if (xPointer < instructions[yPointer].length - 1) {
        xPointer++;
      } else {
        yPointer++;
        xPointer = 0;
      }
    } else if (direction === "<") {
      if (xPointer > 0) {
        xPointer--;
      } else {
        yPointer++;
        xPointer = instructions[yPointer].length - 1;
      }
    } else if (direction === "v") {
      if (yPointer < instructions.length - 1) {
        yPointer++;
      } else {
        yPointer = 0;
        xPointer++;
      }
    } else if (direction === "^") {
      if (yPointer > 0) {
        yPointer--;
      } else {
        yPointer = instructions.length - 1;
        xPointer = xPointer++;
      }
    }
  };

  var processNumber = function (n) {
    return function () {
      stack.push(n);
      moveToNext();
    };
  };

  var processPlus = function () {
    var a = stack.pop();
    var b = stack.pop();
    stack.push(a + b);
    moveToNext();
  };

  var processMinus = function () {
    var a = stack.pop();
    var b = stack.pop();
    stack.push(b - a);
    moveToNext();
  };

  var processTimes = function () {
    var a = stack.pop();
    var b = stack.pop();
    stack.push(b * a);
    moveToNext();
  };

  var processDivision = function () {
    var a = stack.pop();
    var b = stack.pop();
    if (!a) {
      stack.push(0);
    } else {
      stack.push(Math.floor(b / a));
    }
    moveToNext();
  };

  var processModulo = function () {
    var a = stack.pop();
    var b = stack.pop();
    if (!a) {
      stack.push(0);
    } else {
      stack.push(b % a);
    }
    moveToNext();
  };

  var processNegation = function () {
    var a = stack.pop();
    if (!a) {
      stack.push(1);
    } else {
      stack.push(0);
    }
    moveToNext();
  };

  var processGreaterThan = function () {
    var a = stack.pop();
    var b = stack.pop();
    if (b > a) {
      stack.push(1);
    } else {
      stack.push(0);
    }
    moveToNext();
  };

  var processUnderscore = function () {
    var a = stack.pop();
    if (!a) {
      direction = ">";
    } else {
      direction = "<";
    }
    moveToNext();
  };

  var processPipe = function () {
    var a = stack.pop();
    if (!a) {
      direction = "v";
    } else {
      direction = "^";
    }
    moveToNext();
  };

  var processStringMode = function () {
    moveToNext();
    while (instructions[yPointer][xPointer] !== '"') {
      stack.push(instructions[yPointer][xPointer].charCodeAt(0));
      moveToNext();
    }
    moveToNext();
  };

  var processDuplicateValue = function () {
    if (!stack.length) {
      stack.push(0);
    } else {
      stack.push(stack[stack.length - 1]);
    }
    moveToNext();
  };

  var processSwap = function () {
    if (stack.length === 1) {
      stack.push(0);
    } else {
      var a = stack.pop();
      var b = stack.pop();
      stack.push(a);
      stack.push(b);
    }
    moveToNext();
  };

  var processDiscard = function () {
    stack.pop();
    moveToNext();
  };

  var processInteger = function () {
    var a = stack.pop();
    output += a;
    moveToNext();
  };

  var processAscii = function () {
    var a = stack.pop();
    output += String.fromCharCode(a);
    moveToNext();
  };

  var processSkip = function () {
    moveToNext();
    moveToNext();
  };

  var processPut = function () {
    var y = stack.pop();
    var x = stack.pop();
    var v = stack.pop();
    instructions[y][x] = String.fromCharCode(v);
    moveToNext();
  };

  var processGet = function () {
    var y = stack.pop();
    var x = stack.pop();
    stack.push(instructions[y][x].charCodeAt(0));
    moveToNext();
  };

  var processSpace = function () {
    moveToNext();
  };

  var changeDirection = function (d) {
    return function () {
      if (d === "?") {
        direction = [">", "<", "^", "v"][Math.floor(Math.random() * 4)];
      } else {
        direction = d;
      }

      moveToNext();
    };
  };

  var dispatcher = {
    "+": processPlus,
    "-": processMinus,
    "*": processTimes,
    "/": processDivision,
    "%": processModulo,
    "!": processNegation,
    "`": processGreaterThan,
    ">": changeDirection(">"),
    "<": changeDirection("<"),
    "^": changeDirection("^"),
    v: changeDirection("v"),
    "?": changeDirection("?"),
    _: processUnderscore,
    "|": processPipe,
    '"': processStringMode,
    ":": processDuplicateValue,
    "\\": processSwap,
    $: processDiscard,
    ".": processInteger,
    ",": processAscii,
    "#": processSkip,
    p: processPut,
    g: processGet,
    0: processNumber(0),
    1: processNumber(1),
    2: processNumber(2),
    3: processNumber(3),
    4: processNumber(4),
    5: processNumber(5),
    6: processNumber(6),
    7: processNumber(7),
    8: processNumber(8),
    9: processNumber(9),
    " ": processSpace,
  };

  while (instructions[yPointer][xPointer] !== "@") {
    currentInstruction = instructions[yPointer][xPointer];
    dispatcher[currentInstruction]();
  }

  return output;
}
