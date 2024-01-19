import React from 'react'

const Themes = () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 6);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = futureDate.toLocaleDateString(undefined, options);
  return (
    <div>
      <h1>{formattedDate}</h1>
    </div>
  );
}

export default Themes
