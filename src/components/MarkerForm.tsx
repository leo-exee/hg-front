import { useState } from "react";
import { lockSystem, ToiletDTO } from "../types/toilets.type";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import AddressInput from "./Forms/AddressInput";
import { postToilet } from "../services/api.toilets";
import { useNavigate } from "react-router-dom";

interface FormProps {
  entity?: ToiletDTO;
}

const defaultForm: Partial<ToiletDTO> = {
  name: undefined,
  description: undefined,
  address: undefined,
  location: undefined,
  information: {
    rating: 0,
    state: 0,
    cleanliness: 0,
    accessbility: 0,
    babyFriendly: false,
    handicapFriendly: false,
    lockSystem: lockSystem.manual,
    openingHours: [],
    maintenancePhoneNum: "",
    dateCreated: new Date(),
    lastModified: new Date(),
  },
  reviews: [],
};

const MarkerForm: React.FC<FormProps> = ({ entity }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<any>(
    entity ? entity : (defaultForm as Partial<ToiletDTO>)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      information: {
        ...form.information,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleRatingChange = (e: any) => {
    setForm({
      ...form,
      information: { ...form.information, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      form.reviews = [];
      const response = postToilet(form);
      response.then((res) => {
        navigate(`/map/${res.id}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-2"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
          value={form.name}
          onChange={handleChange}
        />
        <AddressInput form={form} setForm={setForm} />
        <Typography variant="subtitle1">State</Typography>
        <Rating
          name="state"
          value={form.information?.state}
          onChange={handleRatingChange}
        />
        <Typography variant="subtitle1">Cleanliness</Typography>
        <Rating
          name="cleanliness"
          value={form.information?.cleanliness}
          onChange={handleRatingChange}
        />
        <Typography variant="subtitle1">Accessibility</Typography>
        <Rating
          name="accessbility"
          value={form.information?.accessbility}
          onChange={handleRatingChange}
        />
        <FormGroup>
          <FormControlLabel
            className="w-full"
            control={
              <Checkbox
                name="babyFriendly"
                value={form.information?.babyFriendly}
                onChange={handleCheckboxChange}
              />
            }
            label="Baby Friendly"
          />

          <FormControlLabel
            className="w-full"
            control={
              <Checkbox
                name="handicapFriendly"
                value={form.information?.handicapFriendly}
                onChange={handleCheckboxChange}
              />
            }
            label="Handicap Friendly"
          />
        </FormGroup>
        <TextField
          margin="normal"
          multiline
          rows={4}
          fullWidth
          id="description"
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained">
          {entity ? "Update" : "Create"}
        </Button>
      </Box>
    </Container>
  );
};

export default MarkerForm;
