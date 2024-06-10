import styles from "./userprofile.module.css";

export default function UserProfile({ params }) {
  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <hr />
      <p className={styles.profileText}>
        Profile page
        <span className={styles.profileId}>{params.id}</span>
      </p>
    </div>
  );
}
