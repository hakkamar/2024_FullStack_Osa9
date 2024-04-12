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
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
).map((v) => ({
  value: v,
  label: v.toString(),
}));
// tulee jostain syystää valikkoon myös tekstit, joten siivotaan ne toistaiseksi näin....
healthCheckRatingOptions.splice(0, 4);

interface TypeOption {
  value: Type;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(Type).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
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
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(diagnosisCodes.concat(target.value))
          }
        />
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
            <TextField
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
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
            <TextField
              label="Sickleave Start Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <TextField
              label="Sickleave End Date"
              placeholder="YYYY-MM-DD"
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
