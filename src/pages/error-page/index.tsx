import { Stack, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Stack alignItems="center" justifyContent="center" mt="20vh">
      <Stack maxWidth={500} spacing={4} justifyContent="center" flexShrink={1} height="100%">
        <Typography variant="h1" textAlign="center">
          Oops!
        </Typography>
        <Typography variant="h4" textAlign="center">
          Desculpe, ocorreu um erro inesperado.
        </Typography>
        <Typography fontStyle="italic" textAlign="center">
          {isRouteErrorResponse(error) ? error?.statusText || error?.data.message : "Not Found"}
        </Typography>
      </Stack>
    </Stack>
  );
}
