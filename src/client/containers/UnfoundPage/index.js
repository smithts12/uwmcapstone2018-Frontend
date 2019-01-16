import React from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

/*
 * Container for page that is displayed when user tries to navigate
 * to a page/link that does not exist.
 */
export const UnfoundPage = props => {
    return (
        <Container fluid={true} id="UNFOUND_PAGE">
            <main>
                <div className='vertical-center'>
                    <FontAwesomeIcon icon="exclamation-circle" />
                    <h1> 404 Not Found.</h1>
                    <br />
                    <p>The requested URL was not found.</p>
                </div>
            </main>
        </Container>
    );
};

export default UnfoundPage;
