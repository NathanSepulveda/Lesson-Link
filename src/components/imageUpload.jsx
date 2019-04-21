import React, { Component } from "react"
import { Button } from 'reactstrap'
import { storage } from '../firebase'
import FileManager from "../modules/FileManager"


import AvatarImageCropper from 'react-avatar-image-cropper'


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

    // handleUpload = (imageBlob) => {
    //     document.querySelector("#cropper-container").innerHTML = `<img class="spinner" src="/images/spinner.gif" />`
    //     const dateTime = Date.parse(new Date())
    //     const imagePath = `${dateTime}-${imageBlob.name}`
    //     const uploadTask = storage.ref(`images/${imagePath}`).put(imageBlob)
    //     uploadTask.on("state_changed",
    //         (snapshot) => {
    //             // progress function
    //             const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    //             this.setState({ progress })
    //         },
    //         (error) => {
    //             // error function
    //         },
    //         () => {
    //             // complete function
    //             storage.ref("images").child(imagePath).getDownloadURL()
    //                 .then(url => {
    //                     this.setState({ url })
    //                 })
    //                 .then(() => this.onImageUploaded())
    //                 .then(() = {
    //                     document.querySelector("#cropper-container").innerHTML = `<img src="${this.state.url}" />`
    //                 })
    //         }
    //     )
    // }

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
                this.setState({url})
                console.log(this.state)
                delete this.state.image 
                console.log(this.state)
                FileManager.addFile(this.state)
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