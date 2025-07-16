import { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState();

    useEffect(() => {
        async function getUsers() {
            const result = await fetch('http://localhost:8000/api/users');
            const json = await result.json();
            
            setUsers(json);
        }
        getUsers()
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users && users.map(user => (
                    <li key={user._id}>
                        <h3>Users id: {user._id}</h3>
                        <p>Users email: {user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;