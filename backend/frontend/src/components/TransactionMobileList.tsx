import { useState } from 'react';
import { 
    Box, 
    Typography, 
    InputBase, 
    IconButton, 
    Collapse, 
    Stack, 
    Button, 
    CircularProgress, 
    Card, 
    CardContent, 
    Avatar, 
    Divider, 
    Tooltip,
    FormControl,
    Select,
    MenuItem
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReceiptIcon from '@mui/icons-material/Receipt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { Transaction, Person } from '../types';

interface TransactionMobileListProps {
    transactions: Transaction[];
    people: Person[];
    loading: boolean;
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
    sortColumn: 'id' | 'description' | 'value' | 'type' | 'personId' | null;
    sortDirection: 'asc' | 'desc' | null;
    onSort: (column: 'id' | 'description' | 'value' | 'type' | 'personId') => void;
    onView: (transaction: Transaction) => void;
}

export function TransactionMobileList({
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
}: TransactionMobileListProps) {
    const [showFilters, setShowFilters] = useState(false);

    // ID -> Nome
    const getPersonName = (personId: number) => {
        const p = people.find(x => x.id === personId);
        return p ? p.name : `Pessoa #${personId}`;
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const renderTypeBadge = (type: 'Receita' | 'Despesa') => {
        const style = type === 'Receita' 
            ? {
                bg: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
              }
            : {
                bg: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
              };

        return (
            <Box sx={{
                display: 'inline-flex',
                px: 1.2,
                py: 0.4,
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                backgroundColor: style.bg,
                color: style.color,
            }}>
                {type}
            </Box>
        );
    };

    return (
        <Box>
            {/* Barra de Busca Rpida */}
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

            {/* Painel de Filtros e Ordenação */}
            <Collapse in={showFilters}>
                <Stack spacing={2} sx={{ mb: 3, p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: '10px', bgcolor: (t) => t.palette.mode === 'dark' ? '#0f172a' : '#f8fafc' }}>
                    {/* Filtro por ID */}
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                            Filtrar por ID
                        </Typography>
                        <InputBase
                            placeholder="Ex: 15"
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
                            placeholder="Ex: 250"
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
                        <FormControl fullWidth size="small">
                            <Select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                displayEmpty
                                sx={{
                                    borderRadius: '8px',
                                    backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff',
                                    fontSize: '0.85rem'
                                }}
                            >
                                <MenuItem value="">Todos os tipos</MenuItem>
                                <MenuItem value="Receita">Receita</MenuItem>
                                <MenuItem value="Despesa">Despesa</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Filtro por Responsa[vel */}
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

                    {/* Controles de Ordenação */}
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                            Ordenar Lista por:
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
                            <Button 
                                variant={sortColumn === 'id' ? 'contained' : 'outlined'} 
                                size="small" 
                                onClick={() => onSort('id')}
                                sx={{ borderRadius: '8px', flexShrink: 0, textTransform: 'none', py: 0.75 }}
                            >
                                ID {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </Button>
                            <Button 
                                variant={sortColumn === 'description' ? 'contained' : 'outlined'} 
                                size="small" 
                                onClick={() => onSort('description')}
                                sx={{ borderRadius: '8px', flexShrink: 0, textTransform: 'none', py: 0.75 }}
                            >
                                Descrição {sortColumn === 'description' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </Button>
                            <Button 
                                variant={sortColumn === 'value' ? 'contained' : 'outlined'} 
                                size="small" 
                                onClick={() => onSort('value')}
                                sx={{ borderRadius: '8px', flexShrink: 0, textTransform: 'none', py: 0.75 }}
                            >
                                Valor {sortColumn === 'value' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </Button>
                            <Button 
                                variant={sortColumn === 'type' ? 'contained' : 'outlined'} 
                                size="small" 
                                onClick={() => onSort('type')}
                                sx={{ borderRadius: '8px', flexShrink: 0, textTransform: 'none', py: 0.75 }}
                            >
                                Tipo {sortColumn === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </Button>
                            <Button 
                                variant={sortColumn === 'personId' ? 'contained' : 'outlined'} 
                                size="small" 
                                onClick={() => onSort('personId')}
                                sx={{ borderRadius: '8px', flexShrink: 0, textTransform: 'none', py: 0.75 }}
                            >
                                Responsável {sortColumn === 'personId' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Collapse>

            {/* Listagem de Cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
                        <CircularProgress size={32} sx={{ mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                            Carregando registros...
                        </Typography>
                    </Box>
                ) : transactions.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Nenhuma transação encontrada para os filtros aplicados.
                        </Typography>
                    </Box>
                ) : (
                    transactions.map((transaction) => (
                        <Card 
                            key={transaction.id} 
                            variant="outlined" 
                            sx={{ 
                                borderRadius: '14px',
                                borderLeft: '4px solid',
                                borderColor: transaction.type === 'Receita' ? '#34d399' : '#f87171',
                                backgroundColor: (t) => t.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: (t) => t.palette.mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(99,102,241,0.06)'
                                }
                            }}
                        >
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Avatar sx={{ 
                                            bgcolor: transaction.type === 'Receita' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(248, 113, 113, 0.15)', 
                                            color: transaction.type === 'Receita' ? '#34d399' : '#f87171', 
                                            width: 36, 
                                            height: 36, 
                                            borderRadius: '8px' 
                                        }}>
                                            <ReceiptIcon fontSize="small" />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                                                {transaction.description}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                por {getPersonName(transaction.personId)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            fontFamily: 'monospace', 
                                            fontWeight: 700, 
                                            bgcolor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#f1f5f9',
                                            color: 'text.secondary',
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: '6px'
                                        }}
                                    >
                                        #{transaction.id}
                                    </Typography>
                                </Box>
                                
                                <Divider sx={{ my: 1.5, borderColor: 'divider' }} />
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                        {renderTypeBadge(transaction.type)}
                                        <Typography variant="body2" sx={{ 
                                            fontWeight: 800,
                                            color: transaction.type === 'Receita' ? '#34d399' : '#f87171'
                                        }}>
                                            {formatCurrency(transaction.value)}
                                        </Typography>
                                    </Stack>
                                    
                                    <Tooltip title="Visualizar Detalhes">
                                        <IconButton
                                            size="small"
                                            onClick={() => onView(transaction)}
                                            sx={{
                                                color: (t) => t.palette.mode === 'dark' ? '#38bdf8' : 'info.main',
                                                backgroundColor: (t) => t.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 136, 209, 0.08)',
                                                borderRadius: '8px',
                                                p: 0.8
                                            }}
                                        >
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
        </Box>
    );
}
