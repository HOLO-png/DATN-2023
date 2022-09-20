import IcNotifications from './IcNotifications.svg';
import styles from './style.module.scss';
import {
    Avatar,
    Box,
    Typography,
} from '@mui/material';
import { HeaderProps } from '../Layout';

export const Header = (props: HeaderProps) => {
    return (
        <Box className={styles.Box}>
            <Typography className={styles.Title} variant="h6" noWrap >
                {props.title}
            </Typography>
            <Box className={styles.Info}>
                <Box className={styles.Nofitications}><img src={IcNotifications} /></Box>
                <Avatar
                    src={props.src}
                    sx={{ width: 32, height: 32 }}
                >
                    {props.username && props.username.charAt(0)}
                </Avatar>
            </Box>
        </Box>
    )
}
