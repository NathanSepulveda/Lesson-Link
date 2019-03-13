import React, { Component } from "react"
import { Route } from "react-router-dom"
import StudentAndParentManager from "../modules/StudentAndParentManager"
import TeacherHome from "./TeacherHome/TeacherHome";
import StudentDetail from "../components/TeacherHome/Student/StudentDetail"
import NewStudentForm from "../components/TeacherHome/Student/NewStudentForm"
import StudentEditForm from "../components/TeacherHome/Student/StudentEditForm"
import NotesDisplay from "../components/notes/NotesDisplay"
import PaymentsDisplay from "../components/payments/PaymentDisplay"
class TeacherApplicationViews extends Component {
  state = {
    students: [],
    parents: [],
    lessons: [],
    payments: [],
    paymentMethods: [],
    instruments: [],
    locations: [],
    lessonDays: [],
    lengths: [],

  }
  componentDidMount() {
    const newState = {}
    StudentAndParentManager.getAllStudents().then(students => {
      newState.students = students
    }).then(() => StudentAndParentManager.getAllParents().then(parents => newState.parents = parents))
      .then(() => StudentAndParentManager.getLessons().then(lessons => newState.lessons = lessons))
      .then(() => StudentAndParentManager.getPayments().then(payments => newState.payments = payments))
      .then(() => StudentAndParentManager.getInstruments().then(instruments => newState.instruments = instruments))
      .then(() => StudentAndParentManager.getLocations().then(locations => newState.locations = locations))
      .then(() => StudentAndParentManager.getLengths().then(lengths => newState.lengths = lengths))
      .then(() => StudentAndParentManager.getPaymentMethods().then(paymentMethods => newState.paymentMethods = paymentMethods))
      .then(() => StudentAndParentManager.getLessonDays().then(lessonDays => newState.lessonDays = lessonDays))
      .then(() => {
        this.setState(newState)
      })

  }
  addStudent = (studentObj) => {
    return StudentAndParentManager.addUser(studentObj)
      .then(() => StudentAndParentManager.getAllStudents())
      .then(students => this.setState({ students: students }))
  }


  deleteStudent = (id) => {
    return StudentAndParentManager.delete(id)
      .then(() => StudentAndParentManager.getAllStudents())
      .then(students => this.setState({ students: students }))

  }

  editStudent = (studObj) => {
    return StudentAndParentManager.editUser(studObj)
      .then(() => StudentAndParentManager.getAllStudents())
      .then(students => this.setState({ students: students }))
  }


  render() {
    // console.log(this.props.activeUser)
    // console.log(this.state)
    return <React.Fragment>
      <Route exact path="/TeacherHome" render={(props) => {
        return <TeacherHome
          students={this.state.students}
          parents={this.state.parents}
          teacherName={this.props.activeUser}
          {...props} />
      }} />
      <Route exact path="/Students/:studentId(\d+)" render={(props) => {
        return <StudentDetail {...props}
          students={this.state.students}
          deleteStudent={this.deleteStudent} />
      }} />
      <Route exact path="/Students/:studentId(\d+)/notes" render={(props) => {
        return <NotesDisplay {...props}
          students={this.state.students}
          lessons={this.state.lessons}

        />
      }} />
      <Route exact path="/Students/:studentId(\d+)/payments" render={(props) => {
        return <PaymentsDisplay {...props}
          students={this.state.students}
          payments={this.state.payments}
          paymentMethods={this.state.paymentMethods}

        />
      }} />
      <Route
        exact path="/students/:studentId(\d+)/edit" render={props => {
          return <StudentEditForm {...props}
            instruments={this.state.instruments}
            locations={this.state.locations}
            editStudent={this.editStudent}
            lengths={this.state.lengths}
            lessonDays={this.state.lessonDays}
            addStudent={this.addStudent}
            parents={this.state.parents}
          />
        }}
      />
      <Route path="/students/new" render={(props) => {
        return <NewStudentForm {...props}
          instruments={this.state.instruments}
          locations={this.state.locations}
          lengths={this.state.lengths}
          lessonDays={this.state.lessonDays}
          addStudent={this.addStudent}
          parents={this.state.parents}
        // addArticle={this.addArticle}
        />
      }} />
    </React.Fragment>

  }
}

export default TeacherApplicationViews
