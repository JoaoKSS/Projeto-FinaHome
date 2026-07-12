import { 
    TableContainer, 
    Paper, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    TableFooter, 
    Typography, 
    InputBase, 
    IconButton 
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ClearIcon from '@mui/icons-material/Clear';
import type { Person } from '../types';

interface CalculatedTotalItem extends Person {
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

interface TotalsTableProps {
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
    sortColumn: 'name' | 'age' | 'totalReceitas' | 'totalDespesas' | 'saldo' | null;
    sortDirection: 'asc' | 'desc' | null;
    onSort: (column: 'name' | 'age' | 'totalReceitas' | 'totalDespesas' | 'saldo') => void;
    formatCurrency: (val: number) => string;
}

export function TotalsTable({
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
    sortColumn,
    sortDirection,
    onSort,
    formatCurrency
}: TotalsTableProps) {

    const renderSortArrow = (column: 'name' | 'age' | 'totalReceitas' | 'totalDespesas' | 'saldo') => {
        if (sortColumn !== column) {
            return <SwapVertIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', opacity: 0.25 }} />;
        }
        return sortDirection === 'asc' 
            ? <ArrowUpwardIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', color: '#6366f1' }} />
            : <ArrowDownwardIcon sx={{ fontSize: 16, ml: 0.5, verticalAlign: 'middle', color: '#6366f1' }} />;
    };

    return (
        <TableContainer component={Paper} variant="outlined" sx={{ overflowX: 'auto', width: '100%' }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell 
                            onClick={() => onSort('name')}
                            sx={{ 
                                cursor: 'pointer', 
                                userSelect: 'none', 
                                width: '30%',
                                transition: 'all 0.2s ease',
                                '&:hover': { color: '#6366f1' }
                            }}
                        >
                            Nome {renderSortArrow('name')}
                        </TableCell>
                        <TableCell 
                            onClick={() => onSort('age')}
                            sx={{ 
                                cursor: 'pointer', 
                                userSelect: 'none', 
                                width: '15%',
                                transition: 'all 0.2s ease',
                                '&:hover': { color: '#6366f1' }
                            }}
                        >
                            Idade {renderSortArrow('age')}
                        </TableCell>
                        <TableCell 
                            onClick={() => onSort('totalReceitas')}
                            sx={{ 
                                cursor: 'pointer', 
                                userSelect: 'none', 
                                width: '18%',
                                transition: 'all 0.2s ease',
                                '&:hover': { color: '#6366f1' }
                            }}
                        >
                            Total Receitas {renderSortArrow('totalReceitas')}
                        </TableCell>
                        <TableCell 
                            onClick={() => onSort('totalDespesas')}
                            sx={{ 
                                cursor: 'pointer', 
                                userSelect: 'none', 
                                width: '18%',
                                transition: 'all 0.2s ease',
                                '&:hover': { color: '#6366f1' }
                            }}
                        >
                            Total Despesas {renderSortArrow('totalDespesas')}
                        </TableCell>
                        <TableCell 
                            onClick={() => onSort('saldo')}
                            sx={{ 
                                cursor: 'pointer', 
                                userSelect: 'none', 
                                width: '19%',
                                transition: 'all 0.2s ease',
                                '&:hover': { color: '#6366f1' }
                            }}
                        >
                            Saldo {renderSortArrow('saldo')}
                        </TableCell>
                    </TableRow>

                    {/* Filtros da Tabela */}
                    <TableRow sx={{ bgcolor: (t) => t.palette.mode === 'dark' ? '#0f172a' : '#f8fafc' }}>
                        {/* Filtro Nome */}
                        <TableCell sx={{ py: 1, px: 2 }}>
                            <InputBase
                                placeholder="Buscar por nome..."
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
                                placeholder="Idade..."
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

                        {/* Filtro Receitas */}
                        <TableCell sx={{ py: 1, px: 2 }}>
                            <InputBase
                                placeholder="Valor..."
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
                        </TableCell>

                        {/* Filtro Despesas */}
                        <TableCell sx={{ py: 1, px: 2 }}>
                            <InputBase
                                placeholder="Valor..."
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
                        </TableCell>

                        {/* Filtro Saldo */}
                        <TableCell sx={{ py: 1, px: 2 }}>
                            <InputBase
                                placeholder="Valor..."
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
                        </TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Nenhum participante correspondente encontrado.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow 
                                key={item.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: (t) => t.palette.mode === 'dark' 
                                            ? 'rgba(255, 255, 255, 0.02)' 
                                            : 'rgba(0, 0, 0, 0.01)'
                                    }
                                }}
                            >
                                <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    {item.name}
                                </TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                    {item.age} {item.age === 1 ? 'ano' : 'anos'}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: (t) => t.palette.mode === 'dark' ? '#34d399' : '#059669' }}>
                                    {formatCurrency(item.totalReceitas)}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: (t) => t.palette.mode === 'dark' ? '#f87171' : '#dc2626' }}>
                                    {formatCurrency(item.totalDespesas)}
                                </TableCell>
                                <TableCell sx={{ 
                                    fontWeight: 700, 
                                    color: (t) => item.saldo >= 0
                                        ? (t.palette.mode === 'dark' ? '#34d399' : '#059669')
                                        : (t.palette.mode === 'dark' ? '#f87171' : '#dc2626')
                                }}>
                                    {formatCurrency(item.saldo)}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>

                {data.length > 0 && (
                    <TableFooter>
                        <TableRow sx={{ bgcolor: (t) => t.palette.mode === 'dark' ? '#1e293b' : '#f8fafc' }}>
                            <TableCell colSpan={2} sx={{ fontWeight: 800, color: 'text.primary', fontSize: '0.95rem' }}>
                                Total Geral
                            </TableCell>
                            <TableCell sx={{ 
                                fontWeight: 800, 
                                fontSize: '0.95rem',
                                color: (t) => t.palette.mode === 'dark' ? '#34d399' : '#059669' 
                            }}>
                                {formatCurrency(generalTotals.totalReceitas)}
                            </TableCell>
                            <TableCell sx={{ 
                                fontWeight: 800, 
                                fontSize: '0.95rem',
                                color: (t) => t.palette.mode === 'dark' ? '#f87171' : '#dc2626' 
                            }}>
                                {formatCurrency(generalTotals.totalDespesas)}
                            </TableCell>
                            <TableCell sx={{ 
                                fontWeight: 900, 
                                fontSize: '1rem',
                                color: (t) => generalTotals.saldoGeral >= 0
                                    ? (t.palette.mode === 'dark' ? '#34d399' : '#059669')
                                    : (t.palette.mode === 'dark' ? '#f87171' : '#dc2626')
                            }}>
                                {formatCurrency(generalTotals.saldoGeral)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </TableContainer>
    );
}
