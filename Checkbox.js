import Cookies from "js-cookie";
import { useState } from "react";
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain
} from "react-spring";

function Checkbox() {
  const axios = require("axios")
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#22416F" : "#fff",
    borderColor: isChecked ? "#22416f" : "#ddd",
    config: config.gentle,
    ref: checkboxAnimationRef
  });
  const checkboxAnimationStyle2 = useSpring({
    backgroundColor: isChecked2 ? "#22416F" : "#fff",
    borderColor: isChecked2 ? "#22416f" : "#ddd",
    config: config.gentle,
    ref: checkboxAnimationRef
  });
  const checkboxAnimationStyle3 = useSpring({
    backgroundColor: isChecked3 ? "#22416F" : "#fff",
    borderColor: isChecked3 ? "#22416f" : "#ddd",
    config: config.gentle,
    ref: checkboxAnimationRef
  });

  const [checkmarkLength, setCheckmarkLength] = useState(null);
  const [checkmarkLength2, setCheckmarkLength2] = useState(null);
  const [checkmarkLength3, setCheckmarkLength3] = useState(null);
  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationRef2 = useSpringRef();
  const checkmarkAnimationRef3 = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef
  });
  const checkmarkAnimationStyle2 = useSpring({
    x: isChecked2 ? 0 : checkmarkLength2,
    config: config.gentle,
    ref: checkmarkAnimationRef
  });
  const checkmarkAnimationStyle3 = useSpring({
    x: isChecked3 ? 0 : checkmarkLength3,
    config: config.gentle,
    ref: checkmarkAnimationRef
  });

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );

  useChain(
    isChecked2
      ? [checkboxAnimationRef, checkmarkAnimationRef2]
      : [checkmarkAnimationRef2, checkboxAnimationRef],
    [0, 0.1]
  );

  useChain(
    isChecked3
      ? [checkboxAnimationRef, checkmarkAnimationRef3]
      : [checkmarkAnimationRef3, checkboxAnimationRef],
    [0, 0.1]
  );
  const requestChange = async () => {
    const user_id = Cookies.get('user_id')
    var data = JSON.stringify({
      "morning": isChecked,
      "afternoon": isChecked2,
      "evening": isChecked3,
      "user_id": user_id
    });

    var config = {
      method: 'put',
      url: 'http://localhost:5000/available',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const changeAvailable = async (boxNumber) => {
    if (boxNumber == 1) {
      setIsChecked(!isChecked)
      requestChange()
    } else if (boxNumber == 2) {
      setIsChecked2(!isChecked2)
      requestChange()
    } else if (boxNumber == 3) {
      setIsChecked3(!isChecked3)
      requestChange()
    }

  }

  return (
    <>
      <div className="checkboxContainer">
        <label>
          <input
            type="checkbox"
            onChange={() => changeAvailable(1)}
          />
          <animated.svg
            style={checkboxAnimationStyle}
            className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
            // This element is purely decorative so
            // we hide it for screen readers
            aria-hidden="true"
            viewBox="0 0 15 11"
            fill="none"
          >
            <animated.path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke="#fff"
              ref={(ref) => {
                if (ref) {
                  setCheckmarkLength(ref.getTotalLength());
                }
              }}
              strokeDasharray={checkmarkLength}
              strokeDashoffset={checkmarkAnimationStyle.x}
            />
          </animated.svg>
          Ochtend
        </label>

        <label>
          <input
            type="checkbox"
            onChange={() => changeAvailable(2)}
          />
          <animated.svg
            style={checkboxAnimationStyle2}
            className={`checkbox ${isChecked2 ? "checkbox--active" : ""}`}
            // This element is purely decorative so
            // we hide it for screen readers
            aria-hidden="true"
            viewBox="0 0 15 11"
            fill="none"
          >
            <animated.path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke="#fff"
              ref={(ref) => {
                if (ref) {
                  setCheckmarkLength2(ref.getTotalLength());
                }
              }}
              strokeDasharray={checkmarkLength2}
              strokeDashoffset={checkmarkAnimationStyle2.x}
            />
          </animated.svg>
          Middag
        </label>

        <label>
          <input
            type="checkbox"
            onChange={() => changeAvailable(3)}
          />
          <animated.svg
            style={checkboxAnimationStyle3}
            className={`checkbox ${isChecked3 ? "checkbox--active" : ""}`}
            // This element is purely decorative so
            // we hide it for screen readers
            aria-hidden="true"
            viewBox="0 0 15 11"
            fill="none"
          >
            <animated.path
              d="M1 4.5L5 9L14 1"
              strokeWidth="2"
              stroke="#fff"
              ref={(ref) => {
                if (ref) {
                  setCheckmarkLength3(ref.getTotalLength());
                }
              }}
              strokeDasharray={checkmarkLength3}
              strokeDashoffset={checkmarkAnimationStyle3.x}
            />
          </animated.svg>
          Avond
        </label>
      </div>
    </>
  );
}

export default Checkbox;