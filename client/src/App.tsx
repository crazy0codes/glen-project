import "./App.css";
import { AuthProvider } from "./context/authContext";
import { AppBrowser } from "./routes";
// import { Dashboard } from "./views/dashboardView";

function App() {
  return (
    <AuthProvider>
      <AppBrowser />
    </AuthProvider>
  );
}

export default App;
