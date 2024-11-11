import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enAchat: false,
      gestionList: [],
      modal: false,
      activeItem: {
        Nom_du_produit: "",
        description_du_produit: "",
        Type_de_produit: "",
        Quantite_en_stock: 0,
        Seuil_minimun_en_stock: 0
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/gestion/")
      .then((res) => this.setState({ gestionList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/gestion/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/gestion/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/gestion/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = {Nom_du_produit: "",
        description_du_produit: "",
        Type_de_produit: "",
        Quantite_en_stock: 0,
        Seuil_minimun_en_stock: 0 };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ enAchat: true });
    }

    return this.setState({ enAchat : false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.enAchat ? "nav-link active" : "nav-link"}
        >
          En achat
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.enAchat ? "nav-link" : "nav-link active"}
        >
          Pas en achat
        </span>
      </div>
    );
  };

  renderItems = () => {
    const {enAchat} = this.state;
    const newItems = this.state.gestionList.filter(
      item => (item.Quantite_en_stock < item.Seuil_minimun_en_stock) === enAchat
    )

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.enAchat ? "completed-todo" : ""
          }`}
          title={item.description_du_produit}
        >
          {item.Nom_du_produit}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Modifier
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Suprimer
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Application de gestion</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Ajouter article
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;