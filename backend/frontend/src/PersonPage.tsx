import { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    useTheme,
    useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Tipos e Componentes
import type { Person } from './types';
import { api } from './services/api';
import { PersonTable } from './components/PersonTable';
import { PersonMobileList } from './components/PersonMobileList';
import { PersonFormDialog } from './components/PersonFormDialog';
import { PersonDetailsDialog } from './components/PersonDetailsDialog';
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog';
import { ToastNotification } from './components/ToastNotification';

export function PersonPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Estados de dados
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados de controle dos modais
    const [editingPerson, setEditingPerson] = useState<Person | null>(null);
    const [viewingPerson, setViewingPerson] = useState<Person | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [deleteConfirmPerson, setDeleteConfirmPerson] = useState<Person | null>(null);

    // Toast local para notificações
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
    const [filterName, setFilterName] = useState('');
    const [filterAge, setFilterAge] = useState('');
    const [sortColumn, setSortColumn] = useState<'id' | 'name' | 'age' | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

    const handleSort = (column: 'id' | 'name' | 'age') => {
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

    // Busca dados do backend
    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const data = await api.getPeople();
                setPeople(data);
            } catch (err: any) {
                showToast(err.message || 'Não foi possível carregar os dados.', 'warning');
            } finally {
                setLoading(false);
            }
        };
        fetchPeople();
    }, []);

    // Processamento de filtros e ordenação em memória
    const filteredAndSortedPeople = useMemo(() => {
        let result = [...people];

        if (filterId.trim()) {
            result = result.filter((p) => p.id?.toString().includes(filterId.trim()));
        }
        if (filterName.trim()) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(filterName.trim().toLowerCase())
            );
        }
        if (filterAge.trim()) {
            result = result.filter((p) => p.age.toString().includes(filterAge.trim()));
        }

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
    }, [people, filterId, filterName, filterAge, sortColumn, sortDirection]);

    // Salvar ou Atualizar
    const handleFormSubmit = async (name: string, age: number) => {
        const personData = { name, age };

        try {
            if (editingPerson && editingPerson.id !== undefined) {
                // Atualizando registro existente
                await api.updatePerson(editingPerson.id, { id: editingPerson.id, ...personData });
                setPeople((prev) =>
                    prev.map((p) => (p.id === editingPerson.id ? { ...p, ...personData } : p))
                );
                setEditingPerson(null);
                showToast('Cadastro atualizado com sucesso!', 'success');
            } else {
                // Criando novo registro
                const newPerson = await api.createPerson(personData);
                setPeople((prev) => [...prev, newPerson]);
                setIsCreateOpen(false);
                showToast('Cadastro realizado com sucesso!', 'success');
            }
        } catch (err: any) {
            showToast(err.message || 'Erro ao salvar alterações.', 'warning');
        }
    };

    // Excluir
    const handleConfirmDelete = async () => {
        if (!deleteConfirmPerson || deleteConfirmPerson.id === undefined) return;
        try {
            await api.deletePerson(deleteConfirmPerson.id);
            setPeople((prev) => prev.filter((p) => p.id !== deleteConfirmPerson.id));
            if (viewingPerson?.id === deleteConfirmPerson.id) {
                setViewingPerson(null);
            }
            showToast('Registro excluído com sucesso!', 'success');
        } catch (err: any) {
            showToast(err.message || 'Erro ao excluir pessoa.', 'warning');
        } finally {
            setDeleteConfirmPerson(null);
        }
    };

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
                            Pessoas Registradas
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
                        Nova Pessoa
                    </Button>
                </Box>

                {/* Tabela ou Lista */}
                {!isMobile ? (
                    <Card variant="outlined">
                        <CardContent sx={{ p: 0 }}>
                            <PersonTable
                                people={filteredAndSortedPeople}
                                loading={loading}
                                filterId={filterId}
                                setFilterId={setFilterId}
                                filterName={filterName}
                                setFilterName={setFilterName}
                                filterAge={filterAge}
                                setFilterAge={setFilterAge}
                                sortColumn={sortColumn}
                                sortDirection={sortDirection}
                                onSort={handleSort}
                                onView={setViewingPerson}
                                onEdit={setEditingPerson}
                                onDelete={setDeleteConfirmPerson}
                            />
                        </CardContent>
                    </Card>
                ) : (
                    <PersonMobileList
                        people={filteredAndSortedPeople}
                        loading={loading}
                        filterId={filterId}
                        setFilterId={setFilterId}
                        filterName={filterName}
                        setFilterName={setFilterName}
                        filterAge={filterAge}
                        setFilterAge={setFilterAge}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                        onView={setViewingPerson}
                        onEdit={setEditingPerson}
                        onDelete={setDeleteConfirmPerson}
                    />
                )}
                
                {/* Indicador de Quantidade */}
                {!loading && (
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', px: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', fontFamily: 'monospace' }}>
                            Exibindo {filteredAndSortedPeople.length === 0 ? '0-0' : `1-${filteredAndSortedPeople.length}`} de {people.length} itens.
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Modais */}
            <PersonFormDialog
                open={isCreateOpen || editingPerson !== null}
                person={editingPerson}
                onClose={() => {
                    setIsCreateOpen(false);
                    setEditingPerson(null);
                }}
                onSubmit={handleFormSubmit}
            />

            <PersonDetailsDialog
                open={viewingPerson !== null}
                person={viewingPerson}
                onClose={() => setViewingPerson(null)}
                onStartEdit={(person) => {
                    setViewingPerson(null);
                    setEditingPerson(person);
                }}
            />

            <DeleteConfirmDialog
                open={deleteConfirmPerson !== null}
                person={deleteConfirmPerson}
                onClose={() => setDeleteConfirmPerson(null)}
                onConfirm={handleConfirmDelete}
            />

            <ToastNotification
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={handleCloseToast}
            />
        </Container>
    );
}
