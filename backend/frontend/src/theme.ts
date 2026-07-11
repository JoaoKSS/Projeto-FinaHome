import { createTheme } from '@mui/material';

export const getCustomTheme = (darkMode: boolean) => {
    return createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#6366f1',
                light: '#818cf8',
                dark: '#4f46e5',
                contrastText: '#ffffff',
            },
            background: {
                default: darkMode ? '#0b0f19' : '#f8fafc',
                paper: darkMode ? '#111827' : '#ffffff',
            },
            text: {
                primary: darkMode ? '#f3f4f6' : '#0f172a',
                secondary: darkMode ? '#9ca3af' : '#475569',
            },
        },
        typography: {
            fontFamily: '"Inter", "Outfit", "Roboto", sans-serif',
            h4: {
                fontWeight: 800,
                letterSpacing: '-0.02em',
            },
            h5: {
                fontWeight: 700,
                letterSpacing: '-0.01em',
            },
        },
        shape: {
            borderRadius: 16,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '10px 20px',
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    },
                },
                variants: [
                    {
                        props: { variant: 'contained', color: 'primary' },
                        style: {
                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                            color: '#ffffff',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                            },
                        },
                    },
                ],
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        boxShadow: darkMode
                            ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)'
                            : '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
                        border: '1px solid',
                        borderColor: darkMode ? '#1e293b' : '#e2e8f0',
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        padding: '16px 20px',
                        borderColor: darkMode ? '#1e293b' : '#f1f5f9',
                        borderRight: '1px solid',
                        borderRightColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(226, 232, 240, 0.4)',
                        '&:last-child': {
                            borderRight: 'none',
                        },
                    },
                    head: {
                        fontWeight: 700,
                        backgroundColor: darkMode ? '#1f2937' : '#f8fafc',
                        color: darkMode ? '#9ca3af' : '#475569',
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            backgroundColor: darkMode ? '#1f2937' : '#f8fafc',
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 12,
                            transition: 'all 0.2s ease',
                            '& fieldset': {
                                borderColor: darkMode ? '#334155' : '#cbd5e1',
                            },
                            '&:hover fieldset': {
                                borderColor: '#6366f1',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#6366f1',
                                borderWidth: '2px',
                            },
                        },
                    },
                },
            },
        },
    });
};
