import { useState } from 'react';
import { 
    TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, 
    Typography, IconButton, InputBase, CircularProgress, Tooltip,
    Box, Card, CardContent, Stack, Divider, useTheme, useMediaQuery, Collapse, MenuItem, Select, FormControl
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReceiptIcon from '@mui/icons-material/Receipt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { Transaction, Person } from '../types';

interface TransactionTableProps {
    transactions: Transaction[];
    people: Person[];
    loading: boolean;
    // Filtros
    filterId: string;
    setFilterId: (val: string) => void;
    filterDescription: string;
    setFilterDescription: (val: string) => void;
    filterValue: string;
    setFilterValue: (val: string) => void;
    filterType: string;
    setFilterType: (val: string) => void;
    filterPersonName: string;
    setFilterPersonName: (val: string) => void;
    // Ordenação
    sortColumn: 'id' | 'description' | 'value' | 'type' | 'personId' | null;
    sortDirection: 'asc' | 'desc' | null;
    onSort: (column: 'id' | 'description' | 'value' | 'type' | 'personId') => void;
    // Ações
    onView: (transaction: Transaction) => void;
}

export const TransactionTable = ({
    transactions,
    people,
    loading,
    filterId,
    setFilterId,
    filterDescription,
    setFilterDescription,
    filterValue,
    setFilterValue,
    filterType,
    setFilterType,
    filterPersonName,
    setFilterPersonName,
    sortColumn,
    sortDirection,
    onSort,
    onView
}: TransactionTableProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [showFilters, setShowFilters] = useState(false);

    // ID -> Nome
    const getPersonName = (personId: number) => {
        const p = people.find(x => x.id === personId);
        return p ? p.name : `Pessoa #${personId}`;
    };

    const renderSortArrow = (column: 'id' | 'description' | 'value' | 'type' | 'personId') => {
        if (sortColumn !== column) {
            return <SwapVertIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', opacity: 0.25 }} />;
        }
        return sortDirection === 'asc' 
            ? <ArrowUpwardIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', color: '#6366f1' }} />
            : <ArrowDownwardIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', color: '#6366f1' }} />;
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const renderTypeBadge = (type: 'Receita' | 'Despesa') => {
        const isDark = theme.palette.mode === 'dark';
        const style = type === 'Receita' 
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
            <Box sx={{
                display: 'inline-flex',
                px: 1.5,
                py: 0.5,
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                backgroundColor: style.bg,
                color: style.color,
                border: style.border
            }}>
                {type}
            </Box>
        );
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}>
                <CircularProgress size={40} thickness={4} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Carregando transações...
                </Typography>
            </Box>
        );
    }

    if (!isMobile) {
        return (
            <TableContainer component={Paper} variant="outlined" sx={{ overflowX: 'auto', width: '100%' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {/* ID */}
                            <TableCell 
                                onClick={() => onSort('id')} 
                                sx={{ 
                                    cursor: 'pointer', 
                                    userSelect: 'none', 
                                    width: '10%',
                                    transition: 'all 0.2s ease',
                                    '&:hover': { color: '#6366f1' }
                                }}
                            >
                                ID {renderSortArrow('id')}
                            </TableCell>

                            {/* Descrição */}
                            <TableCell 
                                onClick={() => onSort('description')} 
                                sx={{ 
                                    cursor: 'pointer', 
                                    userSelect: 'none', 
                                    width: '30%',
                                    transition: 'all 0.2s ease',
                                    '&:hover': { color: '#6366f1' }
                                }}
                            >
                                Descrição {renderSortArrow('description')}
                            </TableCell>

                            {/* Valor */}
                            <TableCell 
                                onClick={() => onSort('value')} 
                                sx={{ 
                                    cursor: 'pointer', 
                                    userSelect: 'none', 
                                    width: '20%',
                                    transition: 'all 0.2s ease',
                                    '&:hover': { color: '#6366f1' }
                                }}
                            >
                                Valor {renderSortArrow('value')}
                            </TableCell>

                            {/* Tipo */}
                            <TableCell 
                                onClick={() => onSort('type')} 
                                sx={{ 
                                    cursor: 'pointer', 
                                    userSelect: 'none', 
                                    width: '15%',
                                    transition: 'all 0.2s ease',
                                    '&:hover': { color: '#6366f1' }
                                }}
                            >
                                Tipo {renderSortArrow('type')}
                            </TableCell>

                            {/* Responsável */}
                            <TableCell 
                                onClick={() => onSort('personId')} 
                                sx={{ 
                                    cursor: 'pointer', 
                                    userSelect: 'none', 
                                    width: '15%',
                                    transition: 'all 0.2s ease',
                                    '&:hover': { color: '#6366f1' }
                                }}
                            >
                                Responsável {renderSortArrow('personId')}
                            </TableCell>

                            {/* Ações */}
                            <TableCell align="center" sx={{ width: '10%' }}>
                                Ações
                            </TableCell>
                        </TableRow>

                        {/* Filtros da Tabela */}
                        <TableRow sx={{ bgcolor: (t) => t.palette.mode === 'dark' ? '#0f172a' : '#f8fafc' }}>
                            {/* Filtro ID */}
                            <TableCell sx={{ py: 1, px: 2 }}>
                                <InputBase
                                    placeholder="ID..."
                                    value={filterId}
                                    onChange={(e) => setFilterId(e.target.value)}
                                    endAdornment={
                                        filterId ? (
                                            <IconButton size="small" onClick={() => setFilterId('')}>
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
                            </TableCell>
                            
                            {/* Filtro Descrição */}
                            <TableCell sx={{ py: 1, px: 2 }}>
                                <InputBase
                                    placeholder="Buscar descrição..."
                                    value={filterDescription}
                                    onChange={(e) => setFilterDescription(e.target.value)}
                                    endAdornment={
                                        filterDescription ? (
                                            <IconButton size="small" onClick={() => setFilterDescription('')}>
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
                            </TableCell>

                            {/* Filtro Valor */}
                            <TableCell sx={{ py: 1, px: 2 }}>
                                <InputBase
                                    placeholder="Valor..."
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                    endAdornment={
                                        filterValue ? (
                                            <IconButton size="small" onClick={() => setFilterValue('')}>
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
                            </TableCell>

                            {/* Filtro Tipo */}
                            <TableCell sx={{ py: 1, px: 2 }}>
                                <FormControl fullWidth size="small">
                                    <Select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        displayEmpty
                                        sx={{
                                            height: 32,
                                            fontSize: '0.85rem',
                                            borderRadius: '8px',
                                            backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                                        }}
                                    >
                                        <MenuItem value="">Todos</MenuItem>
                                        <MenuItem value="Receita">Receita</MenuItem>
                                        <MenuItem value="Despesa">Despesa</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>

                            {/* Filtro Responsvel */}
                            <TableCell sx={{ py: 1, px: 2 }}>
                                <InputBase
                                    placeholder="Buscar pessoa..."
                                    value={filterPersonName}
                                    onChange={(e) => setFilterPersonName(e.target.value)}
                                    endAdornment={
                                        filterPersonName ? (
                                            <IconButton size="small" onClick={() => setFilterPersonName('')}>
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
                            </TableCell>

                            {/* Célula de Ações */}
                            <TableCell sx={{ py: 1, px: 2 }} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Nenhuma transação encontrada para os filtros aplicados.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            transactions.map((transaction) => (
                                <TableRow 
                                    key={transaction.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: (t) => t.palette.mode === 'dark' 
                                                ? 'rgba(255, 255, 255, 0.02)' 
                                                : 'rgba(0, 0, 0, 0.01)'
                                        }
                                    }}
                                >
                                    <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                                        #{transaction.id}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                                        {transaction.description}
                                    </TableCell>
                                    <TableCell sx={{ 
                                        fontWeight: 700, 
                                        color: (t) => transaction.type === 'Receita'
                                            ? (t.palette.mode === 'dark' ? '#34d399' : '#059669')
                                            : (t.palette.mode === 'dark' ? '#f87171' : '#dc2626')
                                    }}>
                                        {formatCurrency(transaction.value)}
                                    </TableCell>
                                    <TableCell>
                                        {renderTypeBadge(transaction.type)}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                        {getPersonName(transaction.personId)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Visualizar Detalhes">
                                            <IconButton 
                                                size="small" 
                                                onClick={() => onView(transaction)}
                                                sx={{
                                                    color: (t) => t.palette.mode === 'dark' ? '#38bdf8' : 'info.main',
                                                    backgroundColor: (t) => t.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 136, 209, 0.08)',
                                                    borderRadius: '8px',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        backgroundColor: 'info.main',
                                                        color: '#ffffff',
                                                        transform: 'translateY(-1px)',
                                                    }
                                                }}
                                            >
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    // Layout Mobil
    return (
        <Box>
            {/* Barra de Busca Rápida */}
            <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
                <InputBase
                    placeholder="Buscar por descrição..."
                    value={filterDescription}
                    onChange={(e) => setFilterDescription(e.target.value)}
                    endAdornment={
                        filterDescription ? (
                            <IconButton size="small" onClick={() => setFilterDescription('')}>
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
                    onClick={() => setShowFilters(!showFilters)}
                    color={showFilters || filterId || filterValue || filterType || filterPersonName || sortColumn ? 'primary' : 'default'}
                    sx={{ 
                        border: '1px solid', 
                        borderColor: (t) => (showFilters || filterId || filterValue || filterType || filterPersonName || sortColumn) ? 'primary.main' : (t.palette.mode === 'dark' ? '#334155' : '#cbd5e1'),
                        borderRadius: '10px',
                        p: 1,
                        backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff'
                    }}
                >
                    <FilterListIcon fontSize="small" />
                </IconButton>
            </Stack>

            {/* Painel de Filtros e Ordenação Mobile */}
            <Collapse in={showFilters}>
                <Stack spacing={2} sx={{ mb: 3, p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: '10px' }}>
                    {/* Filtro por ID */}
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                            Filtrar por ID
                        </Typography>
                        <InputBase
                            placeholder="Ex: 1"
                            value={filterId}
                            onChange={(e) => setFilterId(e.target.value)}
                            endAdornment={
                                filterId ? (
                                    <IconButton size="small" onClick={() => setFilterId('')}>
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

                    {/* Filtro por Valor */}
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                            Filtrar por Valor
                        </Typography>
                        <InputBase
                            placeholder="Ex: 300"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            endAdornment={
                                filterValue ? (
                                    <IconButton size="small" onClick={() => setFilterValue('')}>
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

                    {/* Filtro por Tipo */}
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                            Filtrar por Tipo
                        </Typography>
                        <Select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            displayEmpty
                            fullWidth
                            size="small"
                            sx={{
                                borderRadius: '8px',
                                backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                            }}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="Receita">Receita</MenuItem>
                            <MenuItem value="Despesa">Despesa</MenuItem>
                        </Select>
                    </Box>

                    {/* Filtro por Pessoa */}
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                            Filtrar por Responsável
                        </Typography>
                        <InputBase
                            placeholder="Buscar pessoa..."
                            value={filterPersonName}
                            onChange={(e) => setFilterPersonName(e.target.value)}
                            endAdornment={
                                filterPersonName ? (
                                    <IconButton size="small" onClick={() => setFilterPersonName('')}>
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
            </Collapse>

            {/* Lista de Cards */}
            <Stack spacing={2}>
                {transactions.length === 0 ? (
                    <Box sx={{ py: 6, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ReceiptIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.3 }} />
                        <Typography variant="body2" color="text.secondary">
                            Nenhuma transação encontrada.
                        </Typography>
                    </Box>
                ) : (
                    transactions.map((transaction) => (
                        <Card key={transaction.id} variant="outlined" sx={{ borderRadius: '12px' }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontWeight: 600 }}>
                                            #{transaction.id}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.2 }}>
                                            {transaction.description}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                                        {renderTypeBadge(transaction.type)}
                                        <IconButton 
                                            size="small" 
                                            onClick={() => onView(transaction)}
                                            sx={{
                                                color: (t) => t.palette.mode === 'dark' ? '#38bdf8' : 'info.main',
                                                backgroundColor: (t) => t.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 136, 209, 0.08)',
                                                borderRadius: '8px',
                                                p: 1
                                            }}
                                        >
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                                
                                <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                                            Responsável
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                            {getPersonName(transaction.personId)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                                            Valor
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ 
                                            fontWeight: 800, 
                                            color: (t) => transaction.type === 'Receita'
                                                ? (t.palette.mode === 'dark' ? '#34d399' : '#059669')
                                                : (t.palette.mode === 'dark' ? '#f87171' : '#dc2626')
                                        }}>
                                            {formatCurrency(transaction.value)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Stack>
        </Box>
    );
};
