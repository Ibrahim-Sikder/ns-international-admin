"use client";

import NSIForm from "@/components/Forms/Form";
import NSIInput from "@/components/Forms/Input";
import NSIModal from "@/components/Shared/Modal/NSIModal";
import { Box, Button, Grid, styled } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useImageSelector from "@/hooks/useImageSelector";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import SelectedImageGallery from "@/components/Shared/ImageSelector/SelectedImageGallery";

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const FormSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues?: FieldValues;
};

const AddTeamModal = ({ open, setOpen, initialValues }: TProps) => {
  const handleSubmit = (data: FieldValues) => {

  };

  const {
    isDrawerOpen,
    selectedImage,
    handleOpenDrawer,
    handleCloseDrawer,
    setSelectedImage,
    mode,
  } = useImageSelector("single");

  return (
    <NSIModal open={open} setOpen={setOpen} title="Add Team Member">
      <FormContainer>
        <NSIForm onSubmit={handleSubmit} defaultValues={initialValues}>
          <FormSection>
            {/* Name and Role */}
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <NSIInput
                  fullWidth
                  name="name"
                  label="Name"
                  placeholder="Enter Member Name"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <NSIInput
                  fullWidth
                  name="role"
                  label="Role"
                  placeholder="Enter Member Role"
                />
              </Grid>
            </Grid>

            {/* Email */}
            <NSIInput
              fullWidth
              name="email"
              label="Email"
              placeholder="Enter Member Email"
            />

            {/* Upload Button and Image Gallery */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                onClick={handleOpenDrawer}
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
              </Button>
              <SelectedImageGallery selectedImage={selectedImage} />
            </Box>
          </FormSection>
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </NSIForm>
      </FormContainer>
      <GlobalImageSelector
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        setSelectedImage={setSelectedImage}
        mode={mode}
        selectedImage={selectedImage}
      />
    </NSIModal>
  );
};

export default AddTeamModal;
