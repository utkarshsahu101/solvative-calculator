import { useContext } from "react";
import { HamburgerContext } from "../App";

const History = () => {
  const { changeHamberburgerState } = useContext(HamburgerContext);

  return (
    <div className="history-body">
      <span>
        {/* <button className="menu-button" onClick={changeHamberburgerState}>
          x
        </button> */}
        <span className="heading-type">History</span>
      </span>
    </div>
  );
};

export default History;
