import React, { useState, useEffect } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";

const Link = () => {
  const [linkToken, setLinkToken] = useState("");

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await axios.post("/create_link_token");
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLinkToken();
  }, []);

  const handleOnSuccess = async (public_token, metadata) => {
    try {
      const data = {
        public_token: public_token,
      };
      const response = await axios.post("/exchange_public_token", data);
      sessionStorage.setItem("accessToken", response.data.access_token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {linkToken.toString() !== "undefined" ? (
        <PlaidLink
          token={linkToken.toString()}
          env="sandbox"
          onSuccess={handleOnSuccess}
          onExit={() => {}}
        >
          Connect Bank Account
        </PlaidLink>
      ) : null}
    </div>
  );
};

export default Link;
