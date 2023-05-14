import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { forwardRef, useCallback, useState } from "react";

export const Input = styled(TextField)({
  fieldset: {
    borderRadius: "8px",
  },
  input: {
    padding: 16,
  },
}) as typeof TextField;

type InputLabelProps = TextFieldProps & {
  invalidMessage?: string;
};

export const InputLabel = forwardRef(
  ({ invalidMessage, ...rest }: InputLabelProps, ref) => {
    return (
      <FormControl error variant="standard">
        <Input
          inputRef={ref}
          sx={{
            fieldset: {
              borderRadius: "8px",
            },
            input: {
              padding: "16px",
            },
          }}
          {...rest}
        />
        {invalidMessage && <FormHelperText>{invalidMessage}</FormHelperText>}
      </FormControl>
    );
  }
);
export const InputPassword = forwardRef(
  ({ invalidMessage, ...rest }: InputLabelProps, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = useCallback(
      () => setShowPassword((show) => !show),
      [showPassword]
    );
    const handleMouseDownPassword = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      },
      []
    );
    return (
      <FormControl error variant="standard">
        <Input
          type={showPassword ? "text" : "password"}
          inputRef={ref}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            fieldset: {
              borderRadius: "8px",
            },
            input: {
              padding: "16px",
            },
          }}
          {...rest}
        />
        {invalidMessage && <FormHelperText>{invalidMessage}</FormHelperText>}
      </FormControl>
    );
  }
);
