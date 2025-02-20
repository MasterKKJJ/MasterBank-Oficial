
"use client"
import { useParams } from "next/navigation";
const UserProfile = () => {
    const param = useParams();
    const { id } = param

    return (
        <div>
            <h1>Perfil do Usuário</h1>
            <p>ID do usuário: {id}</p>
        </div>
    );
};

export default UserProfile;

