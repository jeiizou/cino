import { CinoDesktop, AppRegister } from "cino-react-ui";
import { AppBootstrapApp } from "cino-apps";
import "cino-react-ui/dist/style.css";
import "cino-apps/dist/style.css";
import "./App.css";

function App() {
  return (
    <CinoDesktop>
      <AppRegister apps={[AppBootstrapApp]} />
    </CinoDesktop>
  );
}

export default App;
