import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import { Container } from 'reactstrap';
import Timeline from 'react-timelines';
import { Sidebar, Header, Details } from '../../components';
import { getNonCollidingSubsets, buildTrack, buildTimebar, getMaximumDate } from './helpers';
import 'react-timelines/lib/css/style.css';
import './styles.scss';

const ZOOM_MIN = 0.2;
const ZOOM_MAX = 10;
class TimelinePage extends Component {
    constructor(props) {
        super(props);
        const { entities, startYear, endYear } = props;
        if (entities === null) {
            this.state = { tracks: null };
        } else {
            const tracksById = {};
            Object.entries(entities).forEach(([entityType, { list: entitiesOfType }]) => {
                getNonCollidingSubsets(entitiesOfType).forEach((entitiesOfTypeSubset, i) => {
                    const newTrack = buildTrack(entityType, entitiesOfTypeSubset, i, startYear, endYear);
                    tracksById[newTrack.id] = newTrack;
                });
            });
            this.state = {
                zoom: 0.3,
                timebar: buildTimebar(startYear, endYear),
                tracksById,
                tracks: Object.values(tracksById),
            };
        }
    }

    handleZoomIn() {
        const newZoom = Math.min(this.state.zoom + 0.1, ZOOM_MAX);
        this.setState({ zoom: newZoom });
    }

    handleZoomOut() {
        const newZoom = Math.max(this.state.zoom - 0.1, ZOOM_MIN);
        this.setState({ zoom: newZoom });
    }

    showDetails(element) {
        const { entityType, entityData } = element;
        this.setState({ details: { entityType, entityData } });
    }

    render() {
        const { auth, startYear, endYear } = this.props;
        const { zoom, timebar, tracks, details } = this.state;

        // Details
        let detailsBody = null;
        if (details) {
            const { entityType, entityData } = details;
            detailsBody = <Details entityType={entityType} entityData={entityData} />;
        }

        // Timeline
        const mainBody = tracks ? (
            <Timeline
                scale={{
                    start: new Date(`${startYear}`),
                    end: new Date(`${endYear}`),
                    zoom,
                    zoomMin: ZOOM_MIN,
                    zoomMax: ZOOM_MAX
                }}
                isOpen={true}
                zoomIn={this.handleZoomIn.bind(this)}
                zoomOut={this.handleZoomOut.bind(this)}
                clickElement={this.showDetails.bind(this)}
                timebar={timebar}
                tracks={tracks}
                now={new Date()}
                enableSticky
                scrollToNow
            />
        ) : (
            <div className='emptyTimeline vertical-center'>
                Nothing to show.
                <p>Try adding a position, education,<br />project, or certification.</p>
            </div>
        );

        return (
            <Container fluid={true} id='TIMELINE_PAGE'>
                <Sidebar />
                <Header title='Timeline' auth={auth} />
                <main className='clearfix'>
                    {mainBody}
                    {detailsBody}
                </main>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const entities = pick(state.data, ['positions', 'education', 'projects', 'certifications']);

    // If no entities to show on timeline
    if (!Object.values(entities).map(entityType => entityType.list).some(list => list.length > 0)) {
        return { entities: null };
    }

    return {
        entities,
        startYear: getMaximumDate(entities).year() - 1,
        endYear: getMaximumDate(entities, false).year() + 2,
    };
};

export default connect(mapStateToProps)(TimelinePage);
