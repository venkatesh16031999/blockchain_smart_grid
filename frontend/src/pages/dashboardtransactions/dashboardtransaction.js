import React,{Component,Fragment} from 'react';
import {Col,Row,Container,Table} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import axios from '../../axios';
import styles from './dashboardtransaction.module.css';
import web3 from '../../etheruem/web3';

class DashboardTransaction extends Component {

    state = {
        transactionList: [],
        portal: "provider"
    }

    async componentDidMount(){
        const ebId = localStorage.getItem("ebId");
        const transaction = await axios.get("/getTransactionList/"+ebId);
        const transactionList = transaction.data.result.map(transactionData=>{
            return transactionData.transaction
        })
        console.log(transactionList);
        this.setState({transactionList:transactionList});
        const params = this.props.location.search.replace("?","").split("=");
        
        if(params[0]==="admin" && params[1]==="true"){
            this.setState({portal:"admin"});
        }
    }

    payToProvider = () => {

    }

    render(){
        return (
            <Fragment>
                <Container fluid>
                        <Row>
                            <Col md={12}  className="p-0">
                            <Container fluid>
                                    <Row>
                                        <Col md={12} className={styles.transactionabovewarpper}>
                                        </Col>
                                    </Row>
                            </Container>
                            </Col>
                        </Row>
                </Container>
                <Container fluid>
                        <Row>
                            <Col md={12} className={styles.transactiontablewarpper}>
                            <Container fluid>
                                    <Row className="d-flex justify-content-center">
                                        <Col md={11} >
                                            <h3>Transaction</h3>
                                            <div className="table">
                                            <Table striped bordered hover >
                                                <thead>
                                                    <tr>
                                                    <th>SI NO</th>
                                                    <th>Date</th>
                                                    <th>Transfered (Watts)</th>
                                                    <th>Amount (Ether)</th>
                                                    <th>Amount Paid</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.transactionList.map((transaction,index)=>{
                                                            return (
                                                                <tr>
                                                                    <td>{index+1}</td>
                                                                    <td>{new Date(transaction.timestamp).toDateString()}</td>
                                                                    <td>{transaction.watts}</td>
                                                                    <td>{web3.utils.fromWei(transaction.amount.toString(), "ether")}</td>
                                                                    {
                                                                        this.state.portal === "provider" && <td>{transaction.isAmountPaid?"Paid":"Not Paid"}</td>
                                                                    }
                                                                    {
                                                                        this.state.portal === "admin" && <td>{transaction.isAmountPaid?"Paid":<div className={styles.flexCenter}><button onClick={()=>this.payToProvider()}>Pay</button></div>}</td>
                                                                    }
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                            </div>
                                        </Col>
                                    </Row>
                            </Container>
                            </Col>
                        </Row>
                </Container>
            </Fragment>
        );
    }
}

export default withRouter(DashboardTransaction);