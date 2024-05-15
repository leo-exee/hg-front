import React, { useEffect, useState } from "react";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { addressDTO, getAddresses } from "../../services/api.address";
import { useTranslation } from "react-i18next";

interface AddressInputProps {
  form: any;
  setForm: any;
}

const AddressInput: React.FC<AddressInputProps> = ({ form, setForm }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<addressDTO | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<addressDTO[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue === "" || inputValue.length < 5) {
        setOptions(value ? [value, ...options] : options);
        return;
      }
      const addresses = getAddresses(inputValue);
      addresses.then((data) => {
        setOptions(data);
      });
    }, 5); // 5ms debounce

    return () => clearTimeout(timer);
  }, [inputValue, value]);

  return (
    <Autocomplete
      aria-required
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText={t("pages.add.no-options")}
      onChange={(event: any, newValue: addressDTO | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        setForm({
          ...form,
          address: newValue?.label,
          location: newValue?.location,
        });
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={t("pages.add.address")} fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li key={option.id} {...props}>
            <Grid container alignItems="center">
              <Typography noWrap>{option.label}</Typography>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default AddressInput;
