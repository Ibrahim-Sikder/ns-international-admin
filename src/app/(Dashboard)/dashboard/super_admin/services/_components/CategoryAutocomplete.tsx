/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Controller, useFormContext, FieldValues, Path, UseFormReturn } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { SxProps, Theme } from "@mui/system";

interface Option {
  label: string;
  [key: string]: any;
}

interface TASAutocompleteProps {
  name: Path<FieldValues>; // Name of the field (react-hook-form)
  label?: string;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  required?: boolean;
  options: Option[] | string[]; // Options can either be an array of strings or an array of objects with a 'label' property
  size?: "small" | "medium";
  multiple?: boolean;
  margin?: "none" | "dense" | "normal";
  freeSolo?: boolean;
  defaultValue?: string[] | Option[];
  placeholder?: string;
}

const CategoryAutocomplete: React.FC<TASAutocompleteProps> = ({
  name,
  label = "Autocomplete",
  fullWidth = true,
  sx,
  required,
  options,
  size = "small",
  multiple = true,
  margin = "normal",
  freeSolo = true,
  defaultValue = [],
  placeholder = "Select options",
}) => {
  const { control } = useFormContext<UseFormReturn<FieldValues, any>>(); // Using useFormContext to access control

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          multiple={multiple}
          freeSolo={freeSolo}
          options={options}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option?.label || ""
          }
          value={field.value || defaultValue}
          renderTags={(value, getTagProps) =>
            value
              .filter((option) => option !== null && option !== undefined)
              .map((option, index) => {
                const tagProps = getTagProps({ index });
                const { key, ...restTagProps } = tagProps;
                return (
                  <Chip
                    key={typeof option === "string" ? option : option?.label || ""}
                    variant="outlined"
                    label={typeof option === "string" ? option : option?.label || ""}
                    {...restTagProps}
                  />
                );
              })
          }
          onChange={(_, newValue) => {
            const updatedValue = Array.isArray(newValue)
              ? newValue
                  .filter((v) => v !== null && v !== undefined)
                  .map((v) => (typeof v === "string" ? v : v.label))
              : [];
            field.onChange(updatedValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              fullWidth={fullWidth}
              required={required}
              margin={margin}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              sx={sx}
            />
          )}
        />
      )}
    />
  );
};

export default CategoryAutocomplete;
