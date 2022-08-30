export type User = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const users: User[] = [
  {
    email: "example@example.com",
    firstName: "Josef",
    lastName: "Novak",
    password: "topSecret",
  },
];

export default users;
