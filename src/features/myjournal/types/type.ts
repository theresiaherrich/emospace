interface JournalType {
    id: number;
    title: string;
    date: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export const Journal: JournalType[] = [
    {
        id: 1,
        title: 'Journal 1',
        date: 'April 12, 2025',
        content: 'im really happy',
        createdAt: '',
        updatedAt: '',
    },
    {
        id: 2,
        title: 'Journal 2',
        date: 'January 12, 2025',
        content: 'not really happy',
        createdAt: '',
        updatedAt: '',
    },
    {
        id: 3,
        title: 'Journal 3',
        date: 'April 12, 2024',
        content: 'idk how im feeling',
        createdAt: '',
        updatedAt: '',
    },
    {
        id: 4,
        title: 'Journal 4',
        date: 'January 12, 2024',
        content: 'its so embarrassing',
        createdAt: '',
        updatedAt: '',
    },
]; 