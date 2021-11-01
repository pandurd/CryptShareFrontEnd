import './App.css';
import { MsalProvider} from "@azure/msal-react";
import Home from './Home';

export default function App({ msalInstance }) {

  return (
    <MsalProvider instance={msalInstance}>
      <Home />
    </MsalProvider>

  );
}
