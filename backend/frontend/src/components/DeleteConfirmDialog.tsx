import { Dialog, DialogContent, DialogActions, Box, Typography, Button } from '@mui/material';
import type { Person } from '../types';

interface DeleteConfirmDialogProps {
    open: boolean;
    person: Person | null;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteConfirmDialog = ({ open, person, onClose, onConfirm }: DeleteConfirmDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: '16px',
                        boxShadow: (t: any) => t.palette.mode === 'dark'
                            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            : '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
                        border: '1px solid',
                        borderColor: (t: any) => t.palette.mode === 'dark' ? '#1e293b' : '#e2e8f0',
                        backgroundImage: 'none',
                        overflow: 'hidden',
                    }
                },
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: (t: any) => t.palette.mode === 'dark' ? 'rgba(9, 13, 22, 0.8)' : 'rgba(15, 23, 42, 0.3)',
                    }
                }
            }}
        >
            <Box sx={{ p: 1 }}>
                <DialogContent sx={{ pb: 2, pt: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                        Excluir participante?
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                        Tem certeza que deseja remover <strong>{person?.name}</strong>? Esta ação apagará de forma definitiva todas as transações associadas.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ 
                    px: 3, 
                    pb: 3, 
                    pt: 1, 
                    gap: 1.5,
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    '& > button': {
                        margin: '0 !important'
                    }
                }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={onClose}
                        fullWidth
                        sx={{ py: 1.2, borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onConfirm}
                        fullWidth
                        sx={{
                            py: 1.2,
                            borderRadius: '10px',
                            bgcolor: (t: any) => t.palette.mode === 'dark' ? '#f43f5e' : '#e11d48',
                            color: '#ffffff',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { bgcolor: (t: any) => t.palette.mode === 'dark' ? '#e11d48' : '#be123c' }
                        }}
                    >
                        Excluir
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
