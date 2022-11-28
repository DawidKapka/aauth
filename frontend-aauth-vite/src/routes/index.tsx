import { Title } from "solid-start";
import './index.css'
import Login from "~/routes/login";

export default function Home() {
  return (
    <main class="main">
        <h1 class="title">A-Auth</h1>
        <Login class="login-component"/>
    </main>
  );
}
