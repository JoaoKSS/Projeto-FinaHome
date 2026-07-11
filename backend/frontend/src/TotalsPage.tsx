import { Box, Container, Typography } from '@mui/material';

export function TotalsPage() {
    return (
        <Container maxWidth="xl" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 10, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}>
            <Box>
                <Typography variant="h4" component="h2" sx={{ mb: 4, color: 'text.primary' }}>
                    Consulta de Totais
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Página de Totais (Em Desenvolvimento...)
                </Typography>
            </Box>
        </Container>
    );
}
