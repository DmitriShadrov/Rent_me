import React from "react";
import {Box, IconButton, Typography} from "@mui/material";
import {GlowButton} from "../../config/muiThemeStyles";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

type Props = {
    title: string
    text: string[]
    btnText: string
    btnOnClick: () => void
    open: boolean
    handleClose: () => void
}

const ModalConfirm: React.FC<Props> = (props: Props) => {

    const {title, text, btnText, btnOnClick, open, handleClose} = props

    function getTextLines(text: string[]): JSX.Element[] {
        return text.reduce((res: JSX.Element[], item, index) => {
            res.push(getTextLine(item, index))
            return res
        }, [])
    }

    function getTextLine(line: string, index: number): JSX.Element {
        return <Typography variant={'h5'} color={'primary.contrastText'} key={index}>
            {line}
        </Typography>
    }

    return <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '330px',
            backgroundColor: 'primary.main',
            boxShadow: 24,
            padding: '60px',
            textAlign: 'center'
        }}>
            <Typography variant={'h2'} color={'primary.contrastText'} mb={'60px'}>
                {title}
            </Typography>
            <Box mb={'100px'}>
                {getTextLines(text)}
            </Box>
            <GlowButton onClick={btnOnClick}>
                <Typography>{btnText}</Typography>
            </GlowButton>
            <IconButton onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: '25px',
                            right: '25px',
                        }}>
                <CloseIcon color={'secondary'}/>
            </IconButton>
        </Box>
    </Modal>
}

export default ModalConfirm