import {Title} from "solid-start";
import Input from "~/components/Input";
import {createSignal} from "solid-js";
import {POST} from "~/routes/api/login";
import './login.css'

export default function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  return (
    <div class="login">
      <Title>Aauth Login</Title>
      <h1>LOGIN PAGE</h1>
      <Input placeholder={"Email"} setter={setEmail}></Input>
      <Input placeholder={"Password"} inputType={'password'} setter={setPassword}></Input>
      <button onClick={() => POST({email: email(), password: password()})}></button>
    </div>
  );
}
