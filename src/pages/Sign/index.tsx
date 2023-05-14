import { Box, Stack, Typography } from "@mui/material";
import { LogoIfal, Squares } from "../../assets/icons";

import { SignForm } from "./form";
export const Sign = () => {
  return (
    <Stack
      color={"grey.50"}
      overflow={"hidden"}
      direction={"column"}
      pt={"35px"}
      pb={"75px"}
      px={{
        start: "40px",
        md: "80px",
        lg: "125px",
      }}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
      position={"relative"}
    >
      <Stack
        direction={{
          start: "column",
          sm: "row",
        }}
        justifyContent={{
          start: "center",
          sm: "space-between",
        }}
        alignItems={"center"}
        width={"100%"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <LogoIfal />
          <Typography variant="BreeSerif" fontSize={32}>
            Sigaa²
          </Typography>
        </Stack>
        <Typography fontSize={16} variant="h1" lineHeight={2}>
          BR
        </Typography>
      </Stack>
      <SignForm />
      <Box
        position={"absolute"}
        bottom={0}
        left={"50%"}
        sx={{ transform: "translateX(-50%)" }}
        zIndex={0}
      >
        <Squares />
      </Box>
    </Stack>
  );
};
