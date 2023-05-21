import {
  Stack,
  Typography,
  useMediaQuery,
  Accordion,
  Avatar,
} from "@mui/material"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useCallback, useMemo, useState } from "react"

interface studentInfo {
  photoUrl: string
  nome: string
  cpf: string
  n1: number
  n2: number
  rep: number
  final: number
}

export const Student = ({
  photoUrl,
  nome,
  cpf,
  n1,
  n2,
  rep,
  final,
}: studentInfo) => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = useCallback(
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    },
    []
  )
    
  const mobile = useMediaQuery("(max-width:1200px)", { noSsr: true })

  const media = useMemo(() => {
    if (final >= 0) return final
    if ((n1 == -1 || n2 == -1) && rep >= 0) {
      if (n1 == -1) {
        n1 = rep
      }
      else  {
        n2 = rep
      }
    }
    return (n1 + n2) / 2
  }, [n1, n2, rep, final])

  const status = useMemo(() => {
    if (n1 == -1 && n2 == -1) return "MATRICULADO"
    if (media < 7) return "REPROVADO"
    return "APROVADO"
  }, [n1, n2, final, media])

  return mobile ? (
    <Accordion
      expanded={expanded == "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1"
        id="panel1"
      >
        <Stack paddingRight={1}>
          <Stack
            direction={"row"}
            paddingLeft={1}
            alignItems={"center"}
          >
            <Avatar src={photoUrl} />

            <Stack paddingLeft={1}>
              <Typography color={"grey.600"}>{nome}</Typography>
              <Typography color={"grey.500"}>{cpf}</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          marginLeft={"auto"}
          marginTop={2}
          height={"100%"}
          justifyContent={"center"}
          paddingRight={2}
        >
          <Typography color={status == "APROVADO" ? "success.main" : status === "REPROVADO" ? "error.main" : "grey.600"}>{status}</Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Stack
          paddingLeft={1}
          paddingRight={5}
          justifyContent={"space-between"}
          direction={"row"}
        >
          <Stack direction={"row"}>
            <Stack alignItems={"center"}>
              <Typography color={"grey.400"}>N1</Typography>
              <Typography color={"grey.600"}>{n1 == -1 ? "-" : n1}</Typography>
            </Stack>

            <Stack paddingLeft={2} alignItems={"center"}>
              <Typography color={"grey.400"}>N2</Typography>
              <Typography color={"grey.600"}>{n2 == -1 ? "-" : n2}</Typography>
            </Stack>

            <Stack paddingLeft={2} alignItems={"center"}>
              <Typography color={"grey.400"}>REP</Typography>
              <Typography color={"grey.600"}>{rep == -1 ? "-" : rep}</Typography>
            </Stack>

            <Stack paddingLeft={2} alignItems={"center"}>
              <Typography color={"grey.400"}>FINAL</Typography>
              <Typography color={"grey.600"}>{final == -1 ? "-" : final}</Typography>
            </Stack>
          </Stack>

          <Stack paddingLeft={1} alignItems={"center"}>
            <Typography color={"grey.400"}>MÉDIA</Typography>
            <Typography color={"grey.600"}>{media == -1 ? "-" : media}</Typography>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  ) : (
    <>
      <Stack
        paddingY={2}
        direction={"row"}
        borderRadius={2}
        justifyContent={"space-between"}
        paddingRight={5}
        bgcolor={"grey.50"}
      >
        <Stack direction={"row"} paddingLeft={1}>
          <Avatar src={photoUrl} />
          <Stack paddingLeft={1}>
            <Typography color={"grey.600"}>{nome}</Typography>
            <Typography color={"grey.500"}>{cpf}</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} marginRight={"10%"}>
          <Stack alignItems={"center"}>
            <Typography color={"grey.400"}>N1</Typography>
            <Typography color={"grey.600"}>{n1 == -1 ? "-" : n1}</Typography>
          </Stack>

          <Stack paddingLeft={2} alignItems={"center"}>
            <Typography color={"grey.400"}>N2</Typography>
            <Typography color={"grey.600"}>{n2 == -1 ? "-" : n2}</Typography>
          </Stack>

          <Stack paddingLeft={2} alignItems={"center"}>
            <Typography color={"grey.400"}>REP</Typography>
            <Typography color={"grey.600"}>{rep == -1 ? "-" : rep}</Typography>
          </Stack>

          <Stack paddingLeft={2} alignItems={"center"}>
            <Typography color={"grey.400"}>FINAL</Typography>
            <Typography color={"grey.600"}>{final == -1 ? "-" : final}</Typography>
          </Stack>
          <Stack paddingLeft={2} alignItems={"center"}>
            <Typography color={"grey.400"}>MÉDIA</Typography>
            <Typography color={"grey.600"}>{media == -1 ? "-" : media}</Typography>
          </Stack>
        </Stack>

        <Stack justifyContent={"center"}>
        <Typography color={status == "APROVADO" ? "success.main" : status == "REPROVADO" ? "error.main" : "grey.600"}>{status}</Typography>
        </Stack>
      </Stack>
    </>
  )
}
