import { useState, useCallback, useEffect, useRef, use } from "react";
import React from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 40);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="w-full max-w-md mx-auto shadow-lg rounded-2xl px-6 py-8 text-gray-100 bg-gray-800 border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-orange-400">
          Password Generator
        </h1>

        <div className="flex items-center overflow-hidden mb-6 rounded-lg shadow-inner border border-gray-600">
          <input
            className="outline-none w-full py-3 px-4 bg-gray-900 text-white text-lg tracking-wide"
            type="text"
            value={password}
            placeholder="Click generate to create password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-400 transition-all px-4 py-3 text-white font-semibold"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center justify-between">
            <label className="font-medium">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className="cursor-pointer accent-orange-400"
              onChange={(e) => setlength(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setnumberAllowed((prev) => !prev)}
              className="w-4 h-4 accent-orange-400"
            />
            <label className="font-medium">Numbers</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setcharAllowed((prev) => !prev)}
              className="w-4 h-4 accent-orange-400"
            />
            <label className="font-medium">Characters</label>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={passwordGenerator}
            className="bg-orange-500 hover:bg-orange-400 transition-all px-6 py-3 rounded-lg font-bold text-white text-lg shadow-md"
          >
            {" "}
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
