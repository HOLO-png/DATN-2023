import React, { useState } from "react";
// import PropTypes from "prop-types";
import { Avatar, Button, List, Modal } from "antd";
import Icon from "@ant-design/icons";
import withUnAuth from "../../utils/auth/withUnAuth";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import { withRouter } from "next/router";
import { provider } from "../../ethereumService/provider";
import { metaMaskLink } from "../../utils/constants";

function WalletConnect(props) {
  const [isOpen, setIsOpen] = useState(false);

  const connectWalletHandler = () => {
    provider().send("eth_requestAccounts", []).then(async () => {
      const addressWallet = await provider().getSigner().getAddress();
      const body = {
        name: "Unnamed",
        email: "UnEmail",
        phoneNumber: "unPhone",
        loginDomain: "cryptoWallet",
        userID: addressWallet,
        addressWallet,
      };

      props.authenticate3rdSoftLogin(body);
    });
  };

  const wallets = [
    {
      title: "Login by MetaMask wallet",
      img: "/images/metamartLogo.png",
      url: metaMaskLink,
      doGetWallet: connectWalletHandler,
    },
  ];

  return (
    <div className="wallet-login-opt">
      <Button className="wallet-btn" onClick={() => setIsOpen(true)}>
        <Icon
          component={() => <img src="/images/wallet-logo.png" width={30} />}
        />{" "}
        Login With Wallet
      </Button>
      <Modal
        title="Please select wallet to login"
        open={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={wallets}
          className="list-wallet"
          renderItem={(item, idx) => (
            <List.Item
              key={idx}
              actions={[<a href={item.url} target="_blank">see more</a>]}
              onClick={item.doGetWallet}
              className="list-wallet-item"
            >
              <List.Item.Meta
                avatar={<Avatar src={item.img} />}
                title={item.title}
                className="list-wallet-item-meta"
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}

WalletConnect.propTypes = {};

export default withUnAuth(
  connect((state) => state, actions)(withRouter(WalletConnect))
);
