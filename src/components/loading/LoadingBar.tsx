import { useContext } from "react";
import { AppContext } from "../../App";

import "./LoadingBar.css";

export default function LoadingBar() {
  const context = useContext(AppContext);

  if (!context.data.isLoading) {
    return null;
  }

  return <div className="loading-bar"></div>;
}
