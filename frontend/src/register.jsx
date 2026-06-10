import { useState } from "react";

const Register = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:9000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("Response:", data);
  } catch (error) {
    console.log("Error:", error);
  }
};

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Register
        </button>

        <p style={styles.text}>
          Already have an account?{" "}
          <span style={styles.link} onClick={onSwitch}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    borderRadius: "10px",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
  },
  button: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  text: {
    marginTop: "10px",
    textAlign: "center",
  },
  link: {
    color: "green",
    cursor: "pointer",
  },
};

export default Register;