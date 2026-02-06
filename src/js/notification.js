let currentNotification = null;

export function showNotification(text, duration = "default") {
  if (currentNotification) currentNotification.remove();

  if (duration === "default") duration = 5000;


  const box = document.createElement("div");
  box.innerHTML = text;

  Object.assign(box.style, {
    position: "fixed",
    top: "12vh",
    left: "50%",
    transform: "translateX(-50%)",
    width: "600px",
    maxWidth: "90%",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "1.5rem",
    borderRadius: "12px",
    backdropFilter: "blur(8px)",
    transition: "opacity .6s ease",
    opacity: "1",
    zIndex: "9999",
  });

  document.body.appendChild(box);
  currentNotification = box;

  setTimeout(() => {
    box.style.opacity = "0";
    box.addEventListener(
      "transitionend",
      () => {
        box.remove();
        currentNotification = null;
      },
      { once: true },
    );
  }, duration);
}
