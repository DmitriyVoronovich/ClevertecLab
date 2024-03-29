export type SwitchProps = {
    title: string
    tooltip: string
    overlayStyle: string
    dataTestIcon: string
    formItemName: string
    dataTestItem: string
    onChange: (field: string, value: boolean) => void
    className: string
    disabled?: boolean
};
