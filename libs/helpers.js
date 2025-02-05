import { useEffect, useState } from "react";

export const signOut = async (onLogout) => {
  const res = await fetch("/api/auth", {
    method: "DELETE",
  });

  if (res.ok) {
    window && window.location.replace('/') && window.location.reload();
  } else {
    throw new Error("Failed to logout!");
  }
};

export const useUserData = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/user");
        const userData = await res.json();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    user,
    error,
  };
};
