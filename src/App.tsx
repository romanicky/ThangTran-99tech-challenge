import React, { useState } from "react";
import "./App.css";
import price from "./prices.json";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";

interface Currency {
  label: string;
  date: string;
  value: number;
}

const Option: React.FC<OptionProps<Currency>> = (props) => (
  <components.Option {...props} className="currency-option">
    <img
      src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${props.data.label}.svg`}
      alt="logo"
      className="currency-logo"
    />
    {props.data.label}
  </components.Option>
);

const App: React.FC = () => {
  const [selectedCurrencySend, setSelectedCurrencySend] =
    useState<Currency | null>(null);
  const [selectedCurrencyReceive, setSelectedCurrencyReceive] =
    useState<Currency | null>(null);
  const [inputAmount, setInputAmount] = useState<number | string>("");
  const [outputAmount, setOutputAmount] = useState<number | string>("");

  const SingleValue: React.FC<SingleValueProps<Currency>> = ({
    children,
    ...props
  }) => (
    <components.SingleValue {...props}>
      <img
        src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${props.data.label}.svg`}
        alt="s-logo"
        className="selected-logo"
      />
      {children}
    </components.SingleValue>
  );

  const handleConfirmSwap = () => {
    if (selectedCurrencySend && selectedCurrencyReceive && inputAmount) {
      const sendValue = selectedCurrencySend.value;
      const receiveValue = selectedCurrencyReceive.value;
      const inputValue = parseFloat(inputAmount.toString());

      if (inputValue < 0) {
        alert("Please enter a positive number");
        return;
      }

      const calculatedOutput = (
        inputValue *
        (receiveValue / sendValue)
      ).toFixed(2);
      setOutputAmount(calculatedOutput);
    }
  };

  return (
    <div className="App">
      <form>
        <h5>Fancy Form</h5>

        <div className="form-row">
          <label htmlFor="input-amount">Amount to send</label>

          <div className="form-column">
            <Select
              id="select-send"
              value={selectedCurrencySend}
              options={price}
              onChange={(value) => setSelectedCurrencySend(value as Currency)}
              components={{ Option, SingleValue }}
              className="select-box"
            />
          </div>

          <div className="form-column">
            <input
              id="input-amount"
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="output-amount">Amount to receive</label>

          <div className="form-column">
            <Select
              id="select-receive"
              value={selectedCurrencyReceive}
              options={price}
              onChange={(value) =>
                setSelectedCurrencyReceive(value as Currency)
              }
              components={{ Option, SingleValue }}
              className="select-box"
            />
          </div>

          <div className="form-column">
            <input
              id="output-amount"
              type="number"
              value={outputAmount}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="form-row">
          <button type="button" onClick={handleConfirmSwap}>
            CONFIRM SWAP
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
