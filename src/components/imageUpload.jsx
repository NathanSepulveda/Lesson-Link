import React, { Component } from "react"
import { Button } from 'reactstrap'
import { storage } from '../firebase'
import FileManager from "../modules/FileManager"


import AvatarImageCropper from 'react-avatar-image-cropper'
import StudentAndParentManager from "../modules/StudentAndParentManager";


class ImageUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            url: "",
            name: "",
            fileType: ""
            
            
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
            console.log(error)
        }, 
        () => {
            //complete function
            storage.ref('files').child(image.name).getDownloadURL().then(url => {
                let filesIdsArray = this.props.studentMaterialsIds
                let student = this.props.student
                this.setState({url})
                console.log(this.state)
                delete this.state.image 
                console.log(this.state)
                FileManager.addFile(this.state).then( res => {
                    console.log(res)
                    filesIdsArray.push(res.id)
                    console.log(filesIdsArray)
                    student.lessonMaterialsIds = filesIdsArray
                    delete student.instrument
                    delete student.lessonDay
                    delete student.location
                    delete student.length

                    console.log(student)
                    StudentAndParentManager.editUser(student)
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


                <div>
                    <input type="file" onChange={this.handleChange}></input>
                    <button onClick={this.handleUpload} >Upload</button>
                </div>


            </React.Fragment>
        )
    }
}

export default ImageUpload