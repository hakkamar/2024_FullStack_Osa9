import { useMatch } from "react-router-dom";

import { Patient } from "../../types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import SvgIcon from "@mui/icons-material/Male";

interface Props {
  patients: Patient[];
}

let genderIcon = TransgenderIcon;

const PatientPage = ({ patients }: Props) => {
  const match = useMatch("/patients/:id");
  const patient = match
    ? patients.find((patient) => patient.id === match.params.id)
    : null;

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

  return (
    <div className="App">
      <h2>
        {patient.name} <SvgIcon component={genderIcon} inheritViewBox />
      </h2>
      <p>date of birth: {patient.dateOfBirth}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>entries: {patient.entries.join(", ")}</p>
    </div>
  );
};

export default PatientPage;
