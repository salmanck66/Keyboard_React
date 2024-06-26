import { useState } from "react";
import "./App.css";

function App() {
  const keyboardKeys = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    [" Tab  ", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter "],
    ["Shift ", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift "],
    [" Ctrl ", "Win", "Alt", "Space", "Alt", "Win", " Ctrl "]
  ];

  const [tappedKeys, setTappedKeys] = useState("");
  const [shift, setShift] = useState({ shift: false, caps: false });

  function handleTap(key) {
    const keyElement = document.querySelector(`[data-key="${key}"]`);
    keyElement.classList.add("clicked");
    setTimeout(() => {
      keyElement.classList.remove("clicked");
    }, 100);

    if (key.trim() === "Ctrl" || key.trim() === "Win" || key.trim() === "Alt") {
      return;
    } else if (key.trim() === "Tab") {
      setTappedKeys(prev => (prev + "     "));
    } else if (key.trim() === "Enter") {
      setTappedKeys(prev => (prev + "\n"));
    } else if (key === "Space") {
      setTappedKeys(prev => (prev + " "));
    } else if (key === "CapsLock") {
      setShift(prev => ({ ...prev, caps: !prev.caps }));
    } else if (key.trim() === "Shift") {
      setShift(prev => ({ ...prev, shift: true }));
    } else if (key === "Backspace") {
      setTappedKeys(prevKeys => prevKeys.slice(0, -1));
    } else {
      if (shift.shift === true || shift.caps === true) {
        setTappedKeys(prevKeys => prevKeys + key.toUpperCase());
      } else {
        setTappedKeys(prev => prev + key);
      }
      if (shift.shift === true) {
        setShift(prevShift => ({ ...prevShift, shift: false }));
      }
    }
  }

  return (
    <>

      <textarea disabled type="text" value={tappedKeys} />
      <div className="outerkey">
        {keyboardKeys.map((row, rowIndex) => (
          <div className="key-row" key={rowIndex}>
            {row.map((key, keyIndex) => (
              <div
                className={`key ${key === "CapsLock" && shift.caps ? "active-key" : ""} ${key === "Shift" && shift.shift ? "active-key" : ""}`}
                key={keyIndex}
                onClick={() => handleTap(key)}
                data-size={key.length > 5 ? 3 : 1}
                data-key={key}
              >
                {key === "CapsLock" || key === "Shift" ? key : (shift.shift || shift.caps) ? key.toUpperCase() : key.toLowerCase()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
