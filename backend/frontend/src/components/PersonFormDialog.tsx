import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, Box, Typography, Button, TextField, Stack } from '@mui/material';
import type { Person } from '../types';

interface PersonFormDialogProps {
    open: boolean;
    person: Person | null;
    onClose: () => void;
    onSubmit: (name: string, age: number) => Promise<void>;
}

export const PersonFormDialog = ({ open, person, onClose, onSubmit }: PersonFormDialogProps) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (person) {
            setName(person.name);
            setAge(person.age);
        } else {
            setName('');
            setAge('');
        }
    }, [person, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || age === '') return;
        setSubmitting(true);
        try {
            await onSubmit(name.trim(), Number(age));
        } finally {
            setSubmitting(false);
        }
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
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent sx={{ pb: 1, pt: 3 }}>
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                            {person ? 'Editar Cadastro' : 'Nova Pessoa'}
                        </Typography>

                        <Stack spacing={3}>
                            <TextField
                                label="Nome Completo"
                                variant="outlined"
                                placeholder="Ex: Maria Oliveira"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                fullWidth
                                disabled={submitting}
                            />
                            <TextField
                                label="Idade"
                                type="number"
                                variant="outlined"
                                placeholder="Ex: 27"
                                slotProps={{ htmlInput: { min: 0, max: 120 } }}
                                value={age}
                                onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                                required
                                fullWidth
                                disabled={submitting}
                            />
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
                            disabled={submitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ py: 1.2, borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
                            disabled={submitting}
                        >
                            {person ? 'Salvar Alterações' : 'Cadastrar'}
                        </Button>
                    </DialogActions>
                </Box>
            </Box>
        </Dialog>
    );
};
