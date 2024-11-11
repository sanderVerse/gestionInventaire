import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Liste de produit</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-title">Nom du produit</Label>
              <Input
                type="text"
                id="todo-title"
                name="Nom_du_produit"
                value={this.state.activeItem.Nom_du_produit}
                onChange={this.handleChange}
                placeholder="Inserer le nom du produit"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Description du produit</Label>
              <Input
                type="text"
                id="todo-description"
                name="description_du_produit"
                value={this.state.activeItem.description_du_produit}
                onChange={this.handleChange}
                placeholder="Inserer description du produit"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-title">Type de produit</Label>
              <Input
                type="text"
                id="todo-title"
                name="Type_de_produit"
                value={this.state.activeItem.Type_de_produit}
                onChange={this.handleChange}
                placeholder="Inserer type de produit"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-title">Quantite en stock</Label>
              <Input
                type="number"
                id="todo-title"
                name="Quantite_en_stock"
                value={this.state.activeItem.Quantite_en_stock}
                onChange={this.handleChange}
                placeholder="Quantite en stock"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-title">Seuil minimum</Label>
              <Input
                type="number"
                id="todo-title"
                name="Seuil_minimun_en_stock"
                value={this.state.activeItem.Seuil_minimun_en_stock}
                onChange={this.handleChange}
                placeholder="Seuil minimum"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Sauvegarder
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}