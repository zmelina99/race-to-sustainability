import React, { useState, useEffect } from "react";
import "./App.css";
import car from "./car.png";
import battery from "./battery.png";
import chargingStation from "./chargingStation.png";
import windmill from "./windmill.png";
const Game = () => {
  const [carPosition, setCarPosition] = useState({ x: 0, y: 0 });
  const [roadLines, setRoadLines] = useState([]);
  const [collision, setCollision] = useState({
    type: "",
    position: { x: 0, y: 0 },
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && carPosition.x > 0) {
        setCarPosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x - 10, // Adjust the movement speed as needed
        }));
      }
      if (
        e.key === "ArrowRight" &&
        carPosition.x < window.innerWidth - 200 &&
        carPosition.x < 120
      ) {
        setCarPosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x + 10, // Adjust the movement speed as needed
        }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [carPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoadLines((prevLines) => {
        if (prevLines.length === 0 || prevLines[prevLines.length - 1].y > 0) {
          const newLine = { id: Date.now(), y: -100 };
          return [...prevLines, newLine];
        } else {
          return prevLines.map((line) => ({ ...line, y: line.y + 10 }));
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      const collisions = [battery, chargingStation, windmill];

      const randomNumber = getRandomNumber(0, 120);
      if (true)
        setCollision({
          ...collision,
          type: collisions[getRandomNumber(0, collisions.length - 1)],
          position: { x: randomNumber, y: 1 },
        });
      // else setCollision({ ...collision, type: "", position: { x: 0, y: 0 } });
    }, 5000);

    return () => clearInterval(interval);
  }, [collision.type]);
  console.log(collision);

  return (
    <div className="carGame">
      <div className="score"></div>
      <div className="gameArea">
        {roadLines.map((line) => (
          <div
            key={line.id}
            className="roadLines"
            style={{ top: line.y }}
          ></div>
        ))}
        <img
          src={collision.type}
          className="collision"
          height={"100px"}
          style={{ left: collision.position.x }}
        />
        <img
          src={car}
          alt="car"
          height={"200px"}
          className="car"
          style={{ left: carPosition.x }}
        />
      </div>
    </div>
  );
};
export default Game;
