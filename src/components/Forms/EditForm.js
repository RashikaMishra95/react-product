import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {productAction} from '../../actions/products.action';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class EditForm extends Component{

    constructor(props){
        super(props);
        this.state={
            language:'',
            project:'',
            date:'',
            img:'',
            recID:'',
            projects:{},
            imgUrl:''
        }
    }

    componentDidMount() {
        const {location:{pathname}}=this.props;
        let pId = pathname.split('/')[2];
        this.setState({recID:pId});
        this.props.prod_by_Id(pId).then((res)=>{
            this.setState({projects:res[0]});
        });
    }

    handleImage=(e)=>{
        e.preventDefault();
        let file=URL.createObjectURL(e.target.files[0]);
        this.setState({  img:file,imgUrl:e.target.files[0].name  })
    };
    handleValues=(e)=>{
        const {name,value}=e.target;
        this.setState((state)=>({
            projects: {
                ...state.projects,
                [name]: value
            }
        }));
    };

    handleEditedData=()=>{
        const {projects,img}=this.state;
        /*let data=new FormData();
        data.append('product',projects.language);
        data.append('product',projects.project);
        data.append('product',projects.date);
        data.append('product',img);*/
        this.props.project_edit(projects).then(()=>{
            this.props.history.push('/')
        });
    };

    openDialogue=()=>{
        const div=document.getElementById('file-upload');
        div.click();
    };

    render(){
        const {projects,imgUrl} = this.state;
        const {language='',project='',date=''} = projects;
        return(
            <div className={"container-fluid"}>
                <div className={'row'}>
                    <div className="d-flex  justify-content-center  align-items-center flex-column " >
                    <div>
                        <h3>Edit Project</h3>
                           <Form>
                                <FormGroup>
                                    <Label>Language:</Label>
                                    <Input type="text"
                                           name="language"
                                           id="language"
                                           onChange={this.handleValues}
                                           value={language}
                                           />
                                </FormGroup>
                               <FormGroup>
                                   <Label>Project:</Label>
                                   <Input type="text"
                                          name="project"
                                          id="project"
                                          onChange={this.handleValues}
                                          value={project}
                                          />
                               </FormGroup>
                               <FormGroup>
                                   <Label>Date:</Label>
                                   <Input type="text"
                                          name="date"
                                          id="date"
                                          onChange={this.handleValues}
                                          value={date}
                                          />
                               </FormGroup>
                               <FormGroup>
                                   <Label>Image</Label>
                                   <input type="file" id={'file-upload'} onChange={this.handleImage} style={{display:'none'}}/>
                                   <Input type="text"
                                          name="img"
                                          id="img"
                                          onClick={this.openDialogue}
                                          value={imgUrl}
                                   />
                               </FormGroup>
                               <FormGroup>
                                   <Button color={'success'} onClick={this.handleEditedData}>Save</Button>
                               </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return ({products:state.productsReducer.products.productsData})
};


const mapDispatchToProps=(dispatch)=>{
    const {prod_by_Id,project_edit}= productAction;
    return bindActionCreators({prod_by_Id,project_edit},dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(EditForm);