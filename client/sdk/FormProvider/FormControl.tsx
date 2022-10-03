import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { ContainerInputField } from "sdk/TextField";
import { Control, FormInputEnum } from ".";
import styles from "./style.module.scss";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  control: Control<T>;
}
export const FormTextInput = <T extends FieldValues>(props: Props<T>) => {
  const { form, control } = props;
  const [isShow, setIsShow] = useState(false);

  const error = form.formState.errors[control.name];

  const renderPasswordIcon = (isShowPassword: boolean, type: string) => {
    if (isShowPassword && type === FormInputEnum.PASSWORD) {
      return {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setIsShow(!isShow)}
            >
              {isShow ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      };
    }
  };

  return (
    <Controller
      name={control.name}
      control={form.control}
      rules={{
        required: control.required,
        minLength: control.minLength,
        maxLength: control.maxLength,
        pattern: control.pattern,
        validate: control.validate,
      }}
      render={({ field }) => (
        <ContainerInputField
          ref={field.ref}
          label={control.label}
          id={control.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          type={isShow ? FormInputEnum.INPUT : control.type}
          helperText={error?.message as ReactNode}
          error={Boolean(error)}
          className={clsx(control.className, styles.TextField)}
          placeholder={control.placeholder}
          InputProps={renderPasswordIcon(
            !!control.isShowPassword,
            control.type
          )}
        />
      )}
    />
  );
};
