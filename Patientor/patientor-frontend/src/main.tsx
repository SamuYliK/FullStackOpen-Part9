import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.tsx';

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['secondary'];
  }
  interface PaletteOptions {
    custom?: PaletteOptions['secondary'];
  }
  interface PaletteColor {
    Healthy?: string;
    LowRisk?: string;
    HighRisk?: string;
    CriticalRisk?: string;
  }
  interface SimplePaletteColorOptions {
    Healthy?: string;
    LowRisk?: string;
    HighRisk?: string;
    CriticalRisk?: string;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <App />
  </Router>
);
