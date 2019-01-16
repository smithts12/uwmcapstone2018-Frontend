import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add icons to library
import { faEdit, faCheck, faBan, faTrashAlt, faHome, faUser, faUserCog, faFileAlt, faGraduationCap, faBriefcase, faCalendarAlt, faCertificate, faProjectDiagram, faAddressBook } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faCheck, faBan, faTrashAlt, faHome, faUser, faUserCog, faFileAlt, faGraduationCap, faBriefcase, faCalendarAlt, faCertificate, faProjectDiagram, faAddressBook);

global.requestAnimationFrame = (cb) => {
    setTimeout(cb, 0);
};

configure({ adapter: new Adapter() });
