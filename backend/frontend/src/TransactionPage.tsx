import { Box, Container, Typography } from '@mui/material';

export function TransactionPage() {
    return (
        <Container maxWidth="xl" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 10, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}>
            <Box>
                <Typography variant="h4" component="h2" sx={{ mb: 4, color: 'text.primary' }}>
                    Transações
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Página de Transações (Em Desenvolvimento...)
                </Typography>
            </Box>
        </Container>
    );
}
