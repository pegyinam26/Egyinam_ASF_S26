import {useNavigate} from "react-router";
import {useState} from "react";


export default function LoginPage(){
    const navigate = useNavigate();
    const [form, setform] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: any) => {
        setform({ ...form,[e.target.name]: e.target.value});
    };

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            if(!res.ok) throw new Error();
            const data = await res.json();

            //store user/admin role
            localStorage.setItem("role", data.role);

            //redirect based on role
            if (data.role ==="ADMIN"){
                navigate("/admin");
            } else {
                navigate("/booking");
            }
        }catch{
            setError("Invalid username or password");
        }
    };

    return(
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                {error &&  (
                    <div className="text-red-500 text-sm mb-3">{error}</div>
                )}

                <input
                    name="username"
                    placeholder="Username"
                    className="border p-2 w-full mb-3"
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-3"
                    onChange={handleChange}
                />
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white w-full py-2"
                > Login </button>

            </div>
        </div>
    );
}