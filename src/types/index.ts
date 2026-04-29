export interface Book {
    id: number;
    name: string;
    category: string;
    authorFullName: string;
    country: string;
    state: string;
    availableCopies: number;
    datePublished: string;
}
export interface Author {
    id: number;
    name: string;
    surname: string;
    countryName: string;
    continent: string;
}

export interface Country {
    id: number;
    name: string;
    continent: string;
}