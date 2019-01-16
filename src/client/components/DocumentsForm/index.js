import React, { Component } from 'react';
import { Input, Form, FormGroup, Label, ListGroupItem, ListGroup, Button, Col, Row } from 'reactstrap';
import './styles.scss';
// import axios from 'axios';
// import { serverURL, headers } from '../../redux/config';
// const userURI = `${serverURL}/user`;
// const documentsURI = `${serverURL}/document`;

export class DocumentsForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.state = {
            userId: '',
            files: ['Resume.docx', 'CoverLetter.docx', 'Skills.docx'],
            uploadedFile: '',
        };
    }

    componentDidMount() {
        /*
        const config = { headers: { Authorization: headers().headers.Authorization } };
        axios.get(userURI, config).then(response => {
            this.setState({ userId: response.data.id });
            const getLink = documentsURI + '/' + response.data.id;
            axios.get(getLink, config).then(response => {
                this.setState({ files: response.data });
            });
        });
        */
    }

    handleUpload(e) {
        /*
        const config = { headers: { Authorization: headers().headers.Authorization } };
        const body = {
            filePath: this.state.uploadedFile,
            userId: this.state.userId
        };
        axios.post(documentsURI, body, config).then(response => {
            this.state.files.push(this.state.uploadedFile);
        }).catch(err => console.log(err));
        */
    }

    handleDownload(e) {
        // TODO
    }

    handleDelete(e) {
        // TODO
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    render() {
        const FileList = ({ items, onClickAction }) => (
            <ListGroup>
                {
                    items.map((item, i) => <ListGroupItem key={i} onClick={onClickAction} action><Row><Col className='itemCol'>{ item }</Col><Col><Button size='lg' className='deleteButton' color='danger' onClick={this.handleDelete()}>Delete</Button></Col></Row></ListGroupItem>)
                }
            </ListGroup>
        );

        return (
            <Form className='uploadForm'>
                <FormGroup className='uploadFormGroup'>
                    <Label className='uploadLabel'>Upload A Document</Label>
                    <Input className='documentUpload' type='file' name='uploadedFile' id='uploadedFile' onChange={this.handleChange}/>
                    <Button className='submitDownloadButton' onClick={this.handleUpload()}>Submit Upload</Button>
                    <div className='documentList'>
                        <Label className='documentListLabel' for='documentList'>Your Documents</Label>
                        <FileList items={this.state.files} onClickAction={this.handleDownload()}/>
                    </div>
                </FormGroup>
            </Form>
        );
    }
}

export default DocumentsForm;
