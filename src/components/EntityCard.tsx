import { Card, CardContent, CardActionArea, Typography, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router';

interface Field {
    label: string;
    value: string | number;
    chip?: boolean;
}

interface Props {
    title: string;
    fields: Field[];
    navigateTo: string;
}

const EntityCard = ({ title, fields, navigateTo }: Props) => {
    const navigate = useNavigate();

    return (
        <Card elevation={2} sx={{ height: '100%', borderRadius: 2, transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
            <CardActionArea onClick={() => navigate(navigateTo)} sx={{ height: '100%' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom noWrap sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {fields.map((field) => (
                            <Box key={field.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ minWidth: 90 }}>
                                    {field.label}:
                                </Typography>
                                {field.chip ? (
                                    <Chip label={field.value} size="small" variant="outlined" />
                                ) : (
                                    <Typography variant="body2">{field.value}</Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default EntityCard;