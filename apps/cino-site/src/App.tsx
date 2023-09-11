import { CinoDesktop, AppRegister } from "cino-react-ui";
import { AppBootstrapApp, SysSettingApp } from "cino-apps";
import "cino-react-ui/dist/style.css";
import "cino-apps/dist/style.css";
import "./App.css";

import { JuejinApp } from "./apps/bing-search";

function App() {
  return (
    <CinoDesktop>
      <AppRegister apps={[AppBootstrapApp, SysSettingApp, JuejinApp]} />
    </CinoDesktop>
  );
}

export default App;
