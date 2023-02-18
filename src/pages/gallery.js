"use client";
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
import { CardActionArea, Grid } from "@mui/material";
import SingleImage from "@/components/gallery/singleimage";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "./_app";

export default function Gallery() {
  const router = useRouter();
  const { isLoggedIn } = useContext(AppContext);
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

  const uploadFiles = (files) => {
    return new Promise(async (resolve, reject) => {
      await files.map(async (item) => {
        let base64formateImage = await convertToBase64(item);
        const options = {
          url: "/api/images/addimage",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            name: item.name,
            image: base64formateImage,
            isactive: true,
          },
        };
        let res = await axios(options);
      });

      resolve(true);
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    let files = e.target.files;
    let fileArray = [];

    for (let index = 0; index < files.length; index++) {
      fileArray.push(files[index]);
    }

    await uploadFiles(fileArray).then(() => {
      getData();
    });
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
    if (isLoggedIn === true) {
      getData();
    } else {
      router.push("/");
    }
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SingleImage
        image={image}
        open={open}
        handleClose={handleClose}
      ></SingleImage>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={handleUpload}
        />
        <PhotoCamera />
      </IconButton>

      {images && (
        <Grid container>
          {images
            ?.filter((image) => image.isactive === "true")
            .map((item) => (
              <Grid
                marginY="2%"
                item
                sm={6}
                md={6}
                lg={3}
                xl={3}
                key={item._id}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea
                    onClick={() => {
                      setImage(item);
                      setOpen(true);
                    }}
                  >
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
                  </CardActionArea>

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
