export interface dataSpecialist {
    id: number;
    name: string;
    photo: string;
    job: string;
    expertise: string;
    experience: string;
    rating: string;
    price: number;
}

export const dataSpecialists: dataSpecialist[] = [
    {
        id: 1,
        name: "Luluk Permatasari S.psi, M. Psi, Psikolog",
        photo: "/assets/specialist-photo.png",
        job: "Psikolog Klinis Anak",
        expertise: "Keluarga",
        experience: "3 tahun",
        rating: "90%",
        price: 50000
    },
    {
        id: 2,
        name: "Kenny Mariyah S.psi, M. Psi, Psikolog",
        photo: "/assets/specialist-photo.png",
        job: "Psikolog Klinis Dewasa",
        expertise: "Stress",
        experience: "1 tahun",
        rating: "85%",
        price: 50000
    },
    {
        id: 3,
        name: "Bobby Bondan Saputra S.psi, M. Psi, Psikolog",
        photo: "/assets/specialist-photo.png",
        job: "Psikolog Klinis Remaja",
        expertise: "Stress, Keluarga dan Hubungan",
        experience: "2 tahun",
        rating: "100%",
        price: 50000
    },
];