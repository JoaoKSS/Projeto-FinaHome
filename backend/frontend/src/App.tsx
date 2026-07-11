import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { getCustomTheme } from './theme';
import { Sidebar } from './components/Sidebar';
import { PersonPage } from './PersonPage.tsx';
import { TransactionPage } from './TransactionPage.tsx';
import { TotalsPage } from './TotalsPage.tsx';

export default function App() {
    // Estado do tema escuro persistido
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const theme = useMemo(() => getCustomTheme(darkMode), [darkMode]);

    // Estado da navegaçao entre abas
    const [activeTab, setActiveTab] = useState<'people' | 'transactions' | 'totals'>('people');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                minHeight: '100vh', 
                bgcolor: 'background.default' 
            }}>
                <Sidebar 
                    darkMode={darkMode} 
                    onToggleDarkMode={() => setDarkMode(!darkMode)} 
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
                
                {/* Renderização condicional de páginas baseada na aba ativa */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {activeTab === 'people' && <PersonPage />}
                    {activeTab === 'transactions' && <TransactionPage />}
                    {activeTab === 'totals' && <TotalsPage />}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
