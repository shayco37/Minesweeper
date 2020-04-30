import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const CenterForm = styled.div`
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > form{
    width: 20em;
  }
`;

const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const FormButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  > button {
      width: 10em;
      height: 3em;
      border-radius: 5px;
      box-shadow: 1px 1px green;
  }
`;

export default () => {
    useEffect( () => {
        document.querySelector('#submit').focus();
    }, []);

    const history = useHistory();

    return (
        <CenterForm>
            <FormWrapper>
                <h1>Game Setup</h1>
        <Formik
            initialValues={{
                rows: 8,
                columns: 8,
                mines: 16
            }}
            onSubmit={values => {
                const { rows, columns, mines } = values;
                history.push(`/game?rows=${rows}&columns=${columns}&mines=${mines}`);
            }}
        >
            <Form>
                <FormItem>
                    <label htmlFor="rows">Number of Rows</label>
                    <Field name="rows" placeholder="Please enter number of rows" type="number" tabIndex={2}/>
                </FormItem>
                <FormItem>
                    <label htmlFor="columns">Number of Columns</label>
                    <Field name="columns" placeholder="Please enter number of columns" type="number" tabIndex={3}/>
                </FormItem>
                <FormItem>
                    <label htmlFor="mines">Number of Mines</label>
                    <Field name="mines" placeholder="Please enter number of mines" type="number" tabIndex={4}/>
                </FormItem>
                <FormButton>
                    <button type="submit" id={'submit'} tabIndex={1}>Submit</button>
                </FormButton>
            </Form>
        </Formik>
            </FormWrapper>
    </CenterForm>)
};
