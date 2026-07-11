import { Dialog, DialogContent, DialogActions, Box, Typography, Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { Person } from '../types';

interface PersonDetailsDialogProps {
    open: boolean;
    person: Person | null;
    onClose: () => void;
    onStartEdit: (person: Person) => void;
}

export const PersonDetailsDialog = ({ open, person, onClose, onStartEdit }: PersonDetailsDialogProps) => {
    if (!person) return null;

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
                <DialogContent sx={{ pb: 1, pt: 3 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Detalhes do Registro
                    </Typography>

                    <Stack spacing={2} sx={{ mb: 2 }}>
                        <Box sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: (t: any) => t.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
                            border: '1px solid',
                            borderColor: (t: any) => t.palette.mode === 'dark' ? '#334155' : '#e2e8f0',
                            borderRadius: '12px'
                        }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                ID do Registro
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 700, px: 1.5, py: 0.5, bgcolor: (t: any) => t.palette.mode === 'dark' ? '#0f172a' : '#e2e8f0', borderRadius: '6px', color: 'text.primary' }}>
                                #{person.id}
                            </Typography>
                        </Box>
                        <Box sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                            backgroundColor: (t: any) => t.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
                            border: '1px solid',
                            borderColor: (t: any) => t.palette.mode === 'dark' ? '#334155' : '#e2e8f0',
                            borderRadius: '12px'
                        }}>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Nome Completo
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                {person.name}
                            </Typography>
                        </Box>
                        <Box sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                            backgroundColor: (t: any) => t.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
                            border: '1px solid',
                            borderColor: (t: any) => t.palette.mode === 'dark' ? '#334155' : '#e2e8f0',
                            borderRadius: '12px'
                        }}>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Idade Cadastrada
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                {person.age} {person.age === 1 ? 'ano' : 'anos'}
                            </Typography>
                        </Box>
                    </Stack>
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
                        Fechar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => onStartEdit(person)}
                        fullWidth
                        sx={{ py: 1.2, borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
                    >
                        Editar Cadastro
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
