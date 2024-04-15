import { useMatch } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { red, yellow, green } from "@mui/material/colors";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";

import { Diagnosis, Entry, EntryWithoutId, Patient, Type } from "../../types";
import diagnosisService from "../../services/diagnosis";
import patientService from "../../services/patients";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

let genderIcon = TransgenderIcon;

const PatientPage = () => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  //const [patient, setPatient] = useState<Patient>({} as Patient);
  const [patient, setPatient] = useState<Patient>({
    id: "",
    name: "",
    dateOfBirth: "",
    ssn: "",
    gender: "",
    occupation: "",
    entries: [],
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnosis = await diagnosisService.getAll();
      setDiagnosis(diagnosis);
    };
    void fetchDiagnosisList();
  }, []);

  const match = useMatch("/patients/:id");
  useEffect(() => {
    const fetchPatient = async () => {
      if (match) {
        const patient = await patientService.getOne(match.params.id!);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [match]);

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (match) {
      const iiDee = match.params.id;
      if (iiDee) {
        try {
          const patientWithNewEntry = await patientService.createEntry(
            values,
            iiDee
          );
          setPatient(patientWithNewEntry);
          setModalOpen(false);
          setError(undefined);
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === "string") {
              const message = e.response.data.replace(
                "Something went wrong. Error: ",
                ""
              );
              console.error(message);
              setError(message);
            } else {
              setError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
      } else {
        console.log("no piru perkele, ei ole iideetä, miten se on mahdollista");
      }
    }
  };

  if (!patient) {
    return <div>ei löydy?</div>;
  }

  switch (patient.gender!) {
    case "male":
      genderIcon = MaleIcon;
      break;
    case "female":
      genderIcon = FemaleIcon;
      break;
    default:
      genderIcon = TransgenderIcon;
      break;
  }

  const merkinta: Entry[] = Object.values(patient.entries!);

  function SydanIcon(props: SvgIconProps) {
    return (
      <FavoriteIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </FavoriteIcon>
    );
  }

  function FavoriteIconsColor(rate: number) {
    switch (rate) {
      case 0:
        return <SydanIcon sx={{ color: green[500] }} />;
      case 1:
        return <SydanIcon sx={{ color: yellow[500] }} />;
      case 2:
        return <SydanIcon sx={{ color: red[500] }} />;
      case 3:
        return <SydanIcon />;
      default:
        return null;
    }
  }

  function findDiagnoosi(d: string): ReactNode {
    let result = "";
    const nimi = diagnosis.find((diag) => diag.code === d);
    if (nimi?.latin) {
      result = nimi?.name + " ( lat: " + nimi?.latin + " )";
    } else {
      if (nimi?.name) {
        result = nimi?.name;
      } else {
        result = "Not finding diagnose for this ???";
      }
    }
    return result;
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  function entryDetails(entry: Entry): ReactNode {
    switch (entry.type) {
      case Type.Hospital:
        return (
          <ul key={entry.id}>
            <hr></hr>
            <p>
              {entry.date} (Hospital) <i> -- {entry.description} </i>
            </p>
            <p>
              discharge: {entry.discharge.date} - {entry.discharge.criteria}
            </p>
            diagnose by {entry.specialist}
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((d) => (
                  <li key={d}>
                    {d} {findDiagnoosi(d)}
                  </li>
                ))}
              </ul>
            )}
          </ul>
        );
      case Type.OccupationalHealthcare:
        return (
          <ul key={entry.id}>
            <hr></hr>
            <p>
              {entry.date} (OccupationalHealthcare) {entry.employerName}
              <i> -- {entry.description} </i>
            </p>
            {entry.sickLeave && (
              <p>
                sickLeave: {entry.sickLeave?.startDate} -{" "}
                {entry.sickLeave?.endDate}
              </p>
            )}
            diagnose by {entry.specialist}
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((d) => (
                  <li key={d}>
                    {d} {findDiagnoosi(d)}
                  </li>
                ))}
              </ul>
            )}
          </ul>
        );
      case Type.HealthCheck:
        return (
          <ul key={entry.id}>
            <hr></hr>
            <p>
              {entry.date} (HealthCheck) <i> -- {entry.description} </i>
            </p>
            <p>{FavoriteIconsColor(entry.healthCheckRating)}</p>
            diagnose by {entry.specialist}
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((d) => (
                  <li key={d}>
                    {d} {findDiagnoosi(d)}
                  </li>
                ))}
              </ul>
            )}
          </ul>
        );
      default:
        assertNever(entry);
    }
  }

  return (
    <div className="App">
      <h2>
        {patient.name} <SvgIcon component={genderIcon} inheritViewBox />
      </h2>
      <p>date of birth: {patient.dateOfBirth}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnosis={diagnosis}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <h3>entries</h3>
      {Object.values(merkinta).map((m) => entryDetails(m))}
      <hr></hr>
    </div>
  );
};

export default PatientPage;
