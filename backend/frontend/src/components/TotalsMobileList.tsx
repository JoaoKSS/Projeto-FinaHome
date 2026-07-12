import { useState } from 'react';
import { 
    Box, 
    Typography, 
    InputBase, 
    IconButton, 
    Collapse, 
    Stack, 
    Card, 
    CardContent, 
    Divider 
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import type { Person } from '../types';

interface CalculatedTotalItem extends Person {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

interface TotalsMobileListProps {
    data: CalculatedTotalItem[];
    generalTotals: {
        totalReceitas: number;
        totalDespesas: number;
        saldoGeral: number;
    };
    filterName: string;
    setFilterName: (val: string) => void;
    filterAge: string;
    setFilterAge: (val: string) => void;
    filterReceitas: string;
    setFilterReceitas: (val: string) => void;
    filterDespesas: string;
    setFilterDespesas: (val: string) => void;
    filterSaldo: string;
    setFilterSaldo: (val: string) => void;
    formatCurrency: (val: number) => string;
}

export function TotalsMobileList({
    data,
    generalTotals,
    filterName,
    setFilterName,
    filterAge,
    setFilterAge,
    filterReceitas,
    setFilterReceitas,
    filterDespesas,
    setFilterDespesas,
    filterSaldo,
    setFilterSaldo,
    formatCurrency
}: TotalsMobileListProps) {
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);

    const isAnyFilterActive = () => {
        return !!(filterName || filterAge || filterReceitas || filterDespesas || filterSaldo);
    };

    return (
        <Box>
            {/* Filtros */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, mb: 3 }}>
                <InputBase
                    placeholder="Buscar por nome..."
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    endAdornment={
                        filterName ? (
                            <IconButton size="small" onClick={() => setFilterName('')}>
                                <ClearIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                        ) : null
                    }
                    sx={{
                        flexGrow: 1,
                        px: 1.5,
                        py: 0.75,
                        fontSize: '0.9rem',
                        borderRadius: '10px',
                        border: '1px solid',
                        borderColor: (t) => t.palette.mode === 'dark' ? '#334155' : '#cbd5e1',
                        backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                    }}
                />
                <IconButton 
                    onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                    color={showFiltersMobile || isAnyFilterActive() ? 'primary' : 'default'}
                    sx={{ 
                        border: '1px solid', 
                        borderColor: (t) => (showFiltersMobile || isAnyFilterActive()) ? 'primary.main' : (t.palette.mode === 'dark' ? '#334155' : '#cbd5e1'),
                        borderRadius: '10px',
                        p: 1,
                        backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff'
                    }}
                >
                    <FilterListIcon fontSize="small" />
                </IconButton>
            </Box>

            {/* Filtros Colapsáveis */}
            <Collapse in={showFiltersMobile}>
                <Box sx={{ mb: 3, p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: '10px' }}>
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                                Filtrar por Idade
                            </Typography>
                            <InputBase
                                placeholder="Ex: 25"
                                value={filterAge}
                                onChange={(e) => setFilterAge(e.target.value)}
                                endAdornment={
                                    filterAge ? (
                                        <IconButton size="small" onClick={() => setFilterAge('')}>
                                            <ClearIcon sx={{ fontSize: 14 }} />
                                        </IconButton>
                                    ) : null
                                }
                                sx={{
                                    width: '100%',
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: '0.85rem',
                                    borderRadius: '8px',
                                    border: '1px solid',
                                    borderColor: (t) => t.palette.mode === 'dark' ? '#334155' : '#cbd5e1',
                                    backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                                Filtrar por Total Receitas
                            </Typography>
                            <InputBase
                                placeholder="Ex: 1000"
                                value={filterReceitas}
                                onChange={(e) => setFilterReceitas(e.target.value)}
                                endAdornment={
                                    filterReceitas ? (
                                        <IconButton size="small" onClick={() => setFilterReceitas('')}>
                                            <ClearIcon sx={{ fontSize: 14 }} />
                                        </IconButton>
                                    ) : null
                                }
                                sx={{
                                    width: '100%',
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: '0.85rem',
                                    borderRadius: '8px',
                                    border: '1px solid',
                                    borderColor: (t) => t.palette.mode === 'dark' ? '#334155' : '#cbd5e1',
                                    backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                                Filtrar por Total Despesas
                            </Typography>
                            <InputBase
                                placeholder="Ex: 500"
                                value={filterDespesas}
                                onChange={(e) => setFilterDespesas(e.target.value)}
                                endAdornment={
                                    filterDespesas ? (
                                        <IconButton size="small" onClick={() => setFilterDespesas('')}>
                                            <ClearIcon sx={{ fontSize: 14 }} />
                                        </IconButton>
                                    ) : null
                                }
                                sx={{
                                    width: '100%',
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: '0.85rem',
                                    borderRadius: '8px',
                                    border: '1px solid',
                                    borderColor: (t) => t.palette.mode === 'dark' ? '#334155' : '#cbd5e1',
                                    backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                                Filtrar por Saldo
                            </Typography>
                            <InputBase
                                placeholder="Ex: 1500"
                                value={filterSaldo}
                                onChange={(e) => setFilterSaldo(e.target.value)}
                                endAdornment={
                                    filterSaldo ? (
                                        <IconButton size="small" onClick={() => setFilterSaldo('')}>
                                            <ClearIcon sx={{ fontSize: 14 }} />
                                        </IconButton>
                                    ) : null
                                }
                                sx={{
                                    width: '100%',
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: '0.85rem',
                                    borderRadius: '8px',
                                    border: '1px solid',
                                    borderColor: (t) => t.palette.mode === 'dark' ? '#334155' : '#cbd5e1',
                                    backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                                }}
                            />
                        </Box>
                    </Stack>
                </Box>
            </Collapse>

            {/* Card de Resumo Geral */}
            {data.length > 0 && (
                <Card 
                    variant="outlined" 
                    sx={{ 
                        mb: 3, 
                        borderRadius: '12px',
                        bgcolor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
                        border: '1.5px solid',
                        borderColor: 'primary.main'
                    }}
                >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                            <AccountBalanceWalletIcon color="primary" fontSize="small" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                Total Geral
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 0.8 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Receitas</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: (t) => t.palette.mode === 'dark' ? '#34d399' : '#059669' }}>
                                {formatCurrency(generalTotals.totalReceitas)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 0.8 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Despesas</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: (t) => t.palette.mode === 'dark' ? '#f87171' : '#dc2626' }}>
                                {formatCurrency(generalTotals.totalDespesas)}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 1, borderStyle: 'dashed' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 800 }}>Saldo Geral Líquido</Typography>
                            <Typography variant="subtitle2" sx={{ 
                                fontWeight: 900, 
                                color: (t) => generalTotals.saldoGeral >= 0
                                    ? (t.palette.mode === 'dark' ? '#34d399' : '#059669')
                                    : (t.palette.mode === 'dark' ? '#f87171' : '#dc2626')
                            }}>
                                {formatCurrency(generalTotals.saldoGeral)}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            )}

            {/* Lista de Cards */}
            <Stack spacing={2}>
                {data.length === 0 ? (
                    <Box sx={{ py: 6, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Nenhum participante correspondente encontrado.
                        </Typography>
                    </Box>
                ) : (
                    data.map((item) => (
                        <Card key={item.id} variant="outlined" sx={{ borderRadius: '12px' }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                        {item.age} {item.age === 1 ? 'ano' : 'anos'}
                                    </Typography>
                                </Box>
                                
                                <Divider sx={{ my: 1.2, borderStyle: 'dashed' }} />
                                
                                <Stack spacing={0.8}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Receitas</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: (t) => t.palette.mode === 'dark' ? '#34d399' : '#059669' }}>
                                            {formatCurrency(item.totalReceitas)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Despesas</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: (t) => t.palette.mode === 'dark' ? '#f87171' : '#dc2626' }}>
                                            {formatCurrency(item.totalDespesas)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 800 }}>Saldo Líquido</Typography>
                                        <Typography variant="body2" sx={{ 
                                            fontWeight: 800, 
                                            color: (t) => item.saldo >= 0
                                                ? (t.palette.mode === 'dark' ? '#34d399' : '#059669')
                                                : (t.palette.mode === 'dark' ? '#f87171' : '#dc2626')
                                        }}>
                                            {formatCurrency(item.saldo)}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Stack>
        </Box>
    );
}
