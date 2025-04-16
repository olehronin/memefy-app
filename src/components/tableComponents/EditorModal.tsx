import { ReactElement } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";

import { Meme } from "@/types/meme.ts";

type EditorModalProps = {
    editingMeme: Meme;
    setEditingMeme: (meme: Meme) => void;
    isOpen: boolean;
    onClose: () => void;
    handleSave: () => void;
    onOpen?: () => void;
};

const EditorModal = ({ isOpen, onClose, handleSave, editingMeme, setEditingMeme }: EditorModalProps): ReactElement => {

    return (
        <div>
            <Modal
                backdrop={"opaque"}
                isOpen={isOpen}
                size={"xl"}
                onClose={onClose}
                classNames={{
                    base: "rounded-xl sm:rounded-3xl",
                    header: "px-4",
                    body: "px-4",
                    footer: "px-4"
                }}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Editing Meme
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            required
                            label="Name"
                            maxLength={100}
                            minLength={3}
                            value={editingMeme.name}
                            onChange={(e) =>
                                setEditingMeme({
                                    ...editingMeme,
                                    name: e.target.value
                                })
                            }
                        />
                        <Input
                            required
                            label="Image URL"
                            type="url"
                            value={editingMeme.imageUrl}
                            onChange={(e) =>
                                setEditingMeme({
                                    ...editingMeme,
                                    imageUrl: e.target.value
                                })
                            }
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onPress={handleSave}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EditorModal;