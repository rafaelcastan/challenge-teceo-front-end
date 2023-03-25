import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import { forwardRef, useCallback } from "react";
import MaskedInput, { MaskedInputProps } from "react-text-mask";

interface MaskTextFieldProps extends Omit<MaskedInputProps, "mask"> {
  maskType: "cep";
  textFieldProps: StandardTextFieldProps;
}

const MaskTextField = forwardRef<HTMLDivElement, MaskTextFieldProps>(
  ({ maskType, textFieldProps, ...rest }, ref) => {
    const getMask = useCallback(() => {
      switch (maskType) {
        case "cep": {
          return [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
        }
      }
    }, [maskType]);

    return (
      <MaskedInput
        mask={getMask}
        render={(innerRef, props) => (
          <TextField ref={ref} inputRef={innerRef} {...props} {...textFieldProps} />
        )}
        style={{ margin: 0 }}
        {...rest}
      />
    );
  }
);

export default MaskTextField;
