import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    fetch("/users.json")
      .then((response) => response.json())
      .then((data) => {
        const users = data.users;
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        console.log(user);
        if (user) {
          setAuthenticated(true);
          setMessage("Login bem-sucedido!");
          console.log("Login bem-sucedido!");
          localStorage.setItem("authenticated", "true");
          navigate("/dashboard");
        } else {
          setMessage("Login falhou. Verifique suas credenciais.");
        }
      });
  };

  if (authenticated) {
    return redirect("/dashboard");
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input
        type="text"
        placeholder="Nome de Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
