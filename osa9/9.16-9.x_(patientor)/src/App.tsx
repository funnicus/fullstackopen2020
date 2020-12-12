import React from "react";
import axios from "axios";
import { useRouteMatch, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfo from "./components/PatientInfo";

import { setPatientList, setDiagnosesList } from './state/reducer';

const App: React.FC = () => {
  const [{patients}, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
        const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosesList(diagnosesListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

const match = useRouteMatch('/patients/:id');
const patient: Patient | undefined | null = match     
    // Vittu tää react typescriptin kanssa on yhtä paskaa
    // pitää saatana slice vittu urlista toi id, koska jostain saatanan syystä siihen ei
    // voi päästä käsiksi match.params.id:n kautta. Voisko joku vittu tehä näille react/react router tyypeille
    // vittu hyvät dokumentaatiot. Ei vittu tässä menee hermot >:( En kyllä vittu reactin kanssa tätä tuu käyttää
    ? Object.values(patients).find(patient => patient.id === match.url.slice(10)) // älä prkl muuta ton routen pituutta tai tää ei toimi!!!
    : null;

  return (
    <div className="App">
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => patient ? <PatientInfo patient={patient} /> : <div>No such patient...</div>} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
    </div>
  );
};

export default App;
