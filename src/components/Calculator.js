import { useContext, useEffect, useState } from "react";
import { HamburgerContext } from "../App";

const signArray = ["+", "-", "x", "÷"];

const buttons = [
  "CE",
  "C",
  "⌫",
  "÷",
  7,
  8,
  9,
  "x",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "+",
  "",
  0,
  ".",
  "=",
];

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];

const Calculator = () => {
  const { changeHamberburgerState } = useContext(HamburgerContext);

  const [query, setQuery] = useState(0);
  const [result, setResult] = useState(0);
  const [finalResultFlag, setFinalResultFlag] = useState(true);
  const [signClickedFlag, setSignClickedFlag] = useState({
    active: false,
    sign: "",
  });
  let tempValue = ''

  const handleButtonClick = (value) => {
    if (value === "C" || value === "CE") {
      setQuery("0");
    } else {
      setQuery((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const resetClickHandler = () => {
    setQuery(0);
  };

  const numClickHandler = (e) => {
    const value = e.target.innerHTML;
    setQuery((prev) => (prev === 0 ? value : prev + value));
    setSignClickedFlag({
      ...signClickedFlag,
      active: false,
    });
  };

  const signClickHandler = (e) => {
    const value = e.target.innerHTML;
    setQuery((prev) => (prev === 0 ? value : prev + value));
    setSignClickedFlag({
      active: true,
      sign: value,
    });
  };
  const calculateExpression = () => {
    try {
      const tokens = tokenize(query);
      const calculatedResult = evaluate(tokens);
      setResult(calculatedResult);
    } catch (error) {
      setResult('Error: Invalid expression');
    }
  };

  // Tokenize the expression
  const tokenize = (expr) => {
    return expr.match(/(\d+|\+|x)/g) || [];
  };

  // Evaluate the expression
  const evaluate = (tokens) => {
    let result = 0;
    let currentMultiplication = 1;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === '+') {
        result += currentMultiplication;
        currentMultiplication = 1;
      } else if (tokens[i] === 'x') {
        // Do nothing, just skip the 'x'
      } else {
        // It's a number
        const num = parseInt(tokens[i], 10);
        currentMultiplication *= num;
      }
    }

    // Add the last multiplication result
    result += currentMultiplication;

    return result;
  };

  const equalsClickHandler = (e) => {
    const res = calculateExpression(query);
  };

  useEffect(() => {
    console.log("lastValue", result);
  }, [result]);

  useEffect(() => {
    console.log("signClickedFlag", signClickedFlag, query);
    if (!signClickedFlag.active) {
      //   setResult(Number(query));
    } else {
      //   console.log(query, "testing");
    }
  }, [signClickedFlag]);

  function performOperation(arr, operation) {
    if (arr.length !== 2) {
      throw new Error("Array must contain exactly two elements.");
    }
    let a = +arr[0]
    let b = +arr[1]
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "x":
        return a * b;
      case "÷":
        return a / b;
      default:
        throw new Error(
          "Invalid operation. Use 'add', 'subtract', 'multiply', or 'divide'."
        );
    }
  }

  useEffect(() => {
    const lastValue = query[query.length - 1];
    const secondLastValue = query[query.length - 2];
    if (signArray.includes(lastValue) && signArray.includes(secondLastValue)) {
      let updatedQuery = query.slice(0, -2) + lastValue;
      setQuery(updatedQuery);
    }
    // if (!signClickedFlag.active && signClickedFlag.sign !== "") {
    //   let operator = signClickedFlag.sign;
    //   let twoOperands = query
    //     .split(operator)
    //     .filter(
    //       (num, index, arr) =>
    //         [arr.length - 1, arr.length - 2].includes(index) && num
    //     );
    //   const ans = performOperation(twoOperands, operator);
    //   console.log("ans", query, operator, twoOperands, ans);
    //   setResult(ans);
    // }
  }, [query]);

  return (
    <div className="calculator-body">
      {console.log("result", result, result != 0)}
      <span>
        <button className="menu-button" onClick={changeHamberburgerState}>
          ≡
        </button>
        <span className="heading-type">Standard</span>
      </span>
      <div className="display-area">
        <div className="query">{query}</div>{" "}
        {result > 0 && <div className="result">{result}</div>}
      </div>
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={
              btn === "C"
                ? resetClickHandler
                : btn === "="
                ? equalsClickHandler
                : btn === "÷" || btn === "x" || btn === "-" || btn === "+"
                ? signClickHandler
                : numClickHandler
            }
            className={numbers.includes(btn) ? "number" : "sign"}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
