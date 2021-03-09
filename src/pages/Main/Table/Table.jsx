import React, { Component } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';

import styles from './table.scss';
import { customers } from '@data/data.js';

export default class Table extends Component {
    columsRender() {
        const { columsItems } = this.props;

        return columsItems.map((elem) => (
            <Column
                key={elem.properties.dataField}
                dataField={elem.properties.dataField}
                caption={elem.properties.caption}
            />
        ));
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>Окно предварительного просмотра отчёта</div>
                <DataGrid
                    id="gridContainer"
                    dataSource={customers}
                    allowColumnReordering
                    allowColumnResizing
                    columnAutoWidt
                    showBorders
                >
                    {this.columsRender()}
                </DataGrid>
            </div>
        );
    }
}
