'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    })
      .then((res) => {
        if (res?.error) {
          alert(res.error);
        }
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="border border-gray-300"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            className="border border-gray-300"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </>
  );
}
