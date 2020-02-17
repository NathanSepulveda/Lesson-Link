import React, { Component } from "react"
import { storage } from '../firebase'
import FileManager from "../modules/FileManager"
import {Input, Button } from 'reactstrap';


import StudentAndParentManager from "../modules/StudentAndParentManager"

const container = {
    paddingTop: "20px"
}


class ImageUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            url: "",
            name: "",
            fileType: "",
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)

    }


    handleChange = evt => {
        
        if (evt.target.files[0]) {
            const image = evt.target.files[0]
            const name = image.name
            const fileType = image.type
            this.setState(() => ({image}))
            this.setState(() => ({name}))
            this.setState(() => ({fileType}))

            console.log(image.name, image.type)
        }
    }

    handleUpload = () => {
        const {image} = this.state
      const uploadTask =   storage.ref(`files/${image.name}`).put(image)
        uploadTask.on("state_changed", 
        (snapshot) => {
            //progress function ...
        }, 
        (error) => {
            //err function
            if (error) {

                this.errorHandler()
            }
            console.log(error)
        }, 
        () => {
            //complete function
            storage.ref('files').child(image.name).getDownloadURL().then(url => {
                this.setState({url})

                delete this.state.image 
                let studentToUpdate = this.props.student
                FileManager.addFile(this.state).then(file => {
                    console.log(file)
                    studentToUpdate.lessonMaterialsIds.push(file.name)
                    StudentAndParentManager.getUnexpandedStudent(studentToUpdate.id).then(returnedStudent => {
                        returnedStudent.lessonMaterialsIds.push(file.name)
                        console.log(returnedStudent)
                        return returnedStudent
                    }).then(rStudent => {
                        StudentAndParentManager.editUser(rStudent).then(student => {
                            this.props.updateStudentMaterials(student.lessonMaterialsIds)
                    })
                    
                    })

                })
                alert("File uploaded")

            })
        })

    }

    onImageUploaded = () => {
        this.props.imageUploaded(this.state.url)
        
    }

    errorHandler = (type) => {
        window.alert("Something went wrong. Try another image.")
    }

    render() {
        return (
            <React.Fragment>


                <div style={container}>
                    <Input type="file" onChange={this.handleChange}></Input>
                    <Button onClick={this.handleUpload} >Upload</Button>
                </div>


            </React.Fragment>
        )
    }
}

export default ImageUpload