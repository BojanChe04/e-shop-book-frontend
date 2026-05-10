export  interface Book {
    id: number;
    name: string;
    category: string;
    authorFullName: string;
    country: string;
    state: string;
    availableCopies: number;
    datePublished: string;
}
export interface BookDetails {
    id: number;
    name: string;
    category: string;
    authorFullName: string;
    country: string;
    state: string;
    availableCopies: number;
    datePublished: string;
}
export interface BookFormData {
    name: string;
    category: string;
    authorId: number;
    availableCopies: number;
    datePublished: string;
    bookState: string;
}