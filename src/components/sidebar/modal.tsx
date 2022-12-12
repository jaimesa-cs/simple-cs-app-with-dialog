import { Button, ButtonGroup, ModalBody, ModalFooter, ModalHeader } from "@contentstack/venus-components"

const ModalComponent = (props: any) => {
    return (
        <div>
            <ModalHeader title='Modal header' closeModal={props.closeModal} />

            <ModalBody className='modalBodyCustomClass'>
                <div>
                    <iframe src="https://app.contentstack.com/#!/stack/blt8f285fdea6372037/" />
                </div>
            </ModalBody>
            <ModalFooter>
                <ButtonGroup>
                    <Button buttonType='light' onClick={() => props.closeModal()}>
                        Cancel
                    </Button>
                    <Button>Send</Button>
                </ButtonGroup>
            </ModalFooter>
        </div>
    )
}

export default ModalComponent