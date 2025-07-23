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

export interface ConsultantAPI {
  ID: number;
  UserID: number;
  Name: string;
  Title: string;
  Speciality: string;
  Experience: number;
  Rating: number;
  Price: number;
  ImageURL: string;
}