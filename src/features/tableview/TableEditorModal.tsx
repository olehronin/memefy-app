import {
    Button,
    Divider,
    Form,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    NumberInput
} from "@heroui/react";
import { FormEvent, Fragment, KeyboardEvent, memo, ReactElement, useCallback, useEffect, useState } from "react";
import { Meme } from "@/types/meme.ts";
import { validateAndCheckImage } from "@/utils/validations.ts";
import { useMemeStore } from "@/features/useMemeStore.ts";
import {
    BETWEEN_0_AND_99_CHARACTERS,
    BETWEEN_3_AND_100_CHARACTERS,
    IMAGE_URL_IS_REQUIRED,
    MUST_BE_VALID_JPG_OR_JPEG
} from "@/utils/constants.ts";

type EditorModalProps = {
    editingMeme: Meme;
    isOpen: boolean;
    onOpenChange: () => void;
    handleSave: (element: Meme) => void;
};


const TableEditorModal = memo(({
                                   isOpen,
                                   editingMeme,
                                   handleSave,
                                   onOpenChange
                               }: EditorModalProps): ReactElement => {
    const isLoading = useMemeStore((state) => state.isLoading);
    const [formData, setFormData] = useState<Meme>(editingMeme);
    const [isFormValid, setFormValid] = useState<boolean>(true);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ name?: string; likes?: string; imageUrl?: string }>({});

    useEffect(() => {
        setFormData(editingMeme);
        setErrors({});
        setFormValid(true);
        setIsDirty(false);
    }, [editingMeme]);

    const validateField = async (key: keyof Meme, value: string | number) => {
        const newErrors: { name?: string; likes?: string; imageUrl?: string } = { ...errors };

        if (key === "name") {
            const name = value as string;
            if (!name || name.length < 3 || name.length > 100) {
                newErrors.name = BETWEEN_3_AND_100_CHARACTERS;
            } else {
                delete newErrors.name;
            }
        }

        if (key === "likes") {
            const likes = Number(value);
            if (likes < 0 || likes > 99) {
                newErrors.likes = BETWEEN_0_AND_99_CHARACTERS;
            } else {
                delete newErrors.likes;
            }
        }

        if (key === "imageUrl") {
            const url = value as string;
            if (!url) {
                newErrors.imageUrl = IMAGE_URL_IS_REQUIRED;
            } else {
                const b = await validateAndCheckImage(url);
                if (!b) {
                    newErrors.imageUrl = MUST_BE_VALID_JPG_OR_JPEG;
                } else {
                    delete newErrors.imageUrl;
                }
            }
        }

        return newErrors;
    };

    const handleInputChange = useCallback(async (key: keyof Meme, value: string | number) => {
        setFormData((prev) => {
            const newFormData = { ...prev, [key]: value };
            setIsDirty(JSON.stringify(newFormData) !== JSON.stringify(editingMeme));
            return newFormData;
        });

        const newErrors = await validateField(key, value);
        setErrors(newErrors);
        setFormValid(Object.keys(newErrors).length === 0);
    }, [editingMeme, errors, setFormData]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = Object.keys(errors).length === 0;
        setFormValid(isValid);

        if (isValid) {
            handleSave(formData);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !isFormValid) {
            e.preventDefault();
        }
    };

    return (
        <Modal
            size={"xl"}
            isOpen={isOpen}
            backdrop={"opaque"}
            onOpenChange={onOpenChange}
            classNames={{
                base: "rounded-xl sm:rounded-3xl",
                header: "px-4",
                body: "px-4",
                footer: "px-4"
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <Fragment>
                        <ModalHeader className={"flex flex-col gap-1"}>Editing meme</ModalHeader>
                        <Form
                            className={"block"}
                            onSubmit={handleSubmit}
                            validationBehavior={"native"}
                            id={"table-meme-editor-modal"}
                        >
                            <ModalBody className={"flex flex-col gap-2"}>
                                <div className={"flex flex-col gap-4"}>
                                    <div className={"flex justify-center"}>
                                        {errors.imageUrl ? (
                                            <div className={"w-28 h-28 bg-content4 rounded-2xl shadow-md flex justify-center items-center"}>
                                                Oops..
                                            </div>
                                        ) : (
                                            <Image
                                                radius={"lg"}
                                                alt={"Preview"}
                                                isBlurred={true}
                                                src={formData.imageUrl}
                                                className={"w-28 h-28 object-cover border-primary-600 border-2 shadow"}
                                            />
                                        )}
                                    </div>
                                    <Input
                                        size={"sm"}
                                        type={"url"}
                                        radius={"lg"}
                                        isRequired={true}
                                        label={"Image URL"}
                                        value={formData.imageUrl}
                                        onValueChange={(value) => handleInputChange("imageUrl", value)}
                                        errorMessage={errors.imageUrl}
                                        isInvalid={!!errors.imageUrl}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <Divider />
                                <div className="flex flex-col gap-2">
                                    <div className="flex-1 flex gap-2">
                                        <NumberInput
                                            size={"sm"}
                                            radius={"lg"}
                                            label={"ID"}
                                            value={formData.id}
                                            isReadOnly={true}
                                            isDisabled={true}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <NumberInput
                                            min={0}
                                            max={99}
                                            size={"sm"}
                                            radius={"lg"}
                                            label={"Likes"}
                                            isRequired={true}
                                            value={formData.likes}
                                            onValueChange={(value) => handleInputChange("likes", value)}
                                            errorMessage={errors.likes}
                                            isInvalid={!!errors.likes}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                    <Input
                                        min={3}
                                        max={100}
                                        size={"sm"}
                                        radius={"lg"}
                                        isRequired={true}
                                        label={"Name"}
                                        value={formData.name}
                                        onValueChange={(value) => handleInputChange("name", value)}
                                        errorMessage={errors.name}
                                        isInvalid={!!errors.name}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </ModalBody>
                        </Form>
                        <ModalFooter>
                            <Button color={"danger"} variant={"light"} onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                type={"submit"}
                                form={"table-meme-editor-modal"}
                                color={"primary"}
                                isDisabled={!isDirty || !isFormValid}
                                isLoading={isLoading}
                            >
                                Update
                            </Button>
                        </ModalFooter>
                    </Fragment>
                )}
            </ModalContent>
        </Modal>
    );
});

TableEditorModal.displayName = "TableEditorModal";

export default TableEditorModal;
