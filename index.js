// Theme button
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("toggle-button1").classList.add("active");
  let buttons = document.querySelectorAll(".tri-state-toggle-button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      changeTheme(this.id);
    });
  });
});

// Changing theme
function changeTheme(theme) {
  let body = document.body;
  if (theme === "toggle-button1") {
    body.className = "theme1"; 
  } else if (theme === "toggle-button2") {
    body.className = "theme2";
  } else if (theme === "toggle-button3") {
    body.className = "theme3";
  }
}

// Calculation
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.result h2');

let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', function() {
    if (!isNaN(button.id)) {
      expression += button.id;
      display.textContent = expression;
    }
    else if ('+-*/'.includes(button.id)) {
      
      if (!'+-*/'.includes(expression[expression.length - 1])) {
        expression += button.id;
        display.textContent = expression;
      }
    }
    else if (button.id === '=') {
      if (expression) {
        let result = evaluateExpression(expression);
        display.textContent = result;
        expression = result.toString();
      }
    }
    else if (button.id === 'reset') {
      expression = '';
      display.textContent = '0';
    }
    else if (button.id === 'del') {
      expression = expression.slice(0, -1);
      display.textContent = expression;
    }
  });
});


// BODMAS evaluation
function evaluateExpression(expression) {
  let operators = [];
  let operands = [];
  let numberBuffer = [];

  for (let char of expression) {
    if ('+-*/'.includes(char)) {
      operands.push(parseFloat(numberBuffer.join('')));
      numberBuffer = [];

      while (operators.length > 0 && precedence(char) <= precedence(operators[operators.length - 1])) {
        processOperation(operators, operands);
      }

      operators.push(char);
    } else {
      numberBuffer.push(char);
    }
  }

  operands.push(parseFloat(numberBuffer.join('')));

  while (operators.length > 0) {
    processOperation(operators, operands);
  }

  return operands.pop();
}

function processOperation(operators, operands) {
  let operator = operators.pop();
  let rightOperand = operands.pop();
  let leftOperand = operands.pop();

  switch (operator) {
    case '+':
      operands.push(leftOperand + rightOperand);
      break;
    case '-':
      operands.push(leftOperand - rightOperand);
      break;
    case '*':
      operands.push(leftOperand * rightOperand);
      break;
    case '/':
      operands.push(leftOperand / rightOperand);
      break;
  }
}

function precedence(operator) {
  switch (operator) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
    default:
      return 0;
  }
}
