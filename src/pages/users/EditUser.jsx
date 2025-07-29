

import { useParams } from 'react-router-dom';

function EditUser() {
    const { userId } = useParams();
    return (
        <h4>Edit User {userId}</h4>
    

    

    )
}

export default EditUser;