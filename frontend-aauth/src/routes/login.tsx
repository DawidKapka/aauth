import {Title} from "solid-start";
import Input from "~/components/Input";
import {createSignal} from "solid-js";
import {POST} from "~/routes/api/login";

export default function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  return (
    <main>
      <Title>Aauth Login</Title>
      <h1>LOGIN PAGE</h1>
      <Input placeholder={"Email"} setter={setEmail}></Input>
      <Input placeholder={"Password"} inputType={'password'} setter={setPassword}></Input>
      <button onClick={() => POST({email: email(), password: password()})}></button>
    </main>
  );
}
