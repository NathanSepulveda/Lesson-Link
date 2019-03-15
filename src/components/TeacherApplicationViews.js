import React, { Component } from "react"
import { Route } from "react-router-dom"
import StudentAndParentManager from "../modules/StudentAndParentManager"
import TeacherHome from "./TeacherHome/TeacherHome";
import StudentHome from "../components/StudentHome/StudentHome";
import StudentDetail from "../components/TeacherHome/Student/StudentDetail"
import ParentDetail from "../components/TeacherHome/Parent/ParentDetail"
import NewStudentForm from "../components/TeacherHome/Student/NewStudentForm"
import StudentEditForm from "../components/TeacherHome/Student/StudentEditForm"
import NotesDisplay from "../components/notes/NotesDisplay"
import PaymentsDisplay from "../components/payments/PaymentDisplay"
class TeacherApplicationViews extends Component {
  state = {
    students: [],
    users: [],
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
      .then(() => StudentAndParentManager.getAll().then(users => newState.users = users))
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
    return StudentAndParentManager.delete(id, "users")
      .then(() => StudentAndParentManager.getAllStudents())
      .then(students => this.setState({ students: students }))

  }

  editStudent = (studObj) => {
    return StudentAndParentManager.editUser(studObj)
      .then(() => StudentAndParentManager.getAllStudents())
      .then(students => this.setState({ students: students }))
  }


  render() {
    let id;
    // <Route path="/" render={(props)} => 
    // if (userType === student) {
    //   return <Student Home>
    // } else {
    //   return TeacherHome
    // }
    return <React.Fragment>
      <Route exact path="/" render={(props) => {
        if (Number(sessionStorage.getItem("userType")) === 1) {
          console.log("teacher")
          return <TeacherHome
            students={this.state.students}
            parents={this.state.parents}
            teacherName={this.props.activeUser}
            {...props} />
        } else {
          console.log("studentt")
          id = sessionStorage.getItem("credentials")
          sessionStorage.setItem("studentId", id)
          return <StudentHome
            students={this.state.students}
            parents={this.state.parents}
            teacherName={this.props.activeUser}
            {...props} />
        }



      }} />
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
      <Route exact path="/parents/:parentId(\d+)" render={(props) => {
        return <ParentDetail {...props}
          students={this.state.students}
          parents={this.state.parents}
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
          users={this.state.users}
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
