'use client'
import Link from 'next/link';
import './Users.css'
import useFetchUsers from "@/components/fetch/useFetchUsers";
const Users = () => {
  const { users, error, loading } = useFetchUsers();

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="container-users">
      <div className='header'>
        <h2 className='user_header'>Users</h2>
      </div>
      <div className='user_display'>
        <h2 className="users-list-title">Users List</h2>
        <ul className="users-list">
          {users.map((user) => (
            <Link href={`/admin/users/${user.id}`} className='icon-link'>
              <li key={user.id} className="user-item">
                <span className="user-name">{user.username}</span>
                <br />
                <span className="user-email">{user.email}</span>
              </li>
            </Link>

          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;