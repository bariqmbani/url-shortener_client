import { createContext, useState } from "react";

import ShortenForm from "./components/ShortenForm";
import ShortenResult from "./components/ShortenResult";

import "./App.css";
import LoadingBar from "./components/loading/LoadingBar";
import Info from "./components/Info";

export type AppContextData = {
  url: string;
  result: string;
  isLoading: boolean;
  error: string;
};
export type AppProvider = {
  data: AppContextData;
  setData: (data: AppContextData) => void;
};
export const AppContext = createContext<AppProvider>({
  data: { url: "", result: "", isLoading: false, error: "" },
  setData: () => {},
});

export default function App() {
  const [contextData, setContextData] = useState<AppContextData>({ result: "", url: "", isLoading: false, error: "" });

  return (
    <AppContext.Provider value={{ data: contextData, setData: setContextData }}>
      <LoadingBar />
      <main className="container text-center">
        <div className="d-col-flex-center">
          <div className="f-section web-header">
            <h1>
              <span className="uwu">UwU</span>
              <span className="ext">RL.xyz</span>
            </h1>
          </div>

          <div className="f-section shortener-form">
            <ShortenForm />
          </div>
        </div>

        {contextData.error && (
          <div className="f-section error">
            <Info type="error" text={contextData.error} />
          </div>
        )}

        <div className="f-section shortener-result">
          <ShortenResult />
        </div>
      </main>
    </AppContext.Provider>
  );
}
