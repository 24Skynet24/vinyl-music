export interface SortOption {
    value: string
    label: string
}

export interface NavSidebarSearchProps {
    placeholder?: string
    value: string
    sortOptions: SortOption[]
    selectedSort: string
    onChange: (value: string) => void
    onSearch: () => void
    onSort: (value: string) => void
}