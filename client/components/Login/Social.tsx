import { useState } from "react";
import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Collapse,
  Tooltip,
  Avatar
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import styles from "./styles.module.scss";
import googleLogo from "public/images/logo/google.png";
import facebookLogo from "public/images/logo/facebook.png";
import walletLogo from "public/images/logo/wallet.jpg";
import MetaMarkLogo from "public/images/logo/MetaMask.png";

const socials = [
  { title: "Google", desc: "", image: googleLogo },
  { title: "Facebook", desc: "", image: facebookLogo },
  {
    title: "Connect your wallet",
    desc: "If you don't have a wallet yet, you can select a provider and create one now.",
    image: walletLogo,
    items: [{ title: "MetaMart", desc: "", image: MetaMarkLogo }],
    sub: "MetaMart, Phantom, Glow",
  },
];

function LoginSocial(props) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="Login by social"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          login by social
        </ListSubheader>
      }
      className={styles.login__social}
    >
      {socials.map((social) => {
        if (social.items) {
          return (
            <div key={social.title}>
              <Tooltip title="" arrow placement="top" >
                <ListItemButton onClick={handleClick}>
                  <>
                    <ListItemAvatar>
                      <Avatar src={social.image} alt={social.title} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={social.title}
                      className={styles.login__cart_text}
                      secondary={social.sub}
                      secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: "16px",
                        color: open ? "#fff" : "#00000",
                      }}
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </>
                </ListItemButton>
              </Tooltip>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {social.items.map((item, idx) => (
                  <List component="div" disablePadding key={idx}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemAvatar>
                        <Avatar src={item.image} alt={item.title} sx={{ width: 24, height: 24 }}/>
                      </ListItemAvatar>
                      <ListItemText primary={item.title} className={styles.login__cart_text}/>
                    </ListItemButton>
                  </List>
                ))}
              </Collapse>
            </div>
          );
        }
        return (
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={social.image} alt={`${social.title}`} />
            </ListItemAvatar>
            <ListItemText
              primary={`Login by ${social.title}`}
              className={styles.login__cart_text}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default LoginSocial;
