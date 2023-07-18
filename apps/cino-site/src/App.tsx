import { CinoDesktop, AppRegister } from "cino-react-ui";
import { AppBootstrapApp, SysSettingApp } from "cino-apps";
import "cino-react-ui/dist/style.css";
import "cino-apps/dist/style.css";
import "./App.css";

import { BingSearchApp } from "./apps/bing-search";
import Demo from "./components";

function App() {
  return (
    <CinoDesktop>
      <AppRegister apps={[AppBootstrapApp, SysSettingApp, BingSearchApp]} />
      <Demo></Demo>
    </CinoDesktop>
  );
}

export default App;
