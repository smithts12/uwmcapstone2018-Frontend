import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { DocumentsForm, Sidebar, Header } from '../../components';

class DocumentsPage extends Component {
    render() {
        return (
            <Container fluid={true} id='DOCUMENTS_PAGE'>
                <Sidebar />
                <Header title={'Documents'} />
                <DocumentsForm />
            </Container>
        );
    }
}

export default DocumentsPage;
