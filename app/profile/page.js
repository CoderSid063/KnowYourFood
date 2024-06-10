"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className={styles.container}>
      <h1>Profile Page</h1>
      <hr />
      <p>Profile page</p>
      <h2 className={styles.title}>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className={`${styles.button} ${styles.logoutButton}`}
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className={`${styles.button} ${styles.detailsButton}`}
      >
        Get User Details
      </button>
    </div>
  );
}
