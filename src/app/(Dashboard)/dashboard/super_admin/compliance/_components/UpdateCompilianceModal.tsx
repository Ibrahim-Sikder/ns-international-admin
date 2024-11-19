"use client";

import ADForm from "@/components/Forms/Form";
import { Box, Button, Grid, styled, Typography, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import { toast } from "sonner";
import NSIRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import ADImageUpload from "@/components/Forms/FileUpload";
import NSIInput from "@/components/Forms/Input";
import NSIEditor from "@/components/Forms/JodiEditor";
import NSIAutoComplete from "@/components/Forms/AutoComplete";
import { compiliance } from "@/constant/common";
import NSITextArea from "@/components/Forms/TextArea";
import { useGetSinglecomplianceQuery, useUpdatecomplianceMutation } from "@/redux/api/complianceApi";


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
    id: string | null,
};


const UpdateCompilianceModal = ({ open, setOpen, id }: TProps) => {
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

    const [updateCompiliance] = useUpdatecomplianceMutation()
    const { data, isLoading } = useGetSinglecomplianceQuery(id)

    const handleSubmit = async (data: FieldValues) => {
        data.images = images;
        data.codeOfConductImages = codeOfConductImages;
        data.zeroToleranceImages = zeroToleranceImages;
        data.socialCompilianceImages = socialCompilianceImages;
        data.csrImages = csrImages;

        if (Array.isArray(data.meta_keywords)) {
            data.meta_keywords = data.meta_keywords.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.meta_keywords : key)
            );
        }

        if (Array.isArray(data.EmployeesCocCovers)) {
            data.EmployeesCocCovers = data.EmployeesCocCovers.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.EmployeesCocCovers : key)
            );
        }
        try {
            const res = await updateCompiliance({ ...data, id }).unwrap();

            toast.success(res?.message);

            setOpen(false);
        } catch (err: any) {

            toast.error(err?.message);
        }
    };

    const singleData = data?.data;

    useEffect(() => {
        if (singleData) {
            setImages(singleData?.images || []);
            setCSRImages(singleData?.csrImages || []);
            setSocialCompilianceImages(singleData?.socialCompilianceImages || []);
            setCodeOfConductImages(singleData?.codeOfConductImages || []);
            setZeroToleranceImage(singleData?.zeroToleranceImages || []);
       
          
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }

    const defaultValues = {
        title: singleData?.title || '',
        social_compliance_title: singleData?.social_compliance_title || '',
        zeroTolerance_Title: singleData?.zeroTolerance_Title || '',
        csr_title: singleData?.csr_title || '',
        cod_of_conduct_title: singleData?.cod_of_conduct_title || '',
        description: singleData?.description || "",
        zeroTolerance_description: singleData?.zeroTolerance_description || "",
        cod_of_conduct_short_description: singleData?.cod_of_conduct_short_description || "",
        csr_short_description: singleData?.csr_short_description || "",
        social_compliance_description: singleData?.social_compliance_description || "",
        cod_of_conduct_description: singleData?.cod_of_conduct_description || "",
        csr_description: singleData?.csr_description || "",
        images: singleData?.images || [],
        csrImages: singleData?.csrImages || [],
        socialCompilianceImages: singleData?.socialCompilianceImages || [],
        zeroToleranceImages: singleData?.zeroToleranceImages || [],
        codeOfConductImages: singleData?.codeOfConductImages || [],
        EmployeesCocCovers: singleData?.EmployeesCocCovers || [],



    };


    return (
        <>
            {
                isLoading ? (
                    <p>Loading........</p>
                ) : (
                    <NSIRightSideModal open={open} setOpen={setOpen} title="Update Compliance ">
                        <FormContainer>
                            <ADForm onSubmit={handleSubmit} defaultValues={defaultValues}>
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
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <NSIEditor

                                                name="cod_of_conduct_short_description"
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
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <NSIEditor

                                                name="csr_description"
                                                label="CSR Description"
                                            />
                                        </Grid>



                                    </Grid>
                                    <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Update Compliance </Button></Box>
                                </FormSection>
                            </ADForm>
                        </FormContainer>
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

                    </NSIRightSideModal>
                )
            }

        </>
    );
};

export default UpdateCompilianceModal;
