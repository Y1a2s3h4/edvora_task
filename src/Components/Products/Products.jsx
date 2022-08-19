import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
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
export default function Products() {
    const [productsData, setProductsData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [show, setShow] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function fetchProducts() {
        const { data } = await axios.get("https://assessment.api.vweb.app/products")
        console.log(data)
        setProductsData(data)
        setFilterData(data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    function onChangeHandler(e) {
        const prevData = filterData
        const newProductList = filterData.filter((product) => product.name.toLowerCase().includes(e.target.value) || product.stocks == e.target.value || product.selling_price == e.target.value)
        setProductsData(newProductList)
        if (!e) {
            setProductsData(prevData)
        }
    }
    const labels = filterData.map((e) => e.name),
        data = {
            labels,
            datasets: [
                {
                    label: 'Product Stocks',
                    data: filterData.map((e) => e.stock),
                    backgroundColor: 'rgb(255, 99, 132)',
                    stack: 'Stack 0',
                },
                {
                    label: 'Selling Price',
                    data: filterData.map((e) => e.selling_price),
                    backgroundColor: 'rgb(75, 192, 192)',
                    stack: 'Stack 1',
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
                    <h2 className="fw-bold">Products</h2>
                    <p>{productsData.length} products</p>
                </div>
                <button id="visualize-product-btn" className="btn data-right d-flex align-items-center" onClick={handleShow}>
                    <i class="bi bi-graph-up-arrow"></i>
                    <p className="m-0">&nbsp; visualize products</p>
                </button>
                {/* <Modal> */}
                {/* <!-- Modal --> */}
                <Modal show={show} size="xl" fullscreen={fullScreen} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Visualizing Products</Modal.Title>

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
                    <Form.Control type="text" onChange={onChangeHandler} className="p-3 ps-5" placeholder="Search for products..." />
                </Form.Group></Form>
            <Row xs={1}>
                <Col>
                    <Card className="border-end-0 border-start-0 border-bottom-0 rounded-0">
                        <Row xs={3}>
                            <Col>
                                <Card.Body className="fw-bold text-center">Product Name</Card.Body>
                            </Col>
                            <Col>
                                <Card.Body className="fw-bold text-center">Total Stocks</Card.Body>
                            </Col>
                            <Col>
                                <Card.Body className="fw-bold text-center">Selling Price</Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                {productsData.map(product =>
                (<Col key={product.product_id} className="">
                    <Card className="border-end-0 border-start-0 border-bottom-0 rounded-0">
                        <Row xs={3}>
                            <Col>
                                <Card.Body className="text-center">{product.name}</Card.Body>
                            </Col>
                            <Col>
                                <Card.Body className="text-center">{product.stock}</Card.Body>
                            </Col>
                            <Col>
                                <Card.Body className="text-center">{product.selling_price}</Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>)
                )}
            </Row>
        </Container>
    )
}
