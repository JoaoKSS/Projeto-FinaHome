import { useState, useEffect, useMemo } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Button, 
    Card, 
    CardContent 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Tipos, Componentes e APIs
import type { Transaction, Person, TransactionType } from './types';
import { api } from './services/api';
import { TransactionTable } from './components/TransactionTable';
import { TransactionFormDialog } from './components/TransactionFormDialog';
import { TransactionDetailsDialog } from './components/TransactionDetailsDialog';
import { ToastNotification } from './components/ToastNotification';

export function TransactionPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Detalhe da Transação
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Toast para notificações
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

    const handleCloseToast = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setToast((prev) => ({ ...prev, open: false }));
    };

    // Estados de filtros e ordenação
    const [filterId, setFilterId] = useState('');
    const [filterDescription, setFilterDescription] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterPersonName, setFilterPersonName] = useState('');
    const [sortColumn, setSortColumn] = useState<'id' | 'description' | 'value' | 'type' | 'personId' | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

    // Carrega dados iniciais do backend
    useEffect(() => {
        const loadData = async () => {
            try {
                const [transactionsData, peopleData] = await Promise.all([
                    api.getTransactions(),
                    api.getPeople()
                ]);
                setTransactions(transactionsData);
                setPeople(peopleData);
            } catch (err: any) {
                showToast(err.message || 'Erro ao carregar dados do servidor.', 'warning');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Handler de Ordenação
    const handleSort = (column: 'id' | 'description' | 'value' | 'type' | 'personId') => {
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

    // Handler para Visualizar Detalhes
    const handleViewTransaction = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsDetailsOpen(true);
    };

    // Handler de Criação de Transação
    const handleCreateTransaction = async (
        description: string, 
        value: number, 
        type: TransactionType, 
        personId: number
    ) => {
        try {
            const newTransaction = await api.createTransaction({
                description,
                value,
                type,
                personId
            });
            setTransactions((prev) => [...prev, newTransaction]);
            setIsCreateOpen(false);
            showToast('Transação registrada com sucesso!', 'success');
        } catch (err: any) {
            showToast(err.message || 'Erro ao registrar transação.', 'warning');
        }
    };

    // filtros e ordenação em memória no frontend
    const filteredAndSortedTransactions = useMemo(() => {
        let result = [...transactions];

        // Filtro por ID
        if (filterId.trim()) {
            result = result.filter((t) => 
                t.id?.toString().includes(filterId.trim())
            );
        }

        // Filtro por Descriao
        if (filterDescription.trim()) {
            result = result.filter((t) => 
                t.description.toLowerCase().includes(filterDescription.trim().toLowerCase())
            );
        }

        // Filtro por Valor
        if (filterValue.trim()) {
            result = result.filter((t) => 
                t.value.toString().includes(filterValue.trim())
            );
        }

        // Filtro por Tipo
        if (filterType) {
            result = result.filter((t) => t.type === filterType);
        }

        // Filtro por Nome do Responsvel
        if (filterPersonName.trim()) {
            result = result.filter((t) => {
                const p = people.find((x) => x.id === t.personId);
                return p ? p.name.toLowerCase().includes(filterPersonName.trim().toLowerCase()) : false;
            });
        }

        // Ordenação das Colunas
        if (sortColumn && sortDirection) {
            result.sort((a, b) => {
                let aVal: any = a[sortColumn];
                let bVal: any = b[sortColumn];

                if (sortColumn === 'description') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                } else if (sortColumn === 'personId') {
                    const pA = people.find((x) => x.id === a.personId);
                    const pB = people.find((x) => x.id === b.personId);
                    aVal = pA ? pA.name.toLowerCase() : '';
                    bVal = pB ? pB.name.toLowerCase() : '';
                }

                if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [transactions, people, filterId, filterDescription, filterValue, filterType, filterPersonName, sortColumn, sortDirection]);

    // Encontra a pessoa correspondente a transação visualizada
    const selectedTransactionPerson = selectedTransaction 
        ? people.find(p => p.id === selectedTransaction.personId) || null
        : null;

    return (
        <Container maxWidth="xl" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 10, md: 4 }, px: { xs: 1, sm: 2, md: 3 }, flexGrow: 1 }}>
            <Box>
                {/* Cabeçalho */}
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'flex-start', sm: 'center' }, 
                    gap: 2, 
                    mb: 4 
                }}>
                    <Box>
                        <Typography variant="h4" component="h2" sx={{ mb: 0, color: 'text.primary', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
                            Transações Registradas
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => setIsCreateOpen(true)}
                        sx={{ 
                            py: 1.2, 
                            px: 2.5, 
                            width: 'auto',
                            alignSelf: { xs: 'flex-start', sm: 'auto' }
                        }}
                    >
                        Nova Transação
                    </Button>
                </Box>

                {/* Tabela de Transações */}
                <Card variant="outlined">
                    <CardContent sx={{ p: 0 }}>
                        <TransactionTable
                            transactions={filteredAndSortedTransactions}
                            people={people}
                            loading={loading}
                            filterId={filterId}
                            setFilterId={setFilterId}
                            filterDescription={filterDescription}
                            setFilterDescription={setFilterDescription}
                            filterValue={filterValue}
                            setFilterValue={setFilterValue}
                            filterType={filterType}
                            setFilterType={setFilterType}
                            filterPersonName={filterPersonName}
                            setFilterPersonName={setFilterPersonName}
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                            onView={handleViewTransaction}
                        />
                    </CardContent>
                </Card>

                {/* Contador de Itens */}
                {!loading && (
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', px: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', fontFamily: 'monospace' }}>
                            Exibindo {filteredAndSortedTransactions.length === 0 ? '0-0' : `1-${filteredAndSortedTransactions.length}`} de {transactions.length} transações.
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Modal de Nova Transaçao */}
            <TransactionFormDialog
                open={isCreateOpen}
                people={people}
                onClose={() => setIsCreateOpen(false)}
                onSubmit={handleCreateTransaction}
            />

            {/* Modal de Detalhes Transaçao */}
            <TransactionDetailsDialog
                open={isDetailsOpen}
                transaction={selectedTransaction}
                person={selectedTransactionPerson}
                onClose={() => {
                    setIsDetailsOpen(false);
                    setSelectedTransaction(null);
                }}
            />

            {/* Notificaçao Toast */}
            <ToastNotification
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={handleCloseToast}
            />
        </Container>
    );
}
