import React from "react";
import {useState, useEffect} from "react";
import { Container, Row, Col } from "shards-react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"

import PageTitle from "../components/common/PageTitle";
import { Card, CardBody, Form, FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect, Button } from "shards-react";

import {addTariff} from "../redux/Tariffs/actions";
import { Tariff } from "../redux/Tariffs/types";
import * as tariffThunks from "../redux/Tariffs/thunks";
import { Redirect } from "react-router-dom";
import * as facultiesThunks from "../redux/Faculties/thunks";


const AddNewTariff = () => {


const dispatch = useDispatch();
const [title, setTitle] = useState();
const [price, setPrice] = useState();
const [category, setCategory] = useState();
const {tariffs} = useSelector(state => state.tariffs);
const {faculties} = useSelector(state => state.faculties);


const { authorization } = useSelector(state => state.authorizationUsers);

if(authorization != null && authorization.user != null && (authorization.user.type == "USER" || authorization.user.type == "ADMIN")){
  return <Redirect to="/login" /> 
}

const handleNewTariff = () => {
  if (authorization != null && authorization.user != null && authorization.user._id != null) {
      tariffs.push(new Tariff(title, price, category));
      dispatch(tariffThunks.addTariffToDatabase(tariffs));
    }
};

useEffect(() => {
  if (authorization != null) {
      dispatch(facultiesThunks.fetchFaculties());
  }
}, [authorization]);



return(

  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4 d-flex justify-content-between">
      <PageTitle sm="4" title="Dodaj nową cenę" subtitle="Blog Tariffs" />
      <Link to="/tariffs-list">
        <Button  theme="accent" size="lg" onClick={handleNewTariff}>
        <i className="material-icons">file_copy</i> Zatwierdź
        </Button>
      </Link>
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="12" md="12">
      <Card small className="mb-3">
      <CardBody>
        <Form className="add-new-tariff">
          <FormInput size="lg" className="mb-3" placeholder="Nazwa"  onChange={e => setTitle(e.target.value)}/>
          <InputGroup className="mb-3">
            <InputGroupAddon type="prepend">
              <InputGroupText>Kategorie</InputGroupText>
            </InputGroupAddon>
            <FormSelect onChange={e => setCategory(e.target.value)}>
              {faculties.map(faculty => 
                <option>{faculty}</option>
              )}
            </FormSelect>
          </InputGroup>
          <FormInput type="number" size="lg" className="mb-3" placeholder="Cena"  onChange={e => setPrice(e.target.value)}/>
          
        </Form>
      </CardBody>
    </Card>
      </Col>
    </Row>
  </Container>
)};

export default AddNewTariff;
