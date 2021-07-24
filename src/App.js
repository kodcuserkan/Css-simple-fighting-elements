import React, { useEffect } from "react";
import "./App.css";

const _ourStyle = {
  position: "absolute",
  left: "1rem",
  bottom: "1rem",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "left 0.2s ease"
};

const _enemyStyle = {
  position: "absolute",
  right: "1rem",
  bottom: "1rem",
  width: "100px",
  height: "100px",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "right 0.2s ease"
};

function App() {
  
  const [started, setStarted] = React.useState(0);
  const [activated, setActivate] = React.useState(false);

  const [styles, setStyles] = React.useState({
    our: _ourStyle,
    enemy: _enemyStyle,
  });

  useEffect(
    () => {
      const id = setInterval(() => {
        if (started >= 40) {
          clearInterval(this)
          setStarted(0)
          setStyles({
            our: _ourStyle,
            enemy: _enemyStyle,
          })
        }
        else {
          activated && setStarted((count) => count + 3);
          activated && setStyles({
            ...styles,
            our: {
              ...styles.our,
              left: `${started + 1}vw`,
              backgroundColor: `${started % 2 === 0 ? "blue" : "white"}`,
              color: `${started % 2 === 0 ? "white" : "black"}`
            },
            enemy: {
              ...styles.enemy,
              right: `${started + 1}vw`,
              backgroundColor: `${started % 2 === 0 ? "red" : "white"}`,
              color: `${started % 2 === 0 ? "white" : "black"}`
            },
          });

        }

      }, 400);
      return () => {
        clearInterval(id);
      };
    }
    
  );

  const handleClick = () => {
    setActivate(true)
  };
  
  return (
    <div className="App">
      <div className="game-area">
        <span className="our-team" style={styles.our}>
          { activated && started % 2 !== 0 && <span className="attack">ATTTACK!!</span>}
          <span className="name">Our team</span>
        </span>
        <span className="enemy" style={styles.enemy}>
          { activated && started % 2 !== 0 && <span className="attack">ATTTACK!!</span>}
          <span className="name">Enemy</span>
        </span>
      </div>
      <div className="button-area">
        <button
          className="btn-start"
          onClick={handleClick}
          disabled={started !== 0}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default App;
