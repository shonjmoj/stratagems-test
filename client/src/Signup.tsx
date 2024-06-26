import { useContext, useState } from "react";
import Button from "./components/atoms/button";
import Input from "./components/atoms/input";
import { globalContext } from "./lib/contants";
import "./index.css";
import { userCredentials } from "./lib/types";
import { signup } from "./lib/utils";

function Signup() {
  const { navigate } = useContext(globalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nothingToSubmit = !username || !password;

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials: userCredentials = { username, password };
    const status = await signup(credentials);
    if (status === 201) {
      navigate("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container flex flex-col gap-3 md:gap-5 justify-center items-center p-2 sm:p-4 h-full"
    >
      <h1 className="text-3xl sm:text-4xl text-center font-bold">Sign up</h1>
      <Input
        value={username}
        type="text"
        placeholder="username"
        label="Username"
        onChange={handleUsernameChange}
      />
      <Input
        value={password}
        type="password"
        placeholder="password"
        label="Password"
        onChange={handlePasswordChange}
      />
      <Button
        disabled={nothingToSubmit}
        text="Sign up"
        type="submit"
        className="border border-slate-900 bg-slate-900 text-slate-300"
      />
      <span className="text-sm lg:text-base">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Login
        </a>
      </span>
    </form>
  );
}

export default Signup;
