import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

// import { MsalProvider } from "@azure/msal-react";
// import { PublicClientApplication } from "@azure/msal-browser";

// MSAL configuration
// const configuration: Configuration = {
//   auth: {
//     clientId: "client-id",
//   },
// };

// const pca = new PublicClientApplication({
//   auth: {
//     clientId: "5eb17844-80f4-443b-a57e-e745a4ecaeb0",
//     secretKey: "12fd1d20-aa5a-496b-aaa4-8042f1777287",
//     redirectUri: "http://localhost:3000",
//     navigateToLoginRequestUrl: true,
//   },
// });

// Component
const AppProvider = () => (
  // <MsalProvider instance={pca}>
  <App />
  // </MsalProvider>
);

ReactDOM.render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
