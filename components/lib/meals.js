export default async function saveMeal(meal) {
  // console.log("the meal from sharemeal :", meal);

  try {
    const apiUrl = process.env.DOMAIN || "http://localhost:3000";

    const response = await fetch(`${apiUrl}/api/meals/share`, {
      method: "POST",
      // body: formData,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response data:", errorData);
      throw new Error(
        "Saving meal failed: " + errorData.error || response.statusText
      );
    }

    const data = await response.json();
    // console.log("Response data:", data);

    return data;
  } catch (error) {
    console.error("Error saving meal:", error);
    throw new Error(
      "Saving meal failed: " + (error.message || "Unknown error")
    );
  }
}
