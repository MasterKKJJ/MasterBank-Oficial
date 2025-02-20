import { notFound } from "next/navigation";

interface UserPageProps {
    params: { id: string };
}
interface User {
    name: string
    id?: number
    role: string
    posse?: number
}
const users: User[] = [
    {
        name: 'Lucas',
        role: "Assistente",
        id: 11
    }, {
        name: 'Admin',
        role: "Administrador",
        id: 0,
        posse: 1
    }
]
const getUser = (id: number): User => {

    const user = users.find(user => user.id === id)
    if (!user) return notFound();
    return user;

}

const UserPage = async ({ params }: UserPageProps) => {
    const id = Number(params.id);
    const user = await getUser(id)

    return (
        <div>
            {Object.entries(user)
                .filter(([key]) => key !== 'id')
                .map(([key, value]) => (
                    <p key={key}>
                        <strong>{key}:</strong> {String(value)}
                    </p>
                ))}
        </div>

    );
};

export default UserPage;
