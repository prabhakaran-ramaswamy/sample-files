import React,{Component} from "react";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";

export default class TextFieldValidation extends Component{

    constructor(props){
        super(props)
        this.state={ error: false, label: "", helperText: "", validateInput: false,data: [
            {
                name: "Mehmet",
                surname: "Baran",
                birthYear: 1987,
                birthCity: 63,
                submitted: false,
            },
            {
                name: "Zerya Betül",
                surname: "Baran",
                birthYear: 2017,
                birthCity: 34,
                submitted: false,
            },
        ]};
    }

    render(){
const columnsHeader = [
    {
        title: "Name",
        field: "name",
        editComponent: (props) => (
            <TextField
                type="text"
                error={
                    !props.value &&
                    this.state.validateInput &&
                    props.rowData.submitted
                        ? this.state.error
                        : false
                }
                helperText={
                    !props.value &&
                    this.state.validateInput &&
                    props.rowData.submitted
                        ? this.state.helperText
                        : ""
                }
                value={props.value ? props.value : ""}
                onChange={(e) => {
                    if (this.state.validateInput) {
                        this.setState({
                            ...this.state.nameError,
                            validateInput: false,
                        });
                    }

                    props.onChange(e.target.value);
                }}
                variant="outlined"
            />
        ),
    },
    { title: "Surname", field: "surname" },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    {
        title: "Birth Place",
        field: "birthCity",
        lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
    },
    { title: "submitted", field: "submitted", hidden: true },
];

return (
    <MaterialTable
        title="Editable Example"
        columns={columnsHeader}
        data={this.state.data}
        editable={{
            onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        newData.submitted = true;
                        if (!newData.name) {
                            this.setState({
                                error: true,
                                label: "required",
                                helperText: "Name is required.",
                                validateInput: true,
                            });
                            reject();
                            return;
                        }
                        resolve();

                        const data = [...this.state.data];
                        data.push(newData);
                        this.setState({ ...this.state, data });
                    }, 600);
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        newData.submitted = true;
                        if (!newData.name) {
                            this.setState({
                                error: true,
                                label: "required",
                                helperText: "Name is required.",
                                validateInput: true,
                            });
                            reject();
                            return;
                        }
                        resolve();
                        const data = [...this.state.data];
                        data[data.indexOf(oldData)] = newData;
                        this.setState({ ...this.state, data });
                    }, 600);
                }),
            onRowDelete: (oldData) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        const data = [...this.state.data];
                        data.splice(data.indexOf(oldData), 1);
                        this.setState({ ...this.state, data });
                    }, 600);
                }),
        }}
    />
);
}

}