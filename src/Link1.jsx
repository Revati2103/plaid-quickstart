import React, { useState, useEffect } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";

const Link1 = () => {
  const [linkToken, setLinkToken] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await axios.post("/create_link_token");
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinkToken();
  }, []);

  const handleOnSuccess = async (public_token, metadata) => {
    const response = await axios.post("/exchange_public_token", {
      public_token,
    });
    sessionStorage.setItem("accessToken", response.data.access_token);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : linkToken ? (
        <PlaidLink
          token={linkToken}
          env="sandbox"
          onSuccess={handleOnSuccess}
          onExit={() => console.log("Link closed.")}
        >
          Connect Bank Account
        </PlaidLink>
      ) : (
        <p>Unable to fetch Plaid Link token.</p>
      )}
    </div>
  );
};

export default Link1;
