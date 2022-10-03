import { ForwardedRef, forwardRef, MutableRefObject, useEffect } from "react";
import {
  FieldValues,
  Path,
  useForm,
  UseFormReturn,
  ValidationMode,
} from "react-hook-form";
import { FormInputEnum } from "./constants";
import { FormTextInput } from "./FormControl";
import { DataDropdown, FormSelect } from "./FormSelect";

export type BaseFormInputs = Record<string, any>;

export type UseFormProvider<T extends FieldValues = any> = UseFormReturn<T>;

export type Control<T> = {
  name: Path<T>;
  type: FormInputEnum;
  required?: { value: boolean; message: string };
  label?: string;
  placeholder?: string;
  className?: string;
  pattern?: { value: RegExp; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  validate?: (val: unknown) => string;
  isShowPassword?: boolean;
  //data for Dropdown
  data?: string | Array<DataDropdown>;
};

interface Props<T extends FieldValues = FieldValues> {
  inputs: Array<Control<T>>;
  mode?: keyof ValidationMode;
  className?: string;
  formProvider?: any;
}

const FormWrapper = <T extends FieldValues>(
  props: Props<T>,
  ref: ForwardedRef<UseFormReturn<T>>
) => {
  const { inputs, mode = "onSubmit", className, formProvider } = props;
  const form = useForm<T>({
    mode: mode,
  });

  useEffect(() => {
    if (ref) {
      (ref as MutableRefObject<UseFormReturn<T>>).current = form;
      formProvider && formProvider(form)
    }
  }, []);

  return (
    <form className={className}>
      {inputs.map((i) => {
        switch (i.type) {
          case FormInputEnum.INPUT:
          case FormInputEnum.NUMBER:
          case FormInputEnum.PASSWORD:
            return <FormTextInput key={i.name} control={i} form={form} />;
          case FormInputEnum.SELECT:
            return <FormSelect key={i.name} control={i} form={form} />;
          default:
            break;
        }
      })}
    </form>
  );
};

export const FormProvider = forwardRef<any, Props>(FormWrapper);

export * from "./FormControl";
export * from "./FormSelect";
export { FormInputEnum };
