export async function POST(user: {username: string, email: string, password: string}) {
  console.log(`Register: ${user.username} ${user.email}, ${user.password}`);
  return (async () => {
    const rawResponse = await fetch('http://localhost:3000/register', {
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
