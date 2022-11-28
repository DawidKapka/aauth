export async function POST(user: {email: string, password: string}) {
  console.log(`Login: ${user.email}, ${user.password}`);
  return (async () => {
    const rawResponse = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content = await rawResponse.json();

    console.log(content);
  })();
}
