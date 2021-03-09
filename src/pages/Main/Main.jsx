import React, { PureComponent } from 'react';
import styles from './main.scss';

import columsConfig from '@config/report-config.js';

import Table from './Table';
import RightSide from './RightSide';

export default class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            colums: columsConfig.properties.colums.items,
        };
        this.handleOnChangeColumnName = this.handleOnChangeColumnName.bind(this);
        this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
        this.handleAddColumn = this.handleAddColumn.bind(this);
    }

    handleOnChangeColumnName(newName, targetColumn) {
        const { colums } = this.state;
        // const { target: { name, value } } = e;

        const newColums = colums.map((el) => {
            const newEl = el;
            if (newEl.properties.dataField === targetColumn) {
                newEl.properties.caption = newName;
            }
            return newEl;
        });
        this.setState({ colums: newColums });
    }

    handleDeleteColumn(targetColumn) {
        const { colums } = this.state;

        const newColums = colums.filter((column) => column.properties.dataField !== targetColumn);

        this.setState({ colums: newColums });
    }

    handleAddColumn(columnName) {
        const { colums } = this.state;
        const newState = colums.map((el) => el);

        const initialColumn = {
            type: 'object',
            properties: {
                dataField: columnName,
                caption: columnName,
                dataType: {
                    type: 'string',
                },
                format: {
                    type: 'string',
                },
                alignment: {
                    type: 'string',
                },
            },
        };

        newState.push(initialColumn);

        this.setState({ colums: newState }, () => {
        });
    }

    render() {
        const { colums } = this.state;
        return (
            <>
                <div className={styles.container}>
                    <Table columsItems={colums} />
                    <RightSide
                        handleOnChangeColumnName={this.handleOnChangeColumnName}
                        handleDeleteColumn={this.handleDeleteColumn}
                        handleAddColumn={this.handleAddColumn}
                        columsItems={colums}
                    />
                </div>
            </>
        );
    }
}
