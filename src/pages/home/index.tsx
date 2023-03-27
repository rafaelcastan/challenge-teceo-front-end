import { Stack, InputAdornment, Button, useMediaQuery, Skeleton } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import MaskTextField from "../../components/form/mask-text-field";
import MemoizedCepDataTable from "./components/cep-data-table";
import api from "../../api";
import { CepType } from "../../types/cep";
import { UseToast } from "../../context/toast";

interface FormValues {
  cep: string;
}

const Home = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [cepData, setCepData] = useState<CepType>();

  const isMobile = useMediaQuery("(max-width:768px)");

  const { showMessage } = UseToast();

  const { register, handleSubmit, watch } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSearching(true);
    try {
      const response = (await api.get<CepType>(`/ceps/${data.cep}`)).data;
      setCepData(response);
    } catch (err) {
      showMessage({ message: "Falha ao localizar CEP", severity: "error" });
    } finally {
      setIsSearching(false);
    }
  };

  const cepInput = watch("cep");

  const canSearch = useMemo(() => {
    //Here we remove the "_" char to properly count the user input characters
    if (cepInput?.replaceAll("_", "").length >= 9) {
      return true;
    } else {
      return false;
    }
  }, [cepInput]);

  return (
    <Stack flexGrow={1} direction="column" alignItems="center" p="10px" mt="50px">
      <Stack
        spacing={2}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <MaskTextField
          {...register("cep")}
          maskType="cep"
          textFieldProps={{
            size: "small",
            label: "Digite um CEP",
            placeholder: "00000-000",
            InputProps: {
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          disabled={!canSearch}
          sx={{ alignSelf: "flex-end" }}
          type="submit"
          variant="contained"
        >
          Pesquisar
        </Button>
      </Stack>

      <Stack
        width="100%"
        direction="column"
        alignItems="center"
        sx={{ marginTop: "50px", maxWidth: isMobile ? 500 : 720, minHeight: 110 }}
      >
        {isSearching && (
          <Skeleton
            variant="rounded"
            width={isMobile ? "100%" : 720}
            height={isMobile ? 306 : 110}
            style={{ maxWidth: isMobile ? 500 : "" }}
          />
        )}
        {cepData && !isSearching && (
          <MemoizedCepDataTable
            data-testid="cep-data-table"
            cepData={cepData}
            isMobile={isMobile}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default Home;
