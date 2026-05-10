import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth.ts';

interface Field {
    label: string;
    value: string | number;
    chip?: boolean;
}

interface Props {
    title: string;
    fields: Field[];
    navigateTo: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const EntityCard = ({ title, fields, navigateTo, onEdit, onDelete }: Props) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isAdmin = user?.roles?.includes('ROLE_ADMIN');

    return (
        <Card elevation={2} sx={{ height: '100%', borderRadius: 2, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', flexGrow: 1 }} onClick={() => navigate(navigateTo)}>
                        {title}
                    </Typography>
                    {isAdmin && (
                        <Box>
                            {onEdit && (
                                <IconButton size="small" color="primary" onClick={onEdit}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            )}
                            {onDelete && (
                                <IconButton size="small" color="error" onClick={onDelete}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                    )}
                </Box>
                <Box onClick={() => navigate(navigateTo)} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
        </Card>
    );
};

export default EntityCard;