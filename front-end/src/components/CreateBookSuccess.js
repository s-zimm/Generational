import React from 'react';
import { Link } from 'react-router-dom';
import PageSubHeader from './PageSubHeader';

const CreateBookSuccess = () => {
    return (
        <div>
            <PageSubHeader heading="You created a book!" />
            <Link to="/account"><button>Go back to account</button></Link>
        </div>
    )
}

export default CreateBookSuccess;