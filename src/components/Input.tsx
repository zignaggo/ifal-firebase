import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Input = styled(TextField)({
  fieldset: {
    borderRadius: "8px",
  },
  input: {
    padding: 16,
  },
}) as typeof TextField;
