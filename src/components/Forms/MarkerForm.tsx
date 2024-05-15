import { useMemo, useState } from "react";
import { lockSystem, ToiletDTO } from "../../types/toilets.type";
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
import AddressInput from "./AddressInput";
import { postToilet } from "../../services/api.toilets";
import { useNavigate } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { describeToilet } from "../../services/api.ai";

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
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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
    if (isFormValid) {
      try {
        setIsFormLoading(true);
        e.preventDefault();
        form.reviews = [];
        const response = postToilet(form);
        response.then((res) => {
          navigate(`/dashboard`);
        });
      } catch (error) {
        setIsFormLoading(false);
        setForm(defaultForm);
        console.error(error);
      }
    }
  };

  const handleGenerateDescription = () => {
    try {
      setIsGenerating(true);
      const content = {
        name: form.name,
        address: form.address,
        cleanliness: form.information.cleanliness,
        accessibility: form.information.accessbility,
        state: form.information.state,
        babyFriendly: form.information.babyFriendly,
        handicapFriendly: form.information.handicapFriendly,
        language: "EN",
      };
      const description = describeToilet(content);
      description.then((res) => {
        setForm({ ...form, description: res });
        handleChange({
          target: { name: "description", value: res },
        } as React.ChangeEvent<HTMLInputElement>);
        setIsGenerating(false);
      });
    } catch (error) {
      setIsGenerating(false);
      console.error(error);
    }
  };

  const isFormValid = useMemo(() => {
    return form.name && form.address && form.information;
  }, [form]);

  const isGeneratingAvailable = useMemo(() => {
    return (
      form.name &&
      form.address &&
      form.information.cleanliness &&
      form.information.accessbility &&
      form.information.state
    );
  }, [form]);

  return (
    <Container component="main" maxWidth="xs" className="mb-4">
      <Typography variant="h5" className="mt-4">
        {entity ? "Update Toilet" : "Add Toilet"}
      </Typography>
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
          aria-required
        />
        <Typography variant="subtitle1">Cleanliness</Typography>
        <Rating
          name="cleanliness"
          value={form.information?.cleanliness}
          onChange={handleRatingChange}
          aria-required
        />
        <Typography variant="subtitle1">Accessibility</Typography>
        <Rating
          name="accessbility"
          value={form.information?.accessbility}
          onChange={handleRatingChange}
          aria-required
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
            required
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
            required
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
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<AutoAwesomeIcon />}
          onClick={handleGenerateDescription}
          disabled={!isGeneratingAvailable || isGenerating}
        >
          Generate description
        </Button>
        <Typography
          variant="body2"
          className="text-gray-500 text-center italic"
        >
          After validation, the toilet will not be visible immediately. Be
          patient!
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isFormValid || isFormLoading}
        >
          {entity ? "Update" : "Create"}
        </Button>
      </Box>
    </Container>
  );
};

export default MarkerForm;
