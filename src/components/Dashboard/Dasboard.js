import React from 'react';
import {bindActionCreators} from 'redux';
import {productAction} from '../../actions/products.action';
import {connect} from 'react-redux';
import {FormGroup, Input, Table} from 'reactstrap';
import "./Dashboard.css";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Header from "./Header";

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            productsArr : [],
            totalRecord:4,
            pageNo:1,
            pages:[],
            currentPg:1,
            totalNoPages:'',
            selectedIDs:[],
        }
    }

    // static contextTypes = {
    //     router: PropTypes.object
    // }
    componentDidMount() {
        const {totalRecord}=this.state;
        this.props.product_display().then((res)=>{
            this.setState({productsArr:res.productsData});
            let pg=[];
            let no_of_pages=Math.ceil(res.productsData.length/totalRecord);
            for(let i=1;i<=no_of_pages;i++){
                pg.push(i);
            }
            this.setState({pages:pg});
            this.setState({totalNoPages:pg.length});
        });
    }

    changeRecords=(pagno)=>{
        this.setState({pageNo:pagno});
    };

    goToFirstRec=()=>{
        const {currentPg}=this.state;
        this.setState({pageNo:currentPg});
    };

    getPrevRec=()=>{
        const {pageNo}=this.state;
        if(pageNo!==1) {
            this.setState({pageNo:pageNo - 1});
        }
    };

    getNextRec=()=>{
        const {pageNo,totalNoPages}=this.state;
        if(pageNo!==totalNoPages) {
            this.setState({pageNo: pageNo + 1});
        }
    };

    goToLastRec=()=>{
        const {totalNoPages} = this.state;
        this.setState({pageNo:(totalNoPages)});
    };

    toggleCheckboxes=(id)=>{
        const {selectedIDs} = this.state;
        if(selectedIDs.includes(id)){
            let existingId = selectedIDs.indexOf(id);
            existingId !==1 && selectedIDs.splice(existingId,1);
        }
        else{
            selectedIDs.push(id);
        }
        this.setState({selectedIDs})

    };

    handleSort=(sortKey)=>{
        const {productsArr} = this.state;
        let sortedArr=productsArr;
        switch(sortKey){
            case 'language':
                sortedArr.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
                break;
            case 'project':
                sortedArr.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
                break;
            case 'date':
                sortedArr.sort((a,b)=> new Date(a.date)-new Date(b.date));
                break;
            default:
                break;
        }
        this.props.handle_sorting(sortedArr);
      //  this.setState({productsArr:sortedArr});
    };

    toggleAllCheckboxes=(e)=>{
        const {products} = this.props;
        const {selectedIDs}=this.state;
        const {checked} = e.target;
        if(checked) {
            products.map((p) => {
                selectedIDs.push(p.id);
            });
            this.setState({selectedIDs})
        }
        else{
            this.setState({selectedIDs:[]})
        }
    };

    onEdit=(id)=>{
        //this.context.router.history.push(`/edit/${id}`)
        this.props.history.push(`/edit/${id}`);
    };

    onDelete=(id)=>{
        this.props.project_delete(id);
    };

    render() {
        const {totalRecord,productsArr,pageNo,pages,selectedIDs} = this.state;
        let startRec,lastRec;
        lastRec = pageNo*totalRecord;
        startRec = ((pageNo*totalRecord)-totalRecord);
        let arr = productsArr && productsArr.slice(startRec,lastRec);

        return(
            <div>
                <Header/>
                <div className={"container"}>
                <div className={'row'}>
                <div className={'col-lg-12'}>
                    <div className="d-flex  justify-content-center  align-items-center flex-column  table-wrap" >
                    <Table striped>
                        <thead>
                        <tr>
                            <th>
                                <FormGroup check>
                                <Input type="checkbox" onClick={this.toggleAllCheckboxes}/>Select All
                                </FormGroup>
                            </th>
                            <th>#</th>
                            <th onClick={()=>{this.handleSort('language')}}>Language</th>
                            <th onClick={()=>{this.handleSort('project')}}>Project</th>
                            <th onClick={()=>{this.handleSort('date')}}>Date</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            arr && arr.map((p, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <FormGroup check>
                                                    <Input type="checkbox"
                                                           onClick={()=>{this.toggleCheckboxes(p.id)}}
                                                           checked={selectedIDs.includes(p.id)}
                                                    />
                                            </FormGroup>
                                        </td>
                                        <td>{p.id}</td>
                                        <td>{p.language}</td>
                                        <td>{p.project}</td>
                                        <td>{p.date}</td>
                                        <td><i className="fa fa-pencil" aria-hidden="true" onClick={()=>{this.onEdit(p.id)}}/>
                                        &nbsp;&nbsp;&nbsp;
                                            <i className="fa fa-trash" aria-hidden="true" onClick={()=>{this.onDelete(p.id)}}/>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                        <div>
                            <Pagination aria-label="Page navigation example">
                                <PaginationItem>
                                    <PaginationLink first onClick={this.goToFirstRec} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink previous onClick={this.getPrevRec} />
                                </PaginationItem>
                                    {
                                        pages.map((i,index)=>{
                                            return(
                                                <PaginationItem key={index}>
                                                    <PaginationLink onClick={()=>{this.changeRecords(i)}}>
                                                        {i}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        })
                                    }

                                <PaginationItem>
                                    <PaginationLink next onClick={this.getNextRec} />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink last onClick={this.goToLastRec} />
                                </PaginationItem>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return ({
        products:state.productsReducer.products.productsData
    });
};
const mapDispatchToProps=(dispatch)=>{
    const { product_display,handle_sorting,project_delete} = productAction;
    return bindActionCreators({  product_display,handle_sorting,project_delete },dispatch)
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);