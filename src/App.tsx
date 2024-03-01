import { createContext, useState } from "react";

import ShortenForm from "./components/ShortenForm";
import ShortenResult from "./components/ShortenResult";

import "./App.css";

export type AppContextData = {
  result?: string;
};
export type AppProvider = {
  data: AppContextData;
  setData: (data: AppContextData) => void;
};
export const AppContext = createContext<AppProvider>({
  data: {},
  setData: () => {},
});

export default function App() {
  const [contextData, setContextData] = useState<AppContextData>({});

  return (
    <AppContext.Provider value={{ data: contextData, setData: setContextData }}>
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

        <div className="f-section shortener-result">
          <ShortenResult />
        </div>
      </main>
    </AppContext.Provider>
  );
}
