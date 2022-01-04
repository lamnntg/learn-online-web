import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
function ImageUploadModal(props) {
  const [image, setImage] = React.useState(undefined);
  const [imageWarning, setImageWarning] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // const selectImage = (e)=>{
  //   setImage({ image:e.target.files[0]})
  // }

  const uploadImage = async () => {
    // console.log(props.contextData);
    // console.log(image);
    // console.log(image.size);

    if (image.size > 3110670) {
      setImageWarning("File Size is too big");
    } else if (0) {
      //only images.
    } else {
      setLoading(true);
      const storage = getStorage();
      let path = `/homeworks/${props.classroom._id}/${Date.now()}_${
        image.name
      }`;
      if (image) {
        const storageRef = ref(storage, path);
        const task = uploadBytesResumable(storageRef, image);
        task.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(prog);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(task.snapshot.ref).then((url) => {
              setLoading(false);
              props.handleImagePopClose();
              props.updateImageLink(url, props.contextData);
            });
          }
        );
      }
    }
  };

  return (
    <div>
      <Dialog
        open={props.handleImagePopOpen}
        onClose={props.handleImagePopClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">Upload hình ảnh</DialogTitle>
        <DialogContent>
          <DialogContentText>Lựa chọn hình ảnh để upload</DialogContentText>
          {loading ? <CircularProgress /> : ""}
          <TextField
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {imageWarning !== "" ? <p>{imageWarning}</p> : ""}
        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleImagePopClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={uploadImage}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ImageUploadModal;
