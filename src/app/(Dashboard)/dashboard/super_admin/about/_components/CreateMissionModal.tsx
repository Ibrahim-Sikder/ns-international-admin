"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import { Box, Button, Grid, styled, Typography, } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import ADTextArea from "@/components/Forms/TextArea";
import { toast } from "sonner";
import ADImageUpload from "@/components/Forms/FileUpload";
import NSIRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { useCreatlBannerMutation } from "@/redux/api/bannerApi";
import NSISelect from "@/components/Forms/Select";
import NSIInput from "@/components/Forms/Input";
import { productCategory, serviceCategory } from "@/constant/service";
import NSIEditor from "@/components/Forms/JodiEditor";
import { useCreatServiceMutation } from "@/redux/api/serviceApi";
import { useCreatProductMutation } from "@/redux/api/productApi";
import NSIAutoComplete from "@/components/Forms/AutoComplete";
import NSITextArea from "@/components/Forms/TextArea";
import { tags } from "@/constant/common";
import { useCreatAboutMutation } from "@/redux/api/aboutApi";
import { useCreatMissionMutation } from "@/redux/api/missionApi";

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


const CreateMissionModal = ({ open, setOpen }: TProps) => {
    const [createMission] = useCreatMissionMutation()
    const [images, setImages] = useState<string[]>([]);
    const [imageOpen, setImageOpen] = useState(false);




    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values,
            images

        };

        try {
            const res = await createMission(modifiedValues).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {

            toast.error(err?.data?.message);
        }
    };




    return (
        <>
            <NSIRightSideModal sx={{ width: '500px' }} open={open} setOpen={setOpen} title="Create Mission ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
                        <FormSection>
                            <Grid container spacing={2}>
                                {/* <Grid item md={12} sm={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                        <ADImageUpload
                                            name="images"
                                            setImageUrls={setImages}
                                            imageUrls={images}
                                            label="Select Images"
                                            onClick={() => setImageOpen(true)}
                                        />
                                    </Box>
                                </Grid> */}

                                <Grid item md={12} sm={12}>
                                    <NSIInput
                                        fullWidth
                                        name="title"
                                        label=" Title"
                                        placeholder="Title"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <NSITextArea
                                        minRows={10}
                                        name="description"
                                        label="Short Description"

                                    />
                                </Grid>


                            </Grid>


                            <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Add Mission</Button></Box>
                        </FormSection>
                    </ADForm>
                </FormContainer>

            </NSIRightSideModal>
            <GlobalImageSelector
                open={imageOpen}
                onClose={() => setImageOpen(false)}
                setSelectedImage={setImages}
                mode="multiple"
                selectedImage={images}
            />

        </>
    );
};

export default CreateMissionModal;
