"use client";
import Link from "next/link";
import Image from "next/image";
import style from "./meal-item.module.css";
import { useRouter } from "next/navigation";

export default function MealItem({
  title,
  slug,
  image,
  summary,
  creator,
  _id,
}) {
  const router = useRouter();
  const deleteMeal = async () => {
    const response = await fetch(`api/meals?id=${_id}`, {
      method: "DELETE",
    });

    console.log(response);
    if (response.ok) {
      alert("deleted");
      router.push("/");
    } else {
      console.error("Faied to delete the meal");
    }
  };

  return (
    <article className={style.meal}>
      <header>
        <div className={style.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={style.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={style.content}>
        <p className={style.summary}>{summary}</p>
        <div className={style.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
          <button onClick={deleteMeal}>DELETE</button>
        </div>
      </div>
    </article>
  );
}
