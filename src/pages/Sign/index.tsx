import { Box, Stack, Typography } from "@mui/material";
import { LogoIfal, Squares } from "../../assets/icons";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
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
      <Stack
        direction={"column"}
        px={{
          start: "25px",
          sm: "35px",
        }}
        py={{
          start: "30px",
          sm: "40px",
        }}
        bgcolor={"grey.50"}
        spacing={2}
        marginBottom={"auto"}
        marginTop={"auto"}
        color={"grey.600"}
        borderRadius={3}
        width={{
          start: "330px",
          sm: "500px",
        }}
        minHeight={{
          start: "330px",
          sm: "380px",
        }}
        zIndex={1}
        justifyContent={"space-between"}
      >
        <Stack spacing={1}>
          <Typography
            fontSize={{
              start: 24,
              sm: 32,
            }}
            lineHeight={{
              start: "24px",
              sm: "32px",
            }}
            fontWeight={"bold"}
          >
            Entre na sua Conta
          </Typography>
          <Typography
            fontSize={{
              start: 20,
              sm: 24,
            }}
            lineHeight={{
              start: "20px",
              sm: "24px",
            }}
          >
            de Administrador
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Input placeholder="Ex: teste@teste.com" label="Email" />
          <Input placeholder="Digite sua senha" label="Senha" />
        </Stack>
        <Button variant="contained">Entrar</Button>
      </Stack>
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
