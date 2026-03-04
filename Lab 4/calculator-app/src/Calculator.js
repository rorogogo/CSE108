// Calculator.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Calculator.css";

export default function Calculator() {
  // State variables
  const [display, setDisplay] = useState("");
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState(null);
  const [shouldReset, setShouldReset] = useState(false);
  const [lastOperator, setLastOperator] = useState(null);
  const [lastOperand, setLastOperand] = useState(null);

  // Perform calculation helper
  function performCalculation(num1, op, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result;

    switch (op) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num2 === 0 ? "Error" : num1 / num2;
        break;
      default:
        return num2;
    }
    return result.toString();
  }

  // Handle number button click
  function handleNumber(number) {
    if (shouldReset) {
      setDisplay(number);
      setShouldReset(false);
    } else {
      // Prevent leading zeros like 00
      if (display === "0") {
        setDisplay(number);
      } else {
        setDisplay(display + number);
      }
    }

    if (!operator) {
      setFirstNumber(display + number);
    } else {
      setSecondNumber(display + number);
    }
  }

  // Handle decimal button click
  function handleDecimal() {
    if (shouldReset) {
      setDisplay("0.");
      setShouldReset(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  // Handle operator button click
  function handleOperator(op) {
    // If there's already an operator and second number, calculate first
    if (operator && secondNumber) {
      const result = performCalculation(firstNumber, operator, display);
      setDisplay(result);
      setFirstNumber(result);
      setSecondNumber("");
    } else {
      setFirstNumber(display);
    }
    setOperator(op);
    setLastOperator(op);
    setShouldReset(true);
  }

  // Handle equals button click
  function handleEquals() {
    if (operator && !shouldReset) {
      const result = performCalculation(firstNumber, operator, display);
      setDisplay(result);
      setFirstNumber(result);
      setLastOperand(display);
      setOperator(null);
      setShouldReset(true);
    } else if (lastOperator && lastOperand) {
      const result = performCalculation(display, lastOperator, lastOperand);
      setDisplay(result);
      setFirstNumber(result);
      setShouldReset(true);
    }
  }

  // Handle clear button click
  function handleClear() {
    setDisplay("");
    setFirstNumber("");
    setSecondNumber("");
    setOperator(null);
    setLastOperator(null);
    setLastOperand(null);
    setShouldReset(false);
  }

  return (
    <div className="calculator">
      <TextField
        className="output"
        value={display}
        InputProps={{
          readOnly: true,
          style: {
            color: "#fff",
            backgroundColor: "#222",
            fontSize: 24,
            textAlign: "right",
          },
        }}
        variant="outlined"
        fullWidth
        margin="dense"
        aria-label="Calculator output"
      />

      <Button
        variant="contained"
        color="error"
        onClick={handleClear}
        className="clear"
        aria-label="Clear"
      >
        C
      </Button>

      {/* Number buttons */}
      {["7", "8", "9"].map((num) => (
        <Button
          key={num}
          variant="contained"
          onClick={() => handleNumber(num)}
          className="number"
          aria-label={`Number ${num}`}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="contained"
        onClick={() => handleOperator("/")}
        className={`operator ${operator === "/" ? "active" : ""}`}
        aria-label="Divide"
      >
        ÷
      </Button>

      {["4", "5", "6"].map((num) => (
        <Button
          key={num}
          variant="contained"
          onClick={() => handleNumber(num)}
          className="number"
          aria-label={`Number ${num}`}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="contained"
        onClick={() => handleOperator("*")}
        className={`operator ${operator === "*" ? "active" : ""}`}
        aria-label="Multiply"
      >
        ×
      </Button>

      {["1", "2", "3"].map((num) => (
        <Button
          key={num}
          variant="contained"
          onClick={() => handleNumber(num)}
          className="number"
          aria-label={`Number ${num}`}
        >
          {num}
        </Button>
      ))}
      <Button
        variant="contained"
        onClick={() => handleOperator("-")}
        className={`operator ${operator === "-" ? "active" : ""}`}
        aria-label="Subtract"
      >
        −
      </Button>

      <Button
        variant="contained"
        onClick={handleDecimal}
        className="decimal"
        aria-label="Decimal point"
      >
        .
      </Button>
      <Button
        variant="contained"
        onClick={() => handleNumber("0")}
        className="number"
        aria-label="Number 0"
      >
        0
      </Button>
      <Button
        variant="contained"
        onClick={() => handleOperator("+")}
        className={`operator ${operator === "+" ? "active" : ""}`}
        aria-label="Add"
      >
        +
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={handleEquals}
        className="equals"
        aria-label="Equals"
      >
        =
      </Button>
    </div>
  );
}