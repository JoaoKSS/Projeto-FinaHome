import { Dialog, DialogContent, DialogActions, Box, Typography, Button, Stack, useTheme } from '@mui/material';
import type { Transaction, Person } from '../types';

interface TransactionDetailsDialogProps {
    open: boolean;
    transaction: Transaction | null;
    person: Person | null;
    onClose: () => void;
}

export const TransactionDetailsDialog = ({ open, transaction, person, onClose }: TransactionDetailsDialogProps) => {
    const theme = useTheme();

    if (!transaction) return null;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const isReceita = transaction.type === 'Receita';
    const isDark = theme.palette.mode === 'dark';

    // Cores para o valor e tipo da transação
    const typeStyle = isReceita 
        ? {
            bg: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.08)',
            color: isDark ? '#34d399' : '#059669',
            border: isDark ? '1px solid rgba(16, 185, 129, 0.2)' : 'none'
          }
        : {
            bg: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.08)',
            color: isDark ? '#f87171' : '#dc2626',
            border: isDark ? '1px solid rgba(239, 68, 68, 0.2)' : 'none'
          };

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
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
                        Detalhes da Transação
                    </Typography>

                    <Stack spacing={2} sx={{ mb: 2 }}>
                        {/* ID da Transaçao */}
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
                                ID da Transação
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 700, px: 1.5, py: 0.5, bgcolor: (t: any) => t.palette.mode === 'dark' ? '#0f172a' : '#e2e8f0', borderRadius: '6px', color: 'text.primary' }}>
                                #{transaction.id}
                            </Typography>
                        </Box>

                        {/* Descriçao */}
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
                                Descrição
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                {transaction.description}
                            </Typography>
                        </Box>

                        {/* Valor e Tipo */}
                        <Box sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: (t: any) => t.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
                            border: '1px solid',
                            borderColor: (t: any) => t.palette.mode === 'dark' ? '#334155' : '#e2e8f0',
                            borderRadius: '12px'
                        }}>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 0.5 }}>
                                    Valor
                                </Typography>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 800, 
                                    color: typeStyle.color
                                }}>
                                    {formatCurrency(transaction.value)}
                                </Typography>
                            </Box>
                            
                            <Box sx={{
                                px: 2,
                                py: 0.8,
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                backgroundColor: typeStyle.bg,
                                color: typeStyle.color,
                                border: typeStyle.border
                            }}>
                                {transaction.type}
                            </Box>
                        </Box>

                        {/* Pessoa Responsavel */}
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
                                Pessoa Responsável
                            </Typography>
                            {person ? (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                        {person.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        {person.age} anos
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                    Pessoa não encontrada (ou ID #{transaction.personId})
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={onClose}
                        fullWidth
                        sx={{ py: 1.2, borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
                    >
                        Fechar
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
