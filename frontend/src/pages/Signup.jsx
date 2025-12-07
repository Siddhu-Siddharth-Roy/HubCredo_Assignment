import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup =()=> {
     const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://hubcredo-assignment-qopl.onrender.com/api/auth/signup", form);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      alert(res.data.message);
      
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Signup</h2>
      <form className="mt-3 w-50" onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="form-control mb-3" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input className="form-control mb-3" placeholder="Password" type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="btn btn-primary w-100">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
