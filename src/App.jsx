import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";

    if (numberAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*()";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0, 5); //Optional(useCase- When the selection range is selected from 0 to 5)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passGenerator();
  }, [length, numberAllowed, charAllowed, passGenerator]);

  return (
    <>
      <div className=" justify-center w-screen h-screen shadow-lg rounded-lg px-6 py-10 text-red-500 bg-gray-700">
        <h1 className="text-4xl text-center text-white font-semibold mb-6">
          Password Generator
        </h1>

        <div className="flex shadow-md rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-4 bg-gray-800 text-white outline-none"
            placeholder="Generated Password"
            readOnly
            ref={passRef}
          />
          <button
            className="bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 transition-colors duration-300"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="range" className="text-white">
              Length: {length}
            </label>
            <input
              type="range"
              id="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-4 mb-4">
          <div className="flex items-center gap-x-2 text-white">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>

          <div className="flex items-center gap-x-2 text-white">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label htmlFor="charInput">Include Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
