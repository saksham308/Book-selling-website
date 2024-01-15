import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import StripeCheckout from "react-stripe-checkout";

function App() {
  return (
    <>
      <StripeCheckout
        stripeKey={
          "pk_test_51OY1cISCgePGfDKS30y3FRInkvO5PLgd4DCXx9cZrQX6Rtz4YeQleES9tENJfl5EOh99mWrPEWCCvJdDps2lSJP900nrE8aWWC"
        }
        shippingAddress
        billingAddress={false}
        zipCode={false}
      />
    </>
  );
}

export default App;
