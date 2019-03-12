import React, { Component } from "react"


class StudentDetail extends Component {
    // state = {
    //     student : []
    // }
    render() {
        

        let studentId = 1
        let thisStudent = this.props.students.find(student => student.id = studentId) || {}
        let instrument = thisStudent.instrument || {}
        console.log(instrument)
        
        
        return (
            <React.Fragment>
                <h1>{thisStudent.name}</h1>
                <h2>{instrument.name}</h2>
            </React.Fragment>
        )
    }

}

export default StudentDetail