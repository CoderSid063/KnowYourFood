"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  console.log(callbackUrl);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password,
      });

      console.log("Sign-in result:", response);

      if (response.ok) {
        console.log("Login success");
        console.log(callbackUrl);
        // router.push("/");
        router.push(callbackUrl);
      } else {
        console.log("Login failed", response.error);
      }
    } catch (error) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className={styles.input}
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
        className={styles.input}
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className={styles.button}
        disabled={buttonDisabled}
      >
        Login here
      </button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  );
}
