import { useState, useEffect, useMemo } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    CircularProgress,
    useTheme,
    useMediaQuery
} from '@mui/material';

import { api } from './services/api';
import type { Person, Transaction } from './types';
import { ToastNotification } from './components/ToastNotification';
import { TotalsTable } from './components/TotalsTable';
import { TotalsMobileList } from './components/TotalsMobileList';

export function TotalsPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [people, setPeople] = useState<Person[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados de filtros e ordenação
    const [filterName, setFilterName] = useState('');
    const [filterAge, setFilterAge] = useState('');
    const [filterReceitas, setFilterReceitas] = useState('');
    const [filterDespesas, setFilterDespesas] = useState('');
    const [filterSaldo, setFilterSaldo] = useState('');
    
    const [sortColumn, setSortColumn] = useState<'name' | 'age' | 'totalReceitas' | 'totalDespesas' | 'saldo' | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

    const [toast, setToast] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'warning' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const showToast = (message: string, severity: 'success' | 'warning' | 'error' = 'success') => {
        setToast({ open: true, message, severity });
    };

    // Carregar pessoas e transaçoes
    useEffect(() => {
        const loadData = async () => {
            try {
                const [peopleData, transactionsData] = await Promise.all([
                    api.getPeople(),
                    api.getTransactions()
                ]);
                setPeople(peopleData);
                setTransactions(transactionsData);
            } catch (err: any) {
                showToast(err.message || 'Erro ao carregar dados dos totais.', 'warning');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Handler de ordenação
    const handleSort = (column: 'name' | 'age' | 'totalReceitas' | 'totalDespesas' | 'saldo') => {
        if (sortColumn !== column) {
            setSortColumn(column);
            setSortDirection('asc');
        } else if (sortDirection === 'asc') {
            setSortDirection('desc');
        } else {
            setSortColumn(null);
            setSortDirection(null);
        }
    };

    // Calcula os totais individuais por pessoa
    const filteredAndSortedTotals = useMemo(() => {
        // Calcula os totais brutos
        let result = people.map((person) => {
            const personTransactions = transactions.filter(t => t.personId === person.id);
            
            const totalReceitas = personTransactions
                .filter(t => t.type === 'Receita')
                .reduce((sum, t) => sum + t.value, 0);

            const totalDespesas = personTransactions
                .filter(t => t.type === 'Despesa')
                .reduce((sum, t) => sum + t.value, 0);

            const saldo = totalReceitas - totalDespesas;

            return {
                ...person,
                totalReceitas,
                totalDespesas,
                saldo
            };
        });

        // Filtro por Nome
        if (filterName.trim()) {
            result = result.filter(p => 
                p.name.toLowerCase().includes(filterName.trim().toLowerCase())
            );
        }

        // Filtro por Idade
        if (filterAge.trim()) {
            result = result.filter(p => 
                p.age.toString().includes(filterAge.trim())
            );
        }

        // Filtro por Receitas
        if (filterReceitas.trim()) {
            result = result.filter(p => 
                p.totalReceitas.toString().includes(filterReceitas.trim())
            );
        }

        // Filtro por Despesas
        if (filterDespesas.trim()) {
            result = result.filter(p => 
                p.totalDespesas.toString().includes(filterDespesas.trim())
            );
        }

        // Filtro por Saldo
        if (filterSaldo.trim()) {
            result = result.filter(p => 
                p.saldo.toString().includes(filterSaldo.trim())
            );
        }

        // Ordenação das Colunas
        if (sortColumn && sortDirection) {
            result.sort((a, b) => {
                let aVal: any = a[sortColumn];
                let bVal: any = b[sortColumn];

                if (sortColumn === 'name') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }

                if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [people, transactions, filterName, filterAge, filterReceitas, filterDespesas, filterSaldo, sortColumn, sortDirection]);

    // Calcula os totais gerais baseados nas pessoas filtradas
    const generalTotals = useMemo(() => {
        const totalReceitas = filteredAndSortedTotals.reduce((sum, p) => sum + p.totalReceitas, 0);
        const totalDespesas = filteredAndSortedTotals.reduce((sum, p) => sum + p.totalDespesas, 0);
        const saldoGeral = totalReceitas - totalDespesas;

        return {
            totalReceitas,
            totalDespesas,
            saldoGeral
        };
    }, [filteredAndSortedTotals]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    return (
        <Container maxWidth="xl" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 10, md: 4 }, px: { xs: 1, sm: 2, md: 3 }, flexGrow: 1 }}>
            <Box>
                {/* Cabeçalho */}
                <Typography variant="h4" component="h2" sx={{ mb: 4, color: 'text.primary', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
                    Consulta de Totais
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}>
                        <CircularProgress size={40} thickness={4} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Processando saldos e totais...
                        </Typography>
                    </Box>
                ) : !isMobile ? (
                    /* Layout Desktop */
                    <TotalsTable
                        data={filteredAndSortedTotals}
                        generalTotals={generalTotals}
                        filterName={filterName}
                        setFilterName={setFilterName}
                        filterAge={filterAge}
                        setFilterAge={setFilterAge}
                        filterReceitas={filterReceitas}
                        setFilterReceitas={setFilterReceitas}
                        filterDespesas={filterDespesas}
                        setFilterDespesas={setFilterDespesas}
                        filterSaldo={filterSaldo}
                        setFilterSaldo={setFilterSaldo}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                        formatCurrency={formatCurrency}
                    />
                ) : (
                    /* Layout Mobile*/
                    <TotalsMobileList
                        data={filteredAndSortedTotals}
                        generalTotals={generalTotals}
                        filterName={filterName}
                        setFilterName={setFilterName}
                        filterAge={filterAge}
                        setFilterAge={setFilterAge}
                        filterReceitas={filterReceitas}
                        setFilterReceitas={setFilterReceitas}
                        filterDespesas={filterDespesas}
                        setFilterDespesas={setFilterDespesas}
                        filterSaldo={filterSaldo}
                        setFilterSaldo={setFilterSaldo}
                        formatCurrency={formatCurrency}
                    />
                )}

                {/* Contador de Itens */}
                {!loading && (
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', px: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', fontFamily: 'monospace' }}>
                            Exibindo {filteredAndSortedTotals.length === 0 ? '0-0' : `1-${filteredAndSortedTotals.length}`} de {people.length} participantes.
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Notificaco Toast */}
            <ToastNotification
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={() => setToast(prev => ({ ...prev, open: false }))}
            />
        </Container>
    );
}
