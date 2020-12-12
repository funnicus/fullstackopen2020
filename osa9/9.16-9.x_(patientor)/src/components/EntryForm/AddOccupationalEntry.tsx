import React from 'react';
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button } from "semantic-ui-react";

import { DiagnosisSelection, TextFieldEntry } from "../../AddPatientModal/FormField";
import { Diagnosis } from '../../types';

import { OccupationalHealthcareEntry } from '../../types';

export type OccupationalEntryValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
    onSubmit: (values: OccupationalEntryValues) => void;
    diagnoses: Diagnosis[];
}

const AddOccupationalEntry: React.FC<Props> = ({ onSubmit, diagnoses }) => {
    return(
      <Formik
      initialValues={{
        date: '',
        specialist: '',
        type: 'OccupationalHealthcare',
        description: '',
        diagnosisCodes: [],
        employerName: ''
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        const dateRegEx = /\d{4}-\d{2}-\d{2}/;
        if (!values.date) {
          errors.date = requiredError;
        }
        if(!dateRegEx.test(values.date)){
          errors.date = "Malformatted date";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
            errors.employerName = requiredError;
          }
        return errors;
      }}
    >
      {({ setFieldValue, setFieldTouched }) => {
        return(
          <Form className="form ui">
              <Field
                label="date"
                placeholder="yyyy-mm-dd"
                name="date"
                component={TextFieldEntry}
              />
              <ErrorMessage name="date" render={msg => <div style={{ color: "red" }}>{msg}</div>} />
              <Field
                label="specialist"
                placeholder="..."
                name="specialist"
                component={TextFieldEntry}
              />
              <ErrorMessage name="specialist" render={msg => <div style={{ color: "red" }}>{msg}</div>} />
              <Field
                label="description"
                placeholder="..."
                name="description"
                component={TextFieldEntry}
              />
              <ErrorMessage name="description" render={msg => <div style={{ color: "red" }}>{msg}</div>} />
              <DiagnosisSelection            
              setFieldValue={setFieldValue}            
              setFieldTouched={setFieldTouched}            
              diagnoses={diagnoses}          
              />
              <ErrorMessage name="employerName" render={msg => <div style={{ color: "red" }}>{msg}</div>} />
              <Field
                label="employer name"
                placeholder="..."
                name="employerName"
                component={TextFieldEntry}
              />
              <Button
                type="submit"
                floated="right"
                color="green"
              >Submit</Button>
            </Form>
            );
        }}
    </Formik>
    );
};

export default AddOccupationalEntry;