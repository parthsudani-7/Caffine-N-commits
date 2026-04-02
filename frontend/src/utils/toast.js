export const showToast = (message) => {
  const toast = document.createElement("div");
  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#00B8A0";
  toast.style.color = "black";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "8px";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
};