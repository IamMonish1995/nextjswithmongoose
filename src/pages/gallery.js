import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function Gallery() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    let base64formateImage = await convertToBase64(e.target.files[0]);
    setImage(base64formateImage);

    const options = {
      url: "/api/images/addimage",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        name: e.target.files[0].name,
        image: base64formateImage,
        isactive: true,
      },
    };
    let res = await axios(options);
    if (res.data.status === "success") {
      getData();
    }
  };
  const handleSoftDelete = async (ID) => {
    const options = {
      url: "/api/images/deleteimage",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        ID,
        isactive: false,
      },
    };
    let res = await axios(options);
    if (res.data.status === "success") {
      getData();
    }
  };

  const getData = async () => {
    const options = {
      url: "/api/images/getallimage",
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    let res = await axios(options);
    if (res.data.status === "success") {
      setImages(res.data.data);
    }
  };
  useEffect(() => {
    getData();
    return () => {
      setImage(null);
    };
  }, []);

  return (
    <>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={handleUpload} />
        <PhotoCamera />
      </IconButton>

      {images && (
        <Grid container gap={2}>
          {images
            ?.filter((image) => image.isactive === "true")
            .map((item) => (
              <Grid item sm={6} md={6} lg={4} xl={3} key={item._id} >
                <Card sx={{ maxWidth: 345 }} >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.name}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleSoftDelete(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
}
