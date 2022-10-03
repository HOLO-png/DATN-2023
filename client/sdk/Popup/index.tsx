import { AddRounded } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { MouseEventHandler, useRef, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import {
  Control,
  FormProvider,
  HttpMethod,
  invokeRequest,
  PrimaryButton,
  TextButton,
  UseFormProvider,
  useListViewStore
} from 'sdk'
import styles from './style.module.scss'

type PopupBaseProps = DialogProps & {
  title?: string
  required?: boolean
  isAlert?: boolean
  open: boolean
  onClose: (open: boolean) => void
  onClick?: MouseEventHandler<HTMLButtonElement>
  popupClasses?: { title?: string; content?: string; actions?: string }
}

type PopupAlertProps = Partial<DialogProps> &
  Partial<PopupBaseProps> & {
    name: string
    listName: string
  }

type PopupAddProps<T extends FieldValues = FieldValues> = Partial<DialogProps> &
  Partial<PopupBaseProps> & {
    textButton?: string
    inputs: Array<Control<T>>
    data?: Record<string, any>
    id: string
    baseURL?: string
  }

export const PopupBase = (props: PopupBaseProps) => {
  const { children, title, PaperProps, isAlert, open, onClose, onClick, popupClasses, ...rest } = props

  const handleClose = () => {
    onClose(false)
  }

  return (
    <Dialog
      {...rest}
      onClose={onClose}
      open={open}
      PaperProps={{
        classes: {
          root: styles.PaperRoot
        },
        ...PaperProps
      }}>
      <Grid container>
        <Grid item xs={12}>
          <DialogTitle className={clsx(styles.DialogTitleContent, styles.Headline5, popupClasses?.title)}>
            {title}
          </DialogTitle>
        </Grid>
        <Grid item xs={12}>
          <DialogContent
            className={clsx(styles.DialogContentRoot, styles.DialogContentTextRoot, popupClasses?.content)}>
            {children}
          </DialogContent>
        </Grid>
        <Grid item xs={12}>
          <DialogActions className={clsx(styles.DialogActionsRoot)}>
            <TextButton className={clsx(styles.TextButton, styles.TextCancel)} onClick={handleClose}>
              Hủy bỏ
            </TextButton>
            <PrimaryButton className={styles.TextButton} onClick={onClick}>
              {isAlert ? 'Xoá' : 'Xác nhận'}
            </PrimaryButton>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export function PopupAdd(props: PopupAddProps) {
  const { inputs, className, required, textButton, id = '', baseURL = '', ...rest } = props
  const [open, setOpen] = useState(false)
  const formRef = useRef<UseFormProvider>(null)
  const onData = useListViewStore((store) => store.onData)
  const onQuery = useListViewStore((store) => store.onQuery)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const onSubmit = (params: Record<string, unknown>) => {
    invokeRequest({
      baseURL: baseURL,
      method: HttpMethod.POST,
      params,
      onSuccess(data) {
        onData(id, data, baseURL)
        setOpen(false)
        onQuery(id, { page: 1, size: 10 })
      }
    })
  }

  const onSubmitClick = () => {
    formRef.current?.handleSubmit(onSubmit)()
  }

  return (
    <Grid item xs={4} className={styles.ButtonAdd}>
      <PrimaryButton startIcon={<AddRounded />} className={styles.Text} onClick={handleClickOpen}>
        {textButton}
      </PrimaryButton>
      <PopupBase
        {...rest}
        open={open}
        onClick={onSubmitClick}
        onClose={() => setOpen(false)}
        popupClasses={{ content: styles.PopupAdd }}
        className={clsx(styles.DialogRoot, className)}>
        <FormProvider ref={formRef} inputs={inputs} mode='onTouched' />
      </PopupBase>
    </Grid>
  )
}

export function PopupAlert(props: PopupAlertProps) {
  const { listName, name, className, open = true, onClose, ...rest } = props
  const onDelete = useListViewStore((store) => store.onDelete)
  const [openPopup, setOpenPopup] = useState<boolean>(true)

  const handleClose = () => {
    setOpenPopup(false)
  }

  return (
    <PopupBase
      {...rest}
      className={clsx(styles.DialogRoot, className)}
      title='Thông báo'
      isAlert
      open={open}
      onClick={() => onDelete}
      onClose={handleClose}>
      <Typography className={clsx(styles.Body2, styles.DialogContentText)}>
        Bạn có muốn xóa{' '}
        <Typography variant='caption' className={styles.Subhead2}>
          {name}
        </Typography>{' '}
        ra khỏi danh sách {listName} ?
      </Typography>
    </PopupBase>
  )
}
