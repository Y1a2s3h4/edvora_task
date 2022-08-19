import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'; import Modal from 'react-bootstrap/Modal';
import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from "axios"
export default function Users() {
    const [usersData, setUsersData] = useState([])
    const [filterData, setFilterData] = useState([])

    const [fullScreen, setFullScreen] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    async function fetchUsers() {
        const { data: usersResponse } = await axios.get("https://assessment.api.vweb.app/users")
        const { data: orderResponse } = await axios.get("https://assessment.api.vweb.app/orders")
        const data = [...usersResponse]
        for (let ele1 of data) {
            for (let ele2 of orderResponse) {
                if (ele1.user_id === ele2.user_id && !("products" in ele1) && !("orders" in ele1)) {
                    ele1["products"] = [ele2.product_id]
                    ele1["orders"] = [ele2.quantity]
                } else if (ele1.user_id === ele2.user_id && "products" in ele1 && ("orders" in ele1)) {
                    ele1["products"] = [...ele1.products, ele2.product_id]
                    ele1["orders"] = [...ele1.orders, ele2.quantity]
                }
            }
        }
        setUsersData(data)
        setFilterData(data)
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    function onChangeHandler(e) {
        const prevData = filterData
        const newUsersList = filterData.filter((user) => user.name.toLowerCase().includes(e.target.value) || user.products.length == e.target.value)
        setUsersData(newUsersList)
        if (!e) {
            setUsersData(prevData)
        }
    }
    const labels = filterData.map((e) => e.name),
        data = {
            labels,
            datasets: [
                {
                    label: 'Products owned by users',
                    data: filterData.map((e) => e.products.length),
                    backgroundColor: 'rgb(255, 99, 132)',
                    stack: 'Stack 0',
                },
            ],
        };
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center">
                <div className="data-left">
                    <h2 className="fw-bold">Users</h2>
                    <p>{usersData.length} user</p>
                </div>
                <button id="visualize-product-btn" className="btn data-right d-flex align-items-center" onClick={handleShow}>
                    <i class="bi bi-graph-up-arrow"></i>
                    <p className="m-0">&nbsp; visualize users</p>
                </button>
                {/* <Modal> */}
                {/* <!-- Modal --> */}
                <Modal show={show} size="xl" fullscreen={fullScreen} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Total Products Owned By User</Modal.Title>
                        <button onClick={() => setFullScreen(!fullScreen)} className="btn m-0 ms-auto" id="full-screen-btn"><i class="bi bi-fullscreen"></i></button>
                    </Modal.Header>
                    <Modal.Body>
                        <Bar options={options} data={data} />
                    </Modal.Body>
                </Modal>
                {/* </Modal> */}
            </div>
            <Form>
                <Form.Group className="mb-3 position-relative">
                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-4"></i>
                    <Form.Control type="text" onChange={onChangeHandler} className="p-3 ps-5" placeholder="Search for user..." />
                </Form.Group></Form>
            <Row xs={1}>
                <Col>
                    <Card className="border-end-0 border-start-0 border-bottom-0 rounded-0">
                        <Row xs={2}>
                            <Col>
                                <Card.Body className="fw-bold text-center">User Name</Card.Body>
                            </Col>
                            <Col>
                                <Card.Body className="fw-bold text-center">Total Orders</Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                {usersData.map(user =>
                (<Col key={user.id} className="">
                    <Card className="border-end-0 border-start-0 border-bottom-0 rounded-0">
                        <Row xs={2}>
                            <Col>
                                <Card.Body className="text-center">{user.name}</Card.Body>
                            </Col>
                            <Col>
                                <Card.Body className="text-center">{user.products.length}</Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>)

                )}
            </Row>
        </Container>
    )
}
