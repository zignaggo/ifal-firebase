import { Box, Stack, Typography,  } from "@mui/material";
import { spacing } from "@mui/system";

export const Subject = (nome: string, color: string) => {
	return (
		<Box component="div" bgcolor={color}>
      {nome}
      teste

    </Box>
	)
}