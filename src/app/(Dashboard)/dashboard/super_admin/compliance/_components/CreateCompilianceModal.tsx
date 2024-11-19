"use client";

import ADForm from "@/components/Forms/Form";
import { Box, Button, Grid, styled, Typography, } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import { toast } from "sonner";
import ADImageUpload from "@/components/Forms/FileUpload";
import NSIRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import NSIInput from "@/components/Forms/Input";
import { useCreatlBrandMutation } from "@/redux/api/brandApi";
import NSITextArea from "@/components/Forms/TextArea";
import NSIEditor from "@/components/Forms/JodiEditor";
import NSIAutoComplete from "@/components/Forms/AutoComplete";
import { compiliance } from "@/constant/common";
import { useCreatcomplianceMutation } from "@/redux/api/complianceApi";

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


const CreateCompilianceModal = ({ open, setOpen }: TProps) => {
    const [createCompiliance] = useCreatcomplianceMutation()
    const [images, setImages] = useState<string[]>([]);
    const [imageOpen, setImageOpen] = useState(false);

    const [socialCompilianceImages, setSocialCompilianceImages] = useState<string[]>([]);
    const [socialCompilianceImageOpen, setSocialCompilianceImageOpen] = useState(false);

    const [zeroToleranceImages, setZeroToleranceImage] = useState<string[]>([]);
    const [zeroToleranceImageOpen, setZeroToleranceImageOpen] = useState(false);

    const [csrImages, setCSRImages] = useState<string[]>([]);
    const [csrImagesOpen, setCSRImagesOpen] = useState(false);

    const [codeOfConductImages, setCodeOfConductImages] = useState<string[]>([]);
    const [codeOfConductImagesOpen, setCodeOfConductImagesOpen] = useState(false);




    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values,
            images,
            csrImages,
            socialCompilianceImages,
            zeroToleranceImages,
            codeOfConductImages,

        };

        try {
            const res = await createCompiliance(modifiedValues).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {

            toast.error(err?.data?.message);
        }
    };




    return (
        <>
            <NSIRightSideModal sx={{ width: '500px' }} open={open} setOpen={setOpen} title="Create Compliance ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
                        <FormSection>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                        <ADImageUpload
                                            name="images"
                                            setImageUrls={setImages}
                                            imageUrls={images}
                                            label="Select Images"
                                            onClick={() => setImageOpen(true)}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item md={12} sm={12}>
                                    <NSIEditor

                                        name="description"
                                        label="Description"
                                    />
                                </Grid>



                            </Grid>
                            <Typography textAlign='center' marginTop='20px' component='h1' variant="h5" fontWeight='bold'>Social Compiliance </Typography>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                        <ADImageUpload
                                            name="socialCompilianceImages"
                                            setImageUrls={setSocialCompilianceImages}
                                            imageUrls={socialCompilianceImages}
                                            label="Social Compiliance Image"
                                            onClick={() => setSocialCompilianceImageOpen(true)}
                                        />
                                    </Box>
                                </Grid>


                                <Grid item md={12} sm={12}>
                                    <NSIInput
                                        fullWidth
                                        name="social_compliance_title"
                                        label="Social Compliance Title"
                                        placeholder="Social Compliance Title"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <NSIAutoComplete
                                        label="EmployeesCocCovers"
                                        name="EmployeesCocCovers"
                                        options={compiliance}
                                    />

                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <NSIEditor

                                        name="social_compliance_description"
                                        label="Social Compiliance Description"
                                    />
                                </Grid>



                            </Grid>
                            <Typography textAlign='center' marginTop='20px' component='h1' variant="h5" fontWeight='bold'>Zero Tolerance </Typography>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                        <ADImageUpload
                                            name="zeroToleranceImages"
                                            setImageUrls={setZeroToleranceImage}
                                            imageUrls={zeroToleranceImages}
                                            label="Select Image"
                                            onClick={() => setZeroToleranceImageOpen(true)}
                                        />
                                    </Box>
                                </Grid>





                                <Grid item md={12} sm={12}>
                                    <NSIInput
                                        fullWidth
                                        name="zeroTolerance_Title"
                                        label="Zero Tolerance Title"
                                        placeholder="Zero Tolerance Title"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <NSIEditor

                                        name="zeroTolerance_description"
                                        label="Zero Tolerance Description"
                                    />
                                </Grid>



                            </Grid>

                            <Typography textAlign='center' marginTop='20px' component='h1' variant="h5" fontWeight='bold'>Code Of Conduct </Typography>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                        <ADImageUpload
                                            name="codeOfConductImages"
                                            setImageUrls={setCodeOfConductImages}
                                            imageUrls={codeOfConductImages}
                                            label="Select Image"
                                            onClick={() => setCodeOfConductImagesOpen(true)}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item md={12} sm={12}>
                                    <NSIInput
                                        fullWidth
                                        name="cod_of_conduct_title"
                                        label="Cod of Conduct Title"
                                        placeholder="Cod of Conduct Title"
                                    />
                                </Grid>

                                <Grid item md={12} sm={12}>
                                    <NSITextArea

                                        name="cod_of_conduct_short_description"
                                        label="Cod Of Conduct Short Description"
                                        placeholder="Cod Of Conduct Short Description"
                                        minRows={8}
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <NSIEditor

                                        name="cod_of_conduct_description"
                                        label="Cod Of Conduct Description"
                                    />
                                </Grid>



                            </Grid>

                            <Typography textAlign='center' marginTop='20px' component='h1' variant="h5" fontWeight='bold'>CSR </Typography>

                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                        <ADImageUpload
                                            name="csrImages"
                                            setImageUrls={setCSRImages}
                                            imageUrls={csrImages}
                                            label="Select Image"
                                            onClick={() => setCSRImagesOpen(true)}
                                        />
                                    </Box>
                                </Grid>


                                <Grid item md={12} sm={12}>
                                    <NSIInput
                                        fullWidth
                                        name="csr_title"
                                        label="CSR Title"
                                        placeholder="CSR Title"
                                    />
                                </Grid>

                                <Grid item md={12} sm={12}>
                                    <NSITextArea

                                        name="csr_short_description"
                                        label="Cod Of Conduct Short Description"
                                        placeholder="CSR Short Description"
                                        minRows={8}
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <NSIEditor

                                        name="csr_description"
                                        label="CSR Description"
                                    />
                                </Grid>



                            </Grid>
                            <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Add Compliance </Button></Box>
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
            <GlobalImageSelector
                open={socialCompilianceImageOpen}
                onClose={() => setSocialCompilianceImageOpen(false)}
                setSelectedImage={setSocialCompilianceImages}
                mode="multiple"
                selectedImage={socialCompilianceImages}
            />
            <GlobalImageSelector
                open={zeroToleranceImageOpen}
                onClose={() => setZeroToleranceImageOpen(false)}
                setSelectedImage={setZeroToleranceImage}
                mode="multiple"
                selectedImage={zeroToleranceImages}
            />
            <GlobalImageSelector
                open={csrImagesOpen}
                onClose={() => setCSRImagesOpen(false)}
                setSelectedImage={setCSRImages}
                mode="multiple"
                selectedImage={csrImages}
            />
            <GlobalImageSelector
                open={codeOfConductImagesOpen}
                onClose={() => setCodeOfConductImagesOpen(false)}
                setSelectedImage={setCodeOfConductImages}
                mode="multiple"
                selectedImage={codeOfConductImages}
            />

        </>
    );
};

export default CreateCompilianceModal;
