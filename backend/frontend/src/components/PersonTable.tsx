import { 
    TableContainer, 
    Paper, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    Typography, 
    Tooltip, 
    IconButton, 
    InputBase, 
    CircularProgress, 
    Box 
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ClearIcon from '@mui/icons-material/Clear';
import type { Person } from '../types';

interface PersonTableProps {
    people: Person[];
    loading: boolean;
    filterId: string;
    setFilterId: (val: string) => void;
    filterName: string;
    setFilterName: (val: string) => void;
    filterAge: string;
    setFilterAge: (val: string) => void;
    sortColumn: 'id' | 'name' | 'age' | null;
    sortDirection: 'asc' | 'desc' | null;
    onSort: (column: 'id' | 'name' | 'age') => void;
    onView: (person: Person) => void;
    onEdit: (person: Person) => void;
    onDelete: (person: Person) => void;
}

export function PersonTable({
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
}: PersonTableProps) {

    const renderSortArrow = (column: 'id' | 'name' | 'age') => {
        if (sortColumn !== column) {
            return <SwapVertIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', opacity: 0.25 }} />;
        }
        return sortDirection === 'asc' 
            ? <ArrowUpwardIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', color: '#6366f1' }} />
            : <ArrowDownwardIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', color: '#6366f1' }} />;
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}>
                <CircularProgress size={40} thickness={4} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Carregando participantes...
                </Typography>
            </Box>
        );
    }

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

                    {/* Filtros da Tabela */}
                    <TableRow sx={{ bgcolor: (t) => t.palette.mode === 'dark' ? '#0f172a' : '#f8fafc' }}>
                        {/* Filtro ID */}
                        <TableCell sx={{ py: 1, px: 2 }}>
                            <InputBase
                                placeholder="Filtrar ID..."
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

                        {/* Filtro Nome */}
                        <TableCell sx={{ py: 1, px: 2 }}>
                            <InputBase
                                placeholder="Filtrar por nome..."
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                endAdornment={
                                    filterName ? (
                                        <IconButton size="small" onClick={() => setFilterName('')}>
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

                        {/* Filtro Idade */}
                        <TableCell sx={{ py: 1, px: 2 }}>
                            <InputBase
                                placeholder="Filtrar idade..."
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
                        </TableCell>

                        {/* Espaço Vazio Ações */}
                        <TableCell sx={{ py: 1 }} />
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {people.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Nenhum participante correspondente encontrado.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        people.map((person) => (
                            <TableRow 
                                key={person.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: (t) => t.palette.mode === 'dark' 
                                            ? 'rgba(255, 255, 255, 0.02)' 
                                            : 'rgba(0, 0, 0, 0.01)'
                                    }
                                }}
                            >
                                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.secondary' }}>
                                    #{person.id}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    {person.name}
                                </TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>
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
