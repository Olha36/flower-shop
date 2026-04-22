export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "calc(100% - 32px)", sm: 520 },
  maxWidth: "100%",
  bgcolor: "#fffdf8",
  borderRadius: "24px",
  boxShadow: "0 24px 80px rgba(23, 22, 21, 0.18)",
  px: { xs: 2.5, sm: 4 },
  py: { xs: 3, sm: 4 },
  outline: "none",
};

export const textareaStyle = {
  width: "100%",
  resize: "vertical" as const,
  borderRadius: "12px",
  border: "1px solid #DAE2ED",
  padding: "14px 16px",
  fontSize: "0.95rem",
  fontFamily: "IBM Plex Sans, sans-serif",
  backgroundColor: "#fff",
  color: "#1C2025",
  boxSizing: "border-box" as const,
};
