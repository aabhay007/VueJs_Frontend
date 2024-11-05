// cursor.js or inline <script> tag in your HTML file

document.addEventListener("mousemove", (event) => {
    const cursor = document.querySelector(".sci-fi-cursor");
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
  