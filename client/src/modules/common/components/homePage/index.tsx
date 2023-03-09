import React from "react";
import DesktopTodos from "./desktop";
import MobileTodos from "./mobile";
import TabletTodos from "./tablet";

const HomePageContainer = () => {
  const isDesktopScreen = window.innerWidth >= 1200;
  const isTabletScreen = window.innerWidth > 768 && window.innerWidth < 1200;
  const isMobileScreen = window.innerWidth <= 768;

  return (
    <div className="homepage">
      {isDesktopScreen && (
        <div>
          <DesktopTodos />
        </div>
      )}
      {isTabletScreen && (
        <div>
          <TabletTodos />
        </div>
      )}
      {isMobileScreen && (
        <div>
          <MobileTodos />
        </div>
      )}
    </div>
  );
};

export default HomePageContainer;
