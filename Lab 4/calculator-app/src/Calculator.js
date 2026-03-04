import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [display, setDisplay] = useState("");
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState(null);
  const [shouldReset, setShouldReset] = useState(false);
  const [lastOperator, setLastOperator] = useState(null);
  const [lastOperand, setLastOperand] = useState(null);

  const performCalculation = (num1, op, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (op) {
      case "+": return num1 + num2;
      case "-": return num1 - num2;
      case "*": return num1 * num2;
      case "/": return num2 === 0 ? "Error" : num1 / num2;
      default: return num2;
    }
  };

  const handleNumber = (num) => {
    if (shouldReset || display === "Error") {
      setDisplay(num);
      setShouldReset(false);
    } else {
      setDisplay(display + num);
    }
    if (!operator) setFirstNumber(display + num);
    else setSecondNumber(display + num);
  };

  const handleDecimal = () => {
    if (!display.includes(".") && !shouldReset && display !== "Error") {
      setDisplay(display + ".");
    } else if (shouldReset) {
      setDisplay("0.");
      setShouldReset(false);
    }
  };

  const handleOperator = (op) => {
    if (firstNumber && operator && display && !shouldReset) {
      const result = performCalculation(firstNumber, operator, display);
      setDisplay(result.toString());
      setFirstNumber(result.toString());
      setSecondNumber("");
    } else if (firstNumber && !shouldReset) {
      setFirstNumber(display);
    }
    setOperator(op);
    setLastOperator(op);
    setShouldReset(true);
  };

  const handleEquals = () => {
    if (firstNumber && operator && display) {
      const result = performCalculation(firstNumber, operator, display);
      setDisplay(result.toString());
      setLastOperand(display);
      setFirstNumber(result.toString());
      setSecondNumber("");
      setOperator(null);
      setShouldReset(true);
    } else if (firstNumber && lastOperator && lastOperand && shouldReset) {
      const result = performCalculation(firstNumber, lastOperator, lastOperand);
      setDisplay(result.toString());
      setFirstNumber(result.toString());
      setShouldReset(true);
    }
  };

  const handleClear = () => {
    setDisplay("");
    setFirstNumber("");
    setSecondNumber("");
    setOperator(null);
    setLastOperator(null);
    setLastOperand(null);
    setShouldReset(false);
  };

  return (
    <div className="calculator" role="main" aria-label="Calculator">
      <input
        type="text"
        className="output"
        value={display}
        readOnly
        aria-live="polite"
      />

      <button className="clear" onClick={handleClear} aria-label="Clear">C</button>

      <button className="number" onClick={() => handleNumber("7")}>7</button>
      <button className="number" onClick={() => handleNumber("8")}>8</button>
      <button className="number" onClick={() => handleNumber("9")}>9</button>
      <button
        className={`operator ${operator === "/" ? "active" : ""}`}
        onClick={() => handleOperator("/")}
        aria-label="Divide"
      >
        ÷
      </button>

      <button className="number" onClick={() => handleNumber("4")}>4</button>
      <button className="number" onClick={() => handleNumber("5")}>5</button>
      <button className="number" onClick={() => handleNumber("6")}>6</button>
      <button
        className={`operator ${operator === "*" ? "active" : ""}`}
        onClick={() => handleOperator("*")}
        aria-label="Multiply"
      >
        ×
      </button>

      <button className="number" onClick={() => handleNumber("1")}>1</button>
      <button className="number" onClick={() => handleNumber("2")}>2</button>
      <button className="number" onClick={() => handleNumber("3")}>3</button>
      <button
        className={`operator ${operator === "-" ? "active" : ""}`}
        onClick={() => handleOperator("-")}
        aria-label="Subtract"
      >
        −
      </button>

      <button className="decimal" onClick={handleDecimal} aria-label="Decimal point">.</button>
      <button className="number" onClick={() => handleNumber("0")}>0</button>
      <button
        className={`operator ${operator === "+" ? "active" : ""}`}
        onClick={() => handleOperator("+")}
        aria-label="Add"
      >
        +
      </button>
      <button className="equals" onClick={handleEquals} aria-label="Equals">=</button>
    </div>
  );
}

export default Calculator;