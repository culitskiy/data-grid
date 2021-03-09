import React, { Component } from 'react';
import styles from './rightSide.scss';

import deleteIcon from './assets/delete.svg';
import editIcon from './assets/edit.svg';

export default class RightSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeInput: '',
        };
        this.activeInputValue = '';
        this.newColumnRef = React.createRef();
        this.handleOnClickEdit = this.handleOnClickEdit.bind(this);
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    }

    handleOnClickEdit(inputName, inputValue) {
        const { activeInput } = this.state;
        const { handleOnChangeColumnName } = this.props;

        if (inputName !== activeInput) {
            this.setState({ activeInput: inputName });
            this.activeInputValue = inputValue;
        } else {
            handleOnChangeColumnName(this.activeInputValue, inputName);
            this.setState({ activeInput: '' });
            this.activeInputValue = '';
        }
    }

    handleOnChangeInput(e) {
        this.activeInputValue = e.target.value;
    }

    listRender() {
        const { columsItems, handleDeleteColumn } = this.props;
        const { activeInput } = this.state;

        return columsItems.map((column) => (
            <div
                key={column.properties.dataField}
                className={styles.item}
            >
                <input
                    type="text"
                    name={column.properties.dataField}
                    className={styles.input}
                    defaultValue={column.properties.caption}
                    onChange={this.handleOnChangeInput}
                    disabled={activeInput === column.properties.dataField ? false : true}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            this.handleOnClickEdit(column.properties.dataField, column.properties.caption);
                        }
                    }}
                />
                <div>
                    <img
                        className={styles.img}
                        src={deleteIcon}
                        alt="deleteIcon"
                        onClick={() => handleDeleteColumn(column.properties.dataField)}
                    />
                    <img
                        className={styles.img}
                        src={editIcon}
                        alt="editIcon"
                        onClick={() => this.handleOnClickEdit(column.properties.dataField, column.properties.caption)}
                    />
                </div>
            </div>
        ));
    }

    render() {
        const { handleAddColumn } = this.props;
        return (
            <div className={styles.container}>
                Список колонок
                {this.listRender()}
                <input
                    ref={this.newColumnRef}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            handleAddColumn(this.newColumnRef.current.value);
                        }
                    }}
                />
                <div
                    className={styles.addColumn}
                    onClick={() => handleAddColumn(this.newColumnRef.current.value)}
                >
                    Добавить колонку
                </div>
            </div>
        );
    }
}
