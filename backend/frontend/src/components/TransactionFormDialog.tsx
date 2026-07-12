import { useState, useEffect, useMemo } from 'react';
import { 
    Dialog, 
    DialogContent, 
    DialogActions, 
    Box, 
    Typography, 
    Button, 
    TextField, 
    Stack, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    Alert
} from '@mui/material';
import type { Person, TransactionType } from '../types';

interface TransactionFormDialogProps {
    open: boolean;
    people: Person[];
    onClose: () => void;
    onSubmit: (description: string, value: number, type: TransactionType, personId: number) => Promise<void>;
}

export const TransactionFormDialog = ({ open, people, onClose, onSubmit }: TransactionFormDialogProps) => {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState<number | ''>('');
    const [personId, setPersonId] = useState<number | ''>('');
    const [personSearch, setPersonSearch] = useState('');
    const [type, setType] = useState<TransactionType>('Despesa');
    const [isSelectingPerson, setIsSelectingPerson] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Encontra a pessoa selecionada atualmente para validar a idade
    const selectedPerson = people.find(p => p.id === personId);
    const isMinor = selectedPerson ? selectedPerson.age < 18 : false;

    // Filtra a lista de pessoas com base na busca nome ou idade
    const filteredPeople = useMemo(() => {
        const query = personSearch.toLowerCase().trim();
        if (!query) return people;
        return people.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.age.toString().includes(query)
        );
    }, [people, personSearch]);

    // Regra de Negocio: Se for menor de 18 anos força o tipo da transaçao a ser apenas Despesa
    useEffect(() => {
        if (isMinor) {
            setType('Despesa');
        }
    }, [isMinor]);

    // Reseta o formulrio ao abrir/fechar
    useEffect(() => {
        if (open) {
            setDescription('');
            setValue('');
            setPersonId('');
            setPersonSearch('');
            setType('Despesa');
            setIsSelectingPerson(false);
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim() || value === '' || personId === '') return;
        
        setSubmitting(true);
        try {
            await onSubmit(description.trim(), Number(value), type, Number(personId));
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
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
                            Nova Transação
                        </Typography>

                        <Stack spacing={3}>
                            {/* Descriçao */}
                            <TextField
                                label="Descrição da Transação"
                                variant="outlined"
                                placeholder="Ex: Conta de luz"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                fullWidth
                                disabled={submitting}
                            />

                            {/* Valor */}
                            <TextField
                                label="Valor (R$)"
                                type="number"
                                variant="outlined"
                                placeholder="Ex: 150.00"
                                slotProps={{ htmlInput: { min: 0.01, step: 0.01 } }}
                                value={value}
                                onChange={(e) => setValue(e.target.value === '' ? '' : Number(e.target.value))}
                                required
                                fullWidth
                                disabled={submitting}
                            />

                            {/* Seleto de Pessoa */}
                            <Box>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
                                    Pessoa Responsável *
                                </Typography>
                                
                                {!isSelectingPerson ? (
                                    // Exibe o nome ou pede clique para escolher
                                    <TextField
                                        fullWidth
                                        placeholder="Clique para selecionar uma pessoa..."
                                        value={selectedPerson ? `${selectedPerson.name} (${selectedPerson.age} anos)` : ''}
                                        onClick={() => !submitting && setIsSelectingPerson(true)}
                                        disabled={submitting}
                                        slotProps={{
                                            htmlInput: { 
                                                readOnly: true,
                                                style: { cursor: submitting ? 'default' : 'pointer' }
                                            }
                                        }}
                                    />
                                ) : (
                                    // Campo de Busca e Lista de Opões
                                    <Stack spacing={1.5}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                                            <TextField
                                                size="small"
                                                autoFocus
                                                placeholder="Filtrar por nome ou idade..."
                                                value={personSearch}
                                                onChange={(e) => setPersonSearch(e.target.value)}
                                                fullWidth
                                                disabled={submitting}
                                            />
                                            <Button 
                                                variant="outlined" 
                                                size="small" 
                                                onClick={() => setIsSelectingPerson(false)}
                                                sx={{ height: 40, textTransform: 'none', px: 2, borderRadius: '8px' }}
                                            >
                                                Fechar
                                            </Button>
                                        </Box>
                                        
                                        <Box sx={{ 
                                            maxHeight: 160, 
                                            overflowY: 'auto', 
                                            border: '1px solid',
                                            borderColor: (t) => t.palette.mode === 'dark' ? '#334155' : '#cbd5e1',
                                            borderRadius: '8px',
                                            backgroundColor: (t) => t.palette.mode === 'dark' ? '#0f172a' : '#f8fafc'
                                        }}>
                                            {filteredPeople.length === 0 ? (
                                                <Box sx={{ p: 2, textAlign: 'center' }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Nenhuma pessoa encontrada.
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                filteredPeople.map((person) => {
                                                    const isSelected = personId === person.id;
                                                    return (
                                                        <Box
                                                            key={person.id}
                                                            onClick={() => {
                                                                if (!submitting) {
                                                                    setPersonId(person.id!);
                                                                    setIsSelectingPerson(false);
                                                                    setPersonSearch('');
                                                                }
                                                            }}
                                                            sx={{
                                                                p: 1.2,
                                                                px: 1.5,
                                                                cursor: submitting ? 'default' : 'pointer',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                transition: 'all 0.2s',
                                                                backgroundColor: (t) => isSelected 
                                                                    ? (t.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.08)')
                                                                    : 'transparent',
                                                                color: isSelected ? 'primary.main' : 'text.primary',
                                                                fontWeight: isSelected ? 700 : 500,
                                                                borderBottom: '1px solid',
                                                                borderColor: 'divider',
                                                                '&:last-child': { borderBottom: 'none' },
                                                                '&:hover': {
                                                                    backgroundColor: (t) => submitting ? 'transparent' : (isSelected
                                                                        ? (t.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.12)')
                                                                        : (t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)'))
                                                                }
                                                            }}
                                                        >
                                                            <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>
                                                                {person.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'inherit' }}>
                                                                {person.age} anos
                                                            </Typography>
                                                        </Box>
                                                    );
                                                })
                                            )}
                                        </Box>
                                    </Stack>
                                )}
                                {personId === '' && !isSelectingPerson && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                                        Selecione uma pessoa responsável (clique no campo acima).
                                    </Typography>
                                )}
                            </Box>

                            {/* Tipo da Transação */}
                            <FormControl fullWidth required disabled={submitting || isMinor}>
                                <InputLabel id="type-select-label">Tipo da Transação</InputLabel>
                                <Select
                                    labelId="type-select-label"
                                    label="Tipo da Transação"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as TransactionType)}
                                >
                                    <MenuItem value="Receita">Receita</MenuItem>
                                    <MenuItem value="Despesa">Despesa</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Alerta para Menores de Idade */}
                            {isMinor && (
                                <Alert 
                                    severity="warning" 
                                    variant="outlined"
                                    sx={{ 
                                        borderRadius: '10px', 
                                        fontWeight: 600,
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    Menores de 18 anos só podem registrar despesas no sistema.
                                </Alert>
                            )}
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
                            disabled={submitting || personId === '' || isSelectingPerson}
                        >
                            Cadastrar Transação
                        </Button>
                    </DialogActions>
                </Box>
            </Box>
        </Dialog>
    );
};
