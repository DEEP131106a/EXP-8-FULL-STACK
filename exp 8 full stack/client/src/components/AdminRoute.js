export default function AdminRoute({ children }) {
  const role = localStorage.getItem("role");

  return role === "admin" ? children : <h1>Unauthorized</h1>;
}