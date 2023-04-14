import "../../styles/Dashboard.css";
import React, { useEffect, useState } from "react";
import JaggedLine from "./JaggedLine";

import Card from "./Card";
const DashboardContainer = () => {
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    setCardsVisible(true);
  }, []);

  return (
    <div className="dashboard-body">
      <div className="dashboard-mountain-container">
        <JaggedLine />
        {["html", "css", "javascript", "node", "mongo", "react"].map(
          (type, index) => {
            return (
              <Card
                key={index}
                index={index}
                type={type}
                visible={cardsVisible}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;
