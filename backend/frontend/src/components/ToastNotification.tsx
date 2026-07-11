import { Snackbar, Box, Typography } from '@mui/material';

interface ToastNotificationProps {
    open: boolean;
    message: string;
    severity: 'success' | 'warning' | 'error';
    onClose: (_event?: React.SyntheticEvent | Event, reason?: string) => void;
}

export const ToastNotification = ({ open, message, severity, onClose }: ToastNotificationProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 1.5,
                px: 2.5,
                borderRadius: '50px',
                backgroundColor: (t: any) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                border: '1px solid',
                borderColor: (t: any) => t.palette.mode === 'dark' ? '#334155' : '#e2e8f0',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}>
                <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: severity === 'success' ? '#10b981' : '#f59e0b',
                }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {message}
                </Typography>
            </Box>
        </Snackbar>
    );
};
