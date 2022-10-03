import { KeyboardArrowDownRounded } from '@mui/icons-material'
import { Autocomplete } from '@mui/material'
import clsx from 'clsx'
import { useAPI } from 'hooks/index'
import { useState } from 'react'
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form'
import { ContainerInputField } from 'sdk'
import { Control } from '.'
import styles from './style.module.scss'

export type DataDropdown = {
  code: string
  label: string
  sortOrder?: string
}

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  control: Control<T>
}

export const FormSelect = <T extends FieldValues>(props: Props<T>) => {
  const { form, control } = props
  const error = form.formState.errors[control.name]
  const [data, setData] = useState<Array<DataDropdown>>(Array.isArray(control.data) ? control.data : [])

  useAPI({
    baseURL: Array.isArray(control.data) ? '' : control.data || '',
    onSuccess(data) {
      setData(data)
    }
  })

  return (
    <Controller
      name={control.name}
      control={form.control}
      rules={{
        required: control.required
      }}
      render={() => (
        <Autocomplete
          key={control.name}
          placeholder={control.placeholder}
          options={data}
          className={clsx(styles.Autocomplete, control.className)}
          classes={{ input: styles.Input, listbox: styles.ListBoxDropdown }}
          popupIcon={<KeyboardArrowDownRounded />}
          noOptionsText='Không tìm thấy'
          disablePortal={true}
          renderInput={(params) => (
            <ContainerInputField {...params} label={control.label} placeholder={control.placeholder} />
          )}
        />
      )}
    />
  )
}
