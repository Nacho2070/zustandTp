import styles from "./header.module.css";
// header.tsx
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

export const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                letterSpacing: '.1rem',
                                color: 'white',
                            }}
                        >
                            Aplicación de Tareas
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};