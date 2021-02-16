import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload.js'


const firebaseConfig = {
    apiKey: "AIzaSyDEQZ2o2LaBAty7YIMXEnp979IOLgrCJ88",
    authDomain: "fe-upload-file.firebaseapp.com",
    projectId: "fe-upload-file",
    storageBucket: "fe-upload-file.appspot.com",
    messagingSenderId: "639982442775",
    appId: "1:639982442775:web:90883a59addd7927c6ff52"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()


upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`image/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage 
            }, error => {
                console.log(error)
            },  () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download URL', url)
                })
                
            })
        })
    }
})