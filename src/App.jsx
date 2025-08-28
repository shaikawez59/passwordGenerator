import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(12);
  const passRef = useRef();

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%&*()_+{}|~`<>?,";
    
    for (let index = 0; index < length; index++) {
      const random = Math.floor(Math.random() * str.length);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          🔐 Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={password}
            readOnly
            id="password"
            ref={passRef}
            className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100 text-gray-700 font-mono"
          />
          <button
            onClick={copyPassword}
            className="px-4 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600 active:scale-95 transition"
          >
            Copy
          </button>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          {/* Length */}
          <div>
            <label htmlFor="length" className="block text-gray-700 font-medium">
              Length: <span className="font-bold">{length}</span>
            </label>
            <input
              type="range"
              id="length"
              min={8}
              max={30}
              value={length}
              onChange={(evt) => setLength(Number(evt.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Include Numbers */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="numAllowed"
              checked={numAllowed}
              onChange={(evt) => setNumAllowed(evt.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="numAllowed" className="text-gray-700">
              Include Numbers
            </label>
          </div>

          {/* Include Special Characters */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="charAllowed"
              checked={charAllowed}
              onChange={(evt) => setCharAllowed(evt.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="charAllowed" className="text-gray-700">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
