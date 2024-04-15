import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import {
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
  Type,
} from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnosis: Diagnosis[];
}

const healthCheckRatingOptions = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
];

interface TypeOption {
  value: Type;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(Type).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddEntryForm = ({ onCancel, onSubmit, diagnosis }: Props) => {
  const [type, setType] = useState(Type.HealthCheck);
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState(
    Array<Diagnosis["code"]>
  );
  const [date, setDate] = useState("");

  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [valittuKoodi, setValittuKoodi] = useState("");

  interface KoodiOption {
    value: string;
    label: string;
  }

  const koodiOptions: KoodiOption[] = diagnosis.map((v) => ({
    value: v.code,
    label: v.code,
  }));

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const healthCheckRating = Object.values(HealthCheckRating).find(
        (g) => g === value
      );
      if (healthCheckRating) {
        setHealthCheckRating(Number(healthCheckRating));
      }
    }
  };

  const onKoodiChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      if (value) {
        setValittuKoodi(value);
        setDiagnosisCodes(diagnosisCodes.concat(value));
      }
    }
  };

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(Type).find((t) => t === value);
      if (type) {
        setType(type);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (type) {
      case Type.HealthCheck:
        const newHealthCheckEntry: EntryWithoutId = {
          type,
          description,
          specialist,
          diagnosisCodes,
          date,
          healthCheckRating,
        };
        onSubmit(newHealthCheckEntry);
        break;
      case Type.Hospital:
        const newHospitalEntry: EntryWithoutId = {
          type,
          description,
          specialist,
          diagnosisCodes,
          date,
          discharge: { date: dischargeDate, criteria: criteria },
        };
        onSubmit(newHospitalEntry);
        break;
      case Type.OccupationalHealthcare:
        const newOccupationalEntry: EntryWithoutId = {
          type,
          description,
          specialist,
          diagnosisCodes,
          date,
          employerName,
          sickLeave: { startDate: startDate, endDate: endDate },
        };
        onSubmit(newOccupationalEntry);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select label="Type" fullWidth value={type} onChange={onTypeChange}>
          {typeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField
          type="date"
          name="date"
          placeholder="MM/DD/YYYY"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
        <Select
          label="Diagnosis Codes"
          fullWidth
          value={valittuKoodi}
          onChange={onKoodiChange}
        >
          {koodiOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {diagnosisCodes.map((dg) => dg + ", ")}
        {type === Type.HealthCheck ? (
          <div>
            <InputLabel style={{ marginTop: 20 }}>HealthCheckRating</InputLabel>
            <Select
              label="HealthCheck Rating"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        ) : null}

        {type === Type.Hospital ? (
          <div>
            <InputLabel style={{ marginTop: 20 }}>Discharge Date</InputLabel>
            <TextField
              type="date"
              name="dischargeDate"
              placeholder="MM/DD/YYYY"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </div>
        ) : null}

        {type === Type.OccupationalHealthcare ? (
          <div>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />

            <InputLabel style={{ marginTop: 20 }}>
              Sickleave Start Date
            </InputLabel>
            <TextField
              type="date"
              name="sickleaveStartDate"
              placeholder="MM/DD/YYYY"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>
              Sickleave End Date
            </InputLabel>
            <TextField
              type="date"
              name="sickleaveEndDate"
              placeholder="MM/DD/YYYY"
              fullWidth
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </div>
        ) : null}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add Entry
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
