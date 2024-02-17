import { FieldPath, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem } from "./form";
import { Input } from "./input";
import { Label } from "./label";

/* interface TextFieldProps<FieldValues, TName> {
  name: TName;
  label?: string;
} */

export function TextField
/* <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> */
({
  name,
  label,
  required = false,
  description,
  ...rest
}
/* : TextFieldProps<TFieldValues, TName>
 */) {
  return (
    <FormField
      name={name}
      rules={{ required: required }}
      render={({ field }) => (
        <FormItem>
          <Label>{label}</Label>
          <FormControl>
            <Input id={name} {...rest} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
