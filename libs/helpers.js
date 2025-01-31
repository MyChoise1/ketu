export const signOut = async (onLogout) => {
  const res = await fetch("/api/auth", {
    method: "DELETE",
  });

  if (res.ok) {
    window && window.location.reload();
  } else {
    throw new Error("Failed to logout!");
  }
};
