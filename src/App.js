import "./App.css";
import "rc-slider/assets/index.css";
import React, { useState } from "react";
import Slider from "rc-slider";

function App() {
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [heightErr, setHeightErr] = useState("");
  let [weightErr, setWeightErr] = useState("");
  let [bmiValue, setBmiValue] = useState("");
  let [bmiText, setBmiText] = useState("");
  let [chonkVisibility, setChonkVisibility] = useState("InvisibleChonk");
  let [resultChonk, setResultChonk] = useState("VisibleChonk");
  let [text, setText] = useState("");

  let AllChonkImg = {
    slimChonk: [
      "./images/slim/1.jpg",
      "./images/slim/2.jpg",
      "./images/slim/3.jpg",
      "./images/slim/4.jpg",
    ],
    normalChonk: [
      "./images/normal/1.jpg",
      "./images/normal/2.jpg",
      "./images/normal/3.jpg",
      "./images/normal/4.jpg",
      "./images/normal/5.jpg",
    ],
    overweightChonk: [
      "./images/fat/1.jpg",
      "./images/fat/2.jpg",
      "./images/fat/3.jpg",
      "./images/fat/4.jpg",
    ],
    obeseChonk: [
      "./images/2fat/1.jpg",
      "./images/2fat/2.jpg",
      "./images/2fat/3.jpg",
      "./images/2fat/4.jpg",
      "./images/2fat/5.jpg",
      "./images/2fat/6.jpg",
    ],
  };

  const minHeight = 95;
  const maxHeight = 220;
  const minWeight = 10;
  const maxWeight = 300;
  const slimBmi = 18.5;
  const normalBmi = 24.9;
  const fatBmi = 29.9;

  const handleChangeHeight = ({ target }) => {
    setHeight(target.value);
  };

  const handleChangeWeight = ({ target }) => {
    setWeight(target.value);
  };

  const handleChangeHeightSlider = (value) => {
    setHeight(value);
  };

  const handleChangeWeightSlider = (value) => {
    setWeight(value);
  };

  const handleKeyPress = (source, event) => {
    let allowedChars = ".0123456789";
    let currentChar = event.key;
    let found = allowedChars.includes(currentChar);

    if (!found) {
      event.preventDefault();
      return;
    }

    let currentValue = "";
    if (source === "height") {
      currentValue = parseInt(height + currentChar);
      if (currentValue > maxHeight) event.preventDefault();
      else {
        currentValue = parseInt(weight + currentChar);
        if (currentValue > maxWeight) event.preventDefault();
      }
    }
    if (currentValue === 0) event.preventDefault();
  };

  const classifyResults = (result) => {
    if (result < slimBmi) return "slim";
    if (result < normalBmi) return "healthy";
    if (result < fatBmi) return "overweight";
    else return "obese";
  };

  const validate = () => {
    setHeightErr("");
    setWeightErr("");
    let heightErrStr = "";
    let weightErrStr = "";

    if (!height) heightErrStr = "Please Enter Your Height";
    else if (height < minHeight) heightErrStr = "Enter a height greater than 95cm";
    else if (height > maxHeight) heightErrStr = "Enter a height less than 220cm";

    if (!weight) weightErrStr = "Please Enter Your Weight";
    else if (weight < minWeight) weightErrStr = "Enter a weight greater than 10kg";
    else if (weight > maxWeight) weightErrStr = "Enter a weight less than 300kg";

    if (heightErrStr || weightErrStr) {
      setHeightErr(heightErrStr);
      setWeightErr(weightErrStr);
      return false;
    }

    return true;
  };

  const calcBmi = (event) => {
    if (!validate()) return;
    let bmi = ((weight / height / height) * 10000).toFixed(1);
    let chonks = null;
    let resultString = "";
    switch (classifyResults(bmi)) {
      case "slim": {
        chonks = AllChonkImg.slimChonk;
        resultString = "You are on the slim side!";
        break;
      }
      case "healthy": {
        chonks = AllChonkImg.normalChonk;
        resultString = "You are in the healthy range! ♥";
        break;
      }
      case "overweight": {
        chonks = AllChonkImg.overweightChonk;
        resultString = "You are on the overweight side.";
        break;
      }
      case "obese": {
        chonks = AllChonkImg.obeseChonk;
        resultString = "You are in the obese range.";
        break;
      }
      default: {}
    }

    let randChonk = chonks[Math.floor(Math.random() * chonks.length)];
    if (resultChonk === randChonk) {
      calcBmi(event);
      return;
    }

    setResultChonk(randChonk);
    setChonkVisibility("VisibleChonk");
    setBmiText(resultString);
    setBmiValue(bmi);
    setText("InvisibleChonk");
  };

  const clear = (event) => {
    event.preventDefault();
    setHeight("");
    setWeight("");
    setBmiValue("");
    setHeightErr("");
    setWeightErr("");
    setText("VisibleChonk");
    setChonkVisibility("InvisibleChonk");
  };

  return (
    <div id="container">
      <div id="title">
        <h1>Calculate your BMI</h1>
      </div>
      <form>
        <div className="unit">
          <p>Height (95cm - 220cm)</p>
        </div>
        <input
          type="number"
          name="height"
          step="1"
          placeholder="cm"
          min={minHeight}
          max={maxHeight}
          value={height}
          onChange={handleChangeHeight}
          onKeyPress={handleKeyPress.bind(this, "height")}
        />
        <div className="error">{heightErr}</div>
        <div>
          <Slider
            min={minHeight}
            max={maxHeight}
            step={1}
            value={Number(height)}
            onChange={handleChangeHeightSlider}
          />
        </div>

        <div className="unit">
          <p>Weight (10kg - 300kg)</p>
        </div>
        <input
          type="number"
          name="weight"
          step="0.5"
          placeholder="kg"
          min={minWeight}
          max={maxWeight}
          value={weight}
          onChange={handleChangeWeight}
          onKeyPress={handleKeyPress.bind(this, "weight")}
        />
        <div className="error">{weightErr}</div>
        <div>
          <Slider
            min={minWeight}
            max={maxWeight}
            step={0.5}
            value={Number(weight)}
            onChange={handleChangeWeightSlider}
          />
        </div>

        <div id="buttons-container">
          <button
            className="button"
            onClick={(event) => {
              event.preventDefault();
              calcBmi();
            }}
          >
            Calculate
          </button>
          <br />
          <button className="button" onClick={clear}>
            Clear
          </button>
        </div>
      </form>

      <div className={chonkVisibility}>
        <div id="image">
          <img src={resultChonk} alt="kitty cat" />
        </div>
        <div id="result-top-text">
          <p>Your BMI: {bmiValue}</p>
        </div>
        <div id="bmi-text">{bmiText}</div>
      </div>

      <div className={text}>
        <hr />
        <div id="text">
          Body Mass Index, abbreviated BMI, is a key index for relating weight
          to height. BMI is a person's weight in kilograms (kg) divided by his
          or her height in meters squared. The National Institutes of Health
          (NIH) now defines normal weight, overweight, and obesity according to
          BMI rather than the traditional height/weight charts.
          <ul>
            <li>Overweight is a BMI of 25-29.9</li>
            <li>Obesity is a BMI of 30 or more</li>
          </ul>
          A very muscular person might have a high BMI without health risks.
        </div>
      </div>
    </div>
  );
}

export default App;
