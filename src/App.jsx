import React, { PureComponent } from 'react';
import Main from './pages/Main';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <Main />
            </div>
        );
    }
}
