import { useState } from "react";
import "./App.css";

function App() {
  const keyboardKeys = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
    ["Control", "Meta", "Alt", "Space", "Alt", "Meta", "ContextMenu", "Control"]
  ];

  const [tappedKeys, setTappedKeys] = useState("");
  const [shift, setShift] = useState({shift:false,
    caps:false,
  });
  function handletap(key)
  {

      if(key=== 'Enter')
        {
          setTappedKeys(prev=>(prev + "\n"))
        }else
    if(key=== 'Space')
      {
        setTappedKeys(prev=>(prev + " "))
      }else
    if(key=== 'CapsLock')
      {
        if(shift.caps == true)
          {
            setShift(prev=>({...prev,caps:false}))
          }else
          {
            setShift(prev=>({...prev,caps:true}))
          }

      }else
    if(key=== 'Shift')
      {
        setShift(prev=>({...prev,shift:true}))
      }else
    if(key === 'Backspace')
      {
        setTappedKeys(prevKeys => prevKeys.slice(0, -1));
      }else
      {   
        if (shift.shift === true) {
          setTappedKeys(prevKeys => prevKeys + key.toUpperCase());
          setShift(prevShift => ({ ...prevShift, shift: false }))
          }else
          if(shift.caps == true)
            {
              setTappedKeys(prevKeys => prevKeys + key.toUpperCase());
            }else

          {
            setTappedKeys(prev=>prev+key)  
          }

      }

  }
  return (
    <>
    <textarea disabled type="text" value={tappedKeys}/>
    <div className="outerkey">
      {keyboardKeys.map((row, rowIndex) => (
        <div className="key-row" key={rowIndex}>
          {row.map((key, keyIndex) => (
            <div className="key" key={keyIndex} onClick={()=>handletap(key)}>
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>\
    </>
  );
}

export default App;
