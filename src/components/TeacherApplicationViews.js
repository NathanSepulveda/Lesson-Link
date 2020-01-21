import React, { Component } from "react";
import { Route } from "react-router-dom";
import StudentAndParentManager from "../modules/StudentAndParentManager";
import TeacherHome from "./TeacherHome/TeacherHome";

import StudentDetail from "../components/TeacherHome/Student/StudentDetail";
import ParentDetail from "../components/TeacherHome/Parent/ParentDetail";

import NewStudentForm from "../components/TeacherHome/Student/NewStudentForm";
import StudentEditForm from "../components/TeacherHome/Student/StudentEditForm";
import NotesDisplay from "../components/notes/NotesDisplay";
import PaymentsDisplay from "../components/payments/PaymentDisplay";
import PaymentSummary from "./payments/PaymentSummary";
import FileManager from "../modules/FileManager";
import Mileage from "./Mileage/Mileage"
class TeacherApplicationViews extends Component {
  state = {
    students: [],
    users: [],
    parents: [],
    payments: [],
    studentMaterials: []
  };

  componentDidMount() {
    const newState = {};
    StudentAndParentManager.getAllStudents()
      .then(students => {
        newState.students = students;
      })
      .then(() =>
        StudentAndParentManager.getAllParents().then(
          parents => newState.parents = parents
        )
      )
      .then(() =>
        FileManager.getAll().then(
          materials => (newState.studentMaterials = materials)
        )
      )
      .then(() =>
        StudentAndParentManager.getPayments().then(
          payments => (newState.payments = payments)
        )
      )
      .then(() =>
        StudentAndParentManager.getAll().then(users => (newState.users = users))
      )
      .then(() =>
        StudentAndParentManager.getPaymentMethods().then(
          paymentMethods => (newState.paymentMethods = paymentMethods)
        )
      )
      .then(() => {
        this.setState(newState);
      })
      .then(() => {
        this.state.students.forEach(student => {
          delete student.password;
        });
        // console.log(this.state.students[0])
        // delete this.state.students[0].password
      })
      .then(() => {
        this.setState(newState);
      });
  }
  addStudent = studentObj => {
    return StudentAndParentManager.addUser(studentObj)
      .then(() => StudentAndParentManager.getAllStudents())
      .then(students => this.setState({ students: students }))
      .then(() => StudentAndParentManager.getAllParents())
      .then(parents => this.setState({ parents: parents }));
  };

  deleteStudent = id => {
    return StudentAndParentManager.delete(id, "users")
      .then(() => StudentAndParentManager.getAllStudents())
      .then(students => this.setState({ students: students }))
      .then(() => StudentAndParentManager.getAllParents())
      .then(parents => this.setState({ parents: parents }));
  };

  editStudent = studObj => {
    return StudentAndParentManager.editUser(studObj)
      .then(() => StudentAndParentManager.getAllStudents())
      .then(students => this.setState({ students: students }));
  };

  editParent = parentObj => {
    return StudentAndParentManager.editUser(parentObj)
      .then(() => StudentAndParentManager.getAllParents())
      .then(parents => this.setState({ parents: parents }));
  };

  render() {
    let id;
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (Number(sessionStorage.getItem("userType")) === 1) {
              return (
                <TeacherHome
                  students={this.state.students}
                  parents={this.state.parents}
                  teacherName={this.props.activeUser}
                  {...props}
                />
              );
            } else if (Number(sessionStorage.getItem("userType")) === 2) {
              id = sessionStorage.getItem("credentials");
              sessionStorage.setItem("studentId", id);
              return (
                <StudentDetail
                  students={this.state.students}
                  parents={this.state.parents}
                  teacherName={this.props.activeUser}
                  {...props}
                />
              );
            } else {
              id = sessionStorage.getItem("credentials");
              sessionStorage.setItem("parentId", id);
              return (
                <ParentDetail
                  {...props}
                  students={this.state.students}
                  parents={this.state.parents}
                  deleteStudent={this.deleteStudent}
                />
              );
            }
          }}
        />
        <Route
          exact
          path="/TeacherHome"
          render={props => {
            return (
              <TeacherHome
                students={this.state.students}
                parents={this.state.parents}
                teacherName={this.props.activeUser}
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/Students/:studentId(\d+)"
          render={props => {
            return (
              <StudentDetail
                {...props}
                students={this.state.students}
                deleteStudent={this.deleteStudent}
              />
            );
          }}
        />
        <Route
          exact
          path="/parents/:parentId(\d+)"
          render={props => {
            return (
              <ParentDetail
                {...props}
                students={this.state.students}
                parents={this.state.parents}
                deleteStudent={this.deleteStudent}
              />
            );
          }}
        />
        <Route
          exact
          path="/Students/:studentId(\d+)/notes"
          render={props => {
            return (
              <NotesDisplay
                {...props}
                students={this.state.students}
              />
            );
          }}
        />
        <Route
          exact
          path="/Students/:studentId(\d+)/payments"
          render={props => {
            return (
              <PaymentsDisplay
                payments={this.state.payments}

              />
            );
          }}
        />
        <Route
          exact
          path="/paymentsummary"
          render={props => {
            return (
              <PaymentSummary
                {...props}
                students={this.state.students}
                users={this.state.users}
                payments={this.state.payments}
                paymentMethods={this.state.paymentMethods}
              />
            );
          }}
        />
        <Route
          exact
          path="/mileage"
          render={props => {
            return (
              <Mileage
                {...props}
                students={this.state.students}
                users={this.state.users}
                payments={this.state.payments}
                paymentMethods={this.state.paymentMethods}
              />
              
            );
          }}
        />
        <Route
          exact
          path="/students/:studentId(\d+)/edit"
          render={props => {
            return (
              <StudentEditForm
                {...props}
                editStudent={this.editStudent}
                editParent={this.editParent}
                addStudent={this.addStudent}
                parents={this.state.parents}
              />
            );
          }}
        />
        <Route
          path="/students/new"
          render={props => {
            return (
              <NewStudentForm
                {...props}
                addStudent={this.addStudent}
                parents={this.state.parents}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default TeacherApplicationViews;
