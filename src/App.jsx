import "./App.css";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./components/Model";

function App() {
  const [isActive, setActive] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  return (
    <div className="app__wrapper">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Model setLoaded={setLoaded} isActive={isActive} />
          <OrbitControls />
        </Suspense>
      </Canvas>
      {isLoaded ? (
        <div className="app__button" onClick={() => setActive(!isActive)}>
          Open loot box
        </div>
      ) : null}
    </div>
  );
}

export default App;
