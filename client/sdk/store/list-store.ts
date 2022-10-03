import { default as queryString } from 'query-string'
import { invokeRequest, onUpdateQuery } from 'sdk'
import create, { GetState, SetState } from 'zustand'

export type Data = { page: number; totalRecords: number; data: unknown[] }
export type ColumnSort = Map<string, 'asc' | 'desc' | string>

interface ListView {
  url?: string
  isFetching?: boolean
  columnSort?: ColumnSort
  data?: Data
}

interface IListViewStore {
  listViewMap?: Map<string, ListView>
  onDelete: (id: string, key: string) => void
  onEdit: (id: string, key: string) => void
  onLoading: (id: string) => void
  onData: (id: string, data: Data, url?: string) => void
  onQuery: (id: string, queryString: {}) => void
}

export const useListViewStore = create<IListViewStore>((set, get) => {
  return {
    async onQuery(id, queryString) {
      const listViewMap = onLoading(id, get, set)
      handleFetch(onUpdateQuery(listViewMap.get(id)?.url, queryString), (data) => {
        onData(id, data, listViewMap, set)
      })
    },
    onEdit(id, key) {
      //TODO handle edit
    },
    onDelete(id, key) {
      //TODO handle delete
    },
    onData(id, data, url) {
      const listViewMap = getListViewMap(get)
      listViewMap.set(id, { ...listViewMap.get(id), isFetching: false, data, url })
      set({ listViewMap })
    },
    onLoading(id) {
      onLoading(id, get, set)
    }
  }
})

const onLoading = (id: string, get: GetState<IListViewStore>, set: SetState<IListViewStore>) => {
  const listViewMap = getListViewMap(get)
  const query = queryString.parse(location.search)
  const columnSort: ColumnSort = new Map()
  if (query) {
    columnSort.set(query.sortKey as string, query.sortOrder as string)
  }
  listViewMap.set(id, { ...listViewMap.get(id), columnSort, isFetching: true })
  set({ listViewMap })
  return listViewMap
}

const onData = (id: string, data: Data, listViewMap: Map<string, ListView>, set: SetState<IListViewStore>) => {
  listViewMap.set(id, { ...listViewMap.get(id), isFetching: false, data })
  set({ listViewMap })
}

const getListViewMap = (get: GetState<IListViewStore>) => {
  let listViewMap = get().listViewMap
  if (!listViewMap) listViewMap = new Map()
  return listViewMap
}

export const handleFetch = async (url: string, onData: (data: Data) => void) => {
  invokeRequest({
    baseURL: url,
    onSuccess(data) {
      onData(data)
      history.pushState({}, '', '?' + url.split('?').pop())
    },
    onError() {
      //TODO show Notification Error
    }
  })
}
