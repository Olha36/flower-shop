import { Button } from "@mui/material";

type BtnProps = {
  text: string;
  bgColor?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Btn = ({ text, bgColor, onClick, type }: BtnProps) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: bgColor,
          fontWeight: "bold",
          fontSize: "14px",
          lineHeight: "140%",
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          color: "#2C2825",
          "&:hover": {
            backgroundColor: bgColor,
          },
        }}
        onClick={onClick}
        type={type}
      >
        {text}
      </Button>
    </>
  );
};
export default Btn;
