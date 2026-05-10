import {
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,
    TextField
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import type {BookFormData} from "../../../api/types/book.ts";
import useAuthors from "../../../hooks/useAuthors.ts";


interface FormData {
    name: string;
    category: string;
    authorId: string;
    availableCopies: string;
    datePublished: string;
    bookState: string;
}

const initialFormData: FormData = {
    name: '',
    category: '',
    authorId: '',
    availableCopies: '',
    datePublished: '',
    bookState: ''
};

const CATEGORIES = ['NOVEL', 'THRILER', 'HISTORY', 'FANTASY', 'BIOGRAPHY', 'CLASSICS', 'DRAMA'];
const BOOK_STATES = ['GOOD', 'BAD'];

interface AddBookDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: BookFormData) => Promise<void>;
}

const AddBookDialog = ({ open, onClose, onAdd }: AddBookDialogProps) => {
    const { authors } = useAuthors();
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const payload: BookFormData = {
            name: formData.name.trim(),
            category: formData.category,
            authorId: Number(formData.authorId),
            availableCopies: Number(formData.availableCopies),
            datePublished: formData.datePublished,
            bookState: formData.bookState
        };

        await onAdd(payload);
        setFormData({ ...initialFormData });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Add Book</DialogTitle>
            <DialogContent>
                <TextField
                    margin='dense'
                    label='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />
                <FormControl margin='dense' fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        label='Category'
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        variant='outlined'>
                        {CATEGORIES.map((cat) => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl margin='dense' fullWidth>
                    <InputLabel>Author</InputLabel>
                    <Select
                        label='Author'
                        name='authorId'
                        value={formData.authorId}
                        onChange={handleChange}
                        variant='outlined'>
                        {authors.map((author) => (
                            <MenuItem key={author.id} value={author.id}>
                                {author.name} {author.surname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin='dense'
                    label='Available Copies'
                    name='availableCopies'
                    value={formData.availableCopies}
                    onChange={handleChange}
                    type='number'
                    fullWidth
                />
                <TextField
                    margin='dense'
                    label='Date Published'
                    name='datePublished'
                    value={formData.datePublished}
                    onChange={handleChange}
                    type='date'
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <FormControl margin='dense' fullWidth>
                    <InputLabel>Book State</InputLabel>
                    <Select
                        label='Book State'
                        name='bookState'
                        value={formData.bookState}
                        onChange={handleChange}
                        variant='outlined'>
                        {BOOK_STATES.map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant='contained' color='primary'>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddBookDialog;