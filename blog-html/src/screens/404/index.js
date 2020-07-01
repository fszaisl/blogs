import React from 'react';
import { Result } from 'antd';

export default function () {
    return (<Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
    // extra={<Button type="primary">Back Home</Button>}
    />)
}

// class NotFound extends Component {
//     render() {
//         return
//     }
// }

// export default NotFound;