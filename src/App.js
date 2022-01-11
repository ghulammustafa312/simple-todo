// import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
import {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "./store/actions/todoActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
  Col,
  Row,
  Container,
  Form,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

function App() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [editModal, setEdit] = useState(false);
  const [deleteModal, setDelete] = useState(false);
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.todos);
  const editToggle = () => {
    setEdit(!editModal);
  };

  const deleteToggle = () => {
    setDelete(!deleteModal);
  };
  const handleAdd = () => {
    let obj = { title };
    // setList([...list, obj]);
    dispatch(addTodo(obj));
    setTitle("");
  };
  const handleEdit = (idx) => {
    // let newTodo = list;
    // newTodo[idx].title = title;
    dispatch(updateTodo(id, title));
    setTitle("");
    editToggle();
  };
  const handleDelete = (idx) => {
    // list.splice(idx, 1);
    dispatch(deleteTodo(idx));
    deleteToggle();
  };
  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);
  return (
    <Container className="my-4">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <Row>
          <Col md="4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Col>
          <Col md={3} align="left">
            <Button color="primary" type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
      <Container className="my-2">
        <Row>
          {list.map((a, index) => (
            <Col key={index} md={3} align="center">
              <Card className="bg-primary p-2 m-2">
                <CardBody>
                  <h4>{a.title}</h4>
                  <Button
                    onClick={() => {
                      setId(a.id);
                      setTitle(a.title);
                      editToggle();
                    }}
                  >
                    <i className="fas fa-pencil-alt " />
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      setId(a.id);
                      deleteToggle();
                    }}
                  >
                    <i className="fas fa-trash-alt" />
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Modal isOpen={editModal} toggle={editToggle}>
        <ModalHeader toggle={editToggle}> Edit Todo</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(id);
            }}
          >
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Button type="submit" color="success">
              Update
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={deleteModal} toggle={deleteToggle}>
        <ModalHeader toggle={deleteToggle}>Delete Todo</ModalHeader>
        <ModalBody>
          <div>Are you sure you want to Delete?</div>
          <Button
            onClick={() => {
              handleDelete(id);
            }}
          >
            Delete
          </Button>
          <Button onClick={deleteToggle} color="danger" className="float-right">
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default App;
