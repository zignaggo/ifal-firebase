import { Box, Stack, Typography } from "@mui/material"

export const Student = () => {
  return (
    <Stack bgcolor={"grey.50"} borderRadius={"8px"} paddingRight={1} direction={"row"} justifyContent={"space-between"}>
      <Stack direction={"row"} paddingLeft={1}>
        <Typography color={"grey.500"}>Image</Typography>
      <Stack paddingLeft={1}>
        <Typography color={"grey.600"}>nome</Typography>
        <Typography color={"grey.500"}>CPF</Typography>
      </Stack>
      </Stack>
      
      <Stack direction={"row"}>
        <Stack alignItems={"center"}>
          <Typography color={"grey.400"}>N1</Typography>
          <Typography color={"grey.600"}>nota</Typography>
        </Stack>

        <Stack paddingLeft={1} alignItems={"center"}>
          <Typography color={"grey.400"}>N2</Typography>
          <Typography color={"grey.600"}>nota</Typography>
        </Stack>

        <Stack paddingX={1} alignItems={"center"}>
          <Typography color={"grey.400"}>REP</Typography>
          <Typography color={"grey.600"}>nota</Typography>
        </Stack>

        <Stack paddingX={1} alignItems={"center"}>
          <Typography color={"grey.400"}>FINAL</Typography>
          <Typography color={"grey.600"}>nota</Typography>
        </Stack>

        <Stack paddingLeft={1} alignItems={"center"}>
          <Typography color={"grey.400"}>MÉDIA</Typography>
          <Typography color={"grey.600"}>nota</Typography>
        </Stack>
      </Stack>
      
      <Stack height={"100%"} justifyContent={"center"}>
        <Typography color={"grey.400"}>Situação</Typography>
      </Stack>
    </Stack>
  )
}