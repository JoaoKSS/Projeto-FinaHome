import { useState } from 'react';
import { 
    TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, 
    Typography, Tooltip, IconButton, InputBase, CircularProgress, 
    Box, Card, CardContent, Stack, Divider, Avatar, useTheme, useMediaQuery, Collapse, Button
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import type { Person } from '../types';

interface PersonTableProps {
    people: Person[];
    loading: boolean;
    // Filtros
    filterId: string;
    setFilterId: (val: string) => void;
    filterName: string;
    setFilterName: (val: string) => void;
    filterAge: string;
    setFilterAge: (val: string) => void;
    // Ordenação
    sortColumn: 'id' | 'name' | 'age' | null;
    sortDirection: 'asc' | 'desc' | null;
    onSort: (column: 'id' | 'name' | 'age') => void;
    // Ações
    onView: (person: Person) => void;
    onEdit: (person: Person) => void;
    onDelete: (person: Person) => void;
}

export const PersonTable = ({
    people,
    loading,
    filterId,
    setFilterId,
    filterName,
    setFilterName,
    filterAge,
    setFilterAge,
    sortColumn,
    sortDirection,
    onSort,
    onView,
    onEdit,
    onDelete
}: PersonTableProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [showFilters, setShowFilters] = useState(false);

    const renderSortArrow = (column: 'id' | 'name' | 'age') => {
        if (sortColumn !== column) {
            return <SwapVertIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', opacity: 0.25 }} />;
        }
        return sortDirection === 'asc' 
            ? <ArrowUpwardIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', color: '#6366f1' }} />
            : <ArrowDownwardIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', color: '#6366f1' }} />;
    };

    // Layout para Desktop
    if (!isMobile) {
        return (
            <TableContainer component={Paper} variant="outlined" sx={{ overflowX: 'auto', width: '100%' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell 
                                onClick={() => onSort('id')} 
                                sx={{ 
                                    cursor: 'pointer', 
                                    userSelect: 'none', 
                                    width: '15%',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: '#6366f1',
                                        '& svg': { opacity: 0.8 }
                                    }
                                }}
                            >
                                ID {renderSortArrow('id')}
                            </TableCell>
                            <TableCell 
                                onClick={() => onSort('name')} 
                                sx={{ 
                                    cursor: 'pointer', 
                                    userSelect: 'none', 
                                    width: '50%',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: '#6366f1',
                                        '& svg': { opacity: 0.8 }
                                    }
                                }}
                            >
                                Nome {renderSortArrow('name')}
                            </TableCell>
                            <TableCell 
                                onClick={() => onSort('age')} 
                                sx={{ 
                                    cursor: 'pointer', 
                                    userSelect: 'none', 
                                    width: '20%',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        color: '#6366f1',
                                        '& svg': { opacity: 0.8 }
                                    }
                                }}
                            >
                                Idade {renderSortArrow('age')}
                            </TableCell>
                            <TableCell align="center" sx={{ width: '15%' }}>
                                Ações
                            </TableCell>
                        </TableRow>
                        {/* Linha dos Filtros Integrados */}
                        <TableRow sx={{ bgcolor: (t) => t.palette.mode === 'dark' ? '#0f172a' : '#f8fafc' }}>
                            <TableCell sx={{ py: 1, px: 2 }}>
                                <InputBase
                                    placeholder="ID..."
                                    value={filterId}
                                    onChange={(e) => setFilterId(e.target.value)}
                                    endAdornment={
                                        filterId ? (
                                            <IconButton
                                                size="small"
                                                onClick={() => setFilterId('')}
                                                sx={{ p: 0.25, color: 'text.secondary', opacity: 0.7, '&:hover': { opacity: 1 } }}
                                            >
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
                            <TableCell sx={{ py: 1, px: 2 }}>
                                <InputBase
                                    placeholder="Nome..."
                                    value={filterName}
                                    onChange={(e) => setFilterName(e.target.value)}
                                    endAdornment={
                                        filterName ? (
                                            <IconButton
                                                size="small"
                                                onClick={() => setFilterName('')}
                                                sx={{ p: 0.25, color: 'text.secondary', opacity: 0.7, '&:hover': { opacity: 1 } }}
                                            >
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
                            <TableCell sx={{ py: 1, px: 2 }}>
                                <InputBase
                                    placeholder="Idade..."
                                    value={filterAge}
                                    onChange={(e) => setFilterAge(e.target.value)}
                                    endAdornment={
                                        filterAge ? (
                                            <IconButton
                                                size="small"
                                                onClick={() => setFilterAge('')}
                                                sx={{ p: 0.25, color: 'text.secondary', opacity: 0.7, '&:hover': { opacity: 1 } }}
                                            >
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
                            <TableCell align="center" sx={{ py: 1 }} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                    <CircularProgress size={36} sx={{ mb: 2 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        Carregando registros...
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : people.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        Nenhum participante encontrado.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            people.map((person) => (
                                <TableRow key={person.id}>
                                    <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.secondary' }}>
                                        #{person.id}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                                        {person.name}
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.secondary' }}>
                                        {person.age} {person.age === 1 ? 'ano' : 'anos'}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Visualizar Detalhes">
                                            <IconButton
                                                size="small"
                                                onClick={() => onView(person)}
                                                sx={{
                                                    mr: 1,
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
                                        <Tooltip title="Editar Cadastro">
                                            <IconButton
                                                size="small"
                                                onClick={() => onEdit(person)}
                                                sx={{
                                                    mr: 1,
                                                    color: (t) => t.palette.mode === 'dark' ? '#818cf8' : 'primary.main',
                                                    backgroundColor: (t) => t.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.15)' : 'rgba(99, 102, 241, 0.08)',
                                                    borderRadius: '8px',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.main',
                                                        color: '#ffffff',
                                                        transform: 'translateY(-1px)',
                                                    }
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir Registro">
                                            <IconButton
                                                size="small"
                                                onClick={() => onDelete(person)}
                                                sx={{
                                                    color: (t) => t.palette.mode === 'dark' ? '#f87171' : 'error.main',
                                                    backgroundColor: (t) => t.palette.mode === 'dark' ? 'rgba(248, 113, 113, 0.15)' : 'rgba(211, 47, 47, 0.08)',
                                                    borderRadius: '8px',
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        backgroundColor: 'error.main',
                                                        color: '#ffffff',
                                                        transform: 'translateY(-1px)',
                                                    }
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
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

    // Layout Mobile
    return (
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
            {/* Filtros Compactos Mobile */}
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: (t) => t.palette.mode === 'dark' ? '#0b0f19' : '#f8fafc' }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
                        onClick={() => setShowFilters(!showFilters)}
                        color={showFilters || filterId || filterAge || sortColumn ? 'primary' : 'default'}
                        sx={{ 
                            border: '1px solid', 
                            borderColor: (t) => (showFilters || filterId || filterAge || sortColumn) ? 'primary.main' : (t.palette.mode === 'dark' ? '#334155' : '#cbd5e1'),
                            borderRadius: '10px',
                            p: 1,
                            backgroundColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#ffffff'
                        }}
                    >
                        <FilterListIcon fontSize="small" />
                    </IconButton>
                </Stack>

                <Collapse in={showFilters}>
                    <Stack spacing={2} sx={{ mt: 2, pt: 2, borderTop: '1px dashed', borderColor: 'divider' }}>
                        {/* Filtro por ID */}
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                                Filtrar por ID
                            </Typography>
                            <InputBase
                                placeholder="Ex: 6"
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

                        {/* Filtro por Idade */}
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                                Filtrar por Idade
                            </Typography>
                            <InputBase
                                placeholder="Ex: 23"
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

                        {/* Controles de Ordenação */}
                        <Box>
                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: 'text.secondary' }}>
                                Ordenar Lista por:
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <Button 
                                    variant={sortColumn === 'id' ? 'contained' : 'outlined'} 
                                    size="small" 
                                    onClick={() => onSort('id')}
                                    sx={{ borderRadius: '8px', flexGrow: 1, textTransform: 'none', py: 0.75 }}
                                >
                                    ID {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </Button>
                                <Button 
                                    variant={sortColumn === 'name' ? 'contained' : 'outlined'} 
                                    size="small" 
                                    onClick={() => onSort('name')}
                                    sx={{ borderRadius: '8px', flexGrow: 1, textTransform: 'none', py: 0.75 }}
                                >
                                    Nome {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </Button>
                                <Button 
                                    variant={sortColumn === 'age' ? 'contained' : 'outlined'} 
                                    size="small" 
                                    onClick={() => onSort('age')}
                                    sx={{ borderRadius: '8px', flexGrow: 1, textTransform: 'none', py: 0.75 }}
                                >
                                    Idade {sortColumn === 'age' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Collapse>
            </Box>

            {/* Listagem de Cards Mobile */}
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
                        <CircularProgress size={32} sx={{ mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                            Carregando registros...
                        </Typography>
                    </Box>
                ) : people.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Nenhum participante encontrado.
                        </Typography>
                    </Box>
                ) : (
                    people.map((person) => (
                        <Card 
                            key={person.id} 
                            variant="outlined" 
                            sx={{ 
                                borderRadius: '14px',
                                borderLeft: '4px solid #6366f1',
                                borderColor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#e2e8f0',
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
                                        <Avatar sx={{ bgcolor: (t) => t.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)', color: '#6366f1', width: 36, height: 36, borderRadius: '8px' }}>
                                            <PersonIcon fontSize="small" />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                                                {person.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                {person.age} {person.age === 1 ? 'ano' : 'anos'}
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
                                        #{person.id}
                                    </Typography>
                                </Box>
                                
                                <Divider sx={{ my: 1.5, borderColor: 'divider' }} />
                                
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                    <Tooltip title="Visualizar Detalhes">
                                        <IconButton
                                            size="small"
                                            onClick={() => onView(person)}
                                            sx={{
                                                color: (t) => t.palette.mode === 'dark' ? '#38bdf8' : 'info.main',
                                                backgroundColor: (t) => t.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(2, 136, 209, 0.08)',
                                                borderRadius: '8px',
                                                p: 1
                                            }}
                                        >
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar Cadastro">
                                        <IconButton
                                            size="small"
                                            onClick={() => onEdit(person)}
                                            sx={{
                                                color: (t) => t.palette.mode === 'dark' ? '#818cf8' : 'primary.main',
                                                backgroundColor: (t) => t.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.15)' : 'rgba(99, 102, 241, 0.08)',
                                                borderRadius: '8px',
                                                p: 1
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Excluir Registro">
                                        <IconButton
                                            size="small"
                                            onClick={() => onDelete(person)}
                                            sx={{
                                                color: (t) => t.palette.mode === 'dark' ? '#f87171' : 'error.main',
                                                backgroundColor: (t) => t.palette.mode === 'dark' ? 'rgba(248, 113, 113, 0.15)' : 'rgba(211, 47, 47, 0.08)',
                                                borderRadius: '8px',
                                                p: 1
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
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
};
