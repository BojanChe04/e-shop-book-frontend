import { Typography, Divider, Box } from '@mui/material';

interface Props {
    title: string;
    subtitle?: string;
}

const Header = ({ title, subtitle }: Props) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom noWrap sx={{ fontWeight: 'bold'}}>
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                    {subtitle}
                </Typography>
            )}
            <Divider sx={{ mt: 2 }} />
        </Box>
    );
};

export default Header;