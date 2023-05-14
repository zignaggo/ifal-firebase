declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    start: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    BreeSerif: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    BreeSerif?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    BreeSerif: true;
  }
}

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    success: {
      main: "#51BF64",
    },
    error: {
      main: "#E94B4B",
    },
    grey: {
      50: "#E7E7E7",
      100: "#D6D6D6",
      400: "#808997",
      500: "#535861",
      600: "#353940",
      800: "#232529",
      900: "#202225",
    },
  },
  breakpoints: {
    values: {
      start: 0,
      xs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ["'Lato'", "'Bree Serif'"].join(","),
    allVariants: {
      fontWeight: 400,
    },
    BreeSerif: {
      fontFamily: "Bree Serif",
    },
  },
});

export default theme;
