import {Title} from "solid-start";
import Input from "~/components/Input";
import {createSignal} from "solid-js";
import {POST} from "~/routes/api/register";

export default function Register() {
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [repeatPassword, setRepeatPassword] = createSignal("");
  let errorMessage = ""

  async function send() {
    errorMessage = ""
    if (password() !== repeatPassword()) {
      errorMessage = "the passwords don't match."
      return;
    }
    await POST({username: username(), email: email(), password: password()})

  }

  return (
    <main>
      <Title>Aauth Register</Title>
      <h1>REGISTER PAGE</h1>

      <div style={"color:red;"}>{errorMessage}</div>
      <Input placeholder={"Username"} inputType={"text"} setter={setUsername}></Input>
      <Input placeholder={"Email"} inputType={"email"} setter={setEmail}></Input>
      <Input placeholder={"Password"} inputType={"password"} setter={setPassword}></Input>
      <Input placeholder={"Repeat Password"} inputType={"password"} setter={setRepeatPassword}></Input>
      <button onClick={send}>Register</button>
    </main>
  );
}


