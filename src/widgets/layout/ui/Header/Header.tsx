import { Box, Typography, Divider } from '@mui/material';
import styles from './Header.module.css'

interface HeaderProps {
    title: string
}

export const Header = ({ title }: HeaderProps) => {
    return (
        <Box className={styles.header}>
            <div className={styles.header_content}>
                <Typography className={styles.header_title}>
                    {title}
                    </Typography>
                    </div>
                    <Divider />
                    </Box>
                    )
}