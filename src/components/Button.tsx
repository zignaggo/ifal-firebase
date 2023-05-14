import { Padding } from "@mui/icons-material";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Button = styled(MuiButton)({
  borderRadius: "9999px",
  padding: 12,
  color: "success.main",
  backgroundColor: "#51BF64",
  ":hover": {
    backgroundColor: "#45A656",
  },
}) as typeof MuiButton;
