import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Input = styled(TextField)({
  fieldset: {
    borderRadius: "8px",
  },
}) as typeof TextField;
