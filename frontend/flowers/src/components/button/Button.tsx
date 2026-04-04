import { Button } from "@mui/material";

type BtnProps = {
  text: string;
  bgColor?: string;
};

const Btn = ({ text, bgColor }: BtnProps) => {
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
      >
        {text}
      </Button>
    </>
  );
};
export default Btn;
