import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  ContainerProps,
  Box,
  Stack,
} from "@mui/material";
import { memo } from "react";
import { CepType } from "../../../types/cep";
import RenderCardText from "./render-card-text";

interface CepDataTableProps extends ContainerProps {
  cepData: CepType;
  isMobile: boolean;
}

const CepDataTable = ({ cepData, isMobile, ...rest }: CepDataTableProps) => {
  if (isMobile) {
    return (
      <Box width="100%">
        <Card variant="outlined" {...rest}>
          <CardContent>
            <Stack direction="column" spacing={2}>
              <RenderCardText title="Logradouro" text={cepData.logradouro} />
              <RenderCardText title="Bairro" text={cepData.bairro} />
              <RenderCardText
                title="Localidade/UF"
                text={`${cepData?.localidade ?? ""}/${cepData?.uf ?? ""}`}
              />
              <RenderCardText title="CEP" text={cepData.cep} />
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} {...rest}>
      <Table sx={{ minWidth: 720 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "17px" }}>Logradouro</TableCell>
            <TableCell align="left" sx={{ fontSize: "17px" }}>
              Bairro
            </TableCell>
            <TableCell align="left" sx={{ fontSize: "17px" }}>
              Localidade/UF
            </TableCell>
            <TableCell align="left" sx={{ fontSize: "17px" }}>
              CEP
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              {cepData?.logradouro}
            </TableCell>
            <TableCell align="left">{cepData?.bairro}</TableCell>
            <TableCell align="left">
              {`${cepData?.localidade ?? ""}/${cepData?.uf ?? ""}`}
            </TableCell>
            <TableCell align="left">{cepData?.cep}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MemoizedCepDataTable = memo<CepDataTableProps>(CepDataTable, (prevProps, nextProps) => {
  return (
    prevProps.cepData.cep === nextProps.cepData.cep && prevProps.isMobile === nextProps.isMobile
  );
});

export default MemoizedCepDataTable;
