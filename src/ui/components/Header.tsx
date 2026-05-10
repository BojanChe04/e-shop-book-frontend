import { Typography, Divider, Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth.ts';

interface Props {
    title: string;
    subtitle?: string;
    onAdd?: () => void;
}

const Header = ({ title, subtitle, onAdd }: Props) => {
    const { user } = useAuth();
    const isAdmin = user?.roles?.includes('ROLE_ADMIN');

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h6" gutterBottom noWrap sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                            {subtitle}
                        </Typography>
                    )}
                </Box>
                {onAdd && isAdmin && (
                    <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
                        Add
                    </Button>
                )}
            </Box>
            <Divider sx={{ mt: 2 }} />
        </Box>
    );
};

export default Header;