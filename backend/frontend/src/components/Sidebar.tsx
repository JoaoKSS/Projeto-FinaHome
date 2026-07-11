import { Paper, Box, Typography, Button, IconButton, Stack, Avatar } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PersonIcon from '@mui/icons-material/Person';

interface SidebarProps {
    darkMode: boolean;
    onToggleDarkMode: () => void;
}

export const Sidebar = ({ darkMode, onToggleDarkMode }: SidebarProps) => {
    return (
        <>
            {/* Sidebar principal */}
            <Paper
                elevation={0}
                sx={{
                    width: { xs: '100%', md: 280 },
                    minWidth: { md: 280 },
                    flexShrink: 0,
                    height: { xs: 'auto', md: '100vh' },
                    position: { xs: 'static', md: 'sticky' },
                    top: 0,
                    alignSelf: 'stretch',
                    borderRadius: 0,
                    borderRight: 'none',
                    borderBottom: 'none',
                    display: 'flex',
                    flexDirection: { xs: 'row', md: 'column' },
                    alignItems: { xs: 'center', md: 'stretch' },
                    justifyContent: 'space-between',
                    p: { xs: 2, md: 3 },
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1d1a39' : '#ede9fe',
                    zIndex: 1100,
                }}
            >
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: { xs: 0, md: 6 }, mt: { xs: 0, md: 1 } }}>
                    <Avatar sx={{ bgcolor: '#6366f1', color: '#ffffff', width: 40, height: 40, borderRadius: '12px' }}>
                        <WalletIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2, color: 'text.primary', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                            FinaHome
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                            Gastos Residenciais
                        </Typography>
                    </Box>
                </Box>

                {/* Menu Desktop */}
                <Stack 
                    direction="column" 
                    spacing={1} 
                    sx={{ 
                        display: { xs: 'none', md: 'flex' },
                        flexGrow: 1, 
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch'
                    }}
                >
                    <Button
                        variant="text"
                        startIcon={<PeopleIcon />}
                        sx={{
                            justifyContent: 'flex-start',
                            py: 1.5,
                            px: 2,
                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#c7d2fe' : '#ffffff',
                            color: (theme) => theme.palette.mode === 'dark' ? '#110f20' : '#4f46e5',
                            borderRadius: '12px',
                            fontWeight: 700,
                            boxShadow: (theme) => theme.palette.mode === 'dark' ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.05)',
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#a5b4fc' : '#ffffff',
                                opacity: 0.95
                            }
                        }}
                    >
                        Pessoas
                    </Button>
                    <Button
                        variant="text"
                        startIcon={<ReceiptIcon />}
                        disabled
                        sx={{
                            justifyContent: 'flex-start',
                            py: 1.5,
                            px: 2,
                            borderRadius: '12px',
                            color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.45)',
                            '&.Mui-disabled': {
                                color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3) !important' : 'rgba(0, 0, 0, 0.3) !important',
                            }
                        }}
                    >
                        Transações
                    </Button>
                    <Button
                        variant="text"
                        startIcon={<BarChartIcon />}
                        disabled
                        sx={{
                            justifyContent: 'flex-start',
                            py: 1.5,
                            px: 2,
                            borderRadius: '12px',
                            color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.45)',
                            '&.Mui-disabled': {
                                color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3) !important' : 'rgba(0, 0, 0, 0.3) !important',
                            }
                        }}
                    >
                        Totais
                    </Button>
                </Stack>

                {/* Rodapé do Menu */}
                <Stack 
                    direction="row"
                    spacing={1.5}
                    sx={{ 
                        alignItems: 'center',
                        justifyContent: { xs: 'center', md: 'space-between' },
                        width: { xs: 'auto', md: '100%' },
                        pt: { xs: 0, md: 2 }, 
                        borderTop: 'none',
                    }}
                >
                    <Avatar sx={{ bgcolor: '#10b981', color: '#ffffff', width: 32, height: 32 }}>
                        <PersonIcon fontSize="small" />
                    </Avatar>
                    <IconButton 
                        onClick={onToggleDarkMode} 
                        sx={{ 
                            color: 'text.primary', 
                            borderRadius: '10px', 
                            p: 0.75,
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                    </IconButton>
                </Stack>
            </Paper>

            {/* Bottom Navigation Mobile */}
            <Paper 
                elevation={10} 
                sx={{ 
                    display: { xs: 'flex', md: 'none' }, 
                    position: 'fixed', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    zIndex: 1200,
                    borderRadius: 0,
                    borderTop: 'none',
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1d1a39' : '#ede9fe',
                    height: 64,
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                <Button
                    variant="text"
                    startIcon={<PeopleIcon />}
                    sx={{
                        flexDirection: 'column',
                        '& .MuiButton-startIcon': { margin: 0, marginBottom: '2px' },
                        color: (theme) => theme.palette.mode === 'dark' ? '#110f20' : '#4f46e5',
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#c7d2fe' : '#ffffff',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        py: 0.5,
                        px: 1.5,
                        minWidth: 64,
                        boxShadow: (theme) => theme.palette.mode === 'dark' ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.04)',
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#a5b4fc' : '#ffffff',
                        }
                    }}
                >
                    Pessoas
                </Button>
                <Button
                    variant="text"
                    startIcon={<ReceiptIcon />}
                    disabled
                    sx={{
                        flexDirection: 'column',
                        '& .MuiButton-startIcon': { margin: 0, marginBottom: '2px' },
                        color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.45)',
                        fontSize: '0.7rem',
                        textTransform: 'none',
                        py: 0.5,
                        minWidth: 64,
                        '&.Mui-disabled': {
                            color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3) !important' : 'rgba(0, 0, 0, 0.3) !important',
                        }
                    }}
                >
                    Transações
                </Button>
                <Button
                    variant="text"
                    startIcon={<BarChartIcon />}
                    disabled
                    sx={{
                        flexDirection: 'column',
                        '& .MuiButton-startIcon': { margin: 0, marginBottom: '2px' },
                        color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.45)',
                        fontSize: '0.7rem',
                        textTransform: 'none',
                        py: 0.5,
                        minWidth: 64,
                        '&.Mui-disabled': {
                            color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3) !important' : 'rgba(0, 0, 0, 0.3) !important',
                        }
                    }}
                >
                    Totais
                </Button>
            </Paper>
        </>
    );
};
