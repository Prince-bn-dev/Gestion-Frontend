import React, { useEffect } from "react";
import { useKKiaPay } from "kkiapay-react";

function KkiapayButton({ amount, user, onSuccess }) {
  const {
    openKkiapayWidget,
    addKkiapayListener,
    removeKkiapayListener,
  } = useKKiaPay();

  const apiKey = import.meta.env.VITE_KKIAPAY_PUBLIC_KEY;

  const open = () => {
    if (!apiKey) {
      alert("Clé API Kkiapay manquante");
      return;
    }

    openKkiapayWidget({
      amount:amount,
      api_key: apiKey,
      sandbox: true, 
      email: user.email,
      phone: user.phone || "97000000", 
    });
  };

  useEffect(() => {
    addKkiapayListener("success", onSuccess);

    return () => {
      removeKkiapayListener("success", onSuccess);
    };
  }, [addKkiapayListener, removeKkiapayListener, onSuccess]);

  return <button onClick={open}>Payer avec KKiaPay</button>;
}

export default KkiapayButton;
